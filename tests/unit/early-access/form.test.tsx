import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import EarlyAccessForm from '@/components/EarlyAccessForm'
import { toast } from 'sonner'

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}))

// Mock fetch
global.fetch = jest.fn()

describe('EarlyAccessForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
    ;(toast.error as jest.Mock).mockClear()
    ;(toast.success as jest.Mock).mockClear()
  })

  it('renders the form correctly', () => {
    render(<EarlyAccessForm />)
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /join early access/i })).toBeInTheDocument()
  })

  it('handles successful submission', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' })
      })
    )

    render(<EarlyAccessForm />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join early access/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/early-access/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', source: 'unknown' })
      })
    })

    expect(toast.success).toHaveBeenCalledWith('Thanks for signing up! We\'ll be in touch soon.')
  })

  it('handles submission error', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to sign up' })
      })
    )

    render(<EarlyAccessForm />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join early access/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to sign up. Please try again.')
    })
  })

  it('validates email format', async () => {
    render(<EarlyAccessForm />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join early access/i })

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('prevents multiple submissions while loading', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<EarlyAccessForm />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join early access/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
  })

  it('handles duplicate email error', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 409,
        json: () => Promise.resolve({ error: 'Email already exists' })
      })
    )

    render(<EarlyAccessForm />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join early access/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('This email is already registered for early access.')
    })
  })

  it('handles empty email submission', async () => {
    render(<EarlyAccessForm />)

    const submitButton = screen.getByRole('button', { name: /join early access/i })
    fireEvent.click(submitButton)

    expect(toast.error).toHaveBeenCalledWith('Please enter your email address.')
  })

  it('accepts source parameter', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' })
      })
    )

    render(<EarlyAccessForm source="homepage" />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const submitButton = screen.getByRole('button', { name: /join early access/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/early-access/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', source: 'homepage' })
      })
    })
  })
}) 