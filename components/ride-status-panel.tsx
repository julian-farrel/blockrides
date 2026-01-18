'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Bike, MapPin } from "lucide-react"

interface RideStatusPanelProps {
    status: "Finding Pilot" | "Accepted" | "Started" | "Completed"
    vehicleType?: "Car" | "Motorcycle"
    pickupFrom?: string
    destination?: string
}

export function RideStatusPanel({ status, vehicleType = "Car", pickupFrom, destination }: RideStatusPanelProps) {
    return (
        <Card className="glass-card border-t-white border-t-2 w-full overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-white/5 blur-[80px] pointer-events-none" />

            <CardHeader className="relative">
                <CardTitle className="text-2xl flex items-center justify-between text-white">
                    Ride Status
                    <span className={`text-sm px-4 py-1.5 rounded-full font-bold tracking-wide border ${
                        status === 'Started' 
                        ? 'bg-white text-black animate-pulse border-white shadow-[0_0_15px_white]' 
                        : 'bg-zinc-900/50 text-zinc-400 border-white/10'
                    }`}>
                        {status.toUpperCase()}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 relative">
                <div className="flex justify-between text-sm font-medium">
                    <div className="flex flex-col gap-1">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest">From</span>
                        <div className="flex items-center gap-2 text-white">
                            <MapPin className="w-4 h-4 text-white drop-shadow-[0_0_5px_white]" />
                            <span>{pickupFrom || "Current Location"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                        <span className="text-zinc-500 text-xs uppercase tracking-widest">To</span>
                        <div className="flex items-center gap-2 text-white justify-end">
                            <span>{destination || "Destination"}</span>
                            <MapPin className="w-4 h-4 text-zinc-400" />
                        </div>
                    </div>
                </div>

                {/* Progress Animation */}
                <div className="relative h-20 flex items-center w-full">
                    {/* Road Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-800 -translate-y-1/2 rounded-full overflow-hidden">
                        <div className={`h-full bg-white shadow-[0_0_10px_white] ${status === 'Started' ? 'w-full animate-pulse' : 'w-0'}`} />
                    </div>

                    {/* Animated Vehicle */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ${
                            status === 'Started' ? 'animate-drive' : 'left-0'
                        }`}
                    >
                        <div className="bg-black p-3 rounded-full border border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] relative">
                            {/* Headlights effect */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-8 bg-gradient-to-r from-white/20 to-transparent blur-md rounded-r-full" />
                            
                            {vehicleType === "Car" 
                                ? <Car className="w-6 h-6 text-white" /> 
                                : <Bike className="w-6 h-6 text-white" />
                            }
                        </div>
                    </div>

                    {/* Start/End Markers */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-white rounded-full ring-4 ring-black shadow-[0_0_10px_white] z-0" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-zinc-800 rounded-full ring-4 ring-black z-0" />
                </div>
            </CardContent>
        </Card>
    )
}