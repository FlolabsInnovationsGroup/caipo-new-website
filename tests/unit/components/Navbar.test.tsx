import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '@/components/Navbar'


jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      // Filter out Framer Motion specific props
      const { initial, animate, exit, transition, variants, whileHover, whileTap, whileInView, viewport, ...rest } = props
      return (
        <div data-testid="motion-component" data-motion-props={JSON.stringify({ initial, animate, exit, transition, variants, whileHover, whileTap, whileInView, viewport })} {...rest}>
          {children}
        </div>
      )
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => [true, { entry: null, ref: { current: null } }],
  useScroll: () => ({
    scrollY: { get: () => 0, onChange: jest.fn() },
    scrollYProgress: { get: () => 0, onChange: jest.fn() },
  }),
  useSpring: (value: number) => value,
}))

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Navbar', () => {
  beforeEach(() => {
    // Reset window.matchMedia before each test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })
  
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the logo', () => {
    render(<Navbar />)
    expect(screen.getByText('CAIPO')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Navbar />)
    const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:flex')
    expect(desktopNav).toBeInTheDocument()
    
    const navLinks = desktopNav?.querySelector('.flex.items-center.space-x-4')
    expect(navLinks?.querySelectorAll('a').length).toBe(5) // Home, Features, Pricing, About, Contact
    expect(desktopNav?.querySelector('.nav-button')).toBeInTheDocument() // Get CAIPO button
  })

  it('renders mobile menu button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />)
    const hamburgerButton = screen.getByRole('button', { name: /toggle menu/i })
    const mobileMenu = screen.getByRole('navigation').querySelector('.md\\:hidden')
    expect(mobileMenu).toBeInTheDocument()
    
    const motionComponent = screen.getAllByTestId('motion-component')[1] // Second motion component is the mobile menu
    expect(motionComponent).toBeInTheDocument()
    
    // Menu should be closed initially
    const motionProps = JSON.parse(motionComponent.getAttribute('data-motion-props') || '{}')
    expect(motionProps.initial).toBe(false)
    expect(motionProps.animate).toEqual({
      height: 0,
      opacity: 0
    })
    
    // Click hamburger button
    fireEvent.click(hamburgerButton)
    
    // Menu should be open
    const updatedMotionProps = JSON.parse(motionComponent.getAttribute('data-motion-props') || '{}')
    expect(updatedMotionProps.initial).toBe(false)
    expect(updatedMotionProps.animate).toEqual({
      height: 'auto',
      opacity: 1
    })
    
    // Click hamburger button again
    fireEvent.click(hamburgerButton)
    
    // Menu should be closed
    const finalMotionProps = JSON.parse(motionComponent.getAttribute('data-motion-props') || '{}')
    expect(finalMotionProps.initial).toBe(false)
    expect(finalMotionProps.animate).toEqual({
      height: 0,
      opacity: 0
    })
  })

  it('renders mobile menu with all navigation links', () => {
    render(<Navbar />)
    
    // Open mobile menu
    fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }))
    
    // Wait for the mobile menu to be visible
    const motionComponent = screen.getAllByTestId('motion-component')[1]
    expect(motionComponent).toBeInTheDocument()
    
    // Check if all links are present in mobile menu
    const mobileLinks = motionComponent.querySelectorAll('a')
    expect(mobileLinks.length).toBe(6) // Home, Features, Pricing, About, Contact, Get CAIPO
  })

  it('applies correct styling to desktop navigation links', () => {
    render(<Navbar />)
    const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:flex')
    expect(desktopNav).toBeInTheDocument()
    
    const navLinks = desktopNav?.querySelector('.flex.items-center.space-x-4')?.querySelectorAll('a')
    expect(navLinks).toBeDefined()
    
    navLinks?.forEach(link => {
      if (link.textContent === 'Home') {
        expect(link.className).toContain('text-white')
      } else {
        expect(link.className).toContain('text-gray-400')
        expect(link.className).toContain('hover:text-white')
      }
      expect(link.className).toContain('transition-all')
      expect(link.className).toContain('duration-300')
    })
  })

  it('applies correct styling to Get CAIPO button', () => {
    render(<Navbar />)
    const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:flex')
    expect(desktopNav).toBeInTheDocument()
    
    const button = desktopNav?.querySelector('.nav-button')
    expect(button).toBeInTheDocument()
    expect(button?.className).toContain('nav-button')
    expect(button?.className).toContain('cursor-pointer')
  })
}) 