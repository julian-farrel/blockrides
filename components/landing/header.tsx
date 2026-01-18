'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header({ onConnect }: { onConnect: () => void }) {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* LOGO AREA */}
                <Link href="/" className="flex items-center gap-3 group">
                    {/* Logo Container with Rounded Corners & Glow */}
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/10 bg-white/5 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300">
                        <Image 
                            src="/logo.png" 
                            alt="BlockRides Logo" 
                            fill 
                            className="object-cover p-0.5" // object-cover fills the rounded shape
                            priority
                        />
                    </div>
                    
                    {/* Brand Name */}
                    <span className="text-xl font-bold tracking-tight text-white hidden md:block group-hover:text-zinc-200 transition-colors">
                        block<span className="text-zinc-400">rides</span>
                    </span>
                </Link>

                {/* ACTION BUTTON */}
                <div className="flex items-center gap-4">
                    <Button 
                        onClick={onConnect}
                        className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-full px-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Connect Wallet
                    </Button>
                </div>
            </div>
        </header>
    )
}