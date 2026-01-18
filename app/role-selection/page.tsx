'use client'

import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { RoleSelection } from "@/components/role-selection"
import { useEffect } from "react"

export default function RoleSelectionPage() {
    const router = useRouter()
    const { authenticated, ready } = usePrivy()

    // Protect the route
    useEffect(() => {
        if (ready && !authenticated) {
            router.push('/')
        }
    }, [ready, authenticated, router])

    if (!ready) return null

    return (
        <div className="min-h-screen bg-black p-4 relative">
             {/* FIX: Removed the manual "Disconnect" button here.
                The Global Header (from layout.tsx) will handle the disconnect/logout button.
             */}
            
            <RoleSelection onSelectRole={(selectedRole) => {
                // Navigate to register page with the role as a query parameter
                router.push(`/register?role=${selectedRole}`)
            }} />
        </div>
    )
}