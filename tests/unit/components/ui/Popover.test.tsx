import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'

// Mock radix-ui popover
jest.mock('@radix-ui/react-popover', () => ({
  Root: ({ children, onOpenChange, open: controlledOpen }: any) => {
    const rootRef = React.useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = React.useState(controlledOpen || false)

    React.useEffect(() => {
      if (controlledOpen !== undefined) {
        setIsOpen(controlledOpen)
      }
    }, [controlledOpen])

    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen)
      onOpenChange?.(newOpen)
    }

    React.useEffect(() => {
      if (rootRef.current) {
        (rootRef.current as any).__root = { handleOpenChange }
      }
    }, [])

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) {
          handleOpenChange(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (isOpen && event.target instanceof Node && !event.defaultPrevented) {
          handleOpenChange(false)
        }
      }
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    return (
      <div ref={rootRef} data-testid="popover-root" data-state={isOpen ? 'open' : 'closed'}>
        {typeof children === 'function' ? children({ open: isOpen }) : children}
      </div>
    )
  },
  Trigger: ({ children, ...props }: any) => (
    <button 
      type="button" 
      onClick={(e) => {
        e.stopPropagation()
        const root = e.currentTarget.closest('[data-testid="popover-root"]')
        if (root) {
          const isOpen = root.getAttribute('data-state') === 'open'
          const rootComponent = (root as any).__root
          rootComponent?.handleOpenChange?.(!isOpen)
        }
      }}
      {...props}
    >
      {children}
    </button>
  ),
  Content: React.forwardRef(({ children, side, align, sideOffset, className, ...props }: any, ref: any) => (
    <div
      ref={ref}
      role="dialog"
      data-state={props['data-state']}
      data-side={side}
      data-align={align}
      data-side-offset={sideOffset}
      className={className}
    >
      {children}
    </div>
  )),
  Portal: ({ children }: any) => children,
}))

describe('Popover', () => {
  const user = userEvent.setup()

  it('renders trigger and content', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <h3>Popover Title</h3>
        </PopoverContent>
      </Popover>
    )

    expect(screen.getByText('Open Popover')).toBeInTheDocument()
  })

  it('opens popover on trigger click', async () => {
    const onOpenChange = jest.fn()
    render(
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <h3>Popover Title</h3>
        </PopoverContent>
      </Popover>
    )

    await user.click(screen.getByText('Open Popover'))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('closes popover when clicking outside', async () => {
    const onOpenChange = jest.fn()
    render(
      <Popover open onOpenChange={onOpenChange}>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <h3>Popover Title</h3>
        </PopoverContent>
      </Popover>
    )

    // Click outside the popover
    await user.click(document.body)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('closes popover when pressing Escape', async () => {
    const onOpenChange = jest.fn()
    render(
      <Popover open onOpenChange={onOpenChange}>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <h3>Popover Title</h3>
        </PopoverContent>
      </Popover>
    )

    await user.keyboard('{Escape}')
    
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    }, { timeout: 1000 })
  })

  it('supports controlled open state', async () => {
    render(
      <Popover open>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <h3>Popover Title</h3>
        </PopoverContent>
      </Popover>
    )

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('applies custom className to content', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent className="custom-class">
          <h3>Popover Title</h3>
        </PopoverContent>
      </Popover>
    )

    expect(screen.getByRole('dialog')).toHaveClass('custom-class')
  })

  it('supports side placement', async () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent side="right">
          <p>Right-side Content</p>
        </PopoverContent>
      </Popover>
    )

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toHaveAttribute('data-side', 'right')
    }, { timeout: 1000 })
  })

  it('supports alignment', async () => {
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent align="end">
          <p>End-aligned Content</p>
        </PopoverContent>
      </Popover>
    )

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toHaveAttribute('data-align', 'end')
    }, { timeout: 1000 })
  })

  it('supports custom trigger element', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button className="custom-trigger">Custom Trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Content</p>
        </PopoverContent>
      </Popover>
    )
    
    expect(screen.getByText('Custom Trigger')).toHaveClass('custom-trigger')
  })

  it('supports custom align and sideOffset props', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent align="start" sideOffset={8}>
          <h3>Popover Title</h3>
        </PopoverContent>
      </Popover>
    )

    const content = screen.getByRole('dialog')
    expect(content).toHaveAttribute('data-align', 'start')
    expect(content).toHaveAttribute('data-side-offset', '8')
  })
}) 