'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const termsContent = [
    {
        title: 'Acceptance of Terms',
        content: `By accessing and using CAIPO's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.`
    },
    {
        title: 'Use License',
        content: `CAIPO grants you a limited, non-exclusive, non-transferable, revocable license to use our services for your personal or business use, subject to these terms and conditions. This license is subject to the following restrictions:
            • You may not modify or copy our software
            • You may not use the service for any illegal purpose
            • You may not attempt to derive the source code
            • You may not create derivative works based on our service`
    },
    {
        title: 'User Responsibilities',
        content: `As a user of CAIPO, you are responsible for:
            • Maintaining the confidentiality of your account
            • All activities that occur under your account
            • Ensuring your use complies with all applicable laws
            • Providing accurate information
            • Using the service in a reasonable manner`
    },
    {
        title: 'Service Modifications',
        content: `CAIPO reserves the right to:
            • Modify or discontinue any part of our service
            • Change our pricing with reasonable notice
            • Update these terms of service
            • Limit service availability in any geographic location`
    },
    {
        title: 'Intellectual Property',
        content: `All content, features, and functionality of CAIPO, including but not limited to:
            • Software code
            • User interface
            • Text and graphics
            • Logos and trademarks
            • AI models and algorithms
        Are the exclusive property of CAIPO and are protected by international copyright, trademark, and other intellectual property laws.`
    },
    {
        title: 'Limitation of Liability',
        content: `CAIPO and its affiliates shall not be liable for:
            • Direct, indirect, or consequential damages
            • Loss of profits or data
            • Business interruption
            • Any damages arising from use of our service
            • Technical issues or service interruptions`
    },
    {
        title: 'Termination',
        content: `We may terminate or suspend your account and access to our services:
            • For violations of these terms
            • At our sole discretion
            • Without prior notice
            • Without liability to you`
    }
]

export default function Terms() {
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
                            Terms of Service
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Please read these terms carefully before using CAIPO&apos;s services.
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

                    {/* Terms Content */}
                    <div className="max-w-4xl mx-auto">
                        {termsContent.map((section, index) => (
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
                            Questions About Our Terms?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                            If you have any questions about our terms of service, 
                            please contact our legal team.
                        </p>
                        <a 
                            href="mailto:legal@caipo.ai"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            legal@caipo.ai
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
} 