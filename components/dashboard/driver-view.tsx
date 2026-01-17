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
                    <Card className="border-white/10 bg-black/50">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-white">
                                <span className="text-2xl">Incoming Requests</span>
                                <span className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold animate-pulse shadow-[0_0_15px_white]">
                                    3 Live
                                </span>
                            </CardTitle>
                            <CardDescription className="text-zinc-400">Select a ride to start earning.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Mock Incoming Order */}
                            <div className="p-5 rounded-xl border border-dashed border-zinc-800 bg-black/40 hover:border-white hover:bg-white/5 transition-all group duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-white/5 rounded-lg h-fit border border-white/5 group-hover:border-white/20">
                                            <Navigation className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">0.05 ETH</h4>
                                            <p className="text-sm text-zinc-500">~ $142.50 • 5.2 km</p>
                                        </div>
                                    </div>
                                    <Button onClick={onAcceptRide} className="px-6 bg-white text-black hover:bg-zinc-200 font-medium">Accept</Button>
                                </div>
                                <div className="space-y-3 text-sm pl-2 border-l border-zinc-800 ml-6">
                                    <div className="flex items-center gap-3 text-zinc-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                                        <span>Central Station, Block A</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-500">
                                        <div className="w-1.5 h-1.5 rounded-sm bg-zinc-600" />
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
                                <Button onClick={onStartRide} className="col-span-2 h-16 text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] bg-white text-black hover:bg-zinc-200">
                                    <Navigation className="w-6 h-6 mr-3" />
                                    Start Trip
                                </Button>
                            )}
                            {rideStatus === 'Started' && (
                                <Button onClick={onCompleteRide} variant="outline" className="col-span-2 h-16 text-xl border-white/20 hover:bg-white/10 text-white">
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
                <Card className="bg-gradient-to-br from-zinc-900 to-black border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm text-zinc-400 uppercase tracking-widest">
                            <Wallet className="w-4 h-4 text-white" />
                            Total Earnings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-md">0.84 <span className="text-2xl text-zinc-600">ETH</span></div>
                        <p className="text-sm text-zinc-500">≈ $2,340.50 this week</p>
                    </CardContent>
                </Card>

                <Card className="h-full border-white/5 bg-transparent">
                    <CardHeader>
                        <CardTitle className="text-lg text-white">Recent Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                    <div>
                                        <p className="font-semibold text-white">Downtown Trip</p>
                                        <p className="text-xs text-zinc-500">10:30 AM</p>
                                    </div>
                                    <span className="font-mono text-white font-bold tracking-tight">+0.05 ETH</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}