import React from 'react'
import { render, screen } from '@testing-library/react'
import { ScrollArea } from '@/components/ui/scroll-area'

describe('ScrollArea', () => {
  it('renders content', () => {
    render(
      <ScrollArea>
        <div>Scrollable content</div>
      </ScrollArea>
    )

    expect(screen.getByText('Scrollable content')).toBeInTheDocument()
  })

  it('renders content with scrollbar', () => {
    render(
      <ScrollArea className="h-[200px] w-[200px]">
        <div style={{ height: '400px' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>
    )

    const content = screen.getByText('Item 1')
    expect(content).toBeInTheDocument()

    const scrollbar = document.querySelector('[data-radix-scroll-area-scrollbar]')
    expect(scrollbar).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ScrollArea className="custom-scroll">
        <div>Scrollable content</div>
      </ScrollArea>
    )

    expect(screen.getByRole('region')).toHaveClass('custom-scroll')
  })

  it('renders with orientation prop', () => {
    render(
      <ScrollArea orientation="horizontal">
        <div>Scrollable content</div>
      </ScrollArea>
    )

    expect(screen.getByRole('region')).toBeInTheDocument()
  })
}) 