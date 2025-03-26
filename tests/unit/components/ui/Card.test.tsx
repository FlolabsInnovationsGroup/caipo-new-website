import * as React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card'

describe('Card', () => {
  it('renders card with default styles', () => {
    render(<Card>Card Content</Card>)
    const card = screen.getByText('Card Content')
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm')
  })

  it('applies custom className to card', () => {
    render(<Card className="custom-class">Card Content</Card>)
    const card = screen.getByText('Card Content')
    expect(card).toHaveClass('custom-class')
  })

  it('renders CardHeader with default styles', () => {
    render(<CardHeader>Header Content</CardHeader>)
    const header = screen.getByText('Header Content')
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
  })

  it('renders CardTitle with default styles', () => {
    render(<CardTitle>Card Title</CardTitle>)
    const title = screen.getByText('Card Title')
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
    expect(title.tagName.toLowerCase()).toBe('h3')
  })

  it('renders CardDescription with default styles', () => {
    render(<CardDescription>Card Description</CardDescription>)
    const description = screen.getByText('Card Description')
    expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    expect(description.tagName.toLowerCase()).toBe('p')
  })

  it('renders CardContent with default styles', () => {
    render(<CardContent>Content</CardContent>)
    const content = screen.getByText('Content')
    expect(content).toHaveClass('p-6', 'pt-0')
  })

  it('renders CardFooter with default styles', () => {
    render(<CardFooter>Footer Content</CardFooter>)
    const footer = screen.getByText('Footer Content')
    expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })

  it('renders a complete card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This is a complete card example</CardDescription>
        </CardHeader>
        <CardContent>Main content goes here</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )

    expect(screen.getByText('Complete Card')).toBeInTheDocument()
    expect(screen.getByText('This is a complete card example')).toBeInTheDocument()
    expect(screen.getByText('Main content goes here')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Card with ref</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('passes additional props to components', () => {
    render(
      <Card data-testid="card" aria-label="Test Card">
        Card with props
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('aria-label', 'Test Card')
  })
}) 