import * as React from 'react'
import { render } from '@testing-library/react'
import { Spinner } from '@/components/ui/Spinner'

describe('Spinner', () => {
  it('renders with default size', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'border-primary', 'border-t-transparent', 'h-8', 'w-8', 'border-3')
  })

  it('renders with custom size', () => {
    const { container } = render(<Spinner size="lg" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'border-primary', 'border-t-transparent', 'h-12', 'w-12', 'border-4')
  })

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-spinner" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toHaveClass('custom-spinner')
  })

  it('renders with different sizes', () => {
    const { container, rerender } = render(<Spinner size="sm" />)
    expect(container.firstChild).toHaveClass('h-4', 'w-4', 'border-2')

    rerender(<Spinner size="md" />)
    expect(container.firstChild).toHaveClass('h-8', 'w-8', 'border-3')

    rerender(<Spinner size="lg" />)
    expect(container.firstChild).toHaveClass('h-12', 'w-12', 'border-4')
  })

  it('renders with animation classes', () => {
    const { container } = render(<Spinner />)
    expect(container.firstChild).toHaveClass('animate-spin')
  })

  it('maintains aspect ratio', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement
    const width = spinner.className.match(/w-(\d+)/)?.[1]
    const height = spinner.className.match(/h-(\d+)/)?.[1]
    expect(width).toBe(height)
  })

  it('renders with correct border styles', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toHaveClass('border-primary', 'border-t-transparent')
  })

  it('renders with screen reader text', () => {
    const { getByText } = render(<Spinner />)
    expect(getByText('Loading...')).toHaveClass('sr-only')
  })
}) 