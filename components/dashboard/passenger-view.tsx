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
                    <Card className="border-white/10 bg-black shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl text-white">
                                <Search className="w-6 h-6 text-white" />
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
                                    <div className="absolute left-[19px] top-10 bottom-10 w-0.5 bg-zinc-800" />

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Pickup</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3.5 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                            <Input name="pickup" placeholder="Current Location" className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-0" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Drop-off</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3.5 w-3 h-3 border-2 border-zinc-500 rounded-sm" />
                                            <Input name="dest" placeholder="Enter destination" className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-0" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Offer Price (ETH/USDC)</label>
                                        <Input name="price" placeholder="0.05" type="number" step="0.0001" className="bg-transparent border-none text-2xl font-bold text-white placeholder:text-zinc-700 focus-visible:ring-0 px-0" required />
                                    </div>
                                </div>

                                <Button type="submit" size="lg" className="w-full text-lg h-14 bg-white text-black hover:bg-zinc-200">
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
                <Card className="h-full border-white/5 bg-black">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-zinc-300">
                            <Clock className="w-5 h-5" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-white/10 text-white">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white text-sm">Crypto Valley</p>
                                            <p className="text-xs text-zinc-500">Oct {10 + i}, 2025 • 0.04 ETH</p>
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-zinc-300 border border-white/10">
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