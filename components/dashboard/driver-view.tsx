'use client'

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { Navigation, Wallet, MapPin } from "lucide-react"
import { useWallets } from "@privy-io/react-auth"
import { getContract } from "@/lib/web3"
import Web3 from "web3"

interface DriverViewProps {
    rideStatus: "Idle" | "Accepted" | "Started" | "Completed"
    onAcceptRide: () => void
    onStartRide: () => void
    onCompleteRide: () => void
}

export function DriverView({ rideStatus, onAcceptRide, onStartRide, onCompleteRide }: DriverViewProps) {
    const { wallets } = useWallets()
    const [jobs, setJobs] = useState<any[]>([])
    const [activeJobId, setActiveJobId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const getWeb3Contract = async () => {
        const wallet = wallets[0]
        if (!wallet) return null
        const provider = await wallet.getEthereumProvider()
        return { contract: getContract(provider), address: wallet.address }
    }

    const fetchJobs = useCallback(async () => {
        const data = await getWeb3Contract()
        if (!data) return
        
        try {
            // Get ALL rides
            const allRides: any[] = await data.contract.methods.getAllRides().call()
            
            // Filter active jobs (Status 0 = Requested)
            const availableJobs = allRides.filter((r: any) => r.status == 0).reverse()
            setJobs(availableJobs)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [wallets])

    // Poll for jobs
    useEffect(() => {
        fetchJobs()
        const interval = setInterval(fetchJobs, 5000)
        return () => clearInterval(interval)
    }, [fetchJobs])

    // ACTION 1: Accept Transaction
    const handleAccept = async (rideId: string) => {
        const data = await getWeb3Contract()
        if (!data) return

        try {
            await data.contract.methods.acceptRide(rideId).send({ from: data.address })
            setActiveJobId(rideId)
            onAcceptRide()
        } catch (err) {
            console.error(err)
            alert("Accept failed")
        }
    }

    // ACTION 2: Start Transaction
    const handleStart = async () => {
        if (!activeJobId) return
        const data = await getWeb3Contract()
        if (!data) return

        try {
            await data.contract.methods.startRide(activeJobId).send({ from: data.address })
            onStartRide()
        } catch (err) {
            console.error(err)
            alert("Start failed")
        }
    }

    // ACTION 3: Complete Transaction
    const handleComplete = async () => {
        if (!activeJobId) return
        const data = await getWeb3Contract()
        if (!data) return

        try {
            await data.contract.methods.completeRide(activeJobId).send({ from: data.address })
            onCompleteRide()
            setActiveJobId(null) // Reset active job
        } catch (err) {
            console.error(err)
            alert("Complete failed")
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-700">
            {/* LEFT: Operations */}
            <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {rideStatus === 'Idle' ? 'Available Jobs' : 'Current Mission'}
                        </h2>
                        <p className="text-zinc-400 text-sm">
                            {rideStatus === 'Idle' ? 'Pick a request to start earning.' : 'Manage your active trip.'}
                        </p>
                    </div>
                </div>

                {rideStatus === 'Idle' ? (
                    <div className="space-y-4">
                        {loading && <div className="text-white">Searching for riders...</div>}
                        {!loading && jobs.length === 0 && <div className="text-zinc-500">No active requests nearby.</div>}
                        
                        {jobs.map((job) => (
                            <Card key={job.id} className="group bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all" />
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
                                                            {Web3.utils.fromWei(job.price, 'ether')} ETH
                                                        </h3>
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
                                            onClick={() => handleAccept(job.id)}
                                            className="h-12 px-6 bg-white text-black hover:bg-zinc-200 font-semibold"
                                        >
                                            Accept & Sign
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <RideStatusPanel status={rideStatus} />
                        <div className="grid grid-cols-2 gap-4">
                            {rideStatus === 'Accepted' && (
                                <Button onClick={handleStart} className="col-span-2 h-20 text-xl font-bold bg-white text-black hover:bg-zinc-200">
                                    <Navigation className="w-6 h-6 mr-3" /> Start Trip (Sign)
                                </Button>
                            )}
                            {rideStatus === 'Started' && (
                                <Button onClick={handleComplete} variant="outline" className="col-span-2 h-20 text-xl border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10">
                                    <MapPin className="w-6 h-6 mr-3" /> Complete Trip (Sign)
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT: Stats */}
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