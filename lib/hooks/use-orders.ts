'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'

interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_image: string | null
  quantity: number
  price: number
}

interface Order {
  id: string
  user_id: string
  status: string
  total: number
  shipping_address: {
    name: string
    phone: string
    address: string
    city: string
    county?: string
    area?: string
  }
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchOrders = useCallback(async () => {
    if (!user) {
      setOrders([])
      setLoading(false)
      return
    }

    const { data: ordersData, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      setLoading(false)
      return
    }

    if (ordersData) {
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id)

          return { ...order, items: items || [] }
        })
      )
      setOrders(ordersWithItems)
    }
    setLoading(false)
  }, [user, supabase])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, loading, refetch: fetchOrders }
}
