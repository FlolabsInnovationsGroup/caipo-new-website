'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GlassCard from '@/components/GlassCard'
import GlassButton from '@/components/GlassButton'

const industries = [
    {
        title: 'Healthcare',
        description: 'Streamline patient care and medical documentation with AI assistance.',
        icon: '🏥',
        benefits: [
            'Automated medical transcription',
            'Patient data analysis',
            'Treatment recommendations',
            'Administrative task automation'
        ]
    },
    {
        title: 'Finance',
        description: 'Enhance financial operations and decision-making processes.',
        icon: '💰',
        benefits: [
            'Market trend analysis',
            'Risk assessment',
            'Automated reporting',
            'Compliance monitoring'
        ]
    },
    {
        title: 'Education',
        description: 'Transform learning experiences with intelligent assistance.',
        icon: '🎓',
        benefits: [
            'Personalized learning paths',
            'Automated grading',
            'Content generation',
            'Student progress tracking'
        ]
    },
    {
        title: 'Legal',
        description: 'Streamline legal research and document processing.',
        icon: '⚖️',
        benefits: [
            'Document analysis',
            'Case research',
            'Contract review',
            'Legal writing assistance'
        ]
    },
    {
        title: 'E-commerce',
        description: 'Optimize online retail operations and customer service.',
        icon: '🛍️',
        benefits: [
            'Inventory management',
            'Customer support automation',
            'Product recommendations',
            'Sales forecasting'
        ]
    },
    {
        title: 'Manufacturing',
        description: 'Improve production efficiency and quality control.',
        icon: '🏭',
        benefits: [
            'Quality assurance',
            'Process optimization',
            'Predictive maintenance',
            'Supply chain management'
        ]
    }
]

export default function UseCases() {
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
                            CAIPO in Action
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Discover how different industries are leveraging CAIPO to transform their operations.
                        </p>
                    </motion.div>

                    {/* Industry Use Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {industries.map((industry, index) => (
                            <motion.div
                                key={industry.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <GlassCard
                                    title={industry.title}
                                    description={`${industry.description}\n\n${industry.benefits.map(benefit => `• ${benefit}`).join('\n')}`}
                                    icon={industry.icon}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Success Stories */}
                    <motion.div 
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-3xl font-bold mb-6">
                            Success Stories
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                            Join the growing number of organizations that have transformed their operations with CAIPO.
                        </p>
                        <GlassButton href="/contact" className="text-lg px-8 py-4">
                            Talk to Our Team
                            <span className="ml-2">→</span>
                        </GlassButton>
                    </motion.div>

                    {/* Custom Solutions */}
                    <motion.div 
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="glass rounded-2xl p-12 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">
                                Need a Custom Solution?
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Our team can help you implement CAIPO in ways that best suit your specific needs and industry requirements.
                            </p>
                            <GlassButton href="/contact" variant="nav">
                                Schedule a Consultation
                            </GlassButton>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
} 