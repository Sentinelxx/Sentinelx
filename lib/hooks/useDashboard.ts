import { useState, useEffect } from 'react'

export interface AuditIssues {
  critical: number
  high: number
  medium: number
  low: number
  info: number
}

export interface AuditSummary {
  score: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
  informational: number
  lastScan: string
  contractsScanned: number
  vulnerabilitiesFixed: number
  scanDuration: string
}

export interface RecentAudit {
  id: string
  contractName: string
  contractAddress: string
  transactionHash: string
  walletAddress: string
  timestamp: string
  score: number
  status: string
  scanDuration?: string
  issues: AuditIssues
}

export interface VulnerabilityType {
  name: string
  count: number
  severity: string
  category?: string
}

export interface AiInsight {
  title: string
  description: string
  severity: string
  confidence: number
  location: string
  category?: string
}

export interface DashboardData {
  auditSummary: AuditSummary
  recentAudits: RecentAudit[]
  vulnerabilityTypes: VulnerabilityType[]
  aiInsights: AiInsight[]
  globalStats?: {
    totalAudits: number
    totalVulnerabilities: number
    totalVulnerabilitiesFixed: number
    averageSecurityScore: number
    totalContractsScanned: number
    vulnerabilityBreakdown: {
      critical: number
      high: number
      medium: number
      low: number
      informational: number
    }
  }
}

export function useDashboard(walletAddress?: string) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (walletAddress) {
        params.append('wallet', walletAddress)
      }

      const response = await fetch(`/api/dashboard?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.statusText}`)
      }

      const dashboardData = await response.json()
      setData(dashboardData)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [walletAddress])

  const refetch = () => {
    fetchDashboardData()
  }

  return {
    data,
    loading,
    error,
    refetch
  }
}
