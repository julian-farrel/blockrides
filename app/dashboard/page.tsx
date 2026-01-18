'use client'

import { useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/hooks/use-user-role"

export default function DashboardRedirect() {
    const { ready, authenticated } = usePrivy()
    const { role, loading } = useUserRole()
    const router = useRouter()

    useEffect(() => {
        if (!ready) return

        if (!authenticated) {
            router.push('/')
            return
        }

        if (!loading) {
            if (role === 'driver') {
                router.push('/dashboard/driver')
            } else if (role === 'passenger') {
                router.push('/dashboard/passenger')
            } else {
                router.push('/onboarding/role-selection')
            }
        }
    }, [ready, authenticated, role, loading, router])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 animate-pulse">
            Redirecting to your dashboard...
        </div>
    )
}