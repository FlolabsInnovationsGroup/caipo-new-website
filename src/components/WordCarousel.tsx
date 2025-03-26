'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = [
  'transform',
  'automate',
  'analyze',
  'organize',
  'assist',
  'simplify'
]

export default function WordCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentIndex]}
          className="absolute inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 whitespace-nowrap"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
} 