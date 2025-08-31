'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GlassButton from '@/components/GlassButton'

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col bg-black">
            <Navbar />

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-30" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* 404 Content */}
            <section className="flex-grow flex items-center justify-center py-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="text-9xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                        >
                            404
                        </motion.div>
                        
                        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <GlassButton href="/">
                                <span className="mr-2">←</span>
                                Back to Home
                            </GlassButton>
                            <GlassButton href="/contact">
                                Contact Support
                                <span className="ml-2">→</span>
                            </GlassButton>
                        </div>

                        {/* Quick Links */}
                        <motion.div
                            className="mt-16 text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="mb-4">You might be looking for:</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/features" className="hover:text-white transition-colors">Features</Link>
                                <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                                <Link href="/support" className="hover:text-white transition-colors">Support</Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
} 