'use client'

import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { RoleSelection } from "@/components/role-selection"
import { useEffect } from "react"

export default function RoleSelectionPage() {
    const router = useRouter()
    const { authenticated, ready } = usePrivy()

    useEffect(() => {
        if (ready && !authenticated) {
            router.push('/')
        }
    }, [ready, authenticated, router])

    if (!ready) return null

    return (
        <div className="min-h-screen bg-black p-4 relative">       
            <RoleSelection onSelectRole={(selectedRole) => {
                router.push(`/register?role=${selectedRole}`)
            }} />
        </div>
    )
}