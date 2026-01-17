'use client'

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, Wallet, Clock, ArrowRight, Loader2, CheckCircle2, DollarSign } from "lucide-react"
import { useWallets } from "@privy-io/react-auth"
import { getContract } from "@/lib/web3"
import Web3 from "web3"

interface PassengerViewProps {
    rideStatus: "Idle" | "Finding Pilot" | "Accepted" | "Started" | "Completed"
    onRequestRide: (pickup: string, dest: string, price: string) => void
}

export function PassengerView({ rideStatus, onRequestRide }: PassengerViewProps) {
    const { wallets } = useWallets()
    const [pickup, setPickup] = useState("")
    const [dest, setDest] = useState("")
    const [price, setPrice] = useState("")
    const [history, setHistory] = useState<any[]>([]) // Real data only
    const [loadingHistory, setLoadingHistory] = useState(true)
    const [isRequesting, setIsRequesting] = useState(false)

    // Helper to get contract
    const getWeb3Contract = async () => {
        const wallet = wallets[0]
        if (!wallet) return null
        const provider = await wallet.getEthereumProvider()
        return { contract: getContract(provider), address: wallet.address }
    }

    // Fetch Trip History from Blockchain
    const fetchHistory = useCallback(async () => {
        const data = await getWeb3Contract()
        if (!data) return
        const { contract, address } = data
        
        try {
            // Get ALL rides from chain
            const allRides: any[] = await contract.methods.getAllRides().call()
            
            // Filter only MY rides (case insensitive check)
            const myRides = allRides.filter((r: any) => 
                r.passenger.toLowerCase() === address.toLowerCase()
            ).reverse() // Show newest first

            setHistory(myRides)
        } catch (err) {
            console.error("Error fetching rides:", err)
        } finally {
            setLoadingHistory(false)
        }
    }, [wallets])

    // Poll for updates every 5 seconds
    useEffect(() => {
        fetchHistory()
        const interval = setInterval(fetchHistory, 5000)
        return () => clearInterval(interval)
    }, [fetchHistory])

    // ACTION 1: Request Ride Transaction
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = await getWeb3Contract()
        if (!data) return

        setIsRequesting(true)
        try {
            const priceInWei = Web3.utils.toWei(price, 'ether')
            
            // Sign & Send Request
            await data.contract.methods
                .requestRide(pickup, dest, priceInWei)
                .send({ from: data.address })
            
            fetchHistory()
            onRequestRide(pickup, dest, price)
            setPickup("")
            setDest("")
            setPrice("")
        } catch (err) {
            console.error(err)
            alert("Transaction failed! Please try again.")
        } finally {
            setIsRequesting(false)
        }
    }

    // ACTION 2: Fund Ride Transaction (Escrow)
    const handleFund = async (rideId: string, priceWei: string) => {
        const data = await getWeb3Contract()
        if (!data) return

        if (!confirm(`Sign transaction to deposit ${Web3.utils.fromWei(priceWei, 'ether')} ETH into Escrow?`)) return;

        try {
            await data.contract.methods.fundRide(rideId).send({ 
                from: data.address,
                value: priceWei // Send exact ETH amount
            })
            fetchHistory()
        } catch (err) {
            console.error(err)
            alert("Funding failed")
        }
    }

    // ACTION 3: Confirm Arrival Transaction
    const handleConfirm = async (rideId: string) => {
        const data = await getWeb3Contract()
        if (!data) return

        if (!confirm("Confirm arrival and release funds to driver?")) return;

        try {
            await data.contract.methods.confirmArrival(rideId).send({ from: data.address })
            fetchHistory()
        } catch (err) {
            console.error(err)
            alert("Confirmation failed")
        }
    }

    // Map numeric status to string text
    const getStatusText = (statusIndex: string) => {
        const statuses = ["Requested", "Accepted", "Funded", "Started", "Arrived", "Completed", "Cancelled"]
        return statuses[parseInt(statusIndex)] || "Unknown"
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-700">
            {/* LEFT: Booking */}
            <div className="lg:col-span-8 flex flex-col justify-center min-h-[60vh]">
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
            </div>

            {/* RIGHT: Real History with Actions */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 h-full backdrop-blur-sm overflow-y-auto max-h-[80vh]">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                        <Clock className="w-5 h-5 text-zinc-400" />
                        Your Ride Status
                    </h3>
                    
                    <div className="space-y-4">
                        {loadingHistory ? <div className="text-zinc-500 text-sm">Loading blockchain data...</div> : history.map((ride) => {
                            const status = parseInt(ride.status)
                            // status: 1 = Accepted (Needs Funding), 4 = CompletedByDriver (Needs Confirm)
                            
                            return (
                                <div key={ride.id} className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2 text-zinc-300">
                                            <MapPin className="w-4 h-4 text-white" />
                                            <span className="font-medium text-sm truncate max-w-[150px]">{ride.destination}</span>
                                        </div>
                                        <span className="text-xs text-zinc-500 font-mono">
                                            ID: #{ride.id}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="text-xs text-zinc-400 flex items-center gap-1">
                                            <Navigation className="w-3 h-3" /> {getStatusText(ride.status)}
                                        </div>
                                        <div className="text-sm font-bold text-white font-mono bg-white/10 px-2 py-1 rounded-md">
                                            {Web3.utils.fromWei(ride.price, 'ether')} ETH
                                        </div>
                                    </div>

                                    {/* Action Buttons based on Status */}
                                    {status === 1 && (
                                        <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                            <p className="text-xs text-zinc-400 mb-2">Driver accepted. Please fund escrow.</p>
                                            <Button 
                                                onClick={() => handleFund(ride.id, ride.price)}
                                                className="w-full h-9 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                                            >
                                                <DollarSign className="w-3 h-3 mr-1" /> Sign & Fund {Web3.utils.fromWei(ride.price, 'ether')} ETH
                                            </Button>
                                        </div>
                                    )}

                                    {status === 4 && (
                                        <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                            <p className="text-xs text-zinc-400 mb-2">Ride finished. Confirm to release funds.</p>
                                            <Button 
                                                onClick={() => handleConfirm(ride.id)}
                                                className="w-full h-9 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                                            >
                                                <CheckCircle2 className="w-3 h-3 mr-1" /> Sign & Confirm Arrival
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                        {!loadingHistory && history.length === 0 && <p className="text-zinc-500 text-sm">No rides found on-chain.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}