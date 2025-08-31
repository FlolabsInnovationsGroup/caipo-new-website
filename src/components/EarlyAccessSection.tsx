'use client'

import { motion } from 'framer-motion'
import GlassCard from './GlassCard'
import EarlyAccessForm from './EarlyAccessForm'
import { usePathname } from 'next/navigation'

export default function EarlyAccessSection() {
    const pathname = usePathname()
    const source = pathname === '/' ? 'homepage' : pathname.slice(1)

    return (
        <div id="early-access">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_50%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    className="max-w-3xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Be Among the First
                    </h2>
                    <p className="text-gray-400 text-lg mb-12">
                        Join our early access list to be notified when CAIPO becomes available. 
                        Get exclusive first access and help shape the future of AI assistance.
                    </p>

                    <GlassCard className="max-w-2xl mx-auto">
                        <EarlyAccessForm source={source} />
                    </GlassCard>

                    {/* Additional info */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">Early Access Benefits</h3>
                            <p className="text-gray-400">Get exclusive first access to new features and updates</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">Priority Support</h3>
                            <p className="text-gray-400">Direct line to our development team for feedback</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">Shape the Future</h3>
                            <p className="text-gray-400">Help influence CAIPO&apos;s development direction</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}