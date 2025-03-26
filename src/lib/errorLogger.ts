import { trackError } from './analytics'

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ErrorContext {
  componentName?: string
  userId?: string
  action?: string
  additionalData?: Record<string, any>
}

class ErrorLogger {
  private static instance: ErrorLogger
  private readonly MAX_RETRY_ATTEMPTS = 3
  private retryCount: Record<string, number> = {}

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger()
    }
    return ErrorLogger.instance
  }

  logError(error: Error, severity: ErrorSeverity, context: ErrorContext = {}) {
    // Track error with analytics
    trackError(error, context.componentName)

    // Create error fingerprint for grouping similar errors
    const errorFingerprint = this.createErrorFingerprint(error)

    // Handle based on severity
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        this.handleCriticalError(error, context)
        break
      case ErrorSeverity.HIGH:
        this.handleHighSeverityError(error, context)
        break
      default:
        this.handleStandardError(error, context)
    }

    // Store error in session storage for debugging
    this.storeErrorForDebug(error, severity, context)
  }

  private createErrorFingerprint(error: Error): string {
    return `${error.name}-${error.message}`
  }

  private handleCriticalError(error: Error, context: ErrorContext) {
    console.error('Critical Error:', {
      error,
      context,
      timestamp: new Date().toISOString()
    })

    // Implement retry logic for critical operations
    const fingerprint = this.createErrorFingerprint(error)
    if (!this.retryCount[fingerprint]) {
      this.retryCount[fingerprint] = 0
    }

    if (this.retryCount[fingerprint] < this.MAX_RETRY_ATTEMPTS) {
      this.retryCount[fingerprint]++
      // Implement retry mechanism here
      // Could include automatic page refresh or operation retry
    }
  }

  private handleHighSeverityError(error: Error, context: ErrorContext) {
    console.error('High Severity Error:', {
      error,
      context,
      timestamp: new Date().toISOString()
    })
  }

  private handleStandardError(error: Error, context: ErrorContext) {
    console.warn('Standard Error:', {
      error,
      context,
      timestamp: new Date().toISOString()
    })
  }

  private storeErrorForDebug(error: Error, severity: ErrorSeverity, context: ErrorContext) {
    if (typeof window !== 'undefined') {
      const errors = JSON.parse(sessionStorage.getItem('debug_errors') || '[]')
      errors.push({
        name: error.name,
        message: error.message,
        stack: error.stack,
        severity,
        context,
        timestamp: new Date().toISOString()
      })
      sessionStorage.setItem('debug_errors', JSON.stringify(errors.slice(-10))) // Keep last 10 errors
    }
  }

  clearStoredErrors() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('debug_errors')
    }
  }
}

export const errorLogger = ErrorLogger.getInstance() 