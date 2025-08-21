import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ walletAddress: string }>
}

// GET - Fetch user by wallet address
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { walletAddress } = await params

    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        audits: {
          include: {
            vulnerabilities: true,
            aiInsights: true,
            auditMetrics: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate user statistics
    const totalAudits = user.audits.length
    const averageScore = totalAudits > 0 
      ? user.audits.reduce((sum, audit) => sum + audit.score, 0) / totalAudits 
      : 0
    
    const totalVulnerabilities = user.audits.reduce((sum, audit) => 
      sum + audit.criticalIssues + audit.highIssues + audit.mediumIssues + audit.lowIssues + audit.informationalIssues, 0
    )

    const formattedUser = {
      id: user.id,
      walletAddress: user.walletAddress,
      createdAt: user.createdAt.toISOString(),
      stats: {
        totalAudits,
        averageScore: Math.round(averageScore),
        totalVulnerabilities,
        criticalIssues: user.audits.reduce((sum, audit) => sum + audit.criticalIssues, 0),
        highIssues: user.audits.reduce((sum, audit) => sum + audit.highIssues, 0),
        mediumIssues: user.audits.reduce((sum, audit) => sum + audit.mediumIssues, 0),
        lowIssues: user.audits.reduce((sum, audit) => sum + audit.lowIssues, 0),
        informationalIssues: user.audits.reduce((sum, audit) => sum + audit.informationalIssues, 0),
      },
      audits: user.audits.map(audit => ({
        id: audit.id,
        contractName: audit.contractName,
        contractAddress: audit.contractAddress,
        transactionHash: audit.transactionHash,
        timestamp: audit.createdAt.toISOString(),
        score: audit.score,
        status: audit.status,
        scanDuration: audit.scanDuration,
        issues: {
          critical: audit.criticalIssues,
          high: audit.highIssues,
          medium: audit.mediumIssues,
          low: audit.lowIssues,
          info: audit.informationalIssues,
        },
        vulnerabilities: audit.vulnerabilities,
        aiInsights: audit.aiInsights,
        metrics: audit.auditMetrics,
      }))
    }

    return NextResponse.json(formattedUser)
  } catch (error) {
    console.error('Get user API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// POST - Create or update user
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { walletAddress } = await params

    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {
        updatedAt: new Date()
      },
      create: {
        walletAddress
      }
    })

    return NextResponse.json({
      id: user.id,
      walletAddress: user.walletAddress,
      createdAt: user.createdAt.toISOString(),
    })
  } catch (error) {
    console.error('Create/update user API error:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    )
  }
}
