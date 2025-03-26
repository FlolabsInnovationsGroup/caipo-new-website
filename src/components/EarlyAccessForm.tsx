'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassButton from './GlassButton'
import { toast } from 'sonner'

interface EarlyAccessFormProps {
  source?: string // e.g., 'homepage', 'features', 'pricing'
}

export default function EarlyAccessForm({ source = 'unknown' }: EarlyAccessFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address.')
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch('/api/early-access/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      })

      if (!response.ok) {
        const data = await response.json()
        if (response.status === 409) {
          toast.error('This email is already registered for early access.')
        } else {
          throw new Error(data.error || 'Failed to sign up')
        }
        return
      }

      toast.success('Thanks for signing up! We\'ll be in touch soon.')
      setEmail('')
    } catch (error) {
      toast.error('Failed to sign up. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white"
            disabled={isSubmitting}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>
        
        <GlassButton
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-lg font-medium"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Signing up...</span>
            </div>
          ) : (
            <>
              Join Early Access
              <span className="ml-2">✨</span>
            </>
          )}
        </GlassButton>
      </form>
    </motion.div>
  )
} 