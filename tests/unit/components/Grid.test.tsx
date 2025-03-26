import { render, screen } from '@testing-library/react'
import { Grid } from '@/components/ui/Grid'

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies default props correctly', () => {
    const { container } = render(
      <Grid>
        <div>Content</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('grid', 'grid-cols-1', 'gap-4', 'grid-flow-row')
  })

  it('applies correct column classes', () => {
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
    cols.forEach((col) => {
      const { container } = render(
        <Grid cols={col}>
          <div>Content</div>
        </Grid>
      )
      expect(container.firstChild).toHaveClass(`grid-cols-${col}`)
    })
  })

  it('applies correct gap classes', () => {
    const gaps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
    gaps.forEach((gap) => {
      const { container } = render(
        <Grid gap={gap}>
          <div>Content</div>
        </Grid>
      )
      expect(container.firstChild).toHaveClass(`gap-${gap}`)
    })
  })

  it('applies correct flow classes', () => {
    const flows = ['row', 'col'] as const
    const flowClasses = {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
    }

    flows.forEach((flow) => {
      const { container } = render(
        <Grid flow={flow}>
          <div>Content</div>
        </Grid>
      )
      expect(container.firstChild).toHaveClass(flowClasses[flow])
    })
  })

  it('applies custom className', () => {
    const { container } = render(
      <Grid className="custom-class">
        <div>Content</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('combines all props correctly', () => {
    const { container } = render(
      <Grid cols={3} gap={6} flow="col" className="custom-class">
        <div>Content</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass(
      'grid',
      'grid-cols-3',
      'gap-6',
      'grid-flow-col',
      'custom-class'
    )
  })

  it('renders without children', () => {
    const { container } = render(<Grid />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('grid')
  })
}) 