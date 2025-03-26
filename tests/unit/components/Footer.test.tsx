import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<{}>) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: React.PropsWithChildren<{}>) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: React.PropsWithChildren<{}>) => <h4 {...props}>{children}</h4>,
    li: ({ children, ...props }: React.PropsWithChildren<{}>) => <li {...props}>{children}</li>,
    a: ({ children, ...props }: React.PropsWithChildren<{}>) => <a {...props}>{children}</a>,
  },
}))

describe('Footer', () => {
  it('renders the CAIPO branding section', () => {
    render(<Footer />)
    
    expect(screen.getByText('CAIPO')).toBeInTheDocument()
    expect(screen.getByText(/Your next-generation AI assistant/)).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Footer />)
    const socialLinks = screen.getAllByRole('link').filter(link => {
      const svg = link.querySelector('svg')
      return svg && link.classList.contains('bg-white/5')
    })
    expect(socialLinks).toHaveLength(2) // Twitter and LinkedIn
  })

  it('renders all navigation columns', () => {
    render(<Footer />)
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Use Cases')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(<Footer />)
    expect(screen.getByText('Privacy')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('renders all navigation links with correct count', () => {
    render(<Footer />)
    
    // Total number of navigation links (excluding social media)
    const navigationLinks = screen.getAllByRole('link')
    expect(navigationLinks).toHaveLength(11) // 9 navigation links + 2 social media links
  })

  it('applies correct styling classes', () => {
    render(<Footer />)
    
    // Check footer container
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('relative', 'mt-20')
    
    // Check navigation links styling
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      if (link.textContent) { // Only check navigation links, not social media icons
        expect(link).toHaveClass('text-gray-400', 'hover:text-white', 'hover:bg-white/5')
      }
    })
  })

  it('renders the correct number of navigation columns', () => {
    render(<Footer />)
    
    const columns = screen.getAllByRole('heading', { level: 4 })
    expect(columns).toHaveLength(3) // Product, Company, Legal
  })

  it('applies correct styling to links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    const navigationLink = links.find(link => link.textContent === 'Features')
    expect(navigationLink).toHaveClass('text-sm', 'text-gray-400', 'hover:text-white')
  })
}) 