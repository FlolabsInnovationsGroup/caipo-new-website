import * as React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GetStartedSection from '@/components/GetStartedSection'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<{}>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.PropsWithChildren<{}>) => <p {...props}>{children}</p>,
  },
}))

describe('GetStartedSection', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders the section title and description', () => {
    render(<GetStartedSection />)
    
    expect(screen.getByText('Get Early Access')).toBeInTheDocument()
    expect(screen.getByText(/Join our waitlist to be among the first/)).toBeInTheDocument()
  })

  it('renders the email input and submit button', () => {
    render(<GetStartedSection />)
    
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByText('Join Waitlist')).toBeInTheDocument()
  })

  it('renders trust indicators', () => {
    render(<GetStartedSection />)
    
    expect(screen.getByText('No credit card required')).toBeInTheDocument()
    expect(screen.getByText('Priority access to new features')).toBeInTheDocument()
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument()
  })

  it('handles email input changes', async () => {
    const user = userEvent.setup({ delay: null })
    render(<GetStartedSection />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    await user.type(input, 'test@example.com')
    
    expect(input).toHaveValue('test@example.com')
  })

  it('handles form submission', async () => {
    const user = userEvent.setup({ delay: null })
    render(<GetStartedSection />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByText('Join Waitlist')
    
    await user.type(input, 'test@example.com')
    await user.click(submitButton)
    
    // Button should show loading state
    expect(screen.getByText('Joining...')).toBeInTheDocument()
    
    // Fast-forward timer
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    // Success message should be shown
    expect(screen.getByText("Thanks for joining! We'll be in touch soon.")).toBeInTheDocument()
    
    // Input should be cleared
    expect(input).toHaveValue('')
  })

  it('requires email input', async () => {
    const user = userEvent.setup({ delay: null })
    render(<GetStartedSection />)
    
    const form = screen.getByRole('form')
    await user.click(form)
    
    // The form should not submit with empty email (HTML5 validation)
    const input = screen.getByPlaceholderText('Enter your email')
    expect(input).toBeInvalid()
  })

  it('validates email format', async () => {
    const user = userEvent.setup({ delay: null })
    render(<GetStartedSection />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    await user.type(input, 'invalid-email')
    
    const form = screen.getByRole('form')
    await user.click(form)
    
    // The form should not submit with invalid email (HTML5 validation)
    expect(input).toBeInvalid()
  })

  it('disables submit button during submission', async () => {
    const user = userEvent.setup({ delay: null })
    render(<GetStartedSection />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByText('Join Waitlist')
    
    await user.type(input, 'test@example.com')
    await user.click(submitButton)
    
    // Button should be disabled during submission
    expect(submitButton).toBeDisabled()
    
    // Fast-forward timer
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    // Button should be enabled again
    expect(submitButton).not.toBeDisabled()
  })
}) 