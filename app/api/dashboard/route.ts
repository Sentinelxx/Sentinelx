import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const walletAddress = searchParams.get('wallet')

    // Get recent audits (filtered by wallet if provided)
    const recentAudits = await prisma.audit.findMany({
      where: walletAddress ? {
        user: {
          walletAddress: walletAddress
        }
      } : {},
      include: {
        user: true,
        vulnerabilities: true,
        aiInsights: true,
        auditMetrics: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
    })

    // Get global stats
    const globalStats = await prisma.globalStats.findFirst()

    // Get vulnerability types for analytics
    const vulnerabilityTypes = await prisma.vulnerabilityType.findMany({
      orderBy: {
        count: 'desc'
      }
    })

    // Calculate audit summary from recent audits
    const auditSummary = recentAudits.length > 0 ? {
      score: Math.round(recentAudits.reduce((sum, audit) => sum + audit.score, 0) / recentAudits.length),
      criticalIssues: recentAudits.reduce((sum, audit) => sum + audit.criticalIssues, 0),
      highIssues: recentAudits.reduce((sum, audit) => sum + audit.highIssues, 0),
      mediumIssues: recentAudits.reduce((sum, audit) => sum + audit.mediumIssues, 0),
      lowIssues: recentAudits.reduce((sum, audit) => sum + audit.lowIssues, 0),
      informational: recentAudits.reduce((sum, audit) => sum + audit.informationalIssues, 0),
      lastScan: recentAudits[0]?.createdAt.toISOString(),
      contractsScanned: recentAudits.length,
      vulnerabilitiesFixed: globalStats?.totalVulnerabilitiesFixed || 0,
      scanDuration: recentAudits[0]?.scanDuration || '0s',
    } : {
      score: 0,
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 0,
      lowIssues: 0,
      informational: 0,
      lastScan: new Date().toISOString(),
      contractsScanned: 0,
      vulnerabilitiesFixed: 0,
      scanDuration: '0s',
    }

    // Get AI insights from recent audits
    const aiInsights = await prisma.aiInsight.findMany({
      where: {
        auditId: {
          in: recentAudits.map(audit => audit.id)
        }
      },
      orderBy: {
        confidence: 'desc'
      },
      take: 10,
    })

    // Format the data to match the frontend expectations
    const formattedAudits = recentAudits.map(audit => ({
      id: audit.id,
      contractName: audit.contractName,
      contractAddress: audit.contractAddress,
      transactionHash: audit.transactionHash,
      walletAddress: audit.user.walletAddress,
      timestamp: audit.createdAt.toISOString(),
      score: audit.score,
      status: audit.status,
      scanDuration: audit.scanDuration,
      report: audit.report,
      issues: {
        critical: audit.criticalIssues,
        high: audit.highIssues,
        medium: audit.mediumIssues,
        low: audit.lowIssues,
        info: audit.informationalIssues,
      },
      vulnerabilities: audit.vulnerabilities,
      metrics: audit.auditMetrics,
    }))

    const response = {
      auditSummary,
      recentAudits: formattedAudits,
      vulnerabilityTypes: vulnerabilityTypes.map(vt => ({
        name: vt.name,
        count: vt.count,
        severity: vt.severity,
        category: vt.category,
      })),
      aiInsights: aiInsights.map(insight => ({
        title: insight.title,
        description: insight.description,
        severity: insight.severity,
        confidence: insight.confidence,
        location: insight.location,
        category: insight.category,
      })),
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
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
