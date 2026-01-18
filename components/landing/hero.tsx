'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface HeroProps {
    onConnect: () => void
}

export function Hero({ onConnect }: HeroProps) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-20">

            {/* Ambient Monochrome Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Grid Pattern (Optional Texture) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

                {/* Headline */}
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-2xl">
                    Ride Sharing but <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                        Decentralized
                    </span>
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    Experience truly decentralized ride sharing powered by blockchain. 
                    No middleman. Direct connections.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                    <Button
                        onClick={onConnect}
                        size="lg"
                        className="rounded-full text-lg font-bold"
                    >
                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}