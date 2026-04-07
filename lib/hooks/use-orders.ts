'use client'

import { useEffect, useState, useCallback } from 'react'
import { api } from '@/lib/api/client'
import { useAuth } from './use-auth'

interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

interface Order {
  id: string
  status: string
  total: number
  customerName: string
  customerPhone: string
  customerEmail: string
  createdAt: string
  updatedAt: string
  items: OrderItem[]
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchOrders = useCallback(async () => {
    if (!user) {
      setOrders([])
      setLoading(false)
      return
    }

    try {
      const data = await api<Order[]>('/storefront/orders')
      setOrders(data)
    } catch {
      console.error('Error fetching orders')
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, loading, refetch: fetchOrders }
}
