'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// Native select used below 
// Actually I don't have Select component yet, I'll use native select styled or basic input for simplicity as requested "Input: Vehicle Type (Dropdown)"
// I'll stick to native select with tailwind classes to avoid complexity of installing radix select manually if I didn't verify it.
// Checking package.json... "@radix-ui/react-select": "2.1.4" is there. I can use it but maybe better to make a simple native one for speed unless I make a shim.
// I will use a simple native select for robustness right now.

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
        <div className="flex items-center justify-center min-h-[60vh] p-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        {role === 'driver' ? 'Driver Registration' : 'Passenger Registration'}
                    </CardTitle>
                    <CardDescription>
                        {role === 'driver' ? 'Start earning with your vehicle.' : 'Create your account to ride.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Name / ID</label>
                            <Input
                                placeholder="Enter your name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {role === 'driver' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Plate Number</label>
                                    <Input
                                        placeholder="ABC-1234"
                                        required
                                        value={formData.plateNumber}
                                        onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Vehicle Type</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 glass text-white"
                                        value={formData.vehicleType}
                                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                    >
                                        <option value="Car" className="bg-[#121212]">Car</option>
                                        <option value="Motorcycle" className="bg-[#121212]">Motorcycle</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Rate Type</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 glass text-white"
                                        value={formData.rateType}
                                        onChange={(e) => setFormData({ ...formData, rateType: e.target.value })}
                                    >
                                        <option value="Per KM" className="bg-[#121212]">Per KM</option>
                                        <option value="Fixed Fare" className="bg-[#121212]">Fixed Fare</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <Button type="submit" className="w-full mt-6">
                            {role === 'driver' ? 'Register as Driver' : 'Register as Passenger'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
