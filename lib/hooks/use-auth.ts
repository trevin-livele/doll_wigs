'use client'

import { useEffect, useState, useCallback } from 'react'
import { api, setTokens, clearTokens } from '@/lib/api/client'
import { toast } from 'sonner'

export interface AuthUser {
  id: string
  email: string
  displayName: string | null
  phoneNumber: string | null
  photoURL: string | null
  role: string
  organizationId: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const data = await api<{ user: AuthUser }>('/auth/me')
      setUser(data.user)
    } catch {
      setUser(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Check if we have a token stored
    const token = localStorage.getItem('accessToken')
    if (token) {
      refreshUser()
    } else {
      setLoading(false)
    }

    const handleLogout = () => {
      setUser(null)
    }
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [refreshUser])

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api<{ accessToken: string; refreshToken: string; user: AuthUser }>('/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      setTokens(data.accessToken, data.refreshToken)
      setUser(data.user)
      toast.success('Welcome back!')
      return { data, error: null }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      toast.error(message)
      return { data: null, error: { message } }
    }
  }

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      await api('/auth/register', {
        method: 'POST',
        body: { email, password, displayName: displayName || email.split('@')[0] },
      })
      toast.success('Registration successful. Please log in.')
      return { error: null }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      toast.error(message)
      return { error: { message } }
    }
  }

  const signOut = async () => {
    clearTokens()
    setUser(null)
    toast.success('Signed out successfully')
    return { error: null }
  }

  return { user, loading, signIn, signUp, signOut, refreshUser }
}
