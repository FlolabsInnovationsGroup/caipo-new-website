import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    )
  }

  try {
    // Get counts for each status
    const [totalSignups, pendingSignups, approvedSignups, rejectedSignups] = await Promise.all([
      prisma.earlyAccessSignup.count(),
      prisma.earlyAccessSignup.count({ where: { status: 'PENDING' } }),
      prisma.earlyAccessSignup.count({ where: { status: 'APPROVED' } }),
      prisma.earlyAccessSignup.count({ where: { status: 'REJECTED' } })
    ])

    // Get recent signups
    const recentSignups = await prisma.earlyAccessSignup.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        source: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      totalSignups,
      pendingSignups,
      approvedSignups,
      rejectedSignups,
      recentSignups
    })
  } catch (error) {
    console.error('Failed to fetch admin stats:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
} 