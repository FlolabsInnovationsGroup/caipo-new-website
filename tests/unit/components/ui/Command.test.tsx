import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/Command'

// Mock scrollIntoView
beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn()
})

afterAll(() => {
  // @ts-ignore - cleanup mock
  Element.prototype.scrollIntoView = undefined
})

// Mock cmdk
jest.mock('cmdk', () => ({
  Command: {
    displayName: 'Command',
    ...jest.requireActual('cmdk').Command,
  },
}))

// Mock Dialog from radix-ui
jest.mock('@/components/ui/Dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => {
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          onOpenChange?.(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open, onOpenChange])

    return (
      <div data-testid="dialog" data-state={open ? 'open' : 'closed'}>
        {children}
      </div>
    )
  },
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
}))

describe('Command', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const renderCommand = () => {
    return render(
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Other">
            <CommandItem>Help</CommandItem>
            <CommandItem>
              Exit
              <CommandShortcut>⌘Q</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }

  it('renders command input with search icon', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    )

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders command list with items', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>Item 1</CommandItem>
          <CommandItem>Item 2</CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders empty state when no items match', () => {
    render(
      <Command>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('No results found.')).toBeInTheDocument()
  })

  it('renders command groups with headings', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Group 1">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Group 2">
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('Group 1')).toBeInTheDocument()
    expect(screen.getByText('Group 2')).toBeInTheDocument()
  })

  it('renders command separator', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>Item 1</CommandItem>
          <CommandSeparator />
          <CommandItem>Item 2</CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders command shortcut', () => {
    render(
      <Command>
        <CommandList>
          <CommandItem>
            Search
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('supports command dialog keyboard shortcuts', async () => {
    const onOpenChange = jest.fn()
    render(
      <CommandDialog open onOpenChange={onOpenChange}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>Item 1</CommandItem>
        </CommandList>
      </CommandDialog>
    )

    // Press Escape to close
    fireEvent.keyDown(document, { key: 'Escape' })
    
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    }, { timeout: 1000 })
  }, 5000)

  it('applies custom className to command', () => {
    render(
      <Command className="custom-class">
        <CommandInput placeholder="Search..." />
      </Command>
    )

    expect(screen.getByRole('combobox').closest('[cmdk-root]')).toHaveClass('custom-class')
  })

  it('renders command dialog', () => {
    render(
      <CommandDialog open>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>Test Item</CommandItem>
        </CommandList>
      </CommandDialog>
    )
    expect(screen.getByTestId('dialog')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('applies custom className to command input', () => {
    render(
      <Command>
        <CommandInput className="custom-input" placeholder="Search..." />
      </Command>
    )

    expect(screen.getByRole('combobox')).toHaveClass('custom-input')
  })

  it('supports command groups', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="General">
            <CommandItem>Settings</CommandItem>
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Advanced">
            <CommandItem>Search</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )

    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })
}) 