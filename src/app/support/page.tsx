'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GlassCard from '@/components/GlassCard'
import FAQAccordion from '@/components/FAQAccordion'
import GlassButton from '@/components/GlassButton'

const supportCategories = [
    {
        title: 'Getting Started',
        description: 'New to CAIPO? Learn the basics and set up your account with our step-by-step guides.',
        icon: '🚀',
    },
    {
        title: 'User Guide',
        description: 'Explore detailed documentation on all CAIPO features and capabilities.',
        icon: '📚',
    },
    {
        title: 'API Documentation',
        description: 'Technical guides and references for integrating with CAIPO\'s API.',
        icon: '⚙️',
    },
    {
        title: 'Troubleshooting',
        description: 'Find solutions to common issues and learn how to resolve them quickly.',
        icon: '🔧',
    }
]

const contactMethods = [
    {
        title: 'Live Chat',
        description: 'Get instant help from our support team, available 24/7 for all your questions.',
        icon: '💬',
    },
    {
        title: 'Email Support',
        description: 'Send us a detailed message and we\'ll respond within 24 hours.',
        icon: '📧',
    },
    {
        title: 'Phone Support',
        description: 'Available for Enterprise customers with priority support needs.',
        icon: '📞',
    },
    {
        title: 'Community Forum',
        description: 'Connect with other CAIPO users and share solutions.',
        icon: '👥',
    }
]

const resourceCategories = [
    {
        title: 'Video Tutorials',
        description: 'Watch step-by-step guides on using CAIPO\'s features effectively.',
        icon: '🎥',
    },
    {
        title: 'Best Practices',
        description: 'Learn expert tips and strategies for getting the most out of CAIPO.',
        icon: '⭐',
    },
    {
        title: 'Integration Guides',
        description: 'Detailed instructions for connecting CAIPO with your existing tools.',
        icon: '🔄',
    },
    {
        title: 'Release Notes',
        description: 'Stay updated with the latest features and improvements.',
        icon: '📝',
    }
]

export default function Support() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-32 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold mb-6">How can we help you?</h1>
                    <p className="text-xl text-gray-300 mb-8">Find the answers you need with our comprehensive support resources</p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search for help articles..."
                            className="w-full px-6 py-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-30" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-30" />
            </div>

            {/* Support Categories */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Support Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {supportCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <GlassCard
                                title={category.title}
                                description={category.description}
                                icon={category.icon}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Methods */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactMethods.map((method, index) => (
                        <motion.div
                            key={method.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <GlassCard
                                title={method.title}
                                description={method.description}
                                icon={method.icon}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Learning Resources */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Learning Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resourceCategories.map((resource, index) => (
                        <motion.div
                            key={resource.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <GlassCard
                                title={resource.title}
                                description={resource.description}
                                icon={resource.icon}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Enterprise Support */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold mb-6">Need Enterprise Support?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Get priority access to our support team, dedicated account management, and custom solutions tailored to your business needs.
                    </p>
                    <GlassButton>Contact Sales</GlassButton>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
} 