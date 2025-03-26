import * as React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FeaturesSection from '@/components/FeaturesSection'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<{}>) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: React.PropsWithChildren<{}>) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: React.PropsWithChildren<{}>) => <p {...props}>{children}</p>,
    li: ({ children, ...props }: React.PropsWithChildren<{}>) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<{}>) => <>{children}</>,
}))

describe('FeaturesSection', () => {
  it('renders section title and description', () => {
    render(<FeaturesSection />)
    
    expect(screen.getByText('Building the Future of AI')).toBeInTheDocument()
    expect(screen.getByText(/CAIPO is being developed with cutting-edge features/)).toBeInTheDocument()
  })

  it('renders all feature cards', () => {
    render(<FeaturesSection />)
    
    expect(screen.getByText('AI-Powered Intelligence')).toBeInTheDocument()
    expect(screen.getByText('Voice & Visual')).toBeInTheDocument()
    expect(screen.getByText('Smart Integration')).toBeInTheDocument()
  })

  it('displays feature status badges', () => {
    render(<FeaturesSection />)
    
    expect(screen.getByText('In Development')).toBeInTheDocument()
    expect(screen.getByText('Coming Soon')).toBeInTheDocument()
    expect(screen.getByText('Planned')).toBeInTheDocument()
  })

  it('expands feature details when clicked', () => {
    render(<FeaturesSection />)
    
    // Initially, feature details should not be visible
    expect(screen.queryByText('Natural language processing for intuitive interactions')).not.toBeInTheDocument()
    
    // Click the AI-Powered Intelligence card
    fireEvent.click(screen.getByText('AI-Powered Intelligence'))
    
    // Feature details should now be visible
    expect(screen.getByText('Natural language processing for intuitive interactions')).toBeInTheDocument()
    expect(screen.getByText('Adaptive learning from user preferences')).toBeInTheDocument()
    expect(screen.getByText('Context-aware responses and suggestions')).toBeInTheDocument()
    expect(screen.getByText('Personalized experience tailored to you')).toBeInTheDocument()
  })

  it('collapses feature details when clicked again', () => {
    render(<FeaturesSection />)
    
    // Click to expand
    fireEvent.click(screen.getByText('AI-Powered Intelligence'))
    expect(screen.getByText('Natural language processing for intuitive interactions')).toBeInTheDocument()
    
    // Click again to collapse
    fireEvent.click(screen.getByText('AI-Powered Intelligence'))
    expect(screen.queryByText('Natural language processing for intuitive interactions')).not.toBeInTheDocument()
  })

  it('closes previously expanded feature when opening a new one', () => {
    render(<FeaturesSection />)
    
    // Expand first feature
    fireEvent.click(screen.getByText('AI-Powered Intelligence'))
    expect(screen.getByText('Natural language processing for intuitive interactions')).toBeInTheDocument()
    
    // Expand second feature
    fireEvent.click(screen.getByText('Voice & Visual'))
    
    // First feature should be collapsed
    expect(screen.queryByText('Natural language processing for intuitive interactions')).not.toBeInTheDocument()
    // Second feature should be expanded
    expect(screen.getByText('Voice command recognition and processing')).toBeInTheDocument()
  })

  it('renders feature icons', () => {
    render(<FeaturesSection />)
    
    // Check if icons are rendered (by their parent elements since icons are SVGs)
    const iconContainers = screen.getAllByTestId(/icon/i)
    expect(iconContainers).toHaveLength(3)
  })
}) 