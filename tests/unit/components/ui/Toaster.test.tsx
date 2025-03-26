import React from 'react'
import { render } from '@testing-library/react'
import { Toaster } from '@/components/ui/Toaster'
import { useToast } from '@/components/ui/use-toast'

// Mock useToast
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
    dismiss: jest.fn(),
    toasts: []
  }))
}))

describe('Toaster', () => {
  it('renders without crashing', () => {
    render(<Toaster />)
    expect(document.querySelector('[role="region"]')).toBeInTheDocument()
  })

  it('renders with default props', () => {
    render(<Toaster />)
    const toaster = document.querySelector('[role="region"]')
    expect(toaster).toHaveAttribute('aria-label', 'Notifications (F8)')
  })
}) 