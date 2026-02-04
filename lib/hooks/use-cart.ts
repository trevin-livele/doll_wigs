'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'
import { toast } from 'sonner'

export interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    old_price: number | null
    image: string
    category: string
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const { user, loading: authLoading } = useAuth()
  const supabase = createClient()

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([])
      setLoading(false)
      setInitialLoad(false)
      return
    }

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        product:products (
          id,
          name,
          price,
          old_price,
          image,
          category
        )
      `)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching cart:', error)
    } else {
      // Transform data to handle Supabase's array return for single relations
      const transformedData = (data || []).map((item: { id: string; product_id: string; quantity: number; product: unknown }) => ({
        ...item,
        product: Array.isArray(item.product) ? item.product[0] : item.product
      })) as CartItem[]
      setItems(transformedData)
    }
    setLoading(false)
    setInitialLoad(false)
  }, [user, supabase])

  useEffect(() => {
    // Wait for auth to finish loading before fetching cart
    if (!authLoading) {
      fetchCart()
    }
  }, [fetchCart, authLoading])

  const addToCart = async (productId: string, productName: string) => {
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return { error: 'Not authenticated' }
    }

    // Check if item already in cart
    const existingItem = items.find(item => item.product_id === productId)

    if (existingItem) {
      // Update quantity
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1, updated_at: new Date().toISOString() })
        .eq('id', existingItem.id)

      if (error) {
        toast.error('Failed to update cart')
        return { error: error.message }
      }

      toast.success(`Updated ${productName} quantity`)
    } else {
      // Add new item
      const { error } = await supabase
        .from('cart_items')
        .insert({ user_id: user.id, product_id: productId, quantity: 1 })

      if (error) {
        toast.error('Failed to add to cart')
        return { error: error.message }
      }

      toast.success(`Added ${productName} to cart`)
    }

    await fetchCart()
    return { error: null }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(itemId)
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('id', itemId)

    if (error) {
      toast.error('Failed to update quantity')
      return { error: error.message }
    }

    await fetchCart()
    return { error: null }
  }

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    if (error) {
      toast.error('Failed to remove item')
      return { error: error.message }
    }

    toast.success('Item removed from cart')
    await fetchCart()
    return { error: null }
  }

  const clearCart = async () => {
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    if (error) {
      return { error: error.message }
    }

    setItems([])
    return { error: null }
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
