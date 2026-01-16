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
        <Card className="glass-card border-t-purple-500 border-t-2 w-full overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-purple-900/20 blur-[60px] pointer-events-none" />

            <CardHeader className="relative">
                <CardTitle className="text-2xl flex items-center justify-between">
                    Ride Status
                    <span className={`text-sm px-4 py-1.5 rounded-full font-bold tracking-wide ${
                        status === 'Started' 
                        ? 'bg-purple-500/20 text-purple-300 animate-pulse border border-purple-500/30' 
                        : 'bg-white/5 text-gray-400 border border-white/10'
                    }`}>
                        {status.toUpperCase()}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 relative">
                <div className="flex justify-between text-sm font-medium">
                    <div className="flex flex-col gap-1">
                        <span className="text-purple-400 text-xs uppercase">From</span>
                        <div className="flex items-center gap-2 text-white">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            <span>{pickupFrom || "Current Location"}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                        <span className="text-gray-500 text-xs uppercase">To</span>
                        <div className="flex items-center gap-2 text-white justify-end">
                            <span>{destination || "Destination"}</span>
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Progress Animation */}
                <div className="relative h-16 flex items-center w-full">
                    {/* Road Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 rounded-full overflow-hidden">
                        <div className={`h-full bg-purple-500/50 ${status === 'Started' ? 'w-full animate-pulse' : 'w-0'}`} />
                    </div>

                    {/* Animated Vehicle */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ${
                            status === 'Started' ? 'animate-drive' : 'left-0'
                        }`}
                    >
                        <div className="bg-black p-3 rounded-full border border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.6)] relative">
                            {/* Headlights effect */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-6 bg-purple-400/20 blur-md rounded-r-full" />
                            
                            {vehicleType === "Car" 
                                ? <Car className="w-6 h-6 text-purple-400 fill-purple-400/20" /> 
                                : <Bike className="w-6 h-6 text-purple-400 fill-purple-400/20" />
                            }
                        </div>
                    </div>

                    {/* Start/End Markers */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full ring-4 ring-black z-0" />
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-white rounded-full ring-4 ring-black z-0" />
                </div>
            </CardContent>
        </Card>
    )
}