import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const signups = await prisma.earlyAccessSignup.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ signups })
  } catch (error) {
    console.error('Failed to fetch early access signups:', error)
    return NextResponse.json(
      { error: 'Failed to fetch early access signups' },
      { status: 500 }
    )
  }
} 