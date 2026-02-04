'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/hooks/use-auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signIn, signUp } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (!error) {
          onClose()
          onSuccess?.()
        }
      } else {
        const { data, error } = await signUp(email, password)
        if (!error && data.user && !data.session) {
          setEmailSent(true)
        } else if (!error && data.session) {
          // User was auto-confirmed
          onClose()
          onSuccess?.()
        }
      }
    } catch {
      // Error handled in hook
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setName('')
    setEmailSent(false)
  }

  if (emailSent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <div className="relative bg-gray-900 rounded-lg w-full max-w-md mx-4 p-6 border border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#CAB276]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#CAB276]" />
            </div>
            <h2 className="text-2xl font-serif text-white mb-2">Check Your Email</h2>
            <p className="text-gray-400 mb-6">
              We&apos;ve sent a confirmation link to<br />
              <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to verify your account and start shopping.
            </p>
            <button
              onClick={() => {
                resetForm()
                setMode('signin')
              }}
              className="text-[#CAB276] hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-gray-900 rounded-lg w-full max-w-md mx-4 p-6 border border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-serif text-white mb-6 text-center">
          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#CAB276]"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#CAB276]"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#CAB276]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#CAB276] text-black py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin')
              resetForm()
            }}
            className="text-[#CAB276] hover:underline"
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
