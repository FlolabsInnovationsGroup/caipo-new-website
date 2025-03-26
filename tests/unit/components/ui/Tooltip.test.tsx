import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver

describe('Tooltip', () => {
  const renderTooltip = (props = {}) => {
    const onOpenChange = jest.fn()
    render(
      <TooltipProvider>
        <Tooltip onOpenChange={onOpenChange} delayDuration={0} {...props}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    return { onOpenChange }
  }

  it('renders tooltip trigger', () => {
    renderTooltip()
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows tooltip on mouse enter', async () => {
    const user = userEvent.setup()
    const { onOpenChange } = renderTooltip()
    const trigger = screen.getByText('Hover me')

    await user.hover(trigger)

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.getAllByText('Tooltip content')[0]).toBeInTheDocument()
    }, { timeout: 1000 })
  }, 5000)

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup()
    const { onOpenChange } = renderTooltip()
    const trigger = screen.getByText('Hover me')

    // Show the tooltip first
    await user.hover(trigger)
    await waitFor(() => {
      expect(screen.getAllByText('Tooltip content')[0]).toBeInTheDocument()
    }, { timeout: 1000 })

    // Clear the mock to only track the hide call
    onOpenChange.mockClear()

    // Hide the tooltip
    await user.unhover(trigger)
    await user.click(document.body) // Force blur to ensure tooltip is hidden

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    }, { timeout: 1000 })
  }, 5000)

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup()
    const { onOpenChange } = renderTooltip()
    const trigger = screen.getByText('Hover me')

    await user.tab()

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.getAllByText('Tooltip content')[0]).toBeInTheDocument()
    }, { timeout: 1000 })
  }, 5000)

  it('hides tooltip on blur', async () => {
    const user = userEvent.setup()
    const { onOpenChange } = renderTooltip()

    // Show the tooltip by focusing
    await user.tab()
    await waitFor(() => {
      expect(screen.getAllByText('Tooltip content')[0]).toBeInTheDocument()
    }, { timeout: 1000 })

    // Clear the mock to only track the hide call
    onOpenChange.mockClear()

    // Hide the tooltip by tabbing away
    await user.tab()
    await user.click(document.body) // Force blur to ensure tooltip is hidden

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    }, { timeout: 1000 })
  }, 5000)

  it('supports controlled open state', async () => {
    render(
      <TooltipProvider>
        <Tooltip open={true} delayDuration={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await waitFor(() => {
      expect(screen.getAllByText('Tooltip content')[0]).toBeInTheDocument()
    }, { timeout: 1000 })
  }, 5000)

  it('applies custom class name to tooltip content', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent className="custom-class">Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const trigger = screen.getByText('Hover me')
    await user.hover(trigger)

    await waitFor(() => {
      const content = screen.getAllByText('Tooltip content')[0]
      expect(content.closest('[data-radix-popper-content-wrapper] > div')).toHaveClass('custom-class')
    }, { timeout: 1000 })
  }, 5000)

  it('supports side placement', async () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent side="top">Placed Tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const tooltip = screen.getByRole('tooltip').closest('[data-side="top"]')
    expect(tooltip).toBeInTheDocument()
  })

  it('supports alignment', async () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent align="start">Aligned Tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    const tooltip = screen.getByRole('tooltip').closest('[data-align="start"]')
    expect(tooltip).toBeInTheDocument()
  })
}) 