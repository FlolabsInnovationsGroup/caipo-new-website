'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import EarlyAccessSection from '@/components/EarlyAccessSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <EarlyAccessSection />
      <Footer />
    </main>
  )
}