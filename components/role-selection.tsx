'use client'

import { Card } from "@/components/ui/card"
import { Car, User } from "lucide-react"

interface RoleSelectionProps {
    onSelectRole: (role: 'driver' | 'passenger') => void
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-bold text-white text-center">How will you use Block Rides today?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
                {/* Driver Option */}
                <button
                    onClick={() => onSelectRole('driver')}
                    className="group relative"
                >
                    <Card className="h-64 flex flex-col items-center justify-center space-y-4 hover:border-[#10B981] transition-all duration-300 group-hover:bg-[#10B981]/5 cursor-pointer">
                        <div className="p-4 rounded-full bg-gray-800 group-hover:bg-[#10B981] transition-colors duration-300">
                            <Car className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Sign up as Driver</h3>
                        <p className="text-gray-400">Earn crypto for every kilometer.</p>
                    </Card>
                </button>

                {/* Passenger Option */}
                <button
                    onClick={() => onSelectRole('passenger')}
                    className="group relative"
                >
                    <Card className="h-64 flex flex-col items-center justify-center space-y-4 hover:border-[#10B981] transition-all duration-300 group-hover:bg-[#10B981]/5 cursor-pointer">
                        <div className="p-4 rounded-full bg-gray-800 group-hover:bg-[#10B981] transition-colors duration-300">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Sign up as Passenger</h3>
                        <p className="text-gray-400">Book rides instantly and securely.</p>
                    </Card>
                </button>
            </div>
        </div>
    )
}
