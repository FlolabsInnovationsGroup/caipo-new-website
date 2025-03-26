import { Response } from 'node-fetch'
import { NextResponse } from 'next/server'
import { POST } from '@/app/api/early-access/signup/route'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// Mock next-auth
jest.mock('next-auth')

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    earlyAccessSignup: {
      create: jest.fn(),
      findUnique: jest.fn()
    }
  }
}))

// Mock NextResponse
jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: (data: any, init?: ResponseInit) => {
      const response = new Response(JSON.stringify(data), init)
      response.json = () => Promise.resolve(data)
      return response
    }
  }
}))

describe('Early Access API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/early-access/signup', () => {
    it('creates a new signup', async () => {
      // Mock findUnique to return null (no existing signup)
      ;(prisma.earlyAccessSignup.findUnique as jest.Mock).mockResolvedValue(null)

      // Mock create to return a new signup
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
      expect(response.status).toBe(201)
    })

    it('handles duplicate email', async () => {
      // Mock findUnique to return an existing signup
      ;(prisma.earlyAccessSignup.findUnique as jest.Mock).mockResolvedValue({
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
      expect(response.status).toBe(409)
    })

    it('handles invalid email', async () => {
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