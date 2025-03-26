import { render, screen, act } from '@testing-library/react'
import ServiceWorkerStatus from '@/components/ServiceWorkerStatus'
import { swStatusEmitter, ServiceWorkerStatus as SWStatus } from '@/lib/registerServiceWorker'

// Mock the service worker status emitter
jest.mock('@/lib/registerServiceWorker', () => {
  class MockServiceWorkerStatusEvent extends Event {
    constructor(public status: SWStatus) {
      super('statuschange')
    }
  }

  return {
    swStatusEmitter: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn((event) => {
        const handler = jest.mocked(swStatusEmitter.addEventListener).mock.calls[0][1] as EventListener
        if (handler) {
          handler(event)
          // Dispatch null status after 3 seconds
          setTimeout(() => {
            handler(new MockServiceWorkerStatusEvent(null))
          }, 3000)
        }
      })
    },
    ServiceWorkerStatus: {
      INSTALLING: 'installing',
      INSTALLED: 'installed',
      UPDATING: 'updating'
    },
    ServiceWorkerStatusEvent: MockServiceWorkerStatusEvent,
    registerServiceWorker: jest.fn()
  }
})

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="motion-div" {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}))

describe('ServiceWorkerStatus', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('shows installing status when service worker is installing', async () => {
    render(<ServiceWorkerStatus />)

    // Dispatch installing event
    await act(async () => {
      const event = new (require('@/lib/registerServiceWorker').ServiceWorkerStatusEvent)('installing')
      swStatusEmitter.dispatchEvent(event)
    })

    // Wait for component to update
    await act(async () => {
      await Promise.resolve()
    })

    // Verify installing message is shown
    expect(screen.getByText('Installing app...')).toBeInTheDocument()
  })

  it('shows installed status when service worker is active', async () => {
    render(<ServiceWorkerStatus />)

    // Dispatch installed event
    await act(async () => {
      const event = new (require('@/lib/registerServiceWorker').ServiceWorkerStatusEvent)('installed')
      swStatusEmitter.dispatchEvent(event)
    })

    // Wait for component to update
    await act(async () => {
      await Promise.resolve()
    })

    // Verify installed message is shown
    expect(screen.getByText('App ready to use offline')).toBeInTheDocument()

    // Fast-forward timer to hide the message
    await act(async () => {
      jest.advanceTimersByTime(3000)
      await Promise.resolve()
    })

    // Verify message is hidden
    expect(screen.queryByText('App ready to use offline')).not.toBeInTheDocument()
  })

  it('shows updating status when service worker is updating', async () => {
    render(<ServiceWorkerStatus />)

    // Dispatch updating event
    await act(async () => {
      const event = new (require('@/lib/registerServiceWorker').ServiceWorkerStatusEvent)('updating')
      swStatusEmitter.dispatchEvent(event)
    })

    // Wait for component to update
    await act(async () => {
      await Promise.resolve()
    })

    // Verify updating message is shown
    expect(screen.getByText('Updating app...')).toBeInTheDocument()

    // Fast-forward timer to hide the message
    await act(async () => {
      jest.advanceTimersByTime(3000)
      await Promise.resolve()
    })

    // Verify message is hidden
    expect(screen.queryByText('Updating app...')).not.toBeInTheDocument()
  })

  it('shows correct icon animation for updating status', async () => {
    render(<ServiceWorkerStatus />)

    // Dispatch updating event
    await act(async () => {
      const event = new (require('@/lib/registerServiceWorker').ServiceWorkerStatusEvent)('updating')
      swStatusEmitter.dispatchEvent(event)
    })

    // Wait for component to update
    await act(async () => {
      await Promise.resolve()
    })

    // Verify icon has spin animation class
    const iconContainer = screen.getByTestId('motion-div').querySelector('.flex > div')
    expect(iconContainer).toHaveClass('animate-spin')
  })

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(<ServiceWorkerStatus />)
    unmount()
    expect(swStatusEmitter.removeEventListener).toHaveBeenCalled()
  })
}) 