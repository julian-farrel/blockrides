'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { Clock, MapPin, Search } from "lucide-react"

interface PassengerViewProps {
    rideStatus: "Idle" | "Finding Pilot" | "Accepted" | "Started" | "Completed"
    onRequestRide: (pickup: string, dest: string, price: string) => void
}

export function PassengerView({ rideStatus, onRequestRide }: PassengerViewProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">

            {/* Section 1: Book a Ride or Active Status */}
            <div className="lg:col-span-2 space-y-6">
                {rideStatus === 'Idle' || rideStatus === 'Completed' ? (
                    <Card className="border-purple-500/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Search className="w-6 h-6 text-purple-500" /> 
                                Where to?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="space-y-6"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const form = e.target as any
                                    onRequestRide(form.pickup.value, form.dest.value, form.price.value)
                                }}
                            >
                                <div className="space-y-4 relative">
                                    {/* Connecting Line */}
                                    <div className="absolute left-[19px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-purple-400 uppercase tracking-wider ml-1">Pickup</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3.5 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                            <Input name="pickup" placeholder="Current Location" className="pl-10 h-12 bg-white/5 border-white/10" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Drop-off</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3.5 w-3 h-3 border-2 border-white rounded-sm" />
                                            <Input name="dest" placeholder="Enter destination" className="pl-10 h-12 bg-white/5 border-white/10" required />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/20">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Offer Price (ETH/USDC)</label>
                                        <Input name="price" placeholder="0.05" type="number" step="0.0001" className="bg-transparent border-none text-2xl font-bold text-purple-300 placeholder:text-purple-800 focus-visible:ring-0 px-0" required />
                                    </div>
                                </div>

                                <Button type="submit" size="lg" className="w-full text-lg h-14">
                                    Request Ride
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <RideStatusPanel status={rideStatus} />
                )}
            </div>

            {/* Section 2: Order History */}
            <div className="lg:col-span-1">
                <Card className="h-full border-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-gray-300">
                            <Clock className="w-5 h-5" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-purple-900/20 text-purple-400 group-hover:text-purple-300">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white text-sm">Crypto Valley</p>
                                            <p className="text-xs text-gray-500">Oct {10 + i}, 2025 • 0.04 ETH</p>
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                        Done
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}