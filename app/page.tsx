'use client'

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { RoleSelection } from "@/components/role-selection"
import { RegistrationForms } from "@/components/registration-forms"
import { PassengerView } from "@/components/dashboard/passenger-view"
import { DriverView } from "@/components/dashboard/driver-view"

type AppState = 'landing' | 'role-selection' | 'registration' | 'dashboard'
type UserRole = 'driver' | 'passenger' | null
type RideStatus = 'Idle' | 'Finding Pilot' | 'Accepted' | 'Started' | 'Completed'

export default function Home() {
    const [appState, setAppState] = useState<AppState>('landing')
    const [userRole, setUserRole] = useState<UserRole>(null)

    // Simulation State
    const [rideStatus, setRideStatus] = useState<RideStatus>('Idle')

    // Passenger Simulation Logic
    useEffect(() => {
        if (userRole === 'passenger' && rideStatus === 'Finding Pilot') {
            const timer = setTimeout(() => {
                setRideStatus('Accepted')
            }, 3000)
            return () => clearTimeout(timer)
        }

        if (userRole === 'passenger' && rideStatus === 'Accepted') {
            const timer = setTimeout(() => {
                setRideStatus('Started')
            }, 3000)
            return () => clearTimeout(timer)
        }

        if (userRole === 'passenger' && rideStatus === 'Started') {
            const timer = setTimeout(() => {
                setRideStatus('Completed')
            }, 8000) // 8s drive
            return () => clearTimeout(timer)
        }

        if (userRole === 'passenger' && rideStatus === 'Completed') {
            const timer = setTimeout(() => {
                setRideStatus('Idle')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [rideStatus, userRole])


    const handleConnectWallet = () => {
        setAppState('role-selection')
    }

    const handleRoleSelect = (role: UserRole) => {
        setUserRole(role)
        setAppState('registration')
    }

    const handleRegistration = (data: any) => {
        console.log("Registered:", data)
        setAppState('dashboard')
    }

    const handlePassengerRequest = (pickup: string, dest: string, price: string) => {
        setRideStatus('Finding Pilot')
    }

    const handleDriverAccept = () => {
        setRideStatus('Accepted')
    }

    const handleDriverStart = () => {
        setRideStatus('Started')
    }

    const handleDriverComplete = () => {
        setRideStatus('Completed')
        setTimeout(() => setRideStatus('Idle'), 3000)
    }

    // --- Render Layout ---
    // If Landing Page, use full width/height without padding
    if (appState === 'landing') {
        return (
            <main className="min-h-screen bg-[#121212]">
                <LandingPage onConnect={handleConnectWallet} />
            </main>
        )
    }

    // Application Layout (Inner App)
    return (
        <main className="min-h-screen bg-[#121212] flex flex-col items-center p-4 md:p-8 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#10B981]/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1F2937]/30 blur-[100px] rounded-full" />
            </div>

            {/* Header / Nav (Minimal) */}
            <nav className="w-full max-w-7xl flex justify-between items-center mb-8 z-10">
                <div className="text-xl font-bold tracking-tighter text-white">Block Rides</div>
                <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-sm font-mono text-[#10B981]">0x71C...9B</span>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="w-full max-w-7xl relative z-10">

                {appState === 'role-selection' && (
                    <RoleSelection onSelectRole={handleRoleSelect} />
                )}

                {appState === 'registration' && userRole && (
                    <RegistrationForms role={userRole} onRegister={handleRegistration} />
                )}

                {appState === 'dashboard' && userRole === 'passenger' && (
                    <PassengerView
                        rideStatus={rideStatus as any}
                        onRequestRide={handlePassengerRequest}
                    />
                )}

                {appState === 'dashboard' && userRole === 'driver' && (
                    <DriverView
                        rideStatus={rideStatus as any}
                        onAcceptRide={handleDriverAccept}
                        onStartRide={handleDriverStart}
                        onCompleteRide={handleDriverComplete}
                    />
                )}

            </div>
        </main>
    )
}
