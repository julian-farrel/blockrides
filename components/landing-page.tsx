'use client'

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Footer } from "@/components/landing/footer"

interface LandingPageProps {
    onConnect: () => void
}

export function LandingPage({ onConnect }: LandingPageProps) {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Header onConnect={onConnect} />
            
            <main className="flex-grow">
                <Hero onConnect={onConnect} />
            </main>

            <div className="border-t border-white/5">
                <Footer />
            </div>
        </div>
    )
}