'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const privacyContent = [
    {
        title: 'Data Collection',
        content: `We collect only the information necessary to provide you with the best possible service. This includes:
            • Basic account information
            • Usage data to improve our services
            • Technical data for functionality
            • Communication data when you contact us`
    },
    {
        title: 'How We Use Your Data',
        content: `Your data is used exclusively for:
            • Providing and improving our services
            • Personalizing your experience
            • Communication about your account
            • Security and fraud prevention`
    },
    {
        title: 'Data Protection',
        content: `We implement robust measures to protect your data:
            • End-to-end encryption
            • Regular security audits
            • Strict access controls
            • Secure data storage`
    },
    {
        title: 'Your Rights',
        content: `You have full control over your data:
            • Access your personal data
            • Request data correction
            • Delete your account
            • Export your data
            • Opt-out of data collection`
    },
    {
        title: 'Cookie Policy',
        content: `We use cookies to:
            • Maintain your session
            • Remember your preferences
            • Analyze site usage
            • Improve user experience`
    },
    {
        title: 'Third-Party Services',
        content: `We may use trusted third-party services for:
            • Analytics
            • Payment processing
            • Email communication
            • Cloud storage`
    }
]

export default function Privacy() {
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
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We are committed to protecting your privacy and ensuring the security of your personal information.
                        </p>
                    </motion.div>

                    {/* Last Updated */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
                    </motion.div>

                    {/* Privacy Content */}
                    <div className="max-w-4xl mx-auto">
                        {privacyContent.map((section, index) => (
                            <motion.div
                                key={section.title}
                                className="mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="glass rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        {section.title}
                                    </h2>
                                    <div className="text-gray-300 whitespace-pre-line">
                                        {section.content}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <motion.div 
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            Questions About Privacy?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                            If you have any questions about our privacy policy or how we handle your data, 
                            please don't hesitate to contact our privacy team.
                        </p>
                        <a 
                            href="mailto:privacy@caipo.ai"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            privacy@caipo.ai
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
} 