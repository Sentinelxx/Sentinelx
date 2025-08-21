import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Fetch single audit
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const audit = await prisma.audit.findUnique({
      where: { id },
      include: {
        user: true,
        vulnerabilities: true,
        aiInsights: true,
        auditMetrics: true,
      }
    })

    if (!audit) {
      return NextResponse.json(
        { error: 'Audit not found' },
        { status: 404 }
      )
    }

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

    return NextResponse.json(formattedAudit)
  } catch (error) {
    console.error('Get audit API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audit' },
      { status: 500 }
    )
  }
}

// PUT - Update audit
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    const audit = await prisma.audit.findUnique({
      where: { id }
    })

    if (!audit) {
      return NextResponse.json(
        { error: 'Audit not found' },
        { status: 404 }
      )
    }

    const {
      score,
      status,
      scanDuration,
      vulnerabilities,
      aiInsights,
      metrics
    } = body

    // Count issues from vulnerabilities if provided
    let issuesUpdate = {}
    if (vulnerabilities) {
      issuesUpdate = {
        criticalIssues: vulnerabilities.filter((v: any) => v.severity === 'Critical').length,
        highIssues: vulnerabilities.filter((v: any) => v.severity === 'High').length,
        mediumIssues: vulnerabilities.filter((v: any) => v.severity === 'Medium').length,
        lowIssues: vulnerabilities.filter((v: any) => v.severity === 'Low').length,
        informationalIssues: vulnerabilities.filter((v: any) => v.severity === 'Informational').length,
      }
    }

    const updatedAudit = await prisma.audit.update({
      where: { id },
      data: {
        ...(score !== undefined && { score }),
        ...(status && { status }),
        ...(scanDuration && { scanDuration }),
        ...issuesUpdate,
      },
      include: {
        user: true,
        vulnerabilities: true,
        aiInsights: true,
        auditMetrics: true,
      }
    })

    // Update vulnerabilities if provided
    if (vulnerabilities) {
      // Delete existing vulnerabilities
      await prisma.vulnerability.deleteMany({
        where: { auditId: id }
      })

      // Create new vulnerabilities
      await prisma.vulnerability.createMany({
        data: vulnerabilities.map((vuln: any) => ({
          ...vuln,
          auditId: id,
        }))
      })
    }

    // Update AI insights if provided
    if (aiInsights) {
      // Delete existing insights
      await prisma.aiInsight.deleteMany({
        where: { auditId: id }
      })

      // Create new insights
      await prisma.aiInsight.createMany({
        data: aiInsights.map((insight: any) => ({
          ...insight,
          auditId: id,
        }))
      })
    }

    // Update metrics if provided
    if (metrics) {
      await prisma.auditMetrics.upsert({
        where: { auditId: id },
        update: metrics,
        create: {
          ...metrics,
          auditId: id,
        }
      })
    }

    // Fetch updated audit with all relations
    const finalAudit = await prisma.audit.findUnique({
      where: { id },
      include: {
        user: true,
        vulnerabilities: true,
        aiInsights: true,
        auditMetrics: true,
      }
    })

    const formattedAudit = {
      id: finalAudit!.id,
      contractName: finalAudit!.contractName,
      contractAddress: finalAudit!.contractAddress,
      transactionHash: finalAudit!.transactionHash,
      walletAddress: finalAudit!.user.walletAddress,
      timestamp: finalAudit!.createdAt.toISOString(),
      score: finalAudit!.score,
      status: finalAudit!.status,
      scanDuration: finalAudit!.scanDuration,
      report: finalAudit!.report,
      issues: {
        critical: finalAudit!.criticalIssues,
        high: finalAudit!.highIssues,
        medium: finalAudit!.mediumIssues,
        low: finalAudit!.lowIssues,
        info: finalAudit!.informationalIssues,
      },
      vulnerabilities: finalAudit!.vulnerabilities,
      aiInsights: finalAudit!.aiInsights,
      metrics: finalAudit!.auditMetrics,
    }

    return NextResponse.json(formattedAudit)
  } catch (error) {
    console.error('Update audit API error:', error)
    return NextResponse.json(
      { error: 'Failed to update audit' },
      { status: 500 }
    )
  }
}

// DELETE - Delete audit
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const audit = await prisma.audit.findUnique({
      where: { id }
    })

    if (!audit) {
      return NextResponse.json(
        { error: 'Audit not found' },
        { status: 404 }
      )
    }

    await prisma.audit.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Audit deleted successfully' })
  } catch (error) {
    console.error('Delete audit API error:', error)
    return NextResponse.json(
      { error: 'Failed to delete audit' },
      { status: 500 }
    )
  }
}
