import { render, screen } from '@testing-library/react'
import DemoPlaceholder from '@/components/DemoPlaceholder'

describe('DemoPlaceholder', () => {
  it('renders with required title prop', () => {
    render(<DemoPlaceholder title="Test" />)
    expect(screen.getByText('Test Demo')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    const { container } = render(<DemoPlaceholder title="Test" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass(
      'relative',
      'w-full',
      'h-full',
      'min-h-[128px]',
      'bg-gradient-to-br',
      'from-purple-500/20',
      'to-blue-500/20',
      'rounded-lg',
      'flex',
      'items-center',
      'justify-center'
    )
  })

  it('applies custom className', () => {
    const { container } = render(
      <DemoPlaceholder title="Test" className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders radial gradient overlay', () => {
    const { container } = render(<DemoPlaceholder title="Test" />)
    const overlay = container.querySelector('.absolute')
    expect(overlay).toHaveClass(
      'absolute',
      'inset-0',
      'bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_70%)]'
    )
  })

  it('renders title text with correct styles', () => {
    const { container } = render(<DemoPlaceholder title="Test" />)
    const textElement = screen.getByText('Test Demo')
    expect(textElement).toHaveClass(
      'text-sm',
      'text-gray-400',
      'relative',
      'z-10'
    )
  })

  it('combines custom className with default styles', () => {
    const { container } = render(
      <DemoPlaceholder title="Test" className="mt-4 p-6" />
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass(
      'relative',
      'w-full',
      'h-full',
      'min-h-[128px]',
      'bg-gradient-to-br',
      'from-purple-500/20',
      'to-blue-500/20',
      'rounded-lg',
      'flex',
      'items-center',
      'justify-center',
      'mt-4',
      'p-6'
    )
  })

  it('maintains overlay and text stacking order', () => {
    const { container } = render(<DemoPlaceholder title="Test" />)
    const overlay = container.querySelector('.absolute')
    const textElement = screen.getByText('Test Demo')
    
    expect(overlay).toBeInTheDocument()
    expect(textElement).toHaveClass('relative', 'z-10')
    expect(overlay?.nextSibling).toBe(textElement)
  })
}) 