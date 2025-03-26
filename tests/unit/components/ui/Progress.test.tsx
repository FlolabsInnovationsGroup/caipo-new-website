import React from 'react'
import { render, screen } from '@testing-library/react'
import { Progress } from '@/components/ui/progress'

describe('Progress', () => {
  it('renders with default value', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '50')
  })

  it('renders with custom max value', () => {
    render(<Progress value={75} max={200} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '75')
    expect(progress).toHaveAttribute('aria-valuemax', '200')
  })

  it('clamps value to max', () => {
    render(<Progress value={150} max={100} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '100')
  })

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-progress" />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveClass('custom-progress')
  })

  it('renders with indeterminate state when no value provided', () => {
    render(<Progress />)
    const progress = screen.getByRole('progressbar')
    expect(progress).not.toHaveAttribute('aria-valuenow')
  })

  it('renders with ARIA labels', () => {
    render(
      <Progress
        value={50}
        aria-label="Loading progress"
        aria-describedby="progress-description"
      />
    )
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-label', 'Loading progress')
    expect(progress).toHaveAttribute('aria-describedby', 'progress-description')
  })
}) 