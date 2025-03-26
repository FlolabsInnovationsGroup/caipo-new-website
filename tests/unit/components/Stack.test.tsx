import { render, screen } from '@testing-library/react'
import { Stack } from '@/components/ui/Stack'

describe('Stack', () => {
  it('renders children correctly', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies default props correctly', () => {
    const { container } = render(
      <Stack>
        <div>Content</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass(
      'flex',
      'flex-col',
      'space-y-4',
      'items-stretch',
      'justify-start'
    )
  })

  it('applies correct gap classes', () => {
    const gaps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
    gaps.forEach((gap) => {
      const { container } = render(
        <Stack gap={gap}>
          <div>Content</div>
        </Stack>
      )
      expect(container.firstChild).toHaveClass(`space-y-${gap}`)
    })
  })

  it('applies correct alignment classes', () => {
    const alignments = ['start', 'center', 'end', 'stretch'] as const
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    }

    alignments.forEach((align) => {
      const { container } = render(
        <Stack align={align}>
          <div>Content</div>
        </Stack>
      )
      expect(container.firstChild).toHaveClass(alignClasses[align])
    })
  })

  it('applies correct justify classes', () => {
    const justifyValues = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    }

    justifyValues.forEach((justify) => {
      const { container } = render(
        <Stack justify={justify}>
          <div>Content</div>
        </Stack>
      )
      expect(container.firstChild).toHaveClass(justifyClasses[justify])
    })
  })

  it('applies custom className', () => {
    const { container } = render(
      <Stack className="custom-class">
        <div>Content</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('combines all props correctly', () => {
    const { container } = render(
      <Stack gap={6} align="center" justify="between" className="custom-class">
        <div>Content</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass(
      'flex',
      'flex-col',
      'space-y-6',
      'items-center',
      'justify-between',
      'custom-class'
    )
  })

  it('renders without children', () => {
    const { container } = render(<Stack />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('flex', 'flex-col')
  })
}) 