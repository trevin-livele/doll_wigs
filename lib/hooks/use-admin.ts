'use client'

import { useEffect, useState, useCallback } from 'react'
import { api } from '@/lib/api/client'
import { useAuth } from './use-auth'
import { toast } from 'sonner'
import type { Product } from './use-products'

export interface Profile {
  id: string
  email: string
  displayName: string | null
  phoneNumber: string | null
  role: string
  createdAt: string
}

export interface Order {
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

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export function useAdmin() {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      setIsAdmin(false)
      setLoading(false)
      return
    }
    setIsAdmin(user.role === 'admin')
    setLoading(false)
  }, [user, authLoading])

  return { isAdmin, loading: loading || authLoading }
}

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api<Product[]>('/products')
      setProducts(data)
    } catch {
      toast.error('Failed to load products')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const createProduct = async (product: Partial<Product>) => {
    try {
      const data = await api<Product>('/products', { method: 'POST', body: product })
      toast.success('Product created')
      await fetchProducts()
      return data
    } catch {
      toast.error('Failed to create product')
      return null
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      await api(`/products/${id}`, { method: 'PUT', body: updates })
      toast.success('Product updated')
      await fetchProducts()
      return true
    } catch {
      toast.error('Failed to update product')
      return false
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await api(`/products/${id}`, { method: 'DELETE' })
      toast.success('Product deleted')
      await fetchProducts()
      return true
    } catch {
      toast.error('Failed to delete product')
      return false
    }
  }

  return { products, loading, createProduct, updateProduct, deleteProduct, refetch: fetchProducts }
}

export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api<Order[]>('/orders')
      setOrders(data)
    } catch {
      toast.error('Failed to load orders')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await api(`/orders/${id}/status`, { method: 'PATCH', body: { status } })
      toast.success(`Order marked as ${status}`)
      await fetchOrders()
      return true
    } catch {
      toast.error('Failed to update order status')
      return false
    }
  }

  return { orders, loading, updateOrderStatus, refetch: fetchOrders }
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string; image: string }[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api<{ id: string; name: string; slug: string; image: string }[]>('/categories')
      setCategories(data)
    } catch {
      toast.error('Failed to load categories')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const createCategory = async (category: { name: string; slug: string; image: string }) => {
    try {
      const data = await api<{ id: string; name: string; slug: string; image: string }>('/categories', {
        method: 'POST',
        body: category,
      })
      toast.success('Category created')
      await fetchCategories()
      return data
    } catch {
      toast.error('Failed to create category')
      return null
    }
  }

  const updateCategory = async (id: string, updates: { name?: string; slug?: string; image?: string }) => {
    try {
      await api(`/categories/${id}`, { method: 'PUT', body: updates })
      toast.success('Category updated')
      await fetchCategories()
      return true
    } catch {
      toast.error('Failed to update category')
      return false
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      await api(`/categories/${id}`, { method: 'DELETE' })
      toast.success('Category deleted')
      await fetchCategories()
      return true
    } catch {
      toast.error('Failed to delete category')
      return false
    }
  }

  return { categories, loading, createCategory, updateCategory, deleteCategory, refetch: fetchCategories }
}

export function useAdminStats() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api<{
          totalOrders: number
          totalRevenue: number
          totalProducts: number
          pendingOrders: number
        }>('/storefront/stats')
        setStats({
          ...data,
          totalCustomers: 0, // not tracked separately in shared backend
        })
      } catch {
        // silent
      }
      setLoading(false)
    }

    fetchStats()
  }, [])

  return { stats, loading }
}
