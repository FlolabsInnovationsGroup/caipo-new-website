import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/NavigationMenu'

const renderMenu = () => {
  return render(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="trigger-1">
            Item 1
          </NavigationMenuTrigger>
          <NavigationMenuContent data-testid="content-1">
            <div className="grid gap-3 p-4 w-[400px]">
              <a href="#link1" data-testid="content-link-1">Link 1</a>
              <a href="#link2" data-testid="content-link-2">Link 2</a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger data-testid="trigger-2">
            Item 2
          </NavigationMenuTrigger>
          <NavigationMenuContent data-testid="content-2">
            <div className="grid gap-3 p-4 w-[400px]">
              <a href="#link3" data-testid="content-link-3">Link 3</a>
              <a href="#link4" data-testid="content-link-4">Link 4</a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#direct-link" data-testid="direct-link">
            Direct Link
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

describe('NavigationMenu', () => {
  it('should render navigation menu', () => {
    renderMenu()
    expect(screen.getByTestId('trigger-1')).toBeInTheDocument()
    expect(screen.getByTestId('trigger-2')).toBeInTheDocument()
    expect(screen.getByTestId('direct-link')).toBeInTheDocument()
  })

  it('should show content when trigger is clicked', async () => {
    const user = userEvent.setup()
    renderMenu()

    await user.click(screen.getByTestId('trigger-1'))
    await waitFor(() => {
      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'open')
      expect(screen.getByTestId('content-1')).toBeVisible()
    })

    // Click outside to close
    await user.click(document.body)
    await waitFor(() => {
      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'closed')
    })
  })

  it('should support keyboard navigation between triggers', async () => {
    const user = userEvent.setup()
    renderMenu()

    // Focus first trigger
    await user.tab()
    await waitFor(() => {
      expect(screen.getByTestId('trigger-1')).toHaveFocus()
    })

    // Open content with Enter
    await user.keyboard('{Enter}')
    await waitFor(() => {
      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'open')
    })

    // Move to second trigger with ArrowRight
    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(screen.getByTestId('trigger-2')).toHaveFocus()
    })

    // Move to direct link
    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(screen.getByTestId('direct-link')).toHaveFocus()
    })

    // Move back to second trigger
    await user.keyboard('{ArrowLeft}')
    await waitFor(() => {
      expect(screen.getByTestId('trigger-2')).toHaveFocus()
    })
  })

  it('should support keyboard navigation within content', async () => {
    const user = userEvent.setup()
    renderMenu()

    // Focus and open first trigger
    await user.tab()
    await user.keyboard('{Enter}')
    await waitFor(() => {
      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'open')
    })

    // Tab to first link
    await user.tab()
    await waitFor(() => {
      expect(screen.getByTestId('content-link-1')).toHaveFocus()
    })

    // Tab to second link
    await user.tab()
    await waitFor(() => {
      expect(screen.getByTestId('content-link-2')).toHaveFocus()
    })

    // Shift+Tab back to first link
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    await waitFor(() => {
      expect(screen.getByTestId('content-link-1')).toHaveFocus()
    })
  })

  it('should close content when Escape is pressed', async () => {
    const user = userEvent.setup()
    renderMenu()

    // Focus and open first trigger
    await user.tab()
    await user.keyboard('{Enter}')
    await waitFor(() => {
      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'open')
    })

    // Tab to first link
    await user.tab()
    await waitFor(() => {
      expect(screen.getByTestId('content-link-1')).toHaveFocus()
    })

    // Press Escape to close and return focus to trigger
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'closed')
      expect(screen.getByTestId('trigger-1')).toHaveFocus()
    })
  })

  it('should apply custom className to navigation menu', () => {
    render(
      <NavigationMenu className="custom-class">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#test">Test</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByRole('navigation')).toHaveClass('custom-class')
  })
})