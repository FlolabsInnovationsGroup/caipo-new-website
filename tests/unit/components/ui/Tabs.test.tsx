import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/Tabs'

const renderTabs = () => {
  return render(
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" data-testid="content-1">Content 1</TabsContent>
      <TabsContent value="tab2" data-testid="content-2">Content 2</TabsContent>
      <TabsContent value="tab3" data-testid="content-3">Content 3</TabsContent>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders tabs with default selected tab', () => {
    renderTabs()
    expect(screen.getByTestId('content-1')).toBeVisible()
    expect(screen.getByTestId('content-2')).not.toBeVisible()
    expect(screen.getByTestId('content-3')).not.toBeVisible()
  })

  it('switches content when clicking different tabs', async () => {
    renderTabs()
    
    await userEvent.click(screen.getByText('Tab 2'))
    await waitFor(() => {
      expect(screen.getByTestId('content-1')).not.toBeVisible()
      expect(screen.getByTestId('content-2')).toBeVisible()
      expect(screen.getByTestId('content-3')).not.toBeVisible()
    })
    
    await userEvent.click(screen.getByText('Tab 3'))
    await waitFor(() => {
      expect(screen.getByTestId('content-1')).not.toBeVisible()
      expect(screen.getByTestId('content-2')).not.toBeVisible()
      expect(screen.getByTestId('content-3')).toBeVisible()
    })
  })

  it('supports keyboard navigation', async () => {
    renderTabs()
    const firstTab = screen.getByText('Tab 1')
    firstTab.focus()
    
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(document.activeElement).toHaveTextContent('Tab 2')
    })
    
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(document.activeElement).toHaveTextContent('Tab 3')
    })
    
    await userEvent.keyboard('{ArrowLeft}')
    await waitFor(() => {
      expect(document.activeElement).toHaveTextContent('Tab 2')
    })
  })

  it('supports controlled value', async () => {
    const onValueChange = jest.fn()
    render(
      <Tabs value="tab2" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-1">Content 1</TabsContent>
        <TabsContent value="tab2" data-testid="content-2">Content 2</TabsContent>
      </Tabs>
    )
    
    expect(screen.getByTestId('content-2')).toBeVisible()
    expect(screen.getByTestId('content-1')).not.toBeVisible()
    
    await userEvent.click(screen.getByText('Tab 1'))
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('tab1')
    })
  })

  it('applies custom className to tabs', () => {
    render(
      <Tabs className="custom-tabs">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    )
    expect(screen.getByRole('tablist').closest('.custom-tabs')).toBeInTheDocument()
  })

  it('applies custom className to tab triggers', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-trigger">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )
    expect(screen.getByRole('tab')).toHaveClass('custom-trigger')
  })

  it('applies custom className to tab content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">
          Content 1
        </TabsContent>
      </Tabs>
    )
    expect(screen.getByRole('tabpanel')).toHaveClass('custom-content')
  })

  it('supports disabled tabs', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" data-testid="content-1">Content 1</TabsContent>
        <TabsContent value="tab2" data-testid="content-2">Content 2</TabsContent>
      </Tabs>
    )
    
    const disabledTab = screen.getByText('Tab 2')
    expect(disabledTab).toBeDisabled()
    
    await userEvent.click(disabledTab)
    await waitFor(() => {
      expect(screen.getByTestId('content-1')).toBeVisible()
      expect(screen.getByTestId('content-2')).not.toBeVisible()
    })
  })
}) 