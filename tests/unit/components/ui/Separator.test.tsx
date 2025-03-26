import React from 'react'
import { render, screen } from '@testing-library/react'
import { Separator } from '@/components/ui/Separator'

describe('Separator', () => {
  it('renders horizontally by default', () => {
    render(
      <div>
        <div>Content above</div>
        <Separator />
        <div>Content below</div>
      </div>
    )
    
    expect(screen.getByText('Content above')).toBeInTheDocument()
    const separator = screen.getByRole('none')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(screen.getByText('Content below')).toBeInTheDocument()
  })

  it('renders between content vertically', () => {
    render(
      <div style={{ display: 'flex' }}>
        <div>Left content</div>
        <Separator orientation="vertical" />
        <div>Right content</div>
      </div>
    )
    
    expect(screen.getByText('Left content')).toBeInTheDocument()
    const separator = screen.getByRole('none')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
    expect(screen.getByText('Right content')).toBeInTheDocument()
  })

  it('renders vertical separator', () => {
    render(<Separator orientation="vertical" />)
    const separator = screen.getByRole('none')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
  })

  it('renders with decorative role when decorative prop is true', () => {
    render(<Separator decorative={true} />)
    const separator = screen.getByRole('none')
    expect(separator).toHaveAttribute('data-orientation')
    expect(separator).not.toHaveAttribute('aria-orientation')
  })

  it('renders with aria-orientation when decorative prop is false', () => {
    render(<Separator decorative={false} orientation="horizontal" />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('applies custom className', () => {
    render(<Separator className="custom-separator" />)
    expect(screen.getByRole('none')).toHaveClass('custom-separator')
  })

  it('combines orientation and custom classes', () => {
    render(<Separator orientation="vertical" className="custom-separator" />)
    const separator = screen.getByRole('none')
    expect(separator).toHaveClass('custom-separator')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
  })
}) 