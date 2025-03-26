import { render, screen, act } from '@testing-library/react'
import WordCarousel from '@/components/WordCarousel'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}))

describe('WordCarousel', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the first word initially', () => {
    render(<WordCarousel />)
    expect(screen.getByText('transform')).toBeInTheDocument()
  })

  it('rotates through words at the correct interval', () => {
    render(<WordCarousel />)
    
    // Initial word
    expect(screen.getByText('transform')).toBeInTheDocument()
    
    // After 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('automate')).toBeInTheDocument()
    
    // After another 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByText('analyze')).toBeInTheDocument()
  })

  it('cycles back to the beginning after reaching the end', () => {
    render(<WordCarousel />)
    
    // Advance through all words
    const words = ['transform', 'automate', 'analyze', 'organize', 'assist', 'simplify']
    words.forEach(() => {
      act(() => {
        jest.advanceTimersByTime(3000)
      })
    })
    
    // Should be back to the first word
    expect(screen.getByText('transform')).toBeInTheDocument()
  })

  it('cleans up interval on unmount', () => {
    const { unmount } = render(<WordCarousel />)
    
    // Create a spy for clearInterval
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    
    // Unmount the component
    unmount()
    
    // Check if clearInterval was called
    expect(clearIntervalSpy).toHaveBeenCalled()
    
    clearIntervalSpy.mockRestore()
  })
}); 