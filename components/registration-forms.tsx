'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface RegistrationFormsProps {
    role: 'driver' | 'passenger'
    onRegister: (data: any) => void
}

export function RegistrationForms({ role, onRegister }: RegistrationFormsProps) {
    const [formData, setFormData] = useState<any>({
        name: '',
        plateNumber: '',
        vehicleType: 'Car',
        rateType: 'Per KM'
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onRegister(formData)
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

                        <Button type="submit" className="w-full mt-4 h-11 text-base bg-white text-black hover:bg-zinc-200">
                            {role === 'driver' ? 'Complete Registration' : 'Create Account'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}