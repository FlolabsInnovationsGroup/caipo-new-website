import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '@/components/ErrorBoundary'
import { errorLogger, ErrorSeverity } from '@/lib/errorLogger'

// Mock error logger
jest.mock('@/lib/errorLogger', () => ({
  errorLogger: {
    logError: jest.fn(),
  },
  ErrorSeverity: {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
  },
}))

// Component that throws an error
const ErrorComponent = () => {
  throw new Error('Test error')
}

// Component that doesn't throw
const SafeComponent = () => <div>Safe content</div>

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    
    // Suppress console.error for expected error throws
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore console.error
    jest.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe content')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    // Check error UI elements
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/We've been notified and will fix this as soon as possible/)).toBeInTheDocument()
    expect(screen.getByText('Refresh Page')).toBeInTheDocument()
  })

  it('logs error with default severity when no severity is provided', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(errorLogger.logError).toHaveBeenCalledWith(
      expect.any(Error),
      'HIGH',
      expect.objectContaining({
        componentName: undefined,
        additionalData: expect.any(Object),
      })
    )
  })

  it('logs error with provided severity', () => {
    render(
      <ErrorBoundary severity={ErrorSeverity.MEDIUM}>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(errorLogger.logError).toHaveBeenCalledWith(
      expect.any(Error),
      'MEDIUM',
      expect.objectContaining({
        componentName: undefined,
        additionalData: expect.any(Object),
      })
    )
  })

  it('logs error with component name when provided', () => {
    render(
      <ErrorBoundary componentName="TestComponent">
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(errorLogger.logError).toHaveBeenCalledWith(
      expect.any(Error),
      'HIGH',
      expect.objectContaining({
        componentName: 'TestComponent',
        additionalData: expect.any(Object),
      })
    )
  })

  it('shows debug error log button in development environment', () => {
    // Mock process.env.NODE_ENV
    const env = process.env
    process.env = { ...env, NODE_ENV: 'development' }

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Show Error Log')).toBeInTheDocument()

    // Restore original process.env
    process.env = env
  })

  it('does not show debug error log button in production environment', () => {
    // Mock process.env.NODE_ENV
    const env = process.env
    process.env = { ...env, NODE_ENV: 'production' }

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Show Error Log')).not.toBeInTheDocument()

    // Restore original process.env
    process.env = env
  })

  it('refreshes page when refresh button is clicked', () => {
    // Mock window.location.reload
    const reloadMock = jest.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    fireEvent.click(screen.getByText('Refresh Page'))
    expect(reloadMock).toHaveBeenCalled()
  })

  it('shows error log in console when debug button is clicked in development', () => {
    // Mock process.env.NODE_ENV
    const env = process.env
    process.env = { ...env, NODE_ENV: 'development' }

    // Mock console.table
    const consoleTableMock = jest.spyOn(console, 'table').mockImplementation(() => {})

    // Mock sessionStorage
    const mockErrors = [{ id: 1, message: 'Test error' }]
    sessionStorage.setItem('debug_errors', JSON.stringify(mockErrors))

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    fireEvent.click(screen.getByText('Show Error Log'))
    expect(consoleTableMock).toHaveBeenCalledWith(mockErrors)

    // Cleanup
    consoleTableMock.mockRestore()
    process.env = env
    sessionStorage.removeItem('debug_errors')
  })
}) 