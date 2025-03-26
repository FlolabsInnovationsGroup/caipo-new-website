'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainCircuit, Sparkles, Blocks } from 'lucide-react'
import GlassCard from './GlassCard'

const features = [
    {
        title: "AI-Powered Intelligence",
        description: "Advanced AI capabilities designed to understand and adapt to your needs",
        icon: BrainCircuit,
        details: [
            "Natural language processing for intuitive interactions",
            "Adaptive learning from user preferences",
            "Context-aware responses and suggestions",
            "Personalized experience tailored to you"
        ],
        status: "In Development"
    },
    {
        title: "Voice & Visual",
        description: "Seamless interaction through voice commands and visual interfaces",
        icon: Sparkles,
        details: [
            "Voice command recognition and processing",
            "Visual interface for intuitive control",
            "Multi-modal interaction support",
            "Real-time response system"
        ],
        status: "Coming Soon"
    },
    {
        title: "Smart Integration",
        description: "Designed to work seamlessly with your existing tools and workflows",
        icon: Blocks,
        details: [
            "Cross-platform compatibility",
            "API integration capabilities",
            "Workflow automation tools",
            "Extensible plugin system"
        ],
        status: "Planned"
    }
]

export default function FeaturesSection() {
    const [expandedId, setExpandedId] = useState<number | null>(null)

    return (
        <section id="features" className="py-24 bg-black relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
            
            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Building the Future of AI
                    </motion.h2>
                    <motion.p 
                        className="text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        CAIPO is being developed with cutting-edge features to revolutionize how you interact with AI. Here's what we're working on:
                    </motion.p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <GlassCard
                                className="h-full cursor-pointer group"
                                onClick={() => setExpandedId(expandedId === index ? null : index)}
                            >
                                {/* Status badge */}
                                <div className="absolute top-4 right-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        feature.status === "In Development" ? "bg-purple-500/20 text-purple-400" :
                                        feature.status === "Coming Soon" ? "bg-blue-500/20 text-blue-400" :
                                        "bg-gray-500/20 text-gray-400"
                                    }`}>
                                        {feature.status}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="mb-6" data-testid="feature-icon">
                                    <feature.icon className="w-8 h-8 text-purple-500" />
                                </div>

                                {/* Title and description */}
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 mb-4">{feature.description}</p>

                                {/* Expandable details */}
                                <AnimatePresence>
                                    {expandedId === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <ul className="space-y-2 mt-4 text-gray-400">
                                                {feature.details.map((detail, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-center"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                                        {detail}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 