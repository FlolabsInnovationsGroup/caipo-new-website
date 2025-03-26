import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider } from '@/components/ui/Toast'
import EarlyAccessManagement from '@/app/admin/early-access/page'

// Mock the fetch API
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock the Blob and URL APIs
global.Blob = jest.fn()
global.URL.createObjectURL = jest.fn()
global.URL.revokeObjectURL = jest.fn()

describe('EarlyAccessManagement', () => {
  const mockSignups = [
    {
      id: '1',
      email: 'test@example.com',
      source: 'twitter',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'test1@example.com',
      source: 'facebook',
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
    },
  ]

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    
    // Setup a fresh DOM container for each test
    const container = document.createElement('div')
    container.id = 'root'
    document.body.appendChild(container)
  })

  afterEach(() => {
    // Clean up after each test
    const container = document.getElementById('root')
    if (container) {
      document.body.removeChild(container)
    }
  })

  it('renders the management interface', async () => {
    // Mock successful API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSignups,
    })

    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Check for loading state
    expect(screen.getByRole('status')).toBeInTheDocument()

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
      expect(screen.getByText('test1@example.com')).toBeInTheDocument()
    })

    // Verify status counts
    expect(screen.getByText('2')).toBeInTheDocument() // Total count
    expect(screen.getByRole('button', { name: /pending/i }).querySelector('.text-2xl')).toHaveTextContent('1')
    expect(screen.getByRole('button', { name: /approved/i }).querySelector('.text-2xl')).toHaveTextContent('1')
  })

  it('handles signup status updates', async () => {
    // Mock successful API responses
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSignups,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockSignups[0], status: 'APPROVED' }),
      })

    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    // Find and click the approve button
    const approveButton = screen.getByLabelText('Approve test@example.com')
    await userEvent.click(approveButton)

    // Verify API call
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/admin/early-access/1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ status: 'APPROVED' }),
      })
    )
  })

  it('handles error states', async () => {
    // Mock failed API response
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Check for loading state
    expect(screen.getByRole('status')).toBeInTheDocument()

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to fetch')
    })
  })

  it('handles CSV export', async () => {
    // Mock successful API response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockSignups,
    })

    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    // Find and click the export button
    const exportButton = screen.getByText('Export to CSV')
    await userEvent.click(exportButton)

    // Verify Blob and URL creation
    expect(global.Blob).toHaveBeenCalled()
    expect(global.URL.createObjectURL).toHaveBeenCalled()
  })
}) 