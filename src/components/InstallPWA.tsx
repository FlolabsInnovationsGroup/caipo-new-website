'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassButton from './GlassButton'

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent
  }
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the prompt banner
      setShowPrompt(true)
      // Clear any previous errors
      setError(null)
    }

    const handleAppInstalled = () => {
      // Hide the prompt when the app is installed
      setShowPrompt(false)
      // Clear any errors
      setError(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      setIsInstalling(true)
      setError(null)

      // Show the install prompt
      await deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }

      // Clear the deferredPrompt for the next time
      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (err) {
      console.error('Installation failed:', err)
      setError('Failed to install the app. Please try again.')
    } finally {
      setIsInstalling(false)
    }
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/10">
            <div className="flex items-start gap-4 max-w-sm">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white mb-1">Install CAIPO</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Install our app for a better experience with offline support and quick access.
                </p>
                {error && (
                  <p className="text-sm text-red-400 mb-4" role="alert">
                    {error}
                  </p>
                )}
                <div className="flex gap-3">
                  <GlassButton 
                    onClick={handleInstallClick} 
                    className="flex-grow"
                    disabled={isInstalling}
                  >
                    <DownloadIcon />
                    <span className="ml-2">{isInstalling ? 'Installing...' : 'Install'}</span>
                  </GlassButton>
                  <GlassButton 
                    onClick={() => {
                      setShowPrompt(false)
                      setError(null)
                    }}
                    className="px-4 !bg-transparent hover:!bg-white/5"
                    disabled={isInstalling}
                  >
                    Maybe Later
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 