'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
  className?: string
}

export default function FAQAccordion({ faqs, className = '' }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className={`space-y-4 max-w-3xl mx-auto ${className}`}>
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="glass rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          data-testid="motion-div"
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span className="font-medium text-lg">{faq.question}</span>
            <motion.span
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-purple-500"
              data-testid="faq-icon"
              data-state={activeIndex === index ? 'open' : 'closed'}
            >
              ↓
            </motion.span>
          </button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                data-testid="motion-div"
              >
                <div className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
} 