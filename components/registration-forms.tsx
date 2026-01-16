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
            <Card className="w-full max-w-md border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.1)]">
                <CardHeader>
                    <CardTitle className="text-2xl text-purple-100">
                        {role === 'driver' ? 'Driver Registration' : 'Passenger Registration'}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        {role === 'driver' ? 'Join the decentralized fleet.' : 'Create your secure rider profile.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-purple-300 ml-1">Name / ID</label>
                            <Input
                                placeholder="Enter your name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-white/10 focus:border-purple-500/50"
                            />
                        </div>

                        {role === 'driver' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-purple-300 ml-1">Plate Number</label>
                                    <Input
                                        placeholder="ABC-1234"
                                        required
                                        value={formData.plateNumber}
                                        onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                                        className="bg-white/5 border-white/10 focus:border-purple-500/50"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-purple-300 ml-1">Vehicle Type</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                                            value={formData.vehicleType}
                                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                        >
                                            <option value="Car" className="bg-[#121212]">Car</option>
                                            <option value="Motorcycle" className="bg-[#121212]">Motorcycle</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-purple-300 ml-1">Rate Type</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                                            value={formData.rateType}
                                            onChange={(e) => setFormData({ ...formData, rateType: e.target.value })}
                                        >
                                            <option value="Per KM" className="bg-[#121212]">Per KM</option>
                                            <option value="Fixed Fare" className="bg-[#121212]">Fixed Fare</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button type="submit" className="w-full mt-4 h-11 text-base shadow-purple-900/20">
                            {role === 'driver' ? 'Complete Registration' : 'Create Account'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}