'use client'

import { Button } from "@/components/ui/button"
import { Globe, Menu, X, LayoutGrid } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
    onConnect: () => void
}

export function Header({ onConnect }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
            <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">

                {/* Left Section: Logo & Nav */}
                <div className="flex items-center gap-8">
                    <div className="text-xl font-normal tracking-tight">Uber</div>

                    <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium">
                        <button className="flex items-center gap-1 hover:text-gray-300">
                            Company
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <a href="#" className="hover:text-gray-300">Safety</a>
                        <a href="#" className="hover:text-gray-300">Help</a>
                        <a href="#" className="hover:text-gray-300">COVID-19 resourses</a>
                    </nav>
                </div>

                {/* Right Section: Actions */}
                <div className="hidden md:flex items-center gap-4 text-[14px] font-medium">
                    <button className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">
                        <Globe className="w-4 h-4" />
                        <span>EN</span>
                    </button>

                    <button className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">
                        <LayoutGrid className="w-4 h-4" />
                        <span>Product</span>
                    </button>

                    <button className="hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">
                        Log In
                    </button>

                    <Button
                        onClick={onConnect}
                        className="bg-white text-black hover:bg-gray-200 rounded-3xl font-medium px-4 py-2"
                    >
                        Sign up
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-black p-4 space-y-4 animate-in slide-in-from-top-5">
                    <nav className="flex flex-col space-y-4 text-white font-medium">
                        <a href="#">Company</a>
                        <a href="#">Safety</a>
                        <a href="#">Help</a>
                        <a href="#">COVID-19 resourses</a>
                        <a href="#">Products</a>
                        <a href="#">Log In</a>
                        <Button onClick={onConnect} className="w-full bg-white text-black rounded-full">
                            Sign up
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

function ChevronDown(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}
