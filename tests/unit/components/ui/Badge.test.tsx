import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('applies default variant class', () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText('Default Badge')
    expect(badge).toHaveClass('bg-primary')
  })

  it('applies secondary variant class', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>)
    const badge = screen.getByText('Secondary Badge')
    expect(badge).toHaveClass('bg-secondary')
  })

  it('applies destructive variant class', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>)
    const badge = screen.getByText('Destructive Badge')
    expect(badge).toHaveClass('bg-destructive')
  })

  it('applies outline variant class', () => {
    render(<Badge variant="outline">Outline Badge</Badge>)
    const badge = screen.getByText('Outline Badge')
    expect(badge).toHaveClass('border')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>)
    const badge = screen.getByText('Custom Badge')
    expect(badge).toHaveClass('custom-class')
  })

  it('combines variant and custom classes', () => {
    render(
      <Badge variant="secondary" className="custom-class">
        Combined Badge
      </Badge>
    )
    const badge = screen.getByText('Combined Badge')
    expect(badge).toHaveClass('bg-secondary', 'custom-class')
  })

  it('renders with additional props', () => {
    render(
      <Badge data-testid="test-badge" aria-label="badge">
        Props Badge
      </Badge>
    )
    const badge = screen.getByTestId('test-badge')
    expect(badge).toHaveAttribute('aria-label', 'badge')
  })
}) 