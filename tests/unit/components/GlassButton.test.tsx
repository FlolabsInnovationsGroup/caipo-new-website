import { render, screen, fireEvent } from '@testing-library/react'
import GlassButton from '@/components/GlassButton'

describe('GlassButton', () => {
  it('renders children correctly', () => {
    render(<GlassButton>Click me</GlassButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<GlassButton onClick={handleClick}>Click me</GlassButton>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    const handleClick = jest.fn()
    render(<GlassButton disabled onClick={handleClick}>Disabled Button</GlassButton>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
    
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<GlassButton className="custom-class">Custom Button</GlassButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders as a link when href is provided', () => {
    render(<GlassButton href="/test">Link Button</GlassButton>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies default variant styles', () => {
    render(<GlassButton>Default Button</GlassButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('glass-button')
  })

  it('applies nav variant styles', () => {
    render(<GlassButton variant="nav">Nav Button</GlassButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('nav-button')
  })

  it('applies secondary variant styles', () => {
    render(<GlassButton variant="secondary">Secondary Button</GlassButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('glass-button-secondary')
  })

  it('uses correct button type', () => {
    const { rerender } = render(<GlassButton type="submit">Submit Button</GlassButton>)
    let button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')

    rerender(<GlassButton type="reset">Reset Button</GlassButton>)
    button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'reset')

    rerender(<GlassButton>Default Button</GlassButton>)
    button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('does not render as link when disabled with href', () => {
    render(<GlassButton href="/test" disabled>Disabled Link</GlassButton>)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
}) 