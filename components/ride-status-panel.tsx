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
        <Card className="glass-card border-t-[#10B981] border-t-2 w-full">
            <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                    Active Ride
                    <span className={`text-sm px-3 py-1 rounded-full ${status === 'Started' ? 'bg-[#10B981]/20 text-[#10B981] animate-pulse' : 'bg-gray-800 text-gray-400'
                        }`}>
                        {status}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#10B981]" />
                        <span>{pickupFrom || "Current Location"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white" />
                        <span>{destination || "Destination"}</span>
                    </div>
                </div>

                {/* Progress Line Animation */}
                <div className="relative h-12 flex items-center w-full overflow-hidden">
                    {/* Track */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 rounded-full" />

                    {/* Animated Vehicle */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ${status === 'Started' ? 'animate-drive' : 'left-0'
                            }`}
                    >
                        <div className="bg-[#121212] p-2 rounded-full border border-[#10B981] shadow-lg shadow-[#10B981]/20">
                            {vehicleType === "Car" ? <Car className="w-6 h-6 text-[#10B981]" /> : <Bike className="w-6 h-6 text-[#10B981]" />}
                        </div>
                    </div>

                    {/* Start Point */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-[#10B981] rounded-full border-4 border-[#121212] z-10" />
                    {/* End Point */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-[#121212] z-10" />
                </div>
            </CardContent>
        </Card>
    )
}
