'use client'

import { useState } from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth" // 1. Import useWallets
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getContract } from "@/lib/web3" // 2. Import Contract Helper
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { User, Car, CreditCard, Loader2, Coins } from "lucide-react"

export function RegistrationForms({ role, onRegister }: { role: 'driver' | 'passenger', onRegister: (data: any) => void }) {
    const { user } = usePrivy()
    const { wallets } = useWallets()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [plateNumber, setPlateNumber] = useState("")
    const [vehicleType, setVehicleType] = useState("")
    const [tariff, setTariff] = useState("") 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const wallet = wallets[0]
        if (!wallet || !user?.wallet?.address) return

        setLoading(true)
        try {
            const walletAddress = user.wallet.address

            // --- STEP 1: BLOCKCHAIN TRANSACTION (DRIVER ONLY) ---
            if (role === 'driver') {
                const provider = await wallet.getEthereumProvider()
                const contract = getContract(provider)

                await contract.methods
                    .registerDriver(name, plateNumber, vehicleType, "Per Mile")
                    .send({ from: walletAddress })
                
                console.log("Blockchain registration successful")
            }

            // --- STEP 2: SUPABASE DATABASE ---
            // Create/Update User Record
            const { data: userData, error: userError } = await supabase
                .from('users')
                .upsert({
                    wallet_address: walletAddress,
                    role: role,
                    name: name,
                }, { onConflict: 'wallet_address' })
                .select()
                .single()

            if (userError) throw userError

            // If Driver, create Driver Record with Tariff in DB
            if (role === 'driver') {
                const { error: driverError } = await supabase
                    .from('drivers')
                    .upsert({
                        user_id: userData.id, 
                        plate_number: plateNumber,
                        vehicle_type: vehicleType,
                        rate_type: 'Per Mile',
                        tariff_per_mile: parseFloat(tariff) 
                    })

                if (driverError) throw driverError
            }

            // Success
            onRegister({ name, role, tariff })
        } catch (error: any) {
            console.error("Registration failed:", error)
            alert("Registration failed: " + (error.message || error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] animate-in fade-in zoom-in duration-500">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-white">
                        {role === 'driver' ? 'Driver Registration' : 'Passenger Registration'}
                    </CardTitle>
                    <CardDescription className="text-center text-zinc-400">
                        Complete your profile to start {role === 'driver' ? 'earning' : 'riding'}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <User className="w-4 h-4" /> Full Name
                            </label>
                            <Input 
                                placeholder="e.g. John Doe" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-zinc-800/50 border-zinc-700 text-white focus:ring-emerald-500"
                            />
                        </div>

                        {role === 'driver' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <Car className="w-4 h-4" /> Vehicle Model
                                    </label>
                                    <Input 
                                        placeholder="e.g. Toyota Prius (Black)" 
                                        value={vehicleType}
                                        onChange={(e) => setVehicleType(e.target.value)}
                                        required
                                        className="bg-zinc-800/50 border-zinc-700 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" /> License Plate
                                    </label>
                                    <Input 
                                        placeholder="e.g. B 1234 CD" 
                                        value={plateNumber}
                                        onChange={(e) => setPlateNumber(e.target.value)}
                                        required
                                        className="bg-zinc-800/50 border-zinc-700 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <Coins className="w-4 h-4" /> Tariff (ETH per Mile)
                                    </label>
                                    <Input 
                                        type="number"
                                        step="0.000001"
                                        placeholder="e.g. 0.005" 
                                        value={tariff}
                                        onChange={(e) => setTariff(e.target.value)}
                                        required
                                        className="bg-zinc-800/50 border-zinc-700 text-white font-mono"
                                    />
                                    <p className="text-xs text-zinc-500">Set your base rate for calculations.</p>
                                </div>
                            </>
                        )}

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-white text-black hover:bg-zinc-200 font-bold mt-6"
                        >
                            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Complete Registration"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}