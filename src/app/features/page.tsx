'use client'

import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GlassButton from '@/components/GlassButton'
import GlassCard from '@/components/GlassCard'
import { motion } from 'framer-motion'
import StructuredData from '@/components/StructuredData'
import { generateSoftwareApplicationSchema, generateBreadcrumbSchema } from '@/lib/structuredData'

const features = [
    {
        title: 'Voice Interaction',
        description: 'Natural conversations with advanced context understanding',
        icon: '🎙️',
        status: 'In Development',
        details: [
            'Multi-language support',
            'Context-aware responses',
            'Natural language processing',
            'Voice identification',
            'Ambient noise filtering'
        ]
    },
    {
        title: 'Visual Intelligence',
        description: 'See and understand the world around you',
        icon: '👁️',
        status: 'Coming Soon',
        details: [
            'Object recognition',
            'Text recognition (OCR)',
            'Scene understanding',
            'Visual search',
            'AR capabilities'
        ]
    },
    {
        title: 'Smart Automation',
        description: 'Streamline your workflow with intelligent automation',
        icon: '⚡',
        status: 'In Development',
        details: [
            'Task automation',
            'Workflow optimization',
            'Schedule management',
            'Smart reminders',
            'Process learning'
        ]
    },
    {
        title: 'Data Security',
        description: 'Enterprise-grade security for your peace of mind',
        icon: '🔒',
        status: 'In Development',
        details: [
            'End-to-end encryption',
            'Secure data storage',
            'Privacy controls',
            'Compliance ready',
            'Regular security audits'
        ]
    },
    {
        title: 'Seamless Integration',
        description: 'Works with your favorite tools and services',
        icon: '🔄',
        status: 'Planned',
        details: [
            'API connectivity',
            'Cross-platform sync',
            'Cloud integration',
            'Custom webhooks',
            'Third-party apps'
        ]
    },
    {
        title: 'Learning & Adaptation',
        description: 'Gets smarter and more helpful over time',
        icon: '🧠',
        status: 'In Development',
        details: [
            'Behavioral learning',
            'Preference adaptation',
            'Pattern recognition',
            'Continuous improvement',
            'Personalized assistance'
        ]
    }
]

const softwareAppData = {
  name: 'CAIPO',
  description: 'AI-powered assistant for intelligent automation, voice interaction, and visual understanding.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: [
    {
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString(),
    }
  ]
}

const breadcrumbData = [
  { name: 'Home', url: 'https://caipo.ai' },
  { name: 'Features', url: 'https://caipo.ai/features' }
]

export default function Features() {
    return (
        <>
            <StructuredData data={generateSoftwareApplicationSchema(softwareAppData)} />
            <StructuredData data={generateBreadcrumbSchema(breadcrumbData)} />
            
            <main className="min-h-screen flex flex-col bg-black">
                <Navbar />

                {/* Background Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-30" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-30" />
                </div>

                {/* Hero Section */}
                <section className="pt-32 pb-20 relative">
                    <div className="container mx-auto px-6">
                        <motion.div 
                            className="text-center max-w-4xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Development Status Badge */}
                            <div className="inline-block mb-6">
                                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
                                    In Development
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                CAIPO Features
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Discover the capabilities we&apos;re building to transform your daily interactions with technology
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 relative">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {features.map((feature, index) => (
                                <GlassCard
                                    key={feature.title}
                                    title={feature.title}
                                    description={feature.description}
                                    icon={feature.icon}
                                >
                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            feature.status === 'In Development' ? 'bg-purple-500/20 text-purple-400' :
                                            feature.status === 'Coming Soon' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>
                                            {feature.status}
                                        </span>
                                    </div>

                                    <ul className="mt-4 space-y-2">
                                        {feature.details.map((detail, i) => (
                                            <motion.li
                                                key={detail}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center text-sm text-gray-300"
                                            >
                                                <span className="mr-2 text-purple-400">•</span>
                                                {detail}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 relative">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div
                            className="max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                Ready to Experience CAIPO?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Join our waitlist to be among the first to try these amazing features
                            </p>
                            <GlassButton href="#early-access" className="text-lg px-8 py-4">
                                Join Early Access
                                <span className="ml-2">✨</span>
                            </GlassButton>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}