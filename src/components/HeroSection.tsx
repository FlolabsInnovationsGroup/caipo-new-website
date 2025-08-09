'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import GlassButton from './GlassButton'

// Words for the feature carousel - updated to reflect current/planned capabilities
const features = [
    'assist',
    'learn',
    'understand',
    'adapt',
    'grow'
]

// Updated notifications to reflect development status
const notifications = [
    { id: 1, title: "Coming Soon", message: "CAIPO is in active development" },
    { id: 2, title: "Early Access", message: "Join the waitlist for early access" },
    { id: 3, title: "Updates", message: "Stay tuned for feature announcements" }
]

export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [deviceRotation, setDeviceRotation] = useState({ x: 0, y: 0 })
    const [currentFeature, setCurrentFeature] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const deviceRef = useRef<HTMLDivElement>(null)

    // Parallax scroll effect
    const { scrollY } = useScroll()
    const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
    const deviceScale = useTransform(scrollY, [0, 300], [1, 0.8])
    const textY = useTransform(scrollY, [0, 300], [0, 50])
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0])

    // Add this state for the word animation
    const [currentWord, setCurrentWord] = useState(0)

    // Add notification state
    const [activeNotification, setActiveNotification] = useState(0)

    // Handle mouse movement for 3D effect
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current || !deviceRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const deviceRect = deviceRef.current.getBoundingClientRect()

        // Calculate mouse position relative to container
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        // Calculate device rotation based on mouse position
        const rotateX = (y - 0.5) * 20
        const rotateY = (x - 0.5) * 20

        setDeviceRotation({ x: rotateX, y: rotateY })
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    // Update the word carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % features.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    // Notification animation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNotification((prev) => (prev + 1) % notifications.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.section
            id="home"
            role="region"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]"
            onMouseMove={handleMouseMove}
        >
            {/* Background Elements - Preserved from original */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-30" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* Remove Background text "CAIPO" */}
            {/* (Deleted the motion.div with the huge CAIPO text) */}

            {/* Main content container */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text content */}
                    <motion.div 
                        className="w-full lg:w-1/2 text-center lg:text-left"
                        style={{ y: textY }}
                    >
                        {/* Development Status Badge */}
                        <motion.div
                            className="inline-block mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
                                In Development
                            </span>
                        </motion.div>

                        {/* Notifications */}
                        <div className="mb-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={notifications[activeNotification].id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-gray-400">
                                        <span className="text-purple-400">{notifications[activeNotification].title}</span>
                                        <span className="mx-2">•</span>
                                        <span>{notifications[activeNotification].message}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <motion.h1 
                            className="text-5xl md:text-7xl font-bold mb-6"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Meet <span className="glow-filter" data-text="CAIPO">CAIPO</span>
                        </motion.h1>
                        
                        {/* Description */}
                        <motion.p
                            className="text-gray-400 text-lg mb-8 max-w-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Your future AI companion, designed to transform the way you work and interact with technology.
                        </motion.p>
                        
                        {/* Word Carousel section */}
                        <div className="text-xl md:text-3xl mb-8">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">CAIPO will</span>
                                <div className="relative h-[1.5em] min-w-[120px] flex items-center">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={features[currentWord]}
                                            className="absolute inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 translate-y-[2px]"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {features[currentWord]}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <GlassButton href="#early-access">
                                <span className="mr-2">✨</span>
                                Join Waitlist
                            </GlassButton>
                            <GlassButton href="#features" variant="secondary">
                                Learn More
                                <span className="ml-2">↓</span>
                            </GlassButton>
                        </motion.div>
                    </motion.div>

                    {/* Device visualization - Slightly smaller and softer glow */}
                    <div className="w-full flex justify-center items-center">
                        <div className="relative flex justify-center items-center">
                            <Image
                                src="/Adobe Express - file.png"
                                alt="CAIPO Device"
                                width={3000}
                                height={3000}
                                className="w-[60vw] max-w-[1000px] h-auto object-contain drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]"
                                priority
                                loading="eager"
                            />
                            {/* Animated, radiating, spinning glow overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none rounded-full"
                                style={{ zIndex: 2 }}
                            >
                                <div className="absolute inset-0 w-full h-full rounded-full"
                                    style={{
                                        background: "conic-gradient(from 0deg, rgba(139,92,246,0.25) 0deg, rgba(96,165,250,0.15) 120deg, rgba(139,92,246,0.25) 240deg, transparent 360deg)",
                                        filter: "blur(48px)",
                                        opacity: 0.6,
                                    }}
                                />
                                <div className="absolute inset-0 w-full h-full rounded-full"
                                    style={{
                                        background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
                                        filter: "blur(32px)",
                                        opacity: 0.5,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* SVG Filters */}
            <svg className="filters" width='0' height='0' style={{ position: 'absolute', zIndex: -1 }}>
                <defs>
                    <filter id="glow-4" colorInterpolationFilters="sRGB" x="-50%" y="-200%" width="200%" height="500%">
                        {/* Core glow */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2"/>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur6"/>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur12"/>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur24"/>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="36" result="blur36"/>
                        
                        {/* Intense white core */}
                        <feColorMatrix in="blur2" result="white-glow" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
                        <feOffset in="white-glow" result="white-glow-moved" dx="0" dy="0"/>
                        
                        {/* Bright purple inner glow */}
                        <feColorMatrix in="blur6" result="purple-glow-1" type="matrix" values="0.7 0 0 0 0  0 0.3 0 0 0  1 0 1 0 0  0 0 0 1 0"/>
                        <feOffset in="purple-glow-1" result="purple-glow-1-moved" dx="0" dy="0"/>
                        
                        {/* Mid purple glow */}
                        <feColorMatrix in="blur12" result="purple-glow-2" type="matrix" values="0.6 0 0 0 0  0 0.2 0 0 0  1 0 1 0 0  0 0 0 0.8 0"/>
                        <feOffset in="purple-glow-2" result="purple-glow-2-moved" dx="0" dy="1"/>
                        
                        {/* Blue mid glow */}
                        <feColorMatrix in="blur24" result="blue-glow" type="matrix" values="0.2 0 0 0 0  0 0.5 0 0 0  1 0 1 0 0  0 0 0 0.6 0"/>
                        <feOffset in="blue-glow" result="blue-glow-moved" dx="0" dy="2"/>
                        
                        {/* Soft outer glow */}
                        <feColorMatrix in="blur36" result="outer-glow" type="matrix" values="0.5 0 0 0 0  0 0.3 0 0 0  1 0 1 0 0  0 0 0 0.4 0"/>
                        <feOffset in="outer-glow" result="outer-glow-moved" dx="0" dy="3"/>
                        
                        <feMerge>
                            <feMergeNode in="outer-glow-moved"/>
                            <feMergeNode in="blue-glow-moved"/>
                            <feMergeNode in="purple-glow-2-moved"/>
                            <feMergeNode in="purple-glow-1-moved"/>
                            <feMergeNode in="white-glow-moved"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            <style jsx>{`
                @keyframes pulse {
                    0% {
                        opacity: 0.3;
                        transform: scale(0.95);
                    }
                    100% {
                        opacity: 0.6;
                        transform: scale(1.05);
                    }
                }

                .glow-filter {
                    position: relative;
                    display: inline-block;
                    scale: 1;
                    animation: onloadscale 1s ease-out forwards;
                }

                .glow-filter::before {
                    content: attr(data-text);
                    position: absolute;
                    pointer-events: none;
                    inset: 0;
                    color: #fff;
                    background: linear-gradient(180deg, #fff, rgba(139, 92, 246, 1));
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: url(#glow-4);
                    -webkit-filter: url(#glow-4);
                    opacity: 0;
                    animation: onloadopacity 1s ease-out forwards;
                }

                @keyframes onloadscale {
                    24% { scale: 1; }
                    100% { scale: 1.02; }
                }

                @keyframes onloadopacity {
                    24% { opacity: 0; }
                    100% { opacity: 1; }
                }

                @keyframes spin-slow {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </motion.section>
    )
}
