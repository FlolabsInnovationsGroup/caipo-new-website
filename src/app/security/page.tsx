'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GlassCard from '@/components/GlassCard'

const securityFeatures = [
    {
        title: 'End-to-End Encryption',
        description: 'All data transmitted through CAIPO is protected with military-grade encryption.',
        icon: '🔐',
        details: [
            'AES-256 encryption',
            'Zero-knowledge architecture',
            'Secure key management',
            'Protected data at rest'
        ]
    },
    {
        title: 'Access Control',
        description: 'Robust authentication and authorization systems to protect your account.',
        icon: '🔑',
        details: [
            'Two-factor authentication',
            'Role-based access control',
            'Session management',
            'Login monitoring'
        ]
    },
    {
        title: 'Data Protection',
        description: 'Your data is protected with multiple layers of security.',
        icon: '🛡️',
        details: [
            'Regular backups',
            'Data redundancy',
            'Disaster recovery',
            'Geographic distribution'
        ]
    },
    {
        title: 'Compliance',
        description: 'We adhere to international security standards and regulations.',
        icon: '📜',
        details: [
            'GDPR compliance',
            'SOC 2 certification',
            'ISO 27001 certified',
            'Regular audits'
        ]
    }
]

export default function Security() {
    return (
        <main className="min-h-screen flex flex-col bg-black">
            <Navbar />

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-30" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative">
                <div className="container mx-auto px-6">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Security First
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Your security is our top priority. Learn about our comprehensive security measures.
                        </p>
                    </motion.div>

                    {/* Security Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                        {securityFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <GlassCard
                                    title={feature.title}
                                    description={`${feature.description}\n\n${feature.details.map(detail => `• ${detail}`).join('\n')}`}
                                    icon={feature.icon}
                                    className="h-full"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Security Information */}
                    <motion.div 
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            Our Security Commitment
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We continuously monitor and update our security measures to ensure your data remains protected. 
                            Our team of security experts works around the clock to maintain the highest standards of protection.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
} 