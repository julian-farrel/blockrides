'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface HeroProps {
    onConnect: () => void
}

export function Hero({ onConnect }: HeroProps) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-20">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

                {/* Headline */}
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    The Future of <br />
                    <span className="text-white">Ride Sharing</span>
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    Experience truly decentralized ride sharing powered by blockchain. 
                    No middleman. Direct connections. Fair pricing. Welcome to Block Rides.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                    <Button
                        onClick={onConnect}
                        className="h-12 px-8 rounded-full bg-[#A855F7] hover:bg-[#9333EA] text-white text-lg font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all border-none"
                    >
                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}