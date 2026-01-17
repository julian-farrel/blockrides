// app/onboarding/register/page.tsx
'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { usePrivy } from "@privy-io/react-auth"
import { RegistrationForms } from "@/components/registration-forms"
import { useUserRole } from "@/hooks/use-user-role"
import { Suspense, useEffect } from "react"

function RegisterContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { saveRole } = useUserRole()
    const { authenticated, ready } = usePrivy()
    
    // Get role from URL (e.g., ?role=driver)
    const roleParam = searchParams.get('role')
    const role = (roleParam === 'driver' || roleParam === 'passenger') ? roleParam : null

    useEffect(() => {
        // Redirect if not logged in or invalid role
        if (ready && !authenticated) router.push('/')
        if (ready && !role) router.push('/onboarding/role-selection')
    }, [ready, authenticated, role, router])

    if (!ready || !role) return null

    return (
        <div className="min-h-screen bg-black p-4">
            <RegistrationForms 
                role={role} 
                onRegister={(data) => {
                    console.log("Registered:", data)
                    
                    // TODO: INTEGRATION POINT
                    // 1. Call Smart Contract: registerDriver()
                    // 2. Wait for transaction success
                    
                    // 3. Save role locally (simulating DB/Chain fetch)
                    saveRole(role)
                    
                    // 4. Go to dashboard
                    router.push('/dashboard')
                }} 
            />
        </div>
    )
}

export default function RegisterPage() {
    return (
        // Suspense is required when using useSearchParams in Next.js App Router
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <RegisterContent />
        </Suspense>
    )
}