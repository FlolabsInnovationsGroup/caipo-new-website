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

  const DrawerContext = React.createContext<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }>({
    open: false,
    onOpenChange: () => {},
  })

  return {
    ...actual,
    Drawer: {
      Root: ({ children, onOpenChange, open: initialOpen = false, ...props }: any) => {
        const [isOpen, setIsOpen] = React.useState(initialOpen)

        React.useEffect(() => {
          if (initialOpen !== undefined) {
            setIsOpen(initialOpen)
          }
        }, [initialOpen])

        const handleOpenChange = (newOpen: boolean) => {
          setIsOpen(newOpen)
          onOpenChange?.(newOpen)
        }

        React.useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
              handleOpenChange(false)
            }
          }
          window.addEventListener('keydown', handleKeyDown)
          return () => window.removeEventListener('keydown', handleKeyDown)
        }, [isOpen])

        const context = React.useMemo(
          () => ({ open: isOpen, onOpenChange: handleOpenChange }),
          [isOpen]
        )

        return (
          <DrawerContext.Provider value={context}>
            <div data-testid="drawer-root" {...props} data-state={isOpen ? 'open' : 'closed'}>
              {typeof children === 'function' ? children(context) : children}
            </div>
          </DrawerContext.Provider>
        )
      },
      Trigger: ({ children, ...props }: any) => {
        const context = React.useContext(DrawerContext)
        return (
          <button 
            type="button"
            data-testid="drawer-trigger" 
            onClick={() => context.onOpenChange(true)}
            {...props}
          >
            {children}
          </button>
        )
      },
      Portal: ({ children, ...props }: any) => (
        <div data-testid="drawer-portal" {...props}>
          {children}
        </div>
      ),
      Content: ({ children, ...props }: any) => {
        const context = React.useContext(DrawerContext)
        if (!context.open) return null
        return (
          <div data-testid="drawer-content" role="dialog" {...props}>
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            {children}
          </div>
        )
      },
      Overlay: ({ children, ...props }: any) => {
        const context = React.useContext(DrawerContext)
        if (!context.open) return null
        return (
          <div 
            data-testid="drawer-overlay" 
            onClick={() => context.onOpenChange(false)}
            {...props} 
            className="fixed inset-0 z-50 bg-black/80"
          >
            {children}
          </div>
        )
      },
      Close: ({ children, ...props }: any) => {
        const context = React.useContext(DrawerContext)
        return (
          <button 
            type="button"
            data-testid="drawer-close" 
            onClick={() => context.onOpenChange(false)}
            {...props}
          >
            {children}
          </button>
        )
      }
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

  it('should apply custom className to content', async () => {
    render(
      <Drawer open>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent className="custom-class">Content</DrawerContent>
      </Drawer>
    )

    expect(screen.getByTestId('drawer-content')).toHaveClass('custom-class')
  })
}) 