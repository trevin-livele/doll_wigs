'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'
import { toast } from 'sonner'
import type { Product } from './use-products'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: 'customer' | 'admin'
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  status: string
  total: number
  shipping_address: {
    name: string
    phone: string
    address: string
    city: string
  }
  created_at: string
  updated_at: string
  profile?: Profile
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  price: number
}

export function useAdmin() {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      // Wait for auth to complete
      if (authLoading) {
        return
      }

      if (!user) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      try {
        // Use RPC to avoid RLS recursion on profiles table
        const { data, error } = await supabase.rpc('get_user_role')
        if (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        } else {
          setIsAdmin(data === 'admin')
        }
      } catch (err) {
        console.error('Error checking admin:', err)
        setIsAdmin(false)
      }
      setLoading(false)
    }

    checkAdmin()
  }, [user, authLoading, supabase])

  return { isAdmin, loading: loading || authLoading }
}

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load products')
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) {
      toast.error('Failed to create product')
      return null
    }
    toast.success('Product created')
    await fetchProducts()
    return data
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const { error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update product')
      return false
    }
    toast.success('Product updated')
    await fetchProducts()
    return true
  }

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete product')
      return false
    }
    toast.success('Product deleted')
    await fetchProducts()
    return true
  }

  return { products, loading, createProduct, updateProduct, deleteProduct, refetch: fetchProducts }
}


export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profile:profiles(id, email, full_name, phone),
        order_items(*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to load orders')
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update order status')
      return false
    }
    toast.success(`Order marked as ${status}`)
    await fetchOrders()
    return true
  }

  return { orders, loading, updateOrderStatus, refetch: fetchOrders }
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string; image: string }[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      toast.error('Failed to load categories')
    } else {
      setCategories(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const createCategory = async (category: { name: string; slug: string; image: string }) => {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()

    if (error) {
      toast.error('Failed to create category')
      return null
    }
    toast.success('Category created')
    await fetchCategories()
    return data
  }

  const updateCategory = async (id: string, updates: { name?: string; slug?: string; image?: string }) => {
    const { error } = await supabase.from('categories').update(updates).eq('id', id)

    if (error) {
      toast.error('Failed to update category')
      return false
    }
    toast.success('Category updated')
    await fetchCategories()
    return true
  }

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete category')
      return false
    }
    toast.success('Category deleted')
    await fetchCategories()
    return true
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
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, productsRes, customersRes] = await Promise.all([
        supabase.from('orders').select('id, total, status'),
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'customer'),
      ])

      const orders = ordersRes.data || []
      setStats({
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
        totalProducts: productsRes.count || 0,
        totalCustomers: customersRes.count || 0,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
      })
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

  return { stats, loading }
}
