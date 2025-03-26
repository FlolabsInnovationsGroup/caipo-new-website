import { render, screen, fireEvent } from '@testing-library/react'
import PricingCard from '@/components/PricingCard'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="motion-div" {...props}>{children}</div>,
    li: ({ children, ...props }: any) => <li data-testid="motion-li" {...props}>{children}</li>
  }
}))

describe('PricingCard', () => {
  const mockProps = {
    name: 'Basic Plan',
    price: '10',
    description: 'Perfect for starters',
    features: ['Feature 1', 'Feature 2'],
    index: 0
  }

  it('renders basic plan information', () => {
    render(<PricingCard {...mockProps} />)
    
    expect(screen.getByText('Basic Plan')).toBeInTheDocument()
    expect(screen.getByText(/\$10/)).toBeInTheDocument()
    expect(screen.getByText('Perfect for starters')).toBeInTheDocument()
  })

  it('renders features list', () => {
    render(<PricingCard {...mockProps} />)
    
    mockProps.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it('displays "Most Popular" badge when popular prop is true', () => {
    render(<PricingCard {...mockProps} popular={true} />)
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('shows "Contact Sales" button for custom pricing', () => {
    render(<PricingCard {...mockProps} price="Custom" />)
    
    expect(screen.getByText('Contact Sales')).toBeInTheDocument()
  })

  it('shows "Get Started" button for regular pricing', () => {
    render(<PricingCard {...mockProps} />)
    
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('applies hover effects on mouse enter', () => {
    render(<PricingCard {...mockProps} />)
    const card = screen.getByTestId('motion-div')
    
    fireEvent.mouseEnter(card)
    
    // Check if glow effect is visible
    const glowEffect = card.querySelector('.opacity-0')
    expect(glowEffect).toBeInTheDocument()
  })

  it('applies correct styles for popular cards', () => {
    render(<PricingCard {...mockProps} popular={true} />)
    
    // Check for popular-specific styles
    const container = screen.getByTestId('motion-div').parentElement
    expect(container).toHaveClass('md:mt-[-0.5rem]')
    
    // Check for background glow
    const backgroundGlow = container?.querySelector('.bg-gradient-to-b')
    expect(backgroundGlow).toBeInTheDocument()
  })
}) 