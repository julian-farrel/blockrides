'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Car, Utensils, Navigation } from "lucide-react"

interface HeroProps {
    onConnect: () => void
}

export function Hero({ onConnect }: HeroProps) {
    const [activeTab, setActiveTab] = useState<'drive' | 'eat' | 'ride'>('drive')

    return (
        <div className="relative min-h-[700px] flex items-center justify-center lg:justify-start lg:pl-28 bg-black overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2574&auto=format&fit=crop"
                    alt="Car Interior"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Floating Card */}
            <div className="relative z-10 w-full max-w-[570px] bg-white text-black rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700 mx-4 mt-16">

                {/* Tabs Header */}
                <div className="flex bg-white border-b border-gray-100">
                    <TabButton
                        isActive={activeTab === 'drive'}
                        onClick={() => setActiveTab('drive')}
                        icon={<div className="mb-2"><SignalIcon /></div>}
                        label="Drive or driver"
                    />
                    <TabButton
                        isActive={activeTab === 'eat'}
                        onClick={() => setActiveTab('eat')}
                        icon={<Utensils className="w-6 h-6 mb-2" />}
                        label="Eat"
                    />
                    <TabButton
                        isActive={activeTab === 'ride'}
                        onClick={() => setActiveTab('ride')}
                        icon={<Car className="w-6 h-6 mb-2" />}
                        label="Ride"
                    />
                </div>

                {/* Content Area */}
                <div className="p-12 space-y-8 bg-white min-h-[360px]">
                    <h1 className="text-5xl font-bold tracking-tight leading-[1.1]">
                        {activeTab === 'drive' && "Get in the driver's seat and get paid"}
                        {activeTab === 'eat' && "Discover delicious eats"}
                        {activeTab === 'ride' && "Request a ride now"}
                    </h1>

                    <p className="text-[16px] leading-6 font-normal text-black">
                        {activeTab === 'drive' && "Drive on the platform with the largest network of active riders."}
                        {activeTab === 'eat' && "Order delivery from restaurants you love."}
                        {activeTab === 'ride' && "Request a ride, hop in, and go."}
                    </p>

                    {activeTab === 'ride' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute left-4 top-4 w-2 h-2 rounded-full bg-black" />
                                <Input placeholder="Enter pickup location" className="pl-10 bg-[#F6F6F6] border-none text-black placeholder:text-gray-500 h-12 rounded-lg" />
                            </div>
                            <div className="relative">
                                <div className="absolute left-4 top-4 w-2 h-2 rounded-none bg-black" />
                                <Input placeholder="Enter destination" className="pl-10 bg-[#F6F6F6] border-none text-black placeholder:text-gray-500 h-12 rounded-lg" />
                            </div>
                        </div>
                    )}

                    <div className="pt-2 flex flex-col items-start gap-6">
                        <Button
                            onClick={onConnect}
                            className="bg-black text-white hover:bg-gray-800 rounded-lg font-medium text-base px-8 py-3 h-auto"
                        >
                            {activeTab === 'drive' ? "Sign Up to Drive" : activeTab === 'eat' ? "Order Now" : "Request Now"}
                        </Button>

                        {activeTab === 'drive' && (
                            <div className="border-b border-black w-fit cursor-pointer hover:text-gray-600 hover:border-gray-600 transition-colors text-sm pb-0.5">
                                Learn more about driving and delivering
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

function TabButton({ isActive, onClick, icon, label }: { isActive: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex flex-col items-center justify-center py-6 gap-0 transition-all relative ${isActive ? '' : 'text-gray-500 hover:bg-gray-50'}`}
        >
            <div className={`transition-colors ${isActive ? 'text-black' : 'text-gray-500'}`}>
                {icon}
            </div>
            <span className={`font-medium text-sm ${isActive ? 'text-black' : 'text-gray-500'}`}>{label}</span>

            {/* Active Indicator Line */}
            {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black" />
            )}
        </button>
    )
}

function SignalIcon() {
    return (
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 17.5v-3.5h-2v3.5h2Zm-5.25 0v-8h-2v8h2Zm-5.25 0v-5h-2v5h2Z"></path>
        </svg>
    )
}
