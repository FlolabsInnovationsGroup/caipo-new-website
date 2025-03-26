import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateSchema = z.object({
  id: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED'])
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = updateSchema.parse(body)

    const signup = await prisma.earlyAccessSignup.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json({ signup })
  } catch (error) {
    console.error('Failed to update early access signup status:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update signup status' },
      { status: 500 }
    )
  }
} 