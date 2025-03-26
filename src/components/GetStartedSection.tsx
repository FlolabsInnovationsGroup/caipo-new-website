'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassButton from './GlassButton'

export default function GetStartedSection() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        
        // TODO: Implement actual waitlist signup
        // Simulating API call
        setTimeout(() => {
            setStatus('success')
            setMessage('Thanks for joining! We\'ll be in touch soon.')
            setEmail('')
        }, 1000)
    }

    return (
        <section id="get-caipo" className="py-24 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-blue-500/10" />
            
            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        Get Early Access
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join our waitlist to be among the first to experience the future of AI assistance.
                    </p>

                    {/* Signup form */}
                    <form role="form" onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="glass p-2 rounded-full flex items-center mb-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-2 bg-transparent border-none outline-none text-white placeholder-gray-400"
                                required
                            />
                            <GlassButton
                                type="submit"
                                disabled={status === 'loading'}
                                className="ml-2"
                            >
                                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                            </GlassButton>
                        </div>
                        
                        {/* Status message */}
                        {message && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-sm ${
                                    status === 'success' ? 'text-green-400' : 'text-red-400'
                                }`}
                            >
                                {message}
                            </motion.p>
                        )}
                    </form>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400 text-sm"
                    >
                        <div className="flex items-center">
                            <span className="mr-2">🔒</span>
                            No credit card required
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">✨</span>
                            Priority access to new features
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">🎯</span>
                            Cancel anytime
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
} 