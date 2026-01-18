'use client'

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { Navigation, Wallet, MapPin } from "lucide-react"
import { useWallets } from "@privy-io/react-auth"
import { getContract } from "@/lib/web3"
import { supabase } from "@/lib/supabase"

interface DriverViewProps {
    rideStatus: "Idle" | "Accepted" | "Started" | "Completed"
    onAcceptRide: () => void
    onStartRide: () => void
    onCompleteRide: () => void
}

export function DriverView({ rideStatus, onAcceptRide, onStartRide, onCompleteRide }: DriverViewProps) {
    const { wallets } = useWallets()
    const [jobs, setJobs] = useState<any[]>([])
    const [activeJob, setActiveJob] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const getWeb3Contract = async () => {
        const wallet = wallets[0]
        if (!wallet) return null
        const provider = await wallet.getEthereumProvider()
        return { contract: getContract(provider), address: wallet.address }
    }

    // Fetch Data from Supabase (Persistence Layer)
    const fetchData = useCallback(async () => {
        const wallet = wallets[0]
        if (!wallet) return

        // 1. Check if I (the driver) already have an active job
        // Looks for Accepted or Started rides where driver_wallet = me
        const { data: activeData } = await supabase
            .from('rides')
            .select('*')
            .eq('driver_wallet', wallet.address)
            .in('status', ['Accepted', 'Started'])
            .single()

        if (activeData) {
            setActiveJob(activeData)
            // Sync the UI State
            if (activeData.status === 'Accepted') onAcceptRide()
            if (activeData.status === 'Started') onStartRide()
        } else {
            // If we finished the job (Completed), clear active job
            if (rideStatus === 'Completed') {
                setActiveJob(null)
            }
        }

        // 2. Fetch Available Jobs (Status = Requested)
        const { data: jobsData } = await supabase
            .from('rides')
            .select('*')
            .eq('status', 'Requested')
            .order('created_at', { ascending: false })

        if (jobsData) setJobs(jobsData)
        setLoading(false)
    }, [wallets, rideStatus])

    // Poll for updates every 3 seconds
    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 3000)
        return () => clearInterval(interval)
    }, [fetchData])

    // --- DRIVER ACTION 1: Accept ---
    const handleAccept = async (rideId: string, dbId: number) => {
        const data = await getWeb3Contract()
        if (!data) return
        try {
            // A. Blockchain
            await data.contract.methods.acceptRide(rideId).send({ from: data.address })
            
            // B. Database (Lock the ride for this driver)
            await supabase.from('rides').update({ 
                status: 'Accepted', 
                driver_wallet: data.address 
            }).eq('id', dbId)

            onAcceptRide()
            fetchData() // Immediate refresh
        } catch (err) {
            console.error(err)
            alert("Accept failed")
        }
    }

    // --- DRIVER ACTION 2: Start ---
    const handleStart = async () => {
        if (!activeJob) return
        const data = await getWeb3Contract()
        if (!data) return
        try {
            await data.contract.methods.startRide(activeJob.blockchain_id).send({ from: data.address })
            
            await supabase.from('rides').update({ status: 'Started' }).eq('id', activeJob.id)
            
            onStartRide()
            fetchData()
        } catch (err) {
            console.error(err)
            alert("Start failed")
        }
    }

    // --- DRIVER ACTION 3: Complete ---
    const handleComplete = async () => {
        if (!activeJob) return
        const data = await getWeb3Contract()
        if (!data) return
        try {
            await data.contract.methods.completeRide(activeJob.blockchain_id).send({ from: data.address })
            
            await supabase.from('rides').update({ status: 'Completed' }).eq('id', activeJob.id)
            
            onCompleteRide()
            setActiveJob(null)
            fetchData()
        } catch (err) {
            console.error(err)
            alert("Complete failed")
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-700">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {activeJob ? 'Current Mission' : 'Funded Requests'}
                        </h2>
                        <p className="text-zinc-400 text-sm">
                            {activeJob ? 'Passenger is waiting.' : 'Pick a pre-paid job.'}
                        </p>
                    </div>
                </div>

                {!activeJob ? (
                    <div className="space-y-4">
                        {loading && <div className="text-white">Searching...</div>}
                        {!loading && jobs.length === 0 && <div className="text-zinc-500">No active requests nearby.</div>}
                        
                        {jobs.map((job) => (
                            <Card key={job.id} className="group bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm overflow-hidden relative">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                                    <Navigation className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-2xl font-bold text-white tracking-tight">
                                                            {job.price} ETH
                                                        </h3>
                                                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Funded</span>
                                                    </div>
                                                    <p className="text-sm text-zinc-400">Pickup: {job.pickup}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 pl-2 border-l border-zinc-800 ml-5">
                                                <div className="flex items-center gap-3 text-zinc-500 text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-sm bg-zinc-600" />
                                                    <span>{job.destination}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button 
                                            onClick={() => handleAccept(job.blockchain_id, job.id)}
                                            className="h-12 px-6 bg-white text-black hover:bg-zinc-200 font-semibold"
                                        >
                                            Accept & Drive
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <RideStatusPanel status={activeJob.status as any} />
                        <div className="grid grid-cols-2 gap-4">
                            {activeJob.status === 'Accepted' && (
                                <Button onClick={handleStart} className="col-span-2 h-20 text-xl font-bold bg-white text-black hover:bg-zinc-200">
                                    <Navigation className="w-6 h-6 mr-3" /> Start Trip
                                </Button>
                            )}
                            {activeJob.status === 'Started' && (
                                <Button onClick={handleComplete} variant="outline" className="col-span-2 h-20 text-xl border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10">
                                    <MapPin className="w-6 h-6 mr-3" /> Complete Trip
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Earnings */}
            <div className="lg:col-span-4 space-y-6">
                <Card className="bg-gradient-to-br from-zinc-900 to-black border-white/10 relative overflow-hidden shadow-xl">
                     <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                            <Wallet className="w-3 h-3 text-white" /> Weekly Earnings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-white mb-1 tracking-tight">0.00 <span className="text-xl text-zinc-500">ETH</span></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}