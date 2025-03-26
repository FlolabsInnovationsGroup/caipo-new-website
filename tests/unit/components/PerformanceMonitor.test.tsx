import { render } from '@testing-library/react'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import { trackWebVitals } from '@/lib/analytics'
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals'

// Mock web-vitals
jest.mock('web-vitals')
jest.mock('@/lib/analytics')

describe('PerformanceMonitor', () => {
  let originalPerformance: any
  let originalPerformanceObserver: any
  let mockDisconnect: jest.Mock
  let mockObserve: jest.Mock
  let mockPerformanceObserver: jest.Mock

  beforeEach(() => {
    originalPerformance = window.performance
    originalPerformanceObserver = window.PerformanceObserver

    // Mock performance timing
    Object.defineProperty(window, 'performance', {
      value: {
        timing: {
          loadEventEnd: 2000,
          navigationStart: 0,
        },
        memory: {
          usedJSHeapSize: 1000000,
        },
      },
      configurable: true,
      writable: true,
    })

    // Mock PerformanceObserver
    mockDisconnect = jest.fn()
    mockObserve = jest.fn()
    mockPerformanceObserver = jest.fn().mockImplementation((callback) => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }))
    Object.defineProperty(mockPerformanceObserver, 'supportedEntryTypes', {
      value: ['longtask'],
      configurable: true,
      writable: false,
    })
    window.PerformanceObserver = mockPerformanceObserver as unknown as typeof PerformanceObserver
  })

  afterEach(() => {
    // Restore original objects
    Object.defineProperty(window, 'performance', {
      value: originalPerformance,
      configurable: true,
      writable: true,
    })
    window.PerformanceObserver = originalPerformanceObserver
    jest.clearAllMocks()
  })

  it('registers web vitals observers', () => {
    render(<PerformanceMonitor />)
    expect(onCLS).toHaveBeenCalled()
    expect(onFID).toHaveBeenCalled()
    expect(onLCP).toHaveBeenCalled()
    expect(onFCP).toHaveBeenCalled()
    expect(onTTFB).toHaveBeenCalled()
  })

  it('tracks page load time', () => {
    render(<PerformanceMonitor />)
    expect(trackWebVitals).toHaveBeenCalledWith({
      name: 'page_load_time',
      delta: 2000, // loadEventEnd - navigationStart
      id: 'plt',
    })
  })

  it('tracks memory usage when available', () => {
    render(<PerformanceMonitor />)
    expect(trackWebVitals).toHaveBeenCalledWith({
      name: 'heap_size',
      delta: 1000000,
      id: 'heap',
    })
  })

  it('observes long tasks', () => {
    render(<PerformanceMonitor />)
    expect(mockPerformanceObserver).toHaveBeenCalled()
    expect(mockObserve).toHaveBeenCalledWith({ entryTypes: ['longtask'] })
  })

  it('tracks long tasks when they occur', () => {
    render(<PerformanceMonitor />)
    
    // Get the callback passed to PerformanceObserver constructor
    const callback = mockPerformanceObserver.mock.calls[0][0]
    
    // Simulate a long task
    callback({
      getEntries: () => [{
        duration: 100, // 100ms task
      }],
    })

    expect(trackWebVitals).toHaveBeenCalledWith({
      name: 'long_task',
      delta: 100,
      id: 'lt',
    })
  })

  it('ignores tasks shorter than 50ms', () => {
    render(<PerformanceMonitor />)
    
    // Get the callback passed to PerformanceObserver constructor
    const callback = mockPerformanceObserver.mock.calls[0][0]
    
    // Simulate a short task
    callback({
      getEntries: () => [{
        duration: 30, // 30ms task
      }],
    })

    expect(trackWebVitals).not.toHaveBeenCalledWith(expect.objectContaining({
      name: 'long_task',
    }))
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = render(<PerformanceMonitor />)
    unmount()
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('renders nothing', () => {
    const { container } = render(<PerformanceMonitor />)
    expect(container.firstChild).toBeNull()
  })
}) 