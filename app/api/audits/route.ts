import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch audits
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const walletAddress = searchParams.get('wallet')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where = {
      ...(walletAddress && {
        user: {
          walletAddress: walletAddress
        }
      }),
      ...(status && { status })
    }

    const audits = await prisma.audit.findMany({
      where,
      include: {
        user: true,
        vulnerabilities: true,
        aiInsights: true,
        auditMetrics: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit,
    })

    const total = await prisma.audit.count({ where })

    const formattedAudits = audits.map(audit => ({
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
      aiInsights: audit.aiInsights,
      metrics: audit.auditMetrics,
    }))

    return NextResponse.json({
      audits: formattedAudits,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      }
    })
  } catch (error) {
    console.error('Audits API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audits' },
      { status: 500 }
    )
  }
}

// POST - Create new audit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      contractName,
      contractAddress,
      transactionHash,
      walletAddress,
      score = 0,
      status = 'Pending',
      scanDuration,
      report,
      vulnerabilities = [],
      aiInsights = [],
      metrics
    } = body

    // Validate required fields
    if (!contractName || !contractAddress || !transactionHash || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: contractName, contractAddress, transactionHash, walletAddress' },
        { status: 400 }
      )
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress }
    })

    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress }
      })
    }

    // Check if audit with this transaction hash already exists
    const existingAudit = await prisma.audit.findUnique({
      where: { transactionHash }
    })

    if (existingAudit) {
      return NextResponse.json(
        { error: 'Audit with this transaction hash already exists' },
        { status: 409 }
      )
    }

    // Count issues from vulnerabilities
    const criticalIssues = vulnerabilities.filter((v: any) => v.severity === 'Critical').length
    const highIssues = vulnerabilities.filter((v: any) => v.severity === 'High').length
    const mediumIssues = vulnerabilities.filter((v: any) => v.severity === 'Medium').length
    const lowIssues = vulnerabilities.filter((v: any) => v.severity === 'Low').length
    const informationalIssues = vulnerabilities.filter((v: any) => v.severity === 'Informational').length

    // Create audit with related data
    const audit = await prisma.audit.create({
      data: {
        contractName,
        contractAddress,
        transactionHash,
        score,
        status,
        scanDuration,
        report,
        userId: user.id,
        criticalIssues,
        highIssues,
        mediumIssues,
        lowIssues,
        informationalIssues,
        vulnerabilities: {
          create: vulnerabilities.map((vuln: any) => ({
            name: vuln.name,
            description: vuln.description,
            severity: vuln.severity,
            location: vuln.location,
            category: vuln.category,
            confidence: vuln.confidence,
            fixed: vuln.fixed || false,
          }))
        },
        aiInsights: {
          create: aiInsights.map((insight: any) => ({
            title: insight.title,
            description: insight.description,
            severity: insight.severity,
            confidence: insight.confidence,
            location: insight.location,
            category: insight.category,
          }))
        },
        ...(metrics && {
          auditMetrics: {
            create: {
              codeCoverage: metrics.codeCoverage || 0,
              testCoverage: metrics.testCoverage || 0,
              documentation: metrics.documentation || 0,
              bestPractices: metrics.bestPractices || 0,
              gasOptimization: metrics.gasOptimization || 0,
              securityScore: metrics.securityScore || score,
            }
          }
        })
      },
      include: {
        user: true,
        vulnerabilities: true,
        aiInsights: true,
        auditMetrics: true,
      }
    })

    // Update global stats
    await updateGlobalStats()

    const formattedAudit = {
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
      aiInsights: audit.aiInsights,
      metrics: audit.auditMetrics,
    }

    return NextResponse.json(formattedAudit, { status: 201 })
  } catch (error) {
    console.error('Create audit API error:', error)
    return NextResponse.json(
      { error: 'Failed to create audit' },
      { status: 500 }
    )
  }
}

// Helper function to update global stats
async function updateGlobalStats() {
  const totalAudits = await prisma.audit.count()
  const totalVulnerabilities = await prisma.vulnerability.count()
  const totalVulnerabilitiesFixed = await prisma.vulnerability.count({
    where: { fixed: true }
  })
  
  const audits = await prisma.audit.findMany()
  const averageSecurityScore = audits.length > 0 
    ? audits.reduce((sum, audit) => sum + audit.score, 0) / audits.length 
    : 0

  const criticalVulns = await prisma.vulnerability.count({ where: { severity: 'Critical' } })
  const highVulns = await prisma.vulnerability.count({ where: { severity: 'High' } })
  const mediumVulns = await prisma.vulnerability.count({ where: { severity: 'Medium' } })
  const lowVulns = await prisma.vulnerability.count({ where: { severity: 'Low' } })
  const informationalVulns = await prisma.vulnerability.count({ where: { severity: 'Informational' } })

  await prisma.globalStats.upsert({
    where: { id: 'global-stats-1' },
    update: {
      totalAudits,
      totalVulnerabilities,
      totalVulnerabilitiesFixed,
      averageSecurityScore,
      totalContractsScanned: totalAudits,
      criticalVulns,
      highVulns,
      mediumVulns,
      lowVulns,
      informationalVulns,
    },
    create: {
      id: 'global-stats-1',
      totalAudits,
      totalVulnerabilities,
      totalVulnerabilitiesFixed,
      averageSecurityScore,
      totalContractsScanned: totalAudits,
      criticalVulns,
      highVulns,
      mediumVulns,
      lowVulns,
      informationalVulns,
    },
  })
}
