'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import GlassButton from './GlassButton'

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  index: number
}

export default function PricingCard({ 
  name, 
  price, 
  description, 
  features, 
  popular, 
  index 
}: PricingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div className={`relative h-full ${popular ? 'md:mt-[-0.5rem]' : ''}`}>
      {/* Popular card background glow */}
      {popular && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/20 to-blue-500/20 blur-3xl" />
      )}
      
      <motion.div 
        ref={cardRef}
        className={`relative rounded-2xl p-8 h-full flex flex-col ${
          popular ? 'pt-12' : ''
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: popular 
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          border: popular 
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3), transparent 50%)`,
          }}
        />

        {/* Border glow */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            padding: '1px',
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
            borderRadius: 'inherit',
            content: '""',
            pointerEvents: 'none',
          }}
        />

        {popular && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 blur-md bg-gradient-to-r from-purple-500 to-blue-500 opacity-75" />
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1 rounded-full">
                <span className="text-sm font-medium">Most Popular</span>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              {name}
            </h3>
            <p className="text-gray-400 mb-4">{description}</p>
            <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              {price === 'Custom' ? (
                price
              ) : (
                <>
                  ${price}
                  <span className="text-lg text-gray-400">/mo</span>
                </>
              )}
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-grow">
            {features.map((feature) => (
              <motion.li 
                key={feature} 
                className="flex items-center text-gray-300"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-blue-400 mr-2">✓</span>
                {feature}
              </motion.li>
            ))}
          </ul>

          <GlassButton 
            href="#get-started" 
            className={`
              w-full justify-center mt-auto
              ${popular ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-0' : ''}
            `}
          >
            {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
            <span className="ml-2">→</span>
          </GlassButton>
        </div>

        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.1 : 0,
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transform: 'translateX(-100%)',
            animation: isHovered ? 'shine 1.5s infinite' : 'none',
          }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
} 