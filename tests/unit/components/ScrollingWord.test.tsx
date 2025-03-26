import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScrollingWord from '@/components/ScrollingWord'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, onMouseEnter, onMouseLeave }: any) => (
      <div className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </div>
    ),
    span: ({ children, className }: any) => (
      <span className={className}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('ScrollingWord', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const testWords = ['test', 'example', 'sample']

  it('renders first word initially', () => {
    render(<ScrollingWord words={testWords} />)
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('test')
  })

  it('cycles through words automatically', () => {
    render(<ScrollingWord words={testWords} interval={1000} />)

    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('test')

    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('example')

    // Advance timer by another second
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('sample')
  })

  it('cycles back to first word after last word', () => {
    render(<ScrollingWord words={testWords} interval={1000} />)

    // Advance through all words
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('test')
  })

  it('stops cycling on hover', async () => {
    const user = userEvent.setup({ delay: null })
    render(<ScrollingWord words={testWords} interval={1000} />)

    // Hover over the component
    await user.hover(screen.getByTestId('scrolling-word'))

    // Advance timer
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // Word should not change
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('test')
  })

  it('resumes cycling after hover ends', async () => {
    const user = userEvent.setup({ delay: null })
    render(<ScrollingWord words={testWords} interval={1000} />)

    // Hover and unhover
    await user.hover(screen.getByTestId('scrolling-word'))
    await user.unhover(screen.getByTestId('scrolling-word'))

    // Advance timer
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // Word should change
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('example')
  })

  it('changes word on click', async () => {
    const user = userEvent.setup({ delay: null })
    render(<ScrollingWord words={testWords} />)

    await user.click(screen.getByTestId('scrolling-word'))
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('example')
  })

  it('applies custom className', () => {
    const { container } = render(
      <ScrollingWord words={testWords} className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('uses default words when none provided', () => {
    render(<ScrollingWord />)
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent(/^(design|transform|automate|analyze|record|transcribe|organize|translate|connect|assist|communicate|simplify)$/)
  })

  it('uses default interval when none provided', () => {
    render(<ScrollingWord words={testWords} />)

    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('test')

    // Advance timer by default interval (2000ms)
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(screen.getByTestId('scrolling-word')).toHaveTextContent('example')
  })
}) 