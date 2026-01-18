'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { RegistrationForms } from "@/components/registration-forms"
import { Suspense, useEffect } from "react"

function RegisterContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const { authenticated, ready } = usePrivy()
    
    const roleParam = searchParams.get('role')
    const role = (roleParam === 'driver' || roleParam === 'passenger') ? roleParam : null

    useEffect(() => {
        if (ready && !authenticated) router.push('/')
        if (ready && !role) router.push('/onboarding/role-selection') 
    }, [ready, authenticated, role, router])

    if (!ready || !role) return null

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
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <RegisterContent />
        </Suspense>
    )
}