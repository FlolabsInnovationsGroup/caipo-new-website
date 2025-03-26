'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollingWordProps {
  words?: string[]
  interval?: number
  className?: string
}

export default function ScrollingWord({ 
  words = [
    'design',
    'transform',
    'automate',
    'analyze',
    'record',
    'transcribe',
    'organize',
    'translate',
    'connect',
    'assist',
    'communicate',
    'simplify'
  ],
  interval = 2000,
  className = ''
}: ScrollingWordProps) {
    const [index, setIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        const startInterval = () => {
            intervalRef.current = setInterval(() => {
                if (!isHovered) {
                    setIndex((prevIndex) => (prevIndex + 1) % words.length)
                }
            }, interval)
        }

        startInterval()
        return () => intervalRef.current && clearInterval(intervalRef.current)
    }, [isHovered, interval, words.length])

    const handleClick = () => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }

    return (
        <motion.div
            className={`inline-block min-w-[150px] relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    className="inline-block w-full text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <span className="relative">
                        {/* Gradient text */}
                        <span 
                          className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                          data-testid="scrolling-word"
                        >
                            {words[index]}
                        </span>
                        
                        {/* Animated underline */}
                        {isHovered && (
                            <motion.span
                                className="absolute -bottom-1 left-0 w-full h-0.5"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
                            </motion.span>
                        )}

                        {/* Glow effect */}
                        <span className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                </motion.span>
            </AnimatePresence>

            {/* Click indicator */}
            {isHovered && (
                <motion.span
                    className="absolute -right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                >
                    ↻
                </motion.span>
            )}
        </motion.div>
    )
}