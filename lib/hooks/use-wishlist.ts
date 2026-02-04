'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'
import { toast } from 'sonner'

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlistIds([])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('wishlists')
      .select('product_id')
      .eq('user_id', user.id)

    setWishlistIds(data?.map((item: { product_id: string }) => item.product_id) || [])
    setLoading(false)
  }, [user, supabase])

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  const toggleWishlist = async (productId: string, productName?: string) => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist')
      return { error: 'Not authenticated', needsAuth: true }
    }

    const isInWishlistNow = wishlistIds.includes(productId)

    if (isInWishlistNow) {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)

      if (!error) {
        setWishlistIds(prev => prev.filter(id => id !== productId))
        toast.success(productName ? `Removed ${productName} from wishlist` : 'Removed from wishlist')
      } else {
        toast.error('Failed to update wishlist')
      }
      return { error: error?.message }
    } else {
      const { error } = await supabase
        .from('wishlists')
        .insert({ user_id: user.id, product_id: productId })

      if (!error) {
        setWishlistIds(prev => [...prev, productId])
        toast.success(productName ? `Added ${productName} to wishlist` : 'Added to wishlist')
      } else {
        toast.error('Failed to update wishlist')
      }
      return { error: error?.message }
    }
  }

  const isInWishlist = (productId: string) => wishlistIds.includes(productId)

  return { wishlistIds, loading, toggleWishlist, isInWishlist, refetch: fetchWishlist }
}
