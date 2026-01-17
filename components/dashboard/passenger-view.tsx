'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { MapPin, Navigation, Wallet, Clock, ArrowRight, Loader2 } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"
import { supabase } from "@/lib/supabase"

interface PassengerViewProps {
    rideStatus: "Idle" | "Finding Pilot" | "Accepted" | "Started" | "Completed"
    onRequestRide: (pickup: string, dest: string, price: string) => void
}

export function PassengerView({ rideStatus, onRequestRide }: PassengerViewProps) {
    const { user } = usePrivy()
    const [pickup, setPickup] = useState("")
    const [dest, setDest] = useState("")
    const [price, setPrice] = useState("")
    const [history, setHistory] = useState<any[]>([])
    const [loadingHistory, setLoadingHistory] = useState(true)
    const [isRequesting, setIsRequesting] = useState(false)

    // Fetch Trip History
    useEffect(() => {
        if (!user?.wallet?.address) return
        async function fetchHistory() {
            const { data } = await supabase
                .from('rides')
                .select('*')
                .eq('passenger_wallet', user!.wallet!.address)
                .order('created_at', { ascending: false })
                .limit(5)
            
            if (data) setHistory(data)
            setLoadingHistory(false)
        }
        fetchHistory()
    }, [user, rideStatus]) // Re-fetch when ride status changes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsRequesting(true)
        
        try {
            // Save Booking to Supabase
            const { error } = await supabase.from('rides').insert({
                passenger_wallet: user?.wallet?.address,
                pickup,
                destination: dest,
                price: parseFloat(price),
                status: 'Idle'
            })

            if (error) throw error

            onRequestRide(pickup, dest, price)
        } catch (err) {
            console.error(err)
        } finally {
            setIsRequesting(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-700">
            {/* LEFT: Booking */}
            <div className="lg:col-span-8 flex flex-col justify-center min-h-[60vh]">
                {rideStatus === 'Idle' || rideStatus === 'Completed' ? (
                    <div className="space-y-6 max-w-2xl mx-auto w-full">
                        <div className="space-y-2 text-center lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white">Where to next?</h2>
                            <p className="text-zinc-400">Secure a decentralized ride in seconds.</p>
                        </div>
                        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
                            <CardContent className="p-6 md:p-8">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="relative space-y-4">
                                        <div className="absolute left-[19px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-white/50 to-white/10" />
                                        <div className="group relative">
                                            <div className="absolute left-3 top-3.5 z-10 p-1 bg-black rounded-full border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                            <Input 
                                                value={pickup}
                                                onChange={(e) => setPickup(e.target.value)}
                                                placeholder="Current Location" 
                                                className="pl-12 h-14 bg-white/5 border-white/5 text-white placeholder:text-zinc-500 focus:border-white/20 focus:bg-white/10 focus:ring-0 transition-all text-lg rounded-xl" 
                                                required 
                                            />
                                        </div>
                                        <div className="group relative">
                                            <div className="absolute left-3 top-3.5 z-10 p-1 bg-black rounded-full border border-white/20">
                                                <div className="w-2 h-2 border-2 border-zinc-400 rounded-sm" />
                                            </div>
                                            <Input 
                                                value={dest}
                                                onChange={(e) => setDest(e.target.value)}
                                                placeholder="Enter Destination" 
                                                className="pl-12 h-14 bg-white/5 border-white/5 text-white placeholder:text-zinc-500 focus:border-white/20 focus:bg-white/10 focus:ring-0 transition-all text-lg rounded-xl" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="w-full md:w-1/3 space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                                                <Wallet className="w-3 h-3" /> Offer (ETH)
                                            </label>
                                            <Input 
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                type="number" 
                                                step="0.0001" 
                                                placeholder="0.05" 
                                                className="h-14 bg-white/5 border-white/5 text-white text-xl font-mono focus:border-white/20 focus:ring-0 rounded-xl" 
                                                required 
                                            />
                                        </div>
                                        <Button 
                                            type="submit" disabled={isRequesting}
                                            className="w-full md:w-2/3 h-14 text-lg bg-white text-black hover:bg-zinc-200 rounded-xl font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.01]"
                                        >
                                            {isRequesting ? <Loader2 className="animate-spin" /> : <>Request Ride <ArrowRight className="ml-2 w-5 h-5" /></>}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto w-full">
                         <RideStatusPanel status={rideStatus} />
                    </div>
                )}
            </div>

            {/* RIGHT: Real History */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 h-full backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                        <Clock className="w-5 h-5 text-zinc-400" />
                        Recent History
                    </h3>
                    
                    <div className="space-y-4">
                        {loadingHistory ? <div className="text-zinc-500 text-sm">Loading history...</div> : history.map((ride) => (
                            <div key={ride.id} className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2 text-zinc-300">
                                        <MapPin className="w-4 h-4 text-white" />
                                        <span className="font-medium text-sm truncate max-w-[150px]">{ride.destination}</span>
                                    </div>
                                    <span className="text-xs text-zinc-500 font-mono">
                                        {new Date(ride.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-xs text-zinc-500 flex items-center gap-1">
                                        <Navigation className="w-3 h-3" /> {ride.status}
                                    </div>
                                    <div className="text-sm font-bold text-white font-mono bg-white/10 px-2 py-1 rounded-md">
                                        {ride.price} ETH
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!loadingHistory && history.length === 0 && <p className="text-zinc-500 text-sm">No rides yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}