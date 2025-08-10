'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import '@/styles/nav.css'
import GlassButton from './GlassButton'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navItems = [
    { href: "/", label: "Home", section: "home" },
    { href: "/features", label: "Features", section: "features" },
    { href: "/pricing", label: "Pricing", section: "pricing" },
    { href: "/about", label: "About", section: "about" },
    { href: "/contact", label: "Contact", section: "contact" }
]

export default function Navbar() {
    const pathname = usePathname()
    const [activeSection, setActiveSection] = useState('home')
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // Update active section based on pathname
    useEffect(() => {
        const currentSection = navItems.find(item => item.href === pathname)?.section || 'home'
        setActiveSection(currentSection)
    }, [pathname])

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!navRef.current) return
        const rect = navRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePos({ x, y })
    }

    return (
        <>
            {/* SVG Filter for Gooey Effect */}
            <svg className="gooey-filter">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <nav
                className={`fixed w-full z-50 transition-all duration-500 ${
                    scrolled ? 'bg-black/50 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-5'
                }`}
                onMouseMove={handleMouseMove}
                style={{
                    '--x': `${mousePos.x}%`,
                    '--y': `${mousePos.y}%`
                } as React.CSSProperties}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            CAIPO
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {/* Nav Links */}
                            <div ref={navRef} className="flex items-center space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                            activeSection === item.section 
                                                ? 'text-white' 
                                                : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <Link href="/#early-access">
                                <GlassButton className="ml-4">
                                    Get CAIPO
                                </GlassButton>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    <motion.div 
                        className="md:hidden overflow-hidden"
                        initial={false}
                        animate={{
                            height: isMobileMenuOpen ? 'auto' : 0,
                            opacity: isMobileMenuOpen ? 1 : 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }}
                    >
                        <div className="mt-4 p-4 rounded-2xl bg-white/5 backdrop-blur-lg space-y-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="block px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-2">
                                <GlassButton 
                                    href="/#early-access" 
                                    className="w-full text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Get CAIPO
                                </GlassButton>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </>
    )
}