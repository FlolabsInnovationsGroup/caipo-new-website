import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLogin from '@/app/admin/login/page'
import { toast } from 'sonner'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('AdminLogin', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('renders the login form correctly', () => {
    render(<AdminLogin />)
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles successful login', async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({
      error: null,
    })

    render(<AdminLogin />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      fireEvent.click(submitButton)
    })

    expect(signIn).toHaveBeenCalledWith('credentials', {
      username: 'admin',
      password: 'password',
      redirect: false,
    })

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin')
    })
  })

  it('handles login failure', async () => {
    ;(signIn as jest.Mock).mockResolvedValueOnce({
      error: 'Invalid credentials',
    })

    render(<AdminLogin />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'wrong' } })
      fireEvent.change(passwordInput, { target: { value: 'wrong' } })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials')
    })
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('handles network error', async () => {
    ;(signIn as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    render(<AdminLogin />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred. Please try again.')
    })
  })

  it('prevents submission with empty fields', async () => {
    render(<AdminLogin />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    // Try to submit without filling in the fields
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(signIn).not.toHaveBeenCalled()
    
    // Check that the inputs have the required attribute
    expect(usernameInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('required')
  })

  it('shows loading state during submission', async () => {
    let resolveSignIn: (value: any) => void
    const signInPromise = new Promise((resolve) => {
      resolveSignIn = resolve
    })
    ;(signIn as jest.Mock).mockReturnValueOnce(signInPromise)

    render(<AdminLogin />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      fireEvent.click(submitButton)
    })

    // Check for loading spinner
    const loadingSpinner = screen.getByTestId('loading-spinner')
    expect(loadingSpinner).toBeInTheDocument()
    expect(loadingSpinner).toHaveClass('animate-spin')
    expect(submitButton).toBeDisabled()

    // Resolve the pending promise
    resolveSignIn!({ error: null })
  })
}) 