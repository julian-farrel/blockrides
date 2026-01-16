'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { Clock, MapPin } from "lucide-react"

interface PassengerViewProps {
    rideStatus: "Idle" | "Finding Pilot" | "Accepted" | "Started" | "Completed"
    onRequestRide: (pickup: string, dest: string, price: string) => void
}

export function PassengerView({ rideStatus, onRequestRide }: PassengerViewProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">

            {/* Section 1: Book a Ride or Active Status */}
            <div className="lg:col-span-2 space-y-6">
                {rideStatus === 'Idle' || rideStatus === 'Completed' ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Book a Ride</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="space-y-4"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const form = e.target as any
                                    onRequestRide(form.pickup.value, form.dest.value, form.price.value)
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Pickup Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#10B981]" />
                                            <Input name="pickup" placeholder="Enter pickup point" className="pl-10" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Destination</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-white" />
                                            <Input name="dest" placeholder="Enter destination" className="pl-10" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Offer Price (USDC/ETH)</label>
                                    <Input name="price" placeholder="e.g. 15.00" type="number" required />
                                </div>
                                <Button type="submit" size="lg" className="w-full">
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
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#10B981]" />
                            Ride History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#10B981]/50 transition-colors">
                                    <div>
                                        <p className="font-semibold text-white">To: Crypto Valley</p>
                                        <p className="text-xs text-gray-400">Oct {10 + i}, 2025</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded bg-[#10B981]/20 text-[#10B981]">
                                        Completed
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
