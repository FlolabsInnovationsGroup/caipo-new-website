'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import EarlyAccessSection from '@/components/EarlyAccessSection'
import Footer from '@/components/Footer'

export default function Home() {
  // Cookie consent state with localStorage persistence
  const [showCookie, setShowCookie] = useState(false)

  useEffect(() => {
    // Only show if not previously accepted
    if (typeof window !== 'undefined' && !localStorage.getItem('cookieAccepted')) {
      setShowCookie(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true')
    setShowCookie(false)
  }

  return (
    <main className="min-h-screen flex flex-col relative bg-black">
      <Navbar />

      {/* Cookie Consent Banner */}
      {showCookie && (
        <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
          <div className="bg-gray-900 text-gray-200 px-6 py-4 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-4 border border-white/10 max-w-xl mx-auto">
            <span>
              This website uses cookies to enhance the user experience. By using our site, you agree to our use of cookies.
              <a href="/privacy" className="underline text-purple-400 ml-1">Learn more</a>
            </span>
            <button
              className="ml-0 md:ml-4 px-4 py-2 rounded-lg font-semibold transition
                bg-gradient-to-r from-purple-500 to-blue-500
                hover:from-purple-600 hover:to-blue-600
                shadow-md text-white"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      <HeroSection />
      <FeaturesSection />
      <EarlyAccessSection />
      <Footer />
    </main>
  )
}