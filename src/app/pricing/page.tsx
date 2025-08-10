'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import { motion } from 'framer-motion'

const pricingPlans = [
	{
		name: 'Basic',
		price: 'Included',
		description: 'Perfect for individual users',
		features: [
			'Basic AI assistance',
			'Voice commands',
			'Document scanning',
			'Cloud storage',
			'Mobile app access'
		]
	},
	{
		name: 'Pro',
		price: '$99/mo',
		description: 'Ideal for professionals',
		features: [
			'Everything in Basic',
			'Advanced automation',
			'Priority processing',
			'Extended storage',
			'API access',
			'Premium support'
		],
		popular: true
	},
	{
		name: 'Enterprise',
		price: 'Contact Us',
		description: 'For organizations',
		features: [
			'Everything in Pro',
			'Custom integrations',
			'Dedicated support',
			'Unlimited storage',
			'Team management',
			'Advanced security'
		]
	}
]

export default function Pricing() {
	return (
		<main className="min-h-screen flex flex-col bg-black">
			<Navbar />

			{/* Background Elements */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden">
				<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-30" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-30" />
			</div>

			{/* Pricing Section */}
			<section className="pt-32 pb-20 relative">
				<div className="container mx-auto px-6">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						{/* Development Status Badge */}
						<div className="inline-block mb-6">
							<span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm">
								In Development
							</span>
						</div>

						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Simple, Transparent Pricing
						</h1>
						<p className="text-xl text-gray-400 max-w-2xl mx-auto">
							While CAIPO is in development, join our early access program to help
							shape our pricing and features
						</p>
					</motion.div>

					{/* Pricing Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{pricingPlans.map((plan, index) => (
							<PricingCard key={plan.name} {...plan} index={index} />
						))}
					</div>

					{/* Early Access Section */}
					<motion.div
						className="mt-20 text-center"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl font-bold mb-4">Join Early Access</h2>
						<p className="text-gray-400 mb-8">
							Get exclusive access to CAIPO during our development phase and help
							shape its future.
						</p>
						<div className="flex justify-center">
							<motion.a
								href="#early-access"
								className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all duration-200"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Sign Up for Early Access
								<span className="ml-2">✨</span>
							</motion.a>
						</div>
					</motion.div>
				</div>
			</section>

			<Footer />
		</main>
	)
}