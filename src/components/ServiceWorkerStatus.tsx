'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
    <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

export default function ServiceWorkerStatus() {
  const [status, setStatus] = useState<'installing' | 'installed' | 'updating' | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Listen for service worker state changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setStatus('updating')
        // Reset status after 3 seconds
        setTimeout(() => setStatus(null), 3000)
      })

      // Check if service worker is already controlling the page
      if (navigator.serviceWorker.controller) {
        setStatus('installed')
        // Reset status after 3 seconds
        setTimeout(() => setStatus(null), 3000)
      }

      // Listen for new service worker installation
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          if (registration.installing) {
            setStatus('installing')
            registration.installing.addEventListener('statechange', () => {
              if (registration.active) {
                setStatus('installed')
                // Reset status after 3 seconds
                setTimeout(() => setStatus(null), 3000)
              }
            })
          }
        })
      })
    }
  }, [])

  if (!status) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-4 left-4 z-50"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 shadow-lg backdrop-blur-sm">
          <div className={status === 'updating' ? 'animate-spin' : ''}>
            <RefreshIcon />
          </div>
          <span className="text-sm font-medium">
            {status === 'installing' && 'Installing app...'}
            {status === 'installed' && 'App ready to use offline'}
            {status === 'updating' && 'Updating app...'}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 