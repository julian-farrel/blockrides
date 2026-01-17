// app/page.tsx
'use client'

import { useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { useUserRole } from "@/hooks/use-user-role"

export default function Home() {
    const { login, authenticated, ready } = usePrivy()
    const { role, loading: roleLoading } = useUserRole()
    const router = useRouter()

    useEffect(() => {
        if (!ready || roleLoading) return

        if (authenticated) {
            if (role) {
                // If they have a role, go to dashboard
                router.push('/dashboard')
            } else {
                // If logged in but no role, go to onboarding
                router.push('/role-selection')
            }
        }
    }, [authenticated, ready, role, roleLoading, router])

    if (!ready || roleLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 animate-pulse">Loading Block Rides...</div>
    }

    // Only show landing if not authenticated
    return <LandingPage onConnect={login} />
}