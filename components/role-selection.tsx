'use client'

import { Card } from "@/components/ui/card"
import { Car, User } from "lucide-react"

interface RoleSelectionProps {
    onSelectRole: (role: 'driver' | 'passenger') => void
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-in zoom-in-95 duration-700">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Welcome to Block Rides
                </h2>
                <p className="text-gray-400">Choose your role to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                {/* Driver Option */}
                <button
                    onClick={() => onSelectRole('driver')}
                    className="group relative w-full"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-300 blur-sm group-hover:blur"></div>
                    <Card className="relative h-72 flex flex-col items-center justify-center space-y-6 bg-black border border-white/10 group-hover:bg-zinc-900/80 transition-all duration-300">
                        <div className="p-5 rounded-full bg-purple-900/30 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Car className="w-14 h-14" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Sign up as Driver</h3>
                            <p className="text-gray-400 px-8">Earn crypto securely for every kilometer you drive.</p>
                        </div>
                    </Card>
                </button>

                {/* Passenger Option */}
                <button
                    onClick={() => onSelectRole('passenger')}
                    className="group relative w-full"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-300 blur-sm group-hover:blur"></div>
                    <Card className="relative h-72 flex flex-col items-center justify-center space-y-6 bg-black border border-white/10 group-hover:bg-zinc-900/80 transition-all duration-300">
                        <div className="p-5 rounded-full bg-blue-900/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <User className="w-14 h-14" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Sign up as Passenger</h3>
                            <p className="text-gray-400 px-8">Book rides instantly with zero middleman fees.</p>
                        </div>
                    </Card>
                </button>
            </div>
        </div>
    )
}