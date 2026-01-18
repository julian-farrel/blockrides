'use client'

import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { RoleSelection } from "@/components/role-selection"
import { useEffect } from "react"

export default function RoleSelectionPage() {
    const router = useRouter()
    const { authenticated, ready, logout } = usePrivy()

    // Protect the route: Redirect to home if not authenticated
    useEffect(() => {
        if (ready && !authenticated) {
            router.push('/')
        }
    }, [ready, authenticated, router])

    if (!ready) return null

    return (
        <div className="min-h-screen bg-black p-4 relative">
             {/* ONLY 'Disconnect' button remains in the top right */}
             <button 
                onClick={async () => { 
                    await logout(); 
                    router.push('/'); 
                }} 
                className="absolute top-4 right-4 text-xs text-zinc-500 hover:text-white transition-colors border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 rounded-full"
            >
                Disconnect
            </button>
            
            <RoleSelection onSelectRole={(selectedRole) => {
                // Navigate to register page with the role as a query parameter
                router.push(`/register?role=${selectedRole}`)
            }} />
        </div>
    )
}