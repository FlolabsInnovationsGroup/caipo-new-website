import React from 'react'
import { render, screen } from '@testing-library/react'
import PricingCard from '@/components/PricingCard'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="motion-div" {...props}>{children}</div>,
    li: ({ children, ...props }: any) => <li data-testid="motion-li" {...props}>{children}</li>
  }
}))

describe('PricingCard', () => {
  const defaultProps = {
    name: 'Basic Plan',
    price: '10',
    description: 'Perfect for starters',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    index: 0
  }

  it('renders pricing card with all props', () => {
    render(<PricingCard {...defaultProps} />)

    expect(screen.getByText('Basic Plan')).toBeInTheDocument()
    expect(screen.getByText(/\$10/)).toBeInTheDocument()
    expect(screen.getByText('Perfect for starters')).toBeInTheDocument()
    defaultProps.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('displays "Most Popular" badge when popular prop is true', () => {
    render(<PricingCard {...defaultProps} popular={true} />)
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('shows "Contact Sales" button for custom pricing', () => {
    render(<PricingCard {...defaultProps} price="Custom" />)
    expect(screen.getByText('Contact Sales')).toBeInTheDocument()
  })

  it('applies hover effects', () => {
    render(<PricingCard {...defaultProps} />)
    const card = screen.getByTestId('motion-div')
    
    // Simulate hover
    card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    
    // Check for glow effect
    const glowEffect = card.querySelector('.opacity-0')
    expect(glowEffect).toBeInTheDocument()
  })

  it('applies correct styles for popular cards', () => {
    render(<PricingCard {...defaultProps} popular={true} />)
    
    // Check for popular-specific styles
    const container = screen.getByTestId('motion-div').parentElement
    expect(container).toHaveClass('md:mt-[-0.5rem]')
    
    // Check for background glow
    const backgroundGlow = container?.querySelector('.bg-gradient-to-b')
    expect(backgroundGlow).toBeInTheDocument()
  })
}) 