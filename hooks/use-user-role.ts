// hooks/use-user-role.ts
'use client'

import { useState, useEffect } from 'react'

export function useUserRole() {
  const [role, setRole] = useState<'driver' | 'passenger' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In the final exam submission, this is where you would call:
    // contract.methods.getDriver(address).call()
    
    // For now, we use localStorage to simulate the "database/chain"
    const storedRole = localStorage.getItem('blockrides_role') as 'driver' | 'passenger' | null
    if (storedRole) {
      setRole(storedRole)
    }
    setLoading(false)
  }, [])

  const saveRole = (newRole: 'driver' | 'passenger') => {
    localStorage.setItem('blockrides_role', newRole)
    setRole(newRole)
  }

  return { role, saveRole, loading }
}