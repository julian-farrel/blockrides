'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { usePrivy, useWallets } from "@privy-io/react-auth" // Added useWallets
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import { getContract } from "@/lib/web3" // Added contract helper

interface RegistrationFormsProps {
    role: 'driver' | 'passenger'
    onRegister: (data: any) => void
}

export function RegistrationForms({ role, onRegister }: RegistrationFormsProps) {
    const { user } = usePrivy()
    const { wallets } = useWallets() // Get connected wallets
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<any>({
        name: '',
        plateNumber: '',
        vehicleType: 'Car',
        rateType: 'Per KM'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const wallet = wallets[0]
        if (!wallet) return
        
        setIsSubmitting(true)

        try {
            // --- STEP 1: Blockchain Transaction ---
            if (role === 'driver') {
                await wallet.switchChain(11155111) // Switch to Sepolia
                const provider = await wallet.getEthereumProvider()
                const contract = getContract(provider)

                // Call Smart Contract: registerDriver(name, plate, vehicle, rate)
                await contract.methods.registerDriver(
                    formData.name,
                    formData.plateNumber,
                    formData.vehicleType,
                    formData.rateType
                ).send({ from: wallet.address })
            }

            // --- STEP 2: Database Backup (Supabase) ---
            // We still save to Supabase for easy login checks later
            const { data: userData, error: userError } = await supabase
                .from('users')
                .insert({
                    wallet_address: user?.wallet?.address,
                    role: role,
                    name: formData.name
                })
                .select()
                .single()

            if (userError) throw userError

            if (role === 'driver') {
                const { error: driverError } = await supabase
                    .from('drivers')
                    .insert({
                        user_id: userData.id,
                        plate_number: formData.plateNumber,
                        vehicle_type: formData.vehicleType,
                        rate_type: formData.rateType
                    })
                if (driverError) throw driverError
            }

            // Success!
            onRegister(formData)
        } catch (error: any) {
            console.error("Registration failed:", error)
            alert("Error registering: " + (error.message || error))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
            <Card className="w-full max-w-md bg-black border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">
                        {role === 'driver' ? 'Driver Registration' : 'Passenger Registration'}
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        {role === 'driver' ? 'Join the decentralized fleet.' : 'Create your secure rider profile.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Name / ID</label>
                            <Input
                                placeholder="Enter your name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-0"
                            />
                        </div>

                        {role === 'driver' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 ml-1">Plate Number</label>
                                    <Input
                                        placeholder="ABC-1234"
                                        required
                                        value={formData.plateNumber}
                                        onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-0"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300 ml-1">Vehicle Type</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:border-white/30"
                                            value={formData.vehicleType}
                                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                        >
                                            <option value="Car" className="bg-black">Car</option>
                                            <option value="Motorcycle" className="bg-black">Motorcycle</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300 ml-1">Rate Type</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:border-white/30"
                                            value={formData.rateType}
                                            onChange={(e) => setFormData({ ...formData, rateType: e.target.value })}
                                        >
                                            <option value="Per KM" className="bg-black">Per KM</option>
                                            <option value="Fixed Fare" className="bg-black">Fixed Fare</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button type="submit" disabled={isSubmitting} className="w-full mt-4 h-11 text-base bg-white text-black hover:bg-zinc-200">
                            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : (role === 'driver' ? 'Register on Blockchain' : 'Create Profile')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}