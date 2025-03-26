import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    const { ids, status } = await request.json()

    if (!ids || !Array.isArray(ids) || !status) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      )
    }

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid status' }),
        { status: 400 }
      )
    }

    // Update all signups in a single transaction
    const result = await prisma.$transaction(
      ids.map(id => 
        prisma.earlyAccessSignup.update({
          where: { id },
          data: { status }
        })
      )
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to update early access signups:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
} 