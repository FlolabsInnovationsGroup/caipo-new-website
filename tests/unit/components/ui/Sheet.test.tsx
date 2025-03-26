import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet'
import { useState } from 'react'

describe('Sheet', () => {
  const user = userEvent.setup()

  const renderSheet = () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <div>Sheet content goes here</div>
          <button>First Button</button>
          <button>Second Button</button>
        </SheetContent>
      </Sheet>
    )
  }

  it('should open sheet when trigger is clicked', async () => {
    renderSheet()
    
    // Click trigger button
    await user.click(screen.getByText('Open Sheet'))
    
    // Wait for sheet to be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('should close sheet when close button is clicked', async () => {
    renderSheet()
    
    // Open sheet
    await user.click(screen.getByText('Open Sheet'))
    
    // Wait for sheet to be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Click close button
    await user.click(screen.getByRole('button', { name: /close/i }))
    
    // Wait for sheet to be removed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should close sheet when clicking overlay', async () => {
    renderSheet()
    
    // Open sheet
    await user.click(screen.getByText('Open Sheet'))
    
    // Wait for sheet to be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Click outside the sheet content
    const overlay = screen.getByTestId('sheet-overlay')
    await user.click(overlay)
    
    // Wait for sheet to be removed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should close sheet when pressing Escape', async () => {
    renderSheet()
    
    // Open sheet
    await user.click(screen.getByText('Open Sheet'))
    
    // Wait for sheet to be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Press Escape
    await user.keyboard('{Escape}')
    
    // Wait for sheet to be removed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should maintain focus within sheet', async () => {
    renderSheet()
    
    // Open sheet
    await user.click(screen.getByText('Open Sheet'))
    
    // Wait for sheet to be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Get all focusable elements
    const firstButton = screen.getByText('First Button')
    const secondButton = screen.getByText('Second Button')
    const closeButton = screen.getByRole('button', { name: /close/i })
    
    // Initial focus should be on first button (Radix UI's default behavior)
    await waitFor(() => {
      expect(firstButton).toHaveFocus()
    }, { timeout: 1000 })
    
    // Tab through elements
    await user.tab()
    expect(secondButton).toHaveFocus()
    
    await user.tab()
    expect(closeButton).toHaveFocus()
    
    await user.tab()
    expect(firstButton).toHaveFocus()
    
    // Shift+Tab back
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(closeButton).toHaveFocus()
  })

  it('should apply custom class name', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent className="custom-class">
          <div>Sheet content</div>
        </SheetContent>
      </Sheet>
    )
    
    await user.click(screen.getByText('Open Sheet'))
    expect(screen.getByRole('dialog')).toHaveClass('custom-class')
  })
}) 