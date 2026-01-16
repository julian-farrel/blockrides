'use client'

import { Card } from "@/components/ui/card"
import { Car, User, LogOut } from "lucide-react"
import { usePrivy } from "@privy-io/react-auth"

interface RoleSelectionProps {
    onSelectRole: (role: 'driver' | 'passenger') => void
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
    const { logout } = usePrivy()

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-in zoom-in-95 duration-700">
            
            {/* Logout Button */}
            <button 
                onClick={() => logout()}
                className="absolute -top-12 right-0 md:top-0 md:right-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-500 transition-all rounded-full hover:text-white hover:bg-white/10 group"
            >
                <LogOut className="w-4 h-4 group-hover:stroke-white" />
                <span>Disconnect</span>
            </button>

            <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    Welcome to Block Rides
                </h2>
                <p className="text-zinc-400">Choose your role to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                {/* Driver Option */}
                <button
                    onClick={() => onSelectRole('driver')}
                    className="group relative w-full"
                >
                    <div className="absolute -inset-px bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md"></div>
                    <Card className="relative h-72 flex flex-col items-center justify-center space-y-6 bg-black border border-white/10 group-hover:border-white/40 group-hover:bg-zinc-900/50 transition-all duration-300">
                        <div className="p-5 rounded-full bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            <Car className="w-14 h-14" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Sign up as Driver</h3>
                            <p className="text-zinc-400 px-8 group-hover:text-zinc-200 transition-colors">Earn crypto securely for every kilometer you drive.</p>
                        </div>
                    </Card>
                </button>

                {/* Passenger Option */}
                <button
                    onClick={() => onSelectRole('passenger')}
                    className="group relative w-full"
                >
                    <div className="absolute -inset-px bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md"></div>
                    <Card className="relative h-72 flex flex-col items-center justify-center space-y-6 bg-black border border-white/10 group-hover:border-white/40 group-hover:bg-zinc-900/50 transition-all duration-300">
                        <div className="p-5 rounded-full bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            <User className="w-14 h-14" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Sign up as Passenger</h3>
                            <p className="text-zinc-400 px-8 group-hover:text-zinc-200 transition-colors">Book rides instantly with zero middleman fees.</p>
                        </div>
                    </Card>
                </button>
            </div>
        </div>
    )
}