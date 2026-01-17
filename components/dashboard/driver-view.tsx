'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RideStatusPanel } from "@/components/ride-status-panel"
import { DollarSign, MapPin, Navigation, Wallet, TrendingUp, Clock, ShieldCheck } from "lucide-react"

interface DriverViewProps {
    rideStatus: "Idle" | "Accepted" | "Started" | "Completed"
    onAcceptRide: () => void
    onStartRide: () => void
    onCompleteRide: () => void
}

export function DriverView({ rideStatus, onAcceptRide, onStartRide, onCompleteRide }: DriverViewProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-700">

            {/* LEFT COLUMN: Main Operation Area */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* Status Indicator Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {rideStatus === 'Idle' ? 'Available Jobs' : 'Current Mission'}
                        </h2>
                        <p className="text-zinc-400 text-sm">
                            {rideStatus === 'Idle' ? 'Pick a request to start earning.' : 'Manage your active trip.'}
                        </p>
                    </div>
                    {rideStatus === 'Idle' && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-emerald-400">Live Updates</span>
                        </div>
                    )}
                </div>

                {/* Main Content Switcher */}
                {rideStatus === 'Idle' ? (
                    <div className="space-y-4">
                        {/* Mock Job Card 1 */}
                        <Card className="group bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all cursor-pointer backdrop-blur-sm overflow-hidden relative">
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
                                                    <h3 className="text-2xl font-bold text-white tracking-tight">0.05 ETH</h3>
                                                    <span className="text-xs text-zinc-500 font-mono">($142.50)</span>
                                                </div>
                                                <p className="text-sm text-zinc-400">5.2 km • ~12 mins</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 pl-2 border-l border-zinc-800 ml-5">
                                            <div className="flex items-center gap-3 text-zinc-300 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                                                <span>Central Station, Block A</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-zinc-500 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-sm bg-zinc-600" />
                                                <span>Tech Hub, Zone 4</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={onAcceptRide} 
                                        className="h-12 px-6 bg-white text-black hover:bg-zinc-200 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-all"
                                    >
                                        Accept Ride
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mock Job Card 2 (Opacity lower to show hierarchy) */}
                        <Card className="bg-zinc-900/30 border-white/5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                            <CardContent className="p-6 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white/5 rounded-lg">
                                        <Navigation className="w-5 h-5 text-zinc-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-300">0.02 ETH</h3>
                                        <p className="text-xs text-zinc-500">2.1 km • Near City Center</p>
                                    </div>
                                </div>
                                <Button variant="ghost" className="text-zinc-400 border border-white/5 hover:bg-white/5 hover:text-white">
                                    View
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Status Panel Component */}
                        <RideStatusPanel status={rideStatus} />

                        {/* Action Buttons based on state */}
                        <div className="grid grid-cols-2 gap-4">
                            {rideStatus === 'Accepted' && (
                                <Button 
                                    onClick={onStartRide} 
                                    className="col-span-2 h-20 text-xl font-bold bg-white text-black hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.01]"
                                >
                                    <Navigation className="w-6 h-6 mr-3" />
                                    Start Trip
                                </Button>
                            )}
                            {rideStatus === 'Started' && (
                                <Button 
                                    onClick={onCompleteRide} 
                                    variant="outline" 
                                    className="col-span-2 h-20 text-xl border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all"
                                >
                                    <MapPin className="w-6 h-6 mr-3" />
                                    Complete Trip
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: Stats & Earnings */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Total Earnings Card */}
                <Card className="bg-gradient-to-br from-zinc-900 to-black border-white/10 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] pointer-events-none"></div>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                            <Wallet className="w-3 h-3 text-white" />
                            Weekly Earnings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-white mb-1 tracking-tight">0.84 <span className="text-xl text-zinc-500">ETH</span></div>
                        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
                            <TrendingUp className="w-3 h-3" />
                            +12.5% vs last week
                        </div>
                    </CardContent>
                </Card>

                {/* Rating / Trust Score */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                            <ShieldCheck className="w-3 h-3" /> Trust Score
                        </div>
                        <div className="text-xl font-bold text-white">98/100</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                            <Clock className="w-3 h-3" /> Hours
                        </div>
                        <div className="text-xl font-bold text-white">24.5h</div>
                    </div>
                </div>

                {/* Recent Completed Jobs */}
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 h-fit backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-white mb-4">Today's History</h3>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                                <div>
                                    <p className="font-medium text-zinc-200 text-sm">Downtown Dropoff</p>
                                    <p className="text-xs text-zinc-500">10:30 AM • Completed</p>
                                </div>
                                <span className="font-mono text-emerald-400 text-sm font-bold">+0.05</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}