'use client'

import { useState, useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { LandingPage } from "@/components/landing-page"
import { RoleSelection } from "@/components/role-selection"
import { RegistrationForms } from "@/components/registration-forms"
import { DriverView } from "@/components/dashboard/driver-view"
import { PassengerView } from "@/components/dashboard/passenger-view"

export default function Home() {
    // 1. Privy Hook for Authentication
    const { login, authenticated, ready, user, logout } = usePrivy()

    // 2. App State
    const [view, setView] = useState<'landing' | 'role_selection' | 'registration' | 'dashboard'>('landing')
    const [role, setRole] = useState<'driver' | 'passenger' | null>(null)
    const [rideStatus, setRideStatus] = useState<'Idle' | 'Finding Pilot' | 'Accepted' | 'Started' | 'Completed'>('Idle')

    // 3. Effect: Handle View Switching based on Auth
    useEffect(() => {
        if (!ready) return;

        if (authenticated) {
            // If logged in but hasn't picked a flow, go to Role Selection
            // Note: In a real app, you'd check the DB here to see if they are already registered
            if (view === 'landing') {
                setView('role_selection')
            }
        } else {
            // If not logged in, force Landing Page
            setView('landing')
            setRole(null)
        }
    }, [authenticated, ready, view])

    // 4. Loading State
    if (!ready) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-purple-500">Loading Block Rides...</div>
    }

    // 5. Render Logic
    
    // VIEW: Landing Page (Unauthenticated)
    if (!authenticated || view === 'landing') {
        return <LandingPage onConnect={login} />
    }

    // VIEW: Role Selection
    if (view === 'role_selection') {
        return (
            <div className="min-h-screen bg-black p-4">
                 {/* Temporary Logout for testing */}
                <button onClick={logout} className="absolute top-4 right-4 text-xs text-gray-500 hover:text-white">Logout</button>
                <RoleSelection onSelectRole={(selectedRole) => {
                    setRole(selectedRole)
                    setView('registration')
                }} />
            </div>
        )
    }

    // VIEW: Registration
    if (view === 'registration' && role) {
        return (
            <div className="min-h-screen bg-black p-4">
                <RegistrationForms 
                    role={role} 
                    onRegister={(data) => {
                        console.log("Registered:", data)
                        // Here you would call your Smart Contract register function
                        setView('dashboard')
                    }} 
                />
            </div>
        )
    }

    // VIEW: Dashboard (Driver or Passenger)
    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Dashboard Header */}
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <h1 className="text-2xl font-bold tracking-tight">
                        block<span className="text-purple-500">rides</span>
                        <span className="ml-4 text-sm font-normal text-gray-500 px-3 py-1 bg-white/5 rounded-full">
                            {role === 'driver' ? 'Driver Panel' : 'Passenger Hub'}
                        </span>
                    </h1>
                    <div className="flex items-center gap-4">
                         <span className="text-sm text-gray-400 font-mono hidden md:inline-block">
                            {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                        </span>
                        <button onClick={logout} className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors">
                            Disconnect
                        </button>
                    </div>
                </div>

                {role === 'passenger' ? (
                    <PassengerView 
                        rideStatus={rideStatus as any}
                        onRequestRide={(pickup, dest, price) => {
                            console.log("Request:", pickup, dest, price)
                            setRideStatus('Finding Pilot') // Mock update
                        }}
                    />
                ) : (
                    <DriverView 
                        rideStatus={rideStatus === 'Finding Pilot' ? 'Idle' : rideStatus as any} // Mock mapping
                        onAcceptRide={() => setRideStatus('Accepted')}
                        onStartRide={() => setRideStatus('Started')}
                        onCompleteRide={() => setRideStatus('Completed')}
                    />
                )}
            </div>
        </div>
    )
}