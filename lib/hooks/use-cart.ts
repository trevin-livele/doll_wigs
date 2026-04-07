'use client'

import { useEffect, useState, useCallback } from 'react'
import { api } from '@/lib/api/client'
import { useAuth } from './use-auth'
import { toast } from 'sonner'

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image_url: string | null
    category: string
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const { user, loading: authLoading } = useAuth()

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([])
      setLoading(false)
      setInitialLoad(false)
      return
    }

    try {
      const data = await api<CartItem[]>('/cart')
      setItems(data)
    } catch {
      console.error('Error fetching cart')
    }
    setLoading(false)
    setInitialLoad(false)
  }, [user])

  useEffect(() => {
    if (!authLoading) {
      fetchCart()
    }
  }, [fetchCart, authLoading])

  const addToCart = async (productId: string, productName: string) => {
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return { error: 'Not authenticated' }
    }

    try {
      await api('/cart', { method: 'POST', body: { productId, quantity: 1 } })
      toast.success(`Added ${productName} to cart`)
      await fetchCart()
      return { error: null }
    } catch (err) {
      toast.error('Failed to add to cart')
      return { error: err instanceof Error ? err.message : 'Failed' }
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      await api(`/cart/${itemId}`, { method: 'PATCH', body: { quantity } })
      if (quantity <= 0) {
        toast.success('Item removed from cart')
      }
      await fetchCart()
      return { error: null }
    } catch (err) {
      toast.error('Failed to update quantity')
      return { error: err instanceof Error ? err.message : 'Failed' }
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      await api(`/cart/${itemId}`, { method: 'DELETE' })
      toast.success('Item removed from cart')
      await fetchCart()
      return { error: null }
    } catch (err) {
      toast.error('Failed to remove item')
      return { error: err instanceof Error ? err.message : 'Failed' }
    }
  }

  const clearCart = async () => {
    if (!user) return { error: 'Not authenticated' }
    try {
      await api('/cart', { method: 'DELETE' })
      setItems([])
      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed' }
    }
  }

  const cartTotal = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    loading: loading || authLoading || initialLoad,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    refetch: fetchCart
  }
}
