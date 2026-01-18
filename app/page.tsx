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
                router.push('/dashboard')
            } else {
                router.push('/role-selection')
            }
        }
    }, [authenticated, ready, role, roleLoading, router])

    if (!ready || roleLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 animate-pulse">Loading Block Rides...</div>
    }

    return <LandingPage onConnect={login} />
}