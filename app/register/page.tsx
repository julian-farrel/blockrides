'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { supabase } from "@/lib/supabase"
import { RegistrationForms } from "@/components/registration-forms"
import { Suspense, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

function RegisterContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { authenticated, ready, user } = usePrivy()
    const [isChecking, setIsChecking] = useState(true)
    
    const roleParam = searchParams.get('role')
    const role = (roleParam === 'driver' || roleParam === 'passenger') ? roleParam : null

    useEffect(() => {
        if (!ready) return

        if (!authenticated) {
            router.push('/')
            return
        }

        if (!role) {
            router.push('/role-selection')
            return
        }

        const checkRegistration = async () => {
            try {
                if (!user?.wallet?.address) return

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
    }, [ready, authenticated, role, user, router])

    if (!ready || !role || isChecking) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                    <p className="text-zinc-500 text-sm">Checking profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black p-4">
            <RegistrationForms 
                role={role} 
                onRegister={(data) => {
                    console.log("Registered successfully:", data)
                    router.push('/dashboard')
                }} 
            />
        </div>
    )
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <RegisterContent />
        </Suspense>
    )
}