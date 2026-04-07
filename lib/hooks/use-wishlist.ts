'use client'

import { useEffect, useState, useCallback } from 'react'
import { api } from '@/lib/api/client'
import { useAuth } from './use-auth'
import { toast } from 'sonner'

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const { user, loading: authLoading } = useAuth()

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlistIds([])
      setLoading(false)
      setInitialLoad(false)
      return
    }

    try {
      const data = await api<string[]>('/wishlist')
      setWishlistIds(data)
    } catch {
      // silent
    }
    setLoading(false)
    setInitialLoad(false)
  }, [user])

  useEffect(() => {
    if (!authLoading) {
      fetchWishlist()
    }
  }, [fetchWishlist, authLoading])

  const toggleWishlist = async (productId: string, productName?: string) => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist')
      return { error: 'Not authenticated', needsAuth: true }
    }

    try {
      const result = await api<{ action: string }>('/wishlist/toggle', {
        method: 'POST',
        body: { productId },
      })

      if (result.action === 'added') {
        setWishlistIds(prev => [...prev, productId])
        toast.success(productName ? `Added ${productName} to wishlist` : 'Added to wishlist')
      } else {
        setWishlistIds(prev => prev.filter(id => id !== productId))
        toast.success(productName ? `Removed ${productName} from wishlist` : 'Removed from wishlist')
      }
      return { error: null }
    } catch (err) {
      toast.error('Failed to update wishlist')
      return { error: err instanceof Error ? err.message : 'Failed' }
    }
  }

  const isInWishlist = (productId: string) => wishlistIds.includes(productId)

  return { wishlistIds, loading: loading || authLoading || initialLoad, toggleWishlist, isInWishlist, refetch: fetchWishlist }
}
