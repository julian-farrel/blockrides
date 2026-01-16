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
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white">Block Rides</span>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Button
                        onClick={onConnect}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium px-6 transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)] border-none"
                    >
                        Connect Wallet
                    </Button>
                </div>
            </div>
        </header>
    )
}