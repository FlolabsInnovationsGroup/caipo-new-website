import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog'
import { useState } from 'react'

describe('Dialog', () => {
  beforeEach(() => {
    // Reset any mocked timers
    jest.useRealTimers()
  })

  const renderDialog = () => {
    const user = userEvent.setup()
    const onOpenChange = jest.fn()
    
    const { rerender } = render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <button>First Button</button>
          <button>Second Button</button>
        </DialogContent>
      </Dialog>
    )

    return { user, onOpenChange, rerender }
  }

  it('should render dialog trigger', () => {
    renderDialog()
    expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument()
  })

  it('should open dialog when trigger is clicked', async () => {
    const { user } = renderDialog()
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('data-state', 'open')
    expect(screen.getByRole('heading', { name: 'Dialog Title' })).toBeInTheDocument()
  })

  it('should close dialog when close button is clicked', async () => {
    const { user, onOpenChange } = renderDialog()
    
    // Open dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    const dialog = await screen.findByRole('dialog')
    
    // Wait for dialog to be fully mounted
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'open')
    })
    
    // Click close button (using aria-label)
    const closeButton = screen.getByRole('button', { name: 'Close' })
    await user.click(closeButton)
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'closed')
    }, { timeout: 1000 })
    
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should close dialog when clicking overlay', async () => {
    const { user, onOpenChange } = renderDialog()
    
    // Open dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    const dialog = await screen.findByRole('dialog')
    
    // Wait for dialog to be fully mounted
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'open')
    })
    
    // Click the overlay
    const overlay = document.querySelector('[class*="bg-black/80"][data-state="open"]') as HTMLElement
    expect(overlay).toBeInTheDocument()
    await user.click(overlay)
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'closed')
    }, { timeout: 1000 })
    
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should close dialog when pressing Escape', async () => {
    const { user, onOpenChange } = renderDialog()
    
    // Open dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    const dialog = await screen.findByRole('dialog')
    
    // Wait for dialog to be fully mounted
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'open')
    })
    
    // Press Escape
    await user.keyboard('{Escape}')
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'closed')
    }, { timeout: 1000 })
    
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should support controlled open state', async () => {
    const ControlledDialog = () => {
      const [open, setOpen] = useState(false)
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogHeader>
            <button>Test Button</button>
          </DialogContent>
        </Dialog>
      )
    }

    const user = userEvent.setup()
    render(<ControlledDialog />)
    
    // Open dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    const dialog = await screen.findByRole('dialog')
    
    // Wait for dialog to be fully mounted
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'open')
    })
    
    // Close dialog
    const closeButton = screen.getByRole('button', { name: 'Close' })
    await user.click(closeButton)
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'closed')
    }, { timeout: 1000 })
  })

  it('should maintain focus within dialog', async () => {
    const { user } = renderDialog()
    
    // Open dialog
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    const dialog = await screen.findByRole('dialog')
    
    // Wait for dialog to be fully mounted
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'open')
    })
    
    // Get all focusable elements
    const firstButton = screen.getByRole('button', { name: 'First Button' })
    const secondButton = screen.getByRole('button', { name: 'Second Button' })
    const closeButton = screen.getByRole('button', { name: 'Close' })
    
    // Wait for initial focus to be applied
    await waitFor(() => {
      expect(firstButton).toHaveFocus()
    }, { timeout: 1000 })
    
    // Tab through elements
    await user.tab()
    expect(secondButton).toHaveFocus()
    
    await user.tab()
    expect(closeButton).toHaveFocus()
    
    // Tab should cycle back to first button
    await user.tab()
    expect(firstButton).toHaveFocus()
    
    // Shift+Tab should cycle backwards
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(closeButton).toHaveFocus()
  })

  it('should apply custom className to dialog content', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent className="custom-class">
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    const dialog = await screen.findByRole('dialog')
    
    // Wait for dialog to be fully mounted
    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-state', 'open')
    })
    
    expect(dialog).toHaveClass('custom-class')
  })
}) 