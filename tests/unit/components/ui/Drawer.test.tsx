import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer'

// Mock Vaul's internals
jest.mock('vaul', () => {
  const actual = jest.requireActual('vaul')
  return {
    ...actual,
    Drawer: {
      Root: ({ children, onOpenChange, open, ...props }: any) => {
        React.useEffect(() => {
          if (onOpenChange) {
            onOpenChange(open)
          }
        }, [open, onOpenChange])
        return (
          <div data-testid="drawer-root" {...props} open={open}>
            {typeof children === 'function' ? children({ open }) : children}
          </div>
        )
      },
      Trigger: ({ children, ...props }: any) => (
        <button data-testid="drawer-trigger" {...props}>
          {children}
        </button>
      ),
      Portal: ({ children, ...props }: any) => (
        <div data-testid="drawer-portal" {...props}>
          {children}
        </div>
      ),
      Content: ({ children, ...props }: any) => (
        <div data-testid="drawer-content" role="dialog" {...props}>
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          {children}
        </div>
      ),
      Overlay: ({ children, ...props }: any) => (
        <div data-testid="drawer-overlay" {...props} className="fixed inset-0 z-50 bg-black/80">
          {children}
        </div>
      ),
      Close: ({ children, ...props }: any) => (
        <button data-testid="drawer-close" {...props}>
          {children}
        </button>
      )
    }
  }
})

describe('Drawer', () => {
  const user = userEvent.setup()

  const renderDrawer = (props = {}) => {
    return render(
      <Drawer {...props}>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerClose>Close</DrawerClose>
          Content
        </DrawerContent>
      </Drawer>
    )
  }

  it('renders drawer trigger', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    )
    expect(screen.getByText('Open Drawer')).toBeInTheDocument()
  })

  it('should open drawer when trigger is clicked', async () => {
    const onOpenChange = jest.fn()
    render(
      <Drawer onOpenChange={onOpenChange}>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    )

    await user.click(screen.getByText('Open Drawer'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.getByTestId('drawer-content')).toBeVisible()
  })

  it('should close drawer when close button is clicked', async () => {
    const onOpenChange = jest.fn()
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    )

    await user.click(screen.getByText('Close'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should close drawer when clicking overlay', async () => {
    const onOpenChange = jest.fn()
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    )

    await user.click(screen.getByTestId('drawer-overlay'))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should close drawer when pressing Escape', async () => {
    const onOpenChange = jest.fn()
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    )

    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('should apply custom className to content', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent className="custom-class">Content</DrawerContent>
      </Drawer>
    )

    expect(screen.getByTestId('drawer-content')).toHaveClass('custom-class')
  })
}) 