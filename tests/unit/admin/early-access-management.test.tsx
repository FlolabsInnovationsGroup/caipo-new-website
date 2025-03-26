import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { useSession } from 'next-auth/react'
import EarlyAccessManagement from '@/app/admin/early-access/page'
import { toast } from 'sonner'
import { ToastProvider } from '@/components/ui/Toast'
import { mockSession } from '../mocks/auth'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

// Mock fetch
global.fetch = jest.fn()

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid="motion-component" {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock prisma client
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    earlyAccessSignup: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          email: 'test@example.com',
          source: 'website',
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}))

// Mock useToast
jest.mock('@/components/Toast', () => ({
  ...jest.requireActual('@/components/Toast'),
  useToast: () => ({
    showToast: jest.fn()
  })
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}))

describe('EarlyAccessManagement', () => {
  const mockSignups = [
    {
      id: '1',
      email: 'test1@example.com',
      status: 'PENDING',
      source: 'homepage',
      createdAt: new Date('2025-03-25').toISOString()
    },
    {
      id: '2',
      email: 'test2@example.com',
      status: 'APPROVED',
      source: 'features',
      createdAt: new Date('2025-03-25').toISOString()
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
    ;(useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'admin@caipo.ai', role: 'ADMIN' } },
      status: 'authenticated'
    })
    ;(global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSignups)
      })
    )

    // Mock session
    const session = mockSession(true); // Pass true to create an admin session
    (useSession as jest.Mock).mockReturnValue({
      data: session,
      status: 'authenticated'
    });

    // Mock URL.createObjectURL
    URL.createObjectURL = jest.fn();
  })

  it('renders the management interface correctly', async () => {
    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Wait for loading state to finish and check if title is rendered
    await waitFor(() => {
      expect(screen.getByText('Early Access Management')).toBeInTheDocument()
    })

    // Check if export button is rendered
    expect(screen.getByText('Export to CSV')).toBeInTheDocument()

    // Check if signups are rendered
    await waitFor(() => {
      expect(screen.getByText('test1@example.com')).toBeInTheDocument()
      expect(screen.getByText('test2@example.com')).toBeInTheDocument()
    })

    // Check if status filters are rendered with correct counts
    const statusButtons = screen.getAllByRole('button')
    const totalButton = statusButtons.find(button => button.textContent?.includes('Total'))
    const pendingButton = statusButtons.find(button => button.textContent?.includes('pending'))
    const approvedButton = statusButtons.find(button => button.textContent?.includes('approved'))
    const rejectedButton = statusButtons.find(button => button.textContent?.includes('rejected'))

    expect(totalButton).toHaveTextContent('2')
    expect(pendingButton).toHaveTextContent('1')
    expect(approvedButton).toHaveTextContent('1')
    expect(rejectedButton).toHaveTextContent('0')

    // Check if table headers are rendered
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Source')).toBeInTheDocument()
    expect(screen.getByText(/Date/)).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()

    // Check if table data is rendered
    expect(screen.getByText('test1@example.com')).toBeInTheDocument()
    expect(screen.getByText('test2@example.com')).toBeInTheDocument()
    expect(screen.getByText('homepage')).toBeInTheDocument()
    expect(screen.getByText('features')).toBeInTheDocument()
  })

  it('handles signup status updates', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSignups)
      })
    ).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Status updated' })
      })
    )

    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Wait for loading state to finish
    await waitFor(() => {
      expect(screen.getByText('test1@example.com')).toBeInTheDocument()
    })

    // Find and click the approve button for the first signup
    const approveButton = screen.getByRole('button', { name: /approve test1@example.com/i })
    await act(async () => {
      fireEvent.click(approveButton)
    })

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/admin/early-access/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: '1', status: 'APPROVED' }),
      })
    })

    expect(toast.success).toHaveBeenCalledWith('Status updated successfully')
  })

  it('handles batch actions', async () => {
    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Wait for loading state to finish
    await waitFor(() => {
      expect(screen.getByText('test1@example.com')).toBeInTheDocument()
    })

    // Select all signups
    const selectAllCheckbox = screen.getByRole('checkbox', { name: 'Select all signups' })
    await act(async () => {
      fireEvent.click(selectAllCheckbox)
    })

    // Check if batch action buttons appear
    expect(screen.getByText('Approve Selected')).toBeInTheDocument()
    expect(screen.getByText('Reject Selected')).toBeInTheDocument()

    // Click batch approve
    const batchApproveButton = screen.getByText('Approve Selected')
    await act(async () => {
      fireEvent.click(batchApproveButton)
    })

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/admin/early-access/update-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: ['1', '2'], status: 'APPROVED' }),
      })
    })

    expect(toast.success).toHaveBeenCalledWith('Updated 2 signups')
  })

  it('handles error states', async () => {
    // Mock failed fetch
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to fetch' }),
      })
    )

    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to load signups')
    })
  })

  it('handles CSV export', async () => {
    // Create a mock Blob
    const mockBlob = new Blob(['test data'], { type: 'text/csv' })
    const mockObjectUrl = 'blob:test-url'

    // Mock URL.createObjectURL and revokeObjectURL
    URL.createObjectURL = jest.fn().mockReturnValue(mockObjectUrl)
    URL.revokeObjectURL = jest.fn()

    // Save original document
    const originalDocument = global.document

    // Create mock anchor element
    const mockAnchor = {
      href: '',
      download: '',
      click: jest.fn(),
      remove: jest.fn(),
      setAttribute: jest.fn(),
      style: {},
      nodeType: 1,
      ownerDocument: document,
      parentNode: document.body,
      childNodes: [],
      appendChild: jest.fn(),
      removeChild: jest.fn(),
    }

    // Mock document
    const mockDocument = {
      ...originalDocument,
      createElement: jest.fn().mockReturnValue(mockAnchor),
      body: {
        ...originalDocument.body,
        appendChild: jest.fn(),
        removeChild: jest.fn(),
      }
    }

    // Replace document
    global.document = mockDocument as any

    render(
      <ToastProvider>
        <EarlyAccessManagement />
      </ToastProvider>
    )

    // Wait for loading state to finish
    await waitFor(() => {
      expect(screen.getByText('test1@example.com')).toBeInTheDocument()
    })

    // Click export button
    const exportButton = screen.getByText('Export to CSV')
    fireEvent.click(exportButton)

    // Verify that the link was created and clicked
    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(mockAnchor.setAttribute).toHaveBeenCalledWith('href', mockObjectUrl)
    expect(mockAnchor.setAttribute).toHaveBeenCalledWith('download', expect.stringMatching(/early-access-signups-.*\.csv/))
    expect(document.body.appendChild).toHaveBeenCalledWith(mockAnchor)
    expect(mockAnchor.click).toHaveBeenCalled()
    expect(document.body.removeChild).toHaveBeenCalledWith(mockAnchor)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(mockObjectUrl)

    // Restore original document
    global.document = originalDocument
  })
}) 