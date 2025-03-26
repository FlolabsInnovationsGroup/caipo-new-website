import { render, screen } from '@testing-library/react'
import { Flex } from '@/components/ui/Flex'

describe('Flex', () => {
  it('renders children correctly', () => {
    render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies default props correctly', () => {
    const { container } = render(
      <Flex>
        <div>Content</div>
      </Flex>
    )
    expect(container.firstChild).toHaveClass(
      'flex',
      'gap-4',
      'items-stretch',
      'justify-start',
      'flex-row',
      'flex-nowrap'
    )
  })

  it('applies correct gap classes', () => {
    const gaps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
    gaps.forEach((gap) => {
      const { container } = render(
        <Flex gap={gap}>
          <div>Content</div>
        </Flex>
      )
      expect(container.firstChild).toHaveClass(`gap-${gap}`)
    })
  })

  it('applies correct alignment classes', () => {
    const alignments = ['start', 'center', 'end', 'stretch', 'baseline'] as const
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    }

    alignments.forEach((align) => {
      const { container } = render(
        <Flex align={align}>
          <div>Content</div>
        </Flex>
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
        <Flex justify={justify}>
          <div>Content</div>
        </Flex>
      )
      expect(container.firstChild).toHaveClass(justifyClasses[justify])
    })
  })

  it('applies correct direction classes', () => {
    const directions = ['row', 'row-reverse', 'col', 'col-reverse'] as const
    const directionClasses = {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    }

    directions.forEach((direction) => {
      const { container } = render(
        <Flex direction={direction}>
          <div>Content</div>
        </Flex>
      )
      expect(container.firstChild).toHaveClass(directionClasses[direction])
    })
  })

  it('applies correct wrap classes', () => {
    const wrapValues = ['wrap', 'nowrap', 'wrap-reverse'] as const
    const wrapClasses = {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse',
    }

    wrapValues.forEach((wrap) => {
      const { container } = render(
        <Flex wrap={wrap}>
          <div>Content</div>
        </Flex>
      )
      expect(container.firstChild).toHaveClass(wrapClasses[wrap])
    })
  })

  it('applies custom className', () => {
    const { container } = render(
      <Flex className="custom-class">
        <div>Content</div>
      </Flex>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('combines all props correctly', () => {
    const { container } = render(
      <Flex
        gap={6}
        align="center"
        justify="between"
        direction="col"
        wrap="wrap"
        className="custom-class"
      >
        <div>Content</div>
      </Flex>
    )
    expect(container.firstChild).toHaveClass(
      'flex',
      'gap-6',
      'items-center',
      'justify-between',
      'flex-col',
      'flex-wrap',
      'custom-class'
    )
  })

  it('renders without children', () => {
    const { container } = render(<Flex />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('flex')
  })
}) 