import { Response } from 'node-fetch'

// Mock Response before importing Next.js modules
global.Response = Response as any

// Import other modules
import { GET } from '@/app/api/admin/early-access/route'
import { POST as updateStatus } from '@/app/api/admin/early-access/update-status/route'
import { POST as updateBatch } from '@/app/api/admin/early-access/update-batch/route'
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Mock next-auth
jest.mock('next-auth')
jest.mock('@/lib/prisma')

describe('Early Access Management API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/admin/early-access', () => {
    it('returns early access signups for admin', async () => {
      // Mock session
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'admin@example.com' }
      })

      // Mock database query
      ;(prisma.earlyAccessSignup.findMany as jest.Mock).mockResolvedValue([
        { id: 1, email: 'test1@example.com', status: 'pending' },
        { id: 2, email: 'test2@example.com', status: 'approved' }
      ])

      const response = await GET()
      expect(response.status).toBe(200)
    })
  })

  describe('POST /api/admin/early-access/update-status', () => {
    it('updates signup status', async () => {
      // Mock session
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'admin@example.com' }
      })

      // Mock database query
      ;(prisma.earlyAccessSignup.update as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        status: 'approved'
      })

      const request = new NextRequest('http://localhost:3000/api/admin/early-access/update-status', {
        method: 'POST',
        body: JSON.stringify({
          id: 1,
          status: 'approved'
        })
      })

      const response = await updateStatus(request)
      expect(response.status).toBe(200)
    })
  })

  describe('POST /api/admin/early-access/update-batch', () => {
    it('updates multiple signups', async () => {
      // Mock session
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'admin@example.com' }
      })

      // Mock database query
      ;(prisma.earlyAccessSignup.updateMany as jest.Mock).mockResolvedValue({
        count: 2
      })

      const request = new NextRequest('http://localhost:3000/api/admin/early-access/update-batch', {
        method: 'POST',
        body: JSON.stringify({
          ids: [1, 2],
          status: 'approved'
        })
      })

      const response = await updateBatch(request)
      expect(response.status).toBe(200)
    })

    it('handles invalid request body', async () => {
      // Mock session
      ;(getServerSession as jest.Mock).mockResolvedValue({
        user: { email: 'admin@example.com' }
      })

      const request = new NextRequest('http://localhost:3000/api/admin/early-access/update-batch', {
        method: 'POST',
        body: JSON.stringify({
          // Missing required fields
        })
      })

      const response = await updateBatch(request)
      expect(response.status).toBe(400)
    })
  })
}) 