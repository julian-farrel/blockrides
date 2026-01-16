'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { DollarSign, MapPin, Navigation } from "lucide-react"

interface DriverViewProps {
    rideStatus: "Idle" | "Accepted" | "Started" | "Completed"
    onAcceptRide: () => void
    onStartRide: () => void
    onCompleteRide: () => void
}

export function DriverView({ rideStatus, onAcceptRide, onStartRide, onCompleteRide }: DriverViewProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">

            {/* Section 1 & 2: Active Job or Incoming Orders */}
            <div className="lg:col-span-2 space-y-6">
                {rideStatus === 'Idle' ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Available Rides
                                <span className="text-sm bg-[#10B981] text-black px-2 py-1 rounded font-bold animate-pulse">3 New</span>
                            </CardTitle>
                            <CardDescription>Pick a ride to start earning.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Mock Incoming Order */}
                            <div className="p-4 rounded-xl border border-dashed border-gray-600 bg-black/20 hover:border-[#10B981] transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">$25.00</h4>
                                        <p className="text-sm text-gray-400">Total Distance: 5.2 km</p>
                                    </div>
                                    <Button onClick={onAcceptRide}>Accept</Button>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                                        <span>Central Station, Block A</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                        <span>Tech Hub, Zone 4</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <RideStatusPanel status={rideStatus as any} />

                        {/* Driver Controls */}
                        <div className="grid grid-cols-2 gap-4">
                            {rideStatus === 'Accepted' && (
                                <Button onClick={onStartRide} className="col-span-2 h-14 text-lg bg-[#10B981] hover:bg-[#059669]">
                                    <Navigation className="w-5 h-5 mr-2" />
                                    Start Ride
                                </Button>
                            )}
                            {rideStatus === 'Started' && (
                                <Button onClick={onCompleteRide} className="col-span-2 h-14 text-lg bg-white text-black hover:bg-gray-200">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Complete Ride
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Section 3: History & Earnings */}
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-[#10B981] mb-2">$142.50</div>
                        <p className="text-sm text-gray-400">5 Rides completed</p>
                    </CardContent>
                </Card>

                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Recent Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <div>
                                        <p className="font-semibold text-white">Downtown Trip</p>
                                        <p className="text-xs text-gray-400">10:30 AM</p>
                                    </div>
                                    <span className="font-bold text-[#10B981]">+$28.00</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
