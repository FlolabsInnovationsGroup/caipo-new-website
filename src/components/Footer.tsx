'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer className="relative mt-20">
            {/* Gradient background effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-purple-500/10" />
            
            {/* Glass container */}
            <motion.div 
                className="relative glass backdrop-blur-md bg-black/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="container px-6 py-16 mx-auto">
                    {/* Main footer content */}
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                        {/* CAIPO Section with enhanced branding */}
                        <div className="space-y-6">
                            <motion.div 
                                className="flex items-center space-x-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Image 
                                    src="/logo.svg?v=2" 
                                    alt="CAIPO Logo" 
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                                <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                                    CAIPO
                                </h3>
                            </motion.div>
                            <p className="text-sm leading-relaxed text-gray-300">
                                Your next-generation AI assistant, designed to transform your productivity.
                            </p>
                            {/* Social links with hover effects */}
                            <div className="flex pt-4 space-x-4">
                                <motion.a 
                                    href="#" 
                                    className="p-2 transition-colors rounded-full bg-white/5 hover:bg-white/10"
                                    whileHover={{ y: -2, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </motion.a>
                                <motion.a 
                                    href="#" 
                                    className="p-2 transition-colors rounded-full bg-white/5 hover:bg-white/10"
                                    whileHover={{ y: -2, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </motion.a>
                            </div>
                        </div>

                        {/* Navigation Columns with hover effects */}
                        {[
                            {
                                title: "Product",
                                links: [
                                    { href: "/features", label: "Features" },
                                    { href: "/pricing", label: "Pricing" },
                                    { href: "/use-cases", label: "Use Cases" }
                                ]
                            },
                            {
                                title: "Company",
                                links: [
                                    { href: "/about", label: "About Us" },
                                    { href: "/support", label: "Support" },
                                    { href: "/contact", label: "Contact" }
                                ]
                            },
                            {
                                title: "Legal",
                                links: [
                                    { href: "/security", label: "Security" },
                                    { href: "/privacy", label: "Privacy" },
                                    { href: "/terms", label: "Terms" }
                                ]
                            }
                        ].map((column, i) => (
                            <div key={column.title} className="space-y-4">
                                <motion.h4 
                                    className="text-lg font-medium text-white/90"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {column.title}
                                </motion.h4>
                                <ul className="space-y-3">
                                    {column.links.map((link, j) => (
                                        <motion.li 
                                            key={link.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (i * 0.1) + (j * 0.05) }}
                                        >
                                            <Link 
                                                href={link.href}
                                                className="inline-block px-2 py-1 text-sm text-gray-400 transition-all duration-200 rounded-lg hover:text-white hover:bg-white/5"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </footer>
    )
}