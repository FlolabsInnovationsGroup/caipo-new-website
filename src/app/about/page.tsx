'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GlassButton from '@/components/GlassButton'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
    return (
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
                        className="text-center mb-8"
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
                        
                        <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                            About CAIPO
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            We're building the next generation of AI assistance, designed to transform how you interact with technology.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Vision */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <motion.div 
                        className="glass p-8 md:p-12 rounded-2xl max-w-4xl mx-auto backdrop-blur-xl border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Our Vision</h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <p>
                                CAIPO began with a simple question: How can we make AI more accessible and helpful in everyday life? Our vision is to create an AI assistant that seamlessly integrates into your workflow, making technology work for you, not the other way around.
                            </p>
                            <p>
                                Currently in active development, CAIPO is being built with a focus on natural interaction, privacy, and genuine utility. We're combining cutting-edge AI technology with intuitive design to create an assistant that truly understands and adapts to your needs.
                            </p>
                            <p>
                                We believe in transparency and building in public. As we develop CAIPO, we're committed to sharing our progress and gathering feedback from our community to create something truly valuable.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <motion.h2 
                        className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Meet Our Team
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Team member cards */}
                        <motion.div 
                            className="glass p-8 rounded-2xl text-center backdrop-blur-xl border border-white/10 relative group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 animate-gradient" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Jane Doe</h3>
                            <p className="text-blue-400 mb-4">Founder & CEO</p>
                            <p className="text-gray-300">AI researcher with 10+ years of experience in developing intelligent systems.</p>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </motion.div>

                        <motion.div 
                            className="glass p-8 rounded-2xl text-center backdrop-blur-xl border border-white/10 relative group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 animate-gradient" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">John Smith</h3>
                            <p className="text-blue-400 mb-4">CTO</p>
                            <p className="text-gray-300">Expert in robotics and hardware design with multiple patents to his name.</p>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </motion.div>

                        <motion.div 
                            className="glass p-8 rounded-2xl text-center backdrop-blur-xl border border-white/10 relative group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Alex Johnson</h3>
                            <p className="text-blue-400 mb-4">Head of Design</p>
                            <p className="text-gray-300">UX/UI expert focused on creating intuitive and accessible technology.</p>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-blue-900/10 backdrop-blur-3xl" />
                <div className="container mx-auto px-6 py-12 relative">
                    <motion.h2 
                        className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Our Values
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        {[
                            { icon: '🔍', title: 'Transparency', desc: 'We believe in being open about our development process and progress.' },
                            { icon: '🔒', title: 'Privacy', desc: 'Your data belongs to you. Privacy is fundamental to our design, not an afterthought.' },
                            { icon: '💡', title: 'Innovation', desc: 'We\'re pushing the boundaries of AI technology while keeping it practical and useful.' },
                            { icon: '🤝', title: 'Collaboration', desc: 'CAIPO is designed to enhance human capabilities, not replace them.' },
                            { icon: '♻️', title: 'Sustainability', desc: 'We\'re building for the long term, with scalable and efficient solutions.' },
                            { icon: '🌍', title: 'Accessibility', desc: 'We\'re committed to making our technology available and useful for everyone.' }
                        ].map((value, index) => (
                            <motion.div 
                                key={value.title}
                                className="glass p-8 rounded-2xl text-center backdrop-blur-xl border border-white/10 relative group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-300">{value.desc}</p>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </motion.div>
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Join Our Journey
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Be among the first to experience CAIPO and help shape the future of AI assistance.
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
    )
}