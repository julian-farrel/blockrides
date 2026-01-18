'use client'

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { supabase } from '@/lib/supabase'

export function useUserRole() {
  const { user, ready } = usePrivy()
  const [role, setRole] = useState<'driver' | 'passenger' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRole() {
      if (!ready) return
      
      if (!user?.wallet?.address) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('wallet_address', user.wallet.address)
          .single()

        if (data) {
          setRole(data.role as 'driver' | 'passenger')
        }
      } catch (error) {
        console.error('Error fetching role:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRole()
  }, [ready, user?.wallet?.address])

  return { role, loading }
}