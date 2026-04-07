'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'

export interface Product {
  id: string
  name: string
  price: number
  old_price: number | null
  rating: number
  sale: boolean
  image_url: string
  category: string
  description: string | null
  stock_quantity: number
  created_at: string
  updated_at: string
}

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''
        const data = await api<Product[]>(`/storefront/products${params}`)
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
      }
      setLoading(false)
    }

    fetchProducts()
  }, [category])

  return { products, loading, error }
}
