'use client'

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
    onConnect: () => void
}

export function Header({ onConnect }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <div className="flex items-center gap-3 group cursor-pointer">
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">Block Rides</span>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        onClick={onConnect}
                        className="rounded-full px-6"
                    >
                        Connect Wallet
                    </Button>
                </div>
            </div>
        </header>
    )
}