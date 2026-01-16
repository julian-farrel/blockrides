'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { DollarSign, MapPin, Navigation, Wallet } from "lucide-react"

interface DriverViewProps {
    rideStatus: "Idle" | "Accepted" | "Started" | "Completed"
    onAcceptRide: () => void
    onStartRide: () => void
    onCompleteRide: () => void
}

export function DriverView({ rideStatus, onAcceptRide, onStartRide, onCompleteRide }: DriverViewProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">

            {/* Active Job or Incoming Orders */}
            <div className="lg:col-span-2 space-y-6">
                {rideStatus === 'Idle' ? (
                    <Card className="border-purple-500/10">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="text-2xl">Incoming Requests</span>
                                <span className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full font-bold animate-pulse shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                                    3 Live
                                </span>
                            </CardTitle>
                            <CardDescription>Select a ride to start earning.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Mock Incoming Order */}
                            <div className="p-5 rounded-xl border border-dashed border-gray-700 bg-black/40 hover:border-purple-500 hover:bg-purple-900/5 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-white/5 rounded-lg h-fit">
                                            <Navigation className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-1">0.05 ETH</h4>
                                            <p className="text-sm text-gray-400">~ $142.50 • 5.2 km</p>
                                        </div>
                                    </div>
                                    <Button onClick={onAcceptRide} className="px-6">Accept</Button>
                                </div>
                                <div className="space-y-3 text-sm pl-2 border-l-2 border-gray-800 ml-6">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                        <span>Central Station, Block A</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-sm bg-white" />
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
                                <Button onClick={onStartRide} className="col-span-2 h-16 text-xl bg-purple-600 hover:bg-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                                    <Navigation className="w-6 h-6 mr-3" />
                                    Start Trip
                                </Button>
                            )}
                            {rideStatus === 'Started' && (
                                <Button onClick={onCompleteRide} className="col-span-2 h-16 text-xl bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    <MapPin className="w-6 h-6 mr-3" />
                                    Complete Trip
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Panel */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm text-purple-300 uppercase tracking-widest">
                            <Wallet className="w-4 h-4" />
                            Total Earnings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-white mb-2 tracking-tight">0.84 <span className="text-2xl text-gray-500">ETH</span></div>
                        <p className="text-sm text-gray-400">≈ $2,340.50 this week</p>
                    </CardContent>
                </Card>

                <Card className="h-full border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div>
                                        <p className="font-semibold text-white">Downtown Trip</p>
                                        <p className="text-xs text-gray-400">10:30 AM</p>
                                    </div>
                                    <span className="font-mono text-purple-400 font-bold">+0.05 ETH</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}