import * as React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import HeroSection from '@/components/HeroSection'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<{}>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.PropsWithChildren<{}>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.PropsWithChildren<{}>) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: React.PropsWithChildren<{}>) => <section {...props}>{children}</section>,
    span: ({ children, ...props }: React.PropsWithChildren<{}>) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<{}>) => <>{children}</>,
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('HeroSection', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the main heading', () => {
    render(<HeroSection />)
    expect(screen.getByText('Meet')).toBeInTheDocument()
    // Look for CAIPO text within the h1 element
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('CAIPO')
  })

  it('renders the development status badge', () => {
    render(<HeroSection />)
    expect(screen.getByText('In Development')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Your future AI companion/)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<HeroSection />)
    expect(screen.getByText('Join Waitlist')).toBeInTheDocument()
    expect(screen.getByText('Learn More')).toBeInTheDocument()
  })

  it('renders the word carousel', () => {
    render(<HeroSection />)
    expect(screen.getByText('CAIPO will')).toBeInTheDocument()
    expect(screen.getByText('assist')).toBeInTheDocument()
  })

  it('cycles through words in the carousel', () => {
    render(<HeroSection />)
    
    // Initial word
    expect(screen.getByText('assist')).toBeInTheDocument()
    
    // Advance timer to trigger word change
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    
    // Next word should be visible
    expect(screen.getByText('learn')).toBeInTheDocument()
  })

  it('renders the device image', () => {
    render(<HeroSection />)
    const image = screen.getByAltText('CAIPO Device')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/Adobe Express - file.png')
  })

  it('cycles through notifications', () => {
    render(<HeroSection />)
    
    // Initial notification
    expect(screen.getByText('Coming Soon')).toBeInTheDocument()
    expect(screen.getByText('CAIPO is in active development')).toBeInTheDocument()
    
    // Advance timer to trigger notification change
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    
    // Next notification should be visible
    expect(screen.getByText('Early Access')).toBeInTheDocument()
    expect(screen.getByText('Join the waitlist for early access')).toBeInTheDocument()
  })

  it('handles mouse movement for 3D effect', () => {
    render(<HeroSection />)
    const section = screen.getByRole('region')
    
    // Trigger mouse move event at the center of the section
    fireEvent.mouseMove(section, {
      clientX: 100,
      clientY: 100,
    })
    
    // The mouse move handler should be called without errors
    // Note: The 3D effect is handled internally through state updates
    expect(section).toBeInTheDocument()
  })

  it('renders CTA buttons with correct href attributes', () => {
    render(<HeroSection />)
    
    const joinWaitlistButton = screen.getByText('Join Waitlist').closest('a')
    const learnMoreButton = screen.getByText('Learn More').closest('a')
    
    expect(joinWaitlistButton).toHaveAttribute('href', '#early-access')
    expect(learnMoreButton).toHaveAttribute('href', '#features')
  })
}) 