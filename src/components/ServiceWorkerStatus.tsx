'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { registerServiceWorker, swStatusEmitter, ServiceWorkerStatus as SWStatus, ServiceWorkerStatusEvent } from '@/lib/registerServiceWorker'

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
    <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

export default function ServiceWorkerStatus() {
  const [status, setStatus] = useState<SWStatus>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker and listen for status changes
      const handleStatusChange = (event: Event) => {
        if (event instanceof ServiceWorkerStatusEvent) {
          setStatus(event.status)
        }
      }

      swStatusEmitter.addEventListener('statuschange', handleStatusChange)
      registerServiceWorker()

      // Cleanup function
      return () => {
        swStatusEmitter.removeEventListener('statuschange', handleStatusChange)
      }
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