import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Email validation schema
const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const { email, source } = emailSchema.parse(body)

    // Check if email already exists
    const existingSignup = await prisma.earlyAccessSignup.findUnique({
      where: { email }
    })

    if (existingSignup) {
      return NextResponse.json(
        { error: 'Email already registered for early access' },
        { status: 409 }
      )
    }

    // Create new signup
    const signup = await prisma.earlyAccessSignup.create({
      data: {
        email,
        source: source || 'unknown'
      }
    })

    // TODO: Send confirmation email
    // This would be implemented with your email service provider

    return NextResponse.json(
      { message: 'Successfully signed up for early access', id: signup.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Early access signup error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to sign up for early access' },
      { status: 500 }
    )
  }
} 