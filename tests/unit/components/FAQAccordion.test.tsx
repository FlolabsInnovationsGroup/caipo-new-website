import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQAccordion from '@/components/FAQAccordion'

const mockFAQs = [
  {
    question: 'What is this service?',
    answer: 'This is a test service description.'
  },
  {
    question: 'How much does it cost?',
    answer: 'The pricing varies based on your needs.'
  }
]

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    span: ({ children, ...props }: any) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

describe('FAQAccordion', () => {
  const user = userEvent.setup({ delay: null })

  it('renders all questions', () => {
    render(<FAQAccordion faqs={mockFAQs} />)
    mockFAQs.forEach(faq => {
      expect(screen.getByText(faq.question)).toBeInTheDocument()
    })
  })

  it('toggles answer visibility when question is clicked', async () => {
    render(<FAQAccordion faqs={mockFAQs} />)
    const firstQuestion = screen.getByText(mockFAQs[0].question)
    
    // Initially answer should not be visible
    expect(screen.queryByText(mockFAQs[0].answer)).not.toBeInTheDocument()
    
    // Click to show answer
    await user.click(firstQuestion)
    await waitFor(() => {
      expect(screen.getByText(mockFAQs[0].answer)).toBeInTheDocument()
    }, { timeout: 1000 })
    
    // Click to hide answer
    await user.click(firstQuestion)
    await waitFor(() => {
      expect(screen.queryByText(mockFAQs[0].answer)).not.toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('can have multiple answers visible simultaneously', async () => {
    render(<FAQAccordion faqs={mockFAQs} />)
    
    // Click both questions
    await user.click(screen.getByText(mockFAQs[0].question))
    await user.click(screen.getByText(mockFAQs[1].question))
    
    // Both answers should be visible
    await waitFor(() => {
      expect(screen.getByText(mockFAQs[0].answer)).toBeInTheDocument()
      expect(screen.getByText(mockFAQs[1].answer)).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('updates icon when question is toggled', async () => {
    render(<FAQAccordion faqs={mockFAQs} />)
    const firstQuestion = screen.getByText(mockFAQs[0].question)
    const firstIcon = screen.getAllByTestId('faq-icon')[0]
    
    // Initial state
    expect(firstIcon).toHaveAttribute('data-state', 'closed')
    
    // After opening
    await user.click(firstQuestion)
    await waitFor(() => {
      expect(firstIcon).toHaveAttribute('data-state', 'open')
    }, { timeout: 1000 })
    
    // After closing
    await user.click(firstQuestion)
    await waitFor(() => {
      expect(firstIcon).toHaveAttribute('data-state', 'closed')
    }, { timeout: 1000 })
  })

  it('applies correct styles to questions', () => {
    render(<FAQAccordion faqs={mockFAQs} />)
    const questions = screen.getAllByRole('button')
    
    questions.forEach(question => {
      expect(question).toHaveClass('w-full', 'text-left')
    })
  })

  it('shows expand/collapse icons', () => {
    render(<FAQAccordion faqs={mockFAQs} />)
    const icons = screen.getAllByTestId('faq-icon')
    
    expect(icons).toHaveLength(mockFAQs.length)
    icons.forEach(icon => {
      expect(icon).toBeInTheDocument()
    })
  })

  it('renders with custom className', () => {
    const { container } = render(
      <FAQAccordion faqs={mockFAQs} className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles empty FAQ list gracefully', () => {
    const { container } = render(<FAQAccordion faqs={[]} />)
    expect(container.firstChild).toBeEmptyDOMElement()
  })
}) 