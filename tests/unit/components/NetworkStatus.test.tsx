import { render, screen, act } from '@testing-library/react'
import NetworkStatus from '@/components/NetworkStatus'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="motion-div" {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}))

// Mock icons
jest.mock('lucide-react', () => ({
  WifiIcon: () => <div data-testid="wifi-icon">Wifi Icon</div>,
  WifiOffIcon: () => <div data-testid="wifi-off-icon">Wifi Off Icon</div>,
}))

describe('NetworkStatus', () => {
  let originalNavigatorOnLine: boolean

  beforeEach(() => {
    originalNavigatorOnLine = window.navigator.onLine
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true
    })
  })

  afterEach(() => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: originalNavigatorOnLine
    })
    jest.clearAllMocks()
  })

  it('shows offline status when going offline', () => {
    render(<NetworkStatus />)
    
    // Trigger offline event
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: false
    })
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })

    // Check if offline message is shown
    expect(screen.getByText('You\'re Offline')).toBeInTheDocument()
  })

  it('shows online status when going back online', () => {
    // Start offline
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: false
    })
    
    render(<NetworkStatus />)

    // Go back online
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: true
    })
    act(() => {
      window.dispatchEvent(new Event('online'))
    })

    // Check if online message is shown
    expect(screen.getByText('Back Online')).toBeInTheDocument()
  })

  it('hides status message after 3 seconds', () => {
    jest.useFakeTimers()
    render(<NetworkStatus />)

    // Trigger offline event
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      value: false
    })
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })

    // Message should be visible initially
    expect(screen.getByText('You\'re Offline')).toBeInTheDocument()

    // Fast forward 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000)
    })

    // Message should be hidden
    expect(screen.queryByText('You\'re Offline')).not.toBeInTheDocument()

    jest.useRealTimers()
  })

  it('removes event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = render(<NetworkStatus />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('offline', expect.any(Function))
  })
}) 