import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from '@/components/ui/DropdownMenu'

describe('DropdownMenu', () => {
  beforeEach(() => {
    // Reset any mocked timers
    jest.useRealTimers()
  })

  const renderDropdownMenu = () => {
    return render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value="medium">
            <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Show Status</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  it('renders dropdown trigger', () => {
    renderDropdownMenu()
    expect(screen.getByText('Open Menu')).toBeInTheDocument()
  })

  it('opens menu when trigger is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    renderDropdownMenu()
    await user.click(screen.getByText('Open Menu'))
    
    expect(screen.getByText('My Account')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('closes menu when clicking outside', async () => {
    const user = userEvent.setup({ delay: null })
    renderDropdownMenu()
    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByText('My Account')).toBeInTheDocument()
    
    // Click outside
    fireEvent.pointerDown(document.body)
    fireEvent.pointerUp(document.body)

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 300))
    expect(screen.queryByText('My Account')).not.toBeInTheDocument()
  })

  it('closes menu when pressing Escape', async () => {
    const user = userEvent.setup({ delay: null })
    renderDropdownMenu()
    await user.click(screen.getByText('Open Menu'))
    expect(screen.getByText('My Account')).toBeInTheDocument()
    
    await user.keyboard('{Escape}')

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 300))
    expect(screen.queryByText('My Account')).not.toBeInTheDocument()
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup({ delay: null })
    renderDropdownMenu()
    await user.click(screen.getByText('Open Menu'))
    
    // Press arrow down to navigate
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toHaveTextContent('Profile')
    
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toHaveTextContent('Settings')

    // Arrow up should go to previous item
    await user.keyboard('{ArrowUp}')
    expect(document.activeElement).toHaveTextContent('Profile')
  })

  it('handles radio group selection', async () => {
    const user = userEvent.setup({ delay: null })
    const onValueChange = jest.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="medium" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    await user.click(screen.getByText('Open'))
    await user.click(screen.getByText('Small'))
    expect(onValueChange).toHaveBeenCalledWith('small')
  })

  it('handles checkbox item toggle', async () => {
    const user = userEvent.setup({ delay: null })
    const onCheckedChange = jest.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={true}
            onCheckedChange={onCheckedChange}
          >
            Show Status
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    await user.click(screen.getByText('Open'))
    await user.click(screen.getByText('Show Status'))
    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('applies custom className to menu content', async () => {
    const user = userEvent.setup({ delay: null })
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-menu">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    await user.click(screen.getByText('Open'))
    expect(screen.getByRole('menu')).toHaveClass('custom-menu')
  })

  it('supports disabled menu items', async () => {
    const user = userEvent.setup({ delay: null })
    const onClick = jest.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onClick={onClick}>
            Disabled Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    
    await user.click(screen.getByText('Open'))
    const item = screen.getByText('Disabled Item')
    expect(item).toHaveAttribute('aria-disabled', 'true')
    
    await user.click(item)
    // Menu should still be open since item is disabled
    expect(item).toBeInTheDocument()
  })
}) 