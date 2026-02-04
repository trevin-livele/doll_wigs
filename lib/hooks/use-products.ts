'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Product {
  id: string
  name: string
  price: number
  old_price: number | null
  rating: number
  sale: boolean
  image: string
  category: string
  description: string | null
  stock: number
  created_at: string
  updated_at: string
}

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      let query = supabase.from('products').select('*')
      
      if (category && category !== 'All') {
        query = query.eq('category', category)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }

    fetchProducts()
  }, [category, supabase])

  return { products, loading, error }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setProduct(data)
      }
      setLoading(false)
    }

    if (id) {
      fetchProduct()
    }
  }, [id, supabase])

  return { product, loading, error }
}
