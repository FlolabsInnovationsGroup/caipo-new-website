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
  Root: ({ children }: any) => <div data-testid="popover-root">{children}</div>,
  Trigger: ({ children, ...props }: any) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
  Content: React.forwardRef(({ children, ...props }: any, ref: any) => (
    <div
      ref={ref}
      role="dialog"
      data-state={props['data-state']}
      className={props.className}
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