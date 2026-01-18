'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { supabase } from "@/lib/supabase"
import { RoleSelection } from "@/components/role-selection"
import { Loader2 } from "lucide-react"

export default function RoleSelectionPage() {
    const router = useRouter()
    const { authenticated, ready, user } = usePrivy()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        if (!ready) return

        if (!authenticated) {
            router.push('/')
            return
        }

        const checkRegistration = async () => {
            try {
                if (!user?.wallet?.address) return

                // Check if user exists in Supabase
                const { data } = await supabase
                    .from('users')
                    .select('role')
                    .eq('wallet_address', user.wallet.address)
                    .single()

                if (data) {
                    console.log("User already registered, redirecting...")
                    router.replace('/dashboard')
                } else {
                    setIsChecking(false)
                }
            } catch (error) {
                console.error("Error checking registration:", error)
                setIsChecking(false)
            }
        }

        checkRegistration()
    }, [ready, authenticated, user, router])

    if (!ready || isChecking) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                    <p className="text-zinc-500 text-sm">Verifying account...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black p-4 relative">
            {/* The Logout button is handled by the global Header, so we don't need one here */}
            <RoleSelection onSelectRole={(selectedRole) => {
                router.push(`/register?role=${selectedRole}`)
            }} />
        </div>
    )
}