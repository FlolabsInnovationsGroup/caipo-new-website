import { render, screen } from '@testing-library/react'
import { Hover } from '@/components/ui/Hover'

describe('Hover', () => {
  it('renders children correctly', () => {
    render(
      <Hover>
        <div>Test content</div>
      </Hover>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default props correctly', () => {
    const { container } = render(
      <Hover>
        <div>Content</div>
      </Hover>
    )
    const element = container.firstChild as HTMLElement
    expect(element).toHaveClass('transition-transform', 'duration-300', 'ease-in-out')
    expect(element.style.getPropertyValue('--scale')).toBe('1.05')
    expect(element.style.getPropertyValue('--rotate')).toBe('0deg')
    expect(element.style.getPropertyValue('--translate')).toBe('0px')
  })

  it('applies custom scale', () => {
    const { container } = render(
      <Hover scale={1.2}>
        <div>Content</div>
      </Hover>
    )
    const element = container.firstChild as HTMLElement
    expect(element.style.getPropertyValue('--scale')).toBe('1.2')
  })

  it('applies custom rotate', () => {
    const { container } = render(
      <Hover rotate={45}>
        <div>Content</div>
      </Hover>
    )
    const element = container.firstChild as HTMLElement
    expect(element.style.getPropertyValue('--rotate')).toBe('45deg')
  })

  it('applies custom translateY', () => {
    const { container } = render(
      <Hover translateY="-10px">
        <div>Content</div>
      </Hover>
    )
    const element = container.firstChild as HTMLElement
    expect(element.style.getPropertyValue('--translate')).toBe('-10px')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Hover className="custom-class">
        <div>Content</div>
      </Hover>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies custom style', () => {
    const { container } = render(
      <Hover style={{ backgroundColor: 'red' }}>
        <div>Content</div>
      </Hover>
    )
    const element = container.firstChild as HTMLElement
    expect(element.style.backgroundColor).toBe('red')
  })

  it('renders as Fragment when asChild is true', () => {
    const { container } = render(
      <Hover asChild>
        <div>Content</div>
      </Hover>
    )
    const element = container.firstChild as HTMLElement
    expect(element.tagName).toBe('DIV')
    expect(element.textContent).toBe('Content')
  })

  it('combines all props correctly', () => {
    const { container } = render(
      <Hover
        scale={1.2}
        rotate={45}
        translateY="-10px"
        className="custom-class"
        style={{ backgroundColor: 'red' }}
      >
        <div>Content</div>
      </Hover>
    )
    const element = container.firstChild as HTMLElement
    expect(element).toHaveClass('custom-class')
    expect(element.style.getPropertyValue('--scale')).toBe('1.2')
    expect(element.style.getPropertyValue('--rotate')).toBe('45deg')
    expect(element.style.getPropertyValue('--translate')).toBe('-10px')
    expect(element.style.backgroundColor).toBe('red')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(
      <Hover ref={ref}>
        <div>Content</div>
      </Hover>
    )
    expect(ref).toHaveBeenCalled()
  })
}) 