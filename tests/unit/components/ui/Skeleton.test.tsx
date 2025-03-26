import { render } from '@testing-library/react'
import { Skeleton } from '@/components/ui/Skeleton'

describe('Skeleton', () => {
  it('renders with default classes', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass(
      'animate-pulse',
      'rounded-md',
      'bg-muted'
    )
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="w-20 h-20" />)
    expect(container.firstChild).toHaveClass('w-20', 'h-20')
  })

  it('combines default and custom classes', () => {
    const { container } = render(<Skeleton className="w-20 h-20" />)
    expect(container.firstChild).toHaveClass(
      'animate-pulse',
      'rounded-md',
      'bg-muted',
      'w-20',
      'h-20'
    )
  })

  it('renders with custom dimensions', () => {
    const { container } = render(
      <Skeleton className="w-[200px] h-[100px]" />
    )
    expect(container.firstChild).toHaveClass('w-[200px]', 'h-[100px]')
  })

  it('renders as div by default', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('preserves data attributes', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />)
    expect(container.firstChild).toHaveAttribute('data-testid', 'skeleton')
  })
}) 