'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api/client'

export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api<Category[]>('/storefront/categories')
        setCategories(data)
      } catch {
        // silent fail for categories
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}
