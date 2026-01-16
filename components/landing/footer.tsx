'use client'

import { Facebook, Twitter, Linkedin, Instagram, Globe } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
            <div className="max-w-[1440px] mx-auto px-6">

                <div className="text-2xl font-bold tracking-tighter mb-12">Block Rides</div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                </div>

                <div className="mt-8 text-xs text-gray-500 text-center md:text-left">
                    © 2026 Block Rides Decentralized Technologies Inc.
                </div>
            </div>
        </footer>   
    )
}
