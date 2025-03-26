'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
    title?: string
    description?: string
    icon?: React.ReactNode
    className?: string
    children?: React.ReactNode
    onClick?: () => void
}

export default function GlassCard({ title, description, icon, className = '', children, onClick }: GlassCardProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
    }

    return (
        <motion.div
            ref={cardRef}
            className={`relative p-6 rounded-2xl overflow-hidden h-full ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                cursor: onClick ? 'pointer' : 'default'
            }}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300"
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

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
                {icon && (
                    <div className="mb-4 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                        {icon}
                    </div>
                )}
                {title && <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>}
                {description && <p className="text-gray-400 flex-grow">{description}</p>}
                {children}
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

            <style jsx>{`
                @keyframes shine {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </motion.div>
    )
}