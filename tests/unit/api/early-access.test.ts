import { Response } from 'node-fetch'

// Mock Response before importing Next.js modules
global.Response = Response as any

// Import other modules
import { POST } from '@/app/api/early-access/signup/route'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

// Mock next-auth
jest.mock('next-auth')
jest.mock('@/lib/prisma')

describe('Early Access API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/early-access/signup', () => {
    it('creates a new signup', async () => {
      // Mock session
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      // Mock database query
      ;(prisma.earlyAccessSignup.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        status: 'pending'
      })

      const request = new NextRequest('http://localhost:3000/api/early-access/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('handles duplicate email', async () => {
      // Mock session
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      // Mock database query to throw unique constraint error
      ;(prisma.earlyAccessSignup.create as jest.Mock).mockRejectedValue({
        code: 'P2002'
      })

      const request = new NextRequest('http://localhost:3000/api/early-access/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('handles invalid email', async () => {
      // Mock session
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/early-access/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: 'invalid-email'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })
  })
}) 