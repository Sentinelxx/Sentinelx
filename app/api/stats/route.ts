import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch global statistics
export async function GET() {
  try {
    // Get global stats
    const globalStats = await prisma.globalStats.findFirst()

    // Get vulnerability types
    const vulnerabilityTypes = await prisma.vulnerabilityType.findMany({
      orderBy: {
        count: 'desc'
      }
    })

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentAudits = await prisma.audit.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5,
      include: {
        user: true
      }
    })

    // Calculate additional statistics
    const totalUsers = await prisma.user.count()
    const activeUsers = await prisma.user.count({
      where: {
        audits: {
          some: {
            createdAt: {
              gte: thirtyDaysAgo
            }
          }
        }
      }
    })

    // Get top performing contracts (highest scores)
    const topContracts = await prisma.audit.findMany({
      where: {
        score: {
          gte: 90
        }
      },
      orderBy: {
        score: 'desc'
      },
      take: 5,
      include: {
        user: true
      }
    })

    // Get most common vulnerabilities
    const vulnerabilityStats = await prisma.vulnerability.groupBy({
      by: ['severity'],
      _count: {
        id: true
      }
    })

    const response = {
      globalStats: globalStats ? {
        totalAudits: globalStats.totalAudits,
        totalVulnerabilities: globalStats.totalVulnerabilities,
        totalVulnerabilitiesFixed: globalStats.totalVulnerabilitiesFixed,
        averageSecurityScore: globalStats.averageSecurityScore,
        totalContractsScanned: globalStats.totalContractsScanned,
        vulnerabilityBreakdown: {
          critical: globalStats.criticalVulns,
          high: globalStats.highVulns,
          medium: globalStats.mediumVulns,
          low: globalStats.lowVulns,
          informational: globalStats.informationalVulns,
        }
      } : null,
      vulnerabilityTypes: vulnerabilityTypes.map(vt => ({
        name: vt.name,
        count: vt.count,
        severity: vt.severity,
        category: vt.category,
      })),
      recentActivity: recentAudits.map(audit => ({
        id: audit.id,
        contractName: audit.contractName,
        contractAddress: audit.contractAddress,
        transactionHash: audit.transactionHash,
        walletAddress: audit.user.walletAddress,
        timestamp: audit.createdAt.toISOString(),
        score: audit.score,
        status: audit.status,
      })),
      userStats: {
        totalUsers,
        activeUsers,
        activeUserPercentage: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0,
      },
      topPerformingContracts: topContracts.map(audit => ({
        id: audit.id,
        contractName: audit.contractName,
        contractAddress: audit.contractAddress,
        transactionHash: audit.transactionHash,
        walletAddress: audit.user.walletAddress,
        score: audit.score,
        timestamp: audit.createdAt.toISOString(),
      })),
      vulnerabilityStats: vulnerabilityStats.reduce((acc, stat) => {
        acc[stat.severity.toLowerCase()] = stat._count.id
        return acc
      }, {} as Record<string, number>),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
