'use client'

import React from 'react'
import { errorLogger, ErrorSeverity } from '@/lib/errorLogger'
import GlassButton from './GlassButton'

interface Props {
  children: React.ReactNode
  componentName?: string
  severity?: ErrorSeverity
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorLogger.logError(error, this.props.severity || ErrorSeverity.HIGH, {
      componentName: this.props.componentName,
      additionalData: {
        componentStack: errorInfo.componentStack,
      }
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-lg">
            <div className="mb-6 text-6xl">😕</div>
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Something went wrong
            </h2>
            <p className="text-gray-400 mb-8">
              We've been notified and will fix this as soon as possible.
              In the meantime, you can try refreshing the page.
            </p>
            <div className="space-x-4">
              <GlassButton
                onClick={() => {
                  this.setState({ hasError: false })
                  window.location.reload()
                }}
              >
                Refresh Page
              </GlassButton>
              {process.env.NODE_ENV === 'development' && (
                <GlassButton
                  onClick={() => {
                    const errors = JSON.parse(sessionStorage.getItem('debug_errors') || '[]')
                    console.table(errors)
                  }}
                  variant="secondary"
                >
                  Show Error Log
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 