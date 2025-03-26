import { render, screen } from '@testing-library/react'
import { Container } from '@/components/ui/Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default size class', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    )
    expect(container.firstChild).toHaveClass('max-w-screen-lg')
  })

  it('applies correct size classes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const
    const sizeClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      full: 'max-w-full',
    }

    sizes.forEach((size) => {
      const { container } = render(
        <Container size={size}>
          <div>Content</div>
        </Container>
      )
      expect(container.firstChild).toHaveClass(sizeClasses[size])
    })
  })

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies default padding classes', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    )
    expect(container.firstChild).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
  })

  it('maintains responsive padding with custom classes', () => {
    const { container } = render(
      <Container className="bg-gray-100">
        <div>Content</div>
      </Container>
    )
    expect(container.firstChild).toHaveClass('px-4', 'sm:px-6', 'lg:px-8', 'bg-gray-100')
  })

  it('renders without children', () => {
    const { container } = render(<Container />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('mx-auto', 'w-full')
  })
}) 