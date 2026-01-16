'use client'

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Footer } from "@/components/landing/footer"

interface LandingPageProps {
    onConnect: () => void
}

export function LandingPage({ onConnect }: LandingPageProps) {
    return (
        <div className="min-h-screen flex flex-col bg-[#121212]">
            <Header onConnect={onConnect} />

            <main className="flex-grow pt-16">
                <Hero onConnect={onConnect} />

                {/* Placeholder for future sections if needed (Safety, About, etc.) */}
                <section className="bg-white text-black py-20 px-6">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Block Rides for Business</h2>
                        <p className="max-w-2xl text-lg text-gray-600 mb-8">Transform the way your company moves and feeds its people. decentralized. Transparent. Efficient.</p>
                        <button className="bg-black text-white px-6 py-3 rounded-lg font-bold">See How</button>
                    </div>
                </section>

                <section className="bg-gray-100 text-black py-20 px-6">
                    <div className="max-w-[1440px] mx-auto">
                        <h2 className="text-3xl font-bold mb-12">Focus on safety, wherever you go</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                                    alt="Safety"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <h3 className="text-xl font-bold">Our commitment to your safety</h3>
                                <p className="text-gray-600">With every safety feature and every standard in our Community Guidelines, we're committed to helping to create a safe environment for our users.</p>
                            </div>
                            <div className="space-y-4">
                                <img
                                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
                                    alt="Cities"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <h3 className="text-xl font-bold">Setting 10,000+ cities in motion</h3>
                                <p className="text-gray-600">The app is available in thousands of cities worldwide, so you can request a ride even when you're far from home.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
