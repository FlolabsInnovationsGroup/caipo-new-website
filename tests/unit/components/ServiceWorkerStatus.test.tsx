import { render, screen, act } from '@testing-library/react'
import ServiceWorkerStatus from '@/components/ServiceWorkerStatus'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

describe('ServiceWorkerStatus', () => {
  let mockServiceWorker: any
  let mockRegistration: any
  let mockController: any
  let mockEventTarget: any
  let originalAddEventListener: typeof window.addEventListener

  beforeEach(() => {
    jest.useFakeTimers()

    // Store original addEventListener
    originalAddEventListener = window.addEventListener

    // Mock event target methods
    mockEventTarget = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }

    // Mock service worker registration
    mockRegistration = {
      installing: {
        addEventListener: mockEventTarget.addEventListener,
        removeEventListener: mockEventTarget.removeEventListener,
      },
      active: true,
    }

    // Mock service worker controller
    mockController = {
      state: 'activated',
    }

    // Mock service worker
    mockServiceWorker = {
      register: jest.fn(() => Promise.resolve(mockRegistration)),
      addEventListener: mockEventTarget.addEventListener,
      removeEventListener: mockEventTarget.removeEventListener,
      controller: mockController,
    }

    // Mock window.navigator
    Object.defineProperty(window, 'navigator', {
      value: {
        ...window.navigator,
        serviceWorker: mockServiceWorker,
      },
      configurable: true,
      writable: true,
    })

    // Mock window.addEventListener
    window.addEventListener = jest.fn().mockImplementation((event: string, callback: EventListener) => {
      if (event === 'load') {
        callback(new Event('load'))
      }
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    window.addEventListener = originalAddEventListener
  })

  it('shows installing status when service worker is installing', async () => {
    render(<ServiceWorkerStatus />)
    
    // Trigger the load event callback
    expect(window.addEventListener).toHaveBeenCalledWith('load', expect.any(Function))
    
    // Verify installing message is shown
    expect(screen.getByText('Installing app...')).toBeInTheDocument()
  })

  it('shows installed status when service worker is active', async () => {
    render(<ServiceWorkerStatus />)
    
    // Verify installed message is shown
    expect(screen.getByText('App ready to use offline')).toBeInTheDocument()
    
    // Fast-forward timer to hide the message
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    
    // Message should be hidden
    expect(screen.queryByText('App ready to use offline')).not.toBeInTheDocument()
  })

  it('shows updating status when service worker is updating', async () => {
    render(<ServiceWorkerStatus />)
    
    // Get the controllerchange event handler
    const [[, controllerChangeHandler]] = mockServiceWorker.addEventListener.mock.calls
    
    // Trigger controllerchange event
    act(() => {
      controllerChangeHandler(new Event('controllerchange'))
    })
    
    // Verify updating message is shown
    expect(screen.getByText('Updating app...')).toBeInTheDocument()
    
    // Fast-forward timer to hide the message
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    
    // Message should be hidden
    expect(screen.queryByText('Updating app...')).not.toBeInTheDocument()
  })

  it('hides status after 3 seconds', async () => {
    render(<ServiceWorkerStatus />)
    
    // Initial status should be shown
    expect(screen.getByText('Installing app...')).toBeInTheDocument()
    
    // Fast-forward timer
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    
    // Status should be hidden
    expect(screen.queryByText('Installing app...')).not.toBeInTheDocument()
  })

  it('shows correct icon animation for updating status', async () => {
    render(<ServiceWorkerStatus />)
    
    // Get the controllerchange event handler
    const [[, controllerChangeHandler]] = mockServiceWorker.addEventListener.mock.calls
    
    // Trigger controllerchange event
    act(() => {
      controllerChangeHandler(new Event('controllerchange'))
    })
    
    // Verify icon has spin animation class
    const iconContainer = screen.getByTestId('motion-div').querySelector('div')
    expect(iconContainer).toHaveClass('animate-spin')
  })

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(<ServiceWorkerStatus />)
    unmount()
    
    expect(mockEventTarget.removeEventListener).toHaveBeenCalledWith('controllerchange', expect.any(Function))
  })
}) 