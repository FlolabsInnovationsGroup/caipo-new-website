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
    const { id, status } = await request.json()

    if (!id || !status) {
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

    const signup = await prisma.earlyAccessSignup.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(signup)
  } catch (error) {
    console.error('Failed to update early access signup:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
} 