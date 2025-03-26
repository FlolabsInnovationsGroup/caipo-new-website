import { render, screen, fireEvent } from '@testing-library/react'
import GlassCard from '@/components/GlassCard'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div data-testid="motion-component" {...props}>{children}</div>
  }
}))

describe('GlassCard', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
  }

  it('renders title and description correctly', () => {
    render(<GlassCard {...defaultProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    const icon = <span data-testid="test-icon">🔥</span>
    render(<GlassCard {...defaultProps} icon={icon} />)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<GlassCard {...defaultProps} className="custom-class" />)
    const card = screen.getByTestId('motion-component')
    expect(card.className).toContain('custom-class')
  })

  it('renders children correctly', () => {
    render(
      <GlassCard>
        <div>Test Content</div>
      </GlassCard>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders with correct structure', () => {
    render(<GlassCard {...defaultProps} />)
    const card = screen.getByTestId('motion-component')
    expect(card.className).toContain('relative')
    expect(card.className).toContain('p-6')
    expect(card.className).toContain('rounded-2xl')
    expect(card.className).toContain('overflow-hidden')
    expect(card.className).toContain('h-full')
  })

  it('renders content in correct structure', () => {
    render(<GlassCard {...defaultProps} />)
    const contentContainer = screen.getByText('Test Title').closest('div')
    expect(contentContainer?.className).toContain('relative')
    expect(contentContainer?.className).toContain('z-10')
    expect(contentContainer?.className).toContain('h-full')
    expect(contentContainer?.className).toContain('flex')
    expect(contentContainer?.className).toContain('flex-col')
  })

  it('renders title with correct styling', () => {
    render(<GlassCard {...defaultProps} />)
    const title = screen.getByText('Test Title')
    expect(title.className).toContain('text-xl')
    expect(title.className).toContain('font-semibold')
    expect(title.className).toContain('mb-2')
    expect(title.className).toContain('text-white')
  })

  it('renders description with correct styling', () => {
    render(<GlassCard {...defaultProps} />)
    const description = screen.getByText('Test Description')
    expect(description.className).toContain('text-gray-400')
    expect(description.className).toContain('flex-grow')
  })

  it('maintains glass effect styles', () => {
    render(
      <GlassCard>
        <div>Test Content</div>
      </GlassCard>
    )
    
    const card = screen.getByTestId('motion-component')
    expect(card.className).toContain('relative')
    expect(card.className).toContain('overflow-hidden')
    expect(card.className).toContain('rounded-2xl')
  })
}) 