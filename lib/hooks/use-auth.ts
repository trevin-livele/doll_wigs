'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { toast } from 'sonner'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const refreshUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
    return user
  }, [supabase.auth])

  useEffect(() => {
    refreshUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event)
      
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        toast.success('Welcome back!')
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        toast.success('Signed out successfully')
      } else if (event === 'USER_UPDATED') {
        setUser(session?.user ?? null)
      } else if (event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null)
      } else {
        setUser(session?.user ?? null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, refreshUser])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
    }
    return { data, error }
  }

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      toast.error(error.message)
    } else if (data.user && !data.session) {
      toast.success('Check your email to confirm your account!')
    }
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
    }
    return { error }
  }

  return { user, loading, signIn, signUp, signOut, refreshUser }
}
