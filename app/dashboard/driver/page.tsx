'use client'

import { useState, useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { DriverView } from "@/components/dashboard/driver-view"
import { useUserRole } from "@/hooks/use-user-role"

export default function DriverDashboardPage() {
    const { user, logout, ready, authenticated } = usePrivy()
    const { role, loading } = useUserRole()
    const router = useRouter()
    
    // Driver-specific state
    const [rideStatus, setRideStatus] = useState<'Idle' | 'Accepted' | 'Started' | 'Completed'>('Idle')

    useEffect(() => {
        if (!ready) return
        if (!authenticated) {
            router.push('/')
            return
        }
        // Security: If user is loaded but is NOT a driver, kick them out
        if (!loading && role !== 'driver') {
            router.push('/dashboard') 
        }
    }, [ready, authenticated, role, loading, router])

    if (!ready || loading || role !== 'driver') {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Driver Panel...</div>
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold tracking-tight">
                        block<span className="text-zinc-400">rides</span>
                        <span className="ml-4 text-sm font-normal text-zinc-500 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                            Driver Panel
                        </span>
                    </h1>
                    <div className="flex items-center gap-4">
                         <span className="text-sm text-zinc-500 font-mono hidden md:inline-block">
                            {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                        </span>
                        <button 
                            onClick={async () => {
                                await logout()
                                localStorage.removeItem('blockrides_role')
                                router.push('/')
                            }} 
                            className="text-sm bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-colors border border-white/5"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>

                {/* Driver Content */}
                <DriverView 
                    rideStatus={rideStatus}
                    onAcceptRide={() => {
                        // TODO: Call Smart Contract: acceptRide()
                        setRideStatus('Accepted')
                    }}
                    onStartRide={() => setRideStatus('Started')}
                    onCompleteRide={() => {
                        // TODO: Call Smart Contract: completeRide()
                        setRideStatus('Completed')
                    }}
                />
            </div>
        </div>
    )
}