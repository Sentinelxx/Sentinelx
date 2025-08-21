"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Shield,
  Brain,
  AlertTriangle,
  Clock,
  FileText,
  BarChart3,
  Activity,
  Search,
  ChevronDown,
  RefreshCw,
  Download,
  Filter,
  ArrowRight,
  Wallet,
  ExternalLink,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useDashboard } from "@/lib/hooks/useDashboard"

export default function AiAuditsPage() {
  const [loaded, setLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWallet, setSelectedWallet] = useState<string>("")
  const [showAllInsights, setShowAllInsights] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  
  // Fetch dashboard data using the hook
  const { data, loading, error, refetch } = useDashboard(selectedWallet || undefined)

  // Background matrix effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setupCanvas = () => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const fontSize = 14
      const columns = Math.floor(canvas.width / fontSize)

      const drops: number[] = []
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100
      }

      const matrix = "10AUDIT SECURITY SCAN VULNERABILITY AI"

      function draw() {
        if (!canvas || !ctx) return
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "rgba(34, 197, 94, 0.07)"
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)]
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }

          drops[i]++
        }
      }

      const interval = setInterval(draw, 33)

      const resizeHandler = () => {
        if (!canvas) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      window.addEventListener("resize", resizeHandler)

      return () => {
        clearInterval(interval)
        window.removeEventListener("resize", resizeHandler)
      }
    }

    // Delay the canvas setup to ensure the component is fully mounted
    const timer = setTimeout(() => {
      setupCanvas()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleRefresh = () => {
    refetch()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      case "informational":
        return "text-gray-400"
      default:
        return "text-green-500"
    }
  }

  const getSeverityBgColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500/20 border-red-500"
      case "high":
        return "bg-orange-500/20 border-orange-500"
      case "medium":
        return "bg-yellow-500/20 border-yellow-500"
      case "low":
        return "bg-blue-500/20 border-blue-500"
      case "informational":
        return "bg-gray-500/20 border-gray-500"
      default:
        return "bg-green-500/20 border-green-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-green-400"
    if (score >= 70) return "text-yellow-500"
    if (score >= 60) return "text-orange-500"
    return "text-red-500"
  }

  const getScoreRingColor = (score: number) => {
    if (score >= 90) return "border-green-500"
    if (score >= 80) return "border-green-400"
    if (score >= 70) return "border-yellow-500"
    if (score >= 60) return "border-orange-500"
    return "border-red-500"
  }

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-green-500 font-mono">
        <canvas ref={canvasRef} className="fixed inset-0 z-0" />
        <div className="relative z-10">
          <Navigation />
          <section className="pt-32 pb-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-4">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                <span className="text-sm">Loading Dashboard...</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  // Show error state
  if (error) {
    return (
      <main className="min-h-screen bg-black text-green-500 font-mono">
        <canvas ref={canvasRef} className="fixed inset-0 z-0" />
        <div className="relative z-10">
          <Navigation />
          <section className="pt-32 pb-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center bg-red-950/50 px-4 py-2 rounded-full mb-4">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="text-sm">Error: {error}</span>
              </div>
              <Button onClick={handleRefresh} className="bg-green-600 hover:bg-green-700 text-black font-bold">
                Retry
              </Button>
            </div>
          </section>
        </div>
      </main>
    )
  }

  // Get data with fallbacks
  const auditSummary = data?.auditSummary || {
    score: 0,
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0,
    lowIssues: 0,
    informational: 0,
    lastScan: new Date().toISOString(),
    contractsScanned: 0,
    vulnerabilitiesFixed: 0,
    scanDuration: "0s",
  }

  const recentAudits = data?.recentAudits || []
  const vulnerabilityTypes = data?.vulnerabilityTypes || []
  const aiInsights = data?.aiInsights || []

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      <div className={`relative z-10 transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />

        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-4">
                  <Brain className="h-4 w-4 mr-2" />
                  <span className="text-sm">AI-Powered Security Analysis</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  <span className="text-green-400">{">"}</span> Smart Contract Audit Dashboard
                </h1>
                {selectedWallet && (
                  <div className="mt-2 flex items-center text-green-400">
                    <Wallet className="h-4 w-4 mr-2" />
                    <span className="text-sm">Wallet: {selectedWallet}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Filter by wallet address..."
                    className="w-full md:w-64 bg-black border-green-800 focus:border-green-500 text-green-500 pl-10"
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                  />
                  <Wallet className="absolute left-3 top-2.5 h-4 w-4 text-green-800" />
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search contracts..."
                    className="w-full md:w-64 bg-black border-green-800 focus:border-green-500 text-green-500 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-800" />
                </div>

                <Button
                  className="bg-green-950/50 hover:bg-green-950/70 border border-green-800 flex items-center gap-2"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>

                <Button className="bg-green-600 hover:bg-green-700 text-black font-bold">New Audit</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-green-950/10 border border-green-900 rounded-lg p-6 flex items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${getScoreRingColor(auditSummary.score)} mr-4`}
                >
                  <span className={`text-xl font-bold ${getScoreColor(auditSummary.score)}`}>{auditSummary.score}</span>
                </div>
                <div>
                  <h3 className="font-bold">Security Score</h3>
                  <p className="text-sm text-green-400">Overall security rating</p>
                </div>
              </div>

              <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                  <h3 className="font-bold">Vulnerabilities</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-red-500 font-bold">{auditSummary.criticalIssues}</div>
                    <div className="text-xs text-green-400">Critical</div>
                  </div>
                  <div>
                    <div className="text-orange-500 font-bold">{auditSummary.highIssues}</div>
                    <div className="text-xs text-green-400">High</div>
                  </div>
                  <div>
                    <div className="text-yellow-500 font-bold">{auditSummary.mediumIssues}</div>
                    <div className="text-xs text-green-400">Medium</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-bold">Protected Assets</h3>
                </div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold mr-2">{auditSummary.contractsScanned}</div>
                  <div className="text-sm text-green-400">Contracts scanned</div>
                </div>
                <div className="mt-2 text-xs text-green-400">
                  {auditSummary.vulnerabilitiesFixed} vulnerabilities fixed
                </div>
              </div>

              <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-bold">Last Scan</h3>
                </div>
                <div className="text-sm text-green-400 mb-1">{formatDate(auditSummary.lastScan)}</div>
                <div className="text-xs text-green-400">Scan duration: {auditSummary.scanDuration}</div>
                <Button variant="link" className="text-green-500 p-0 h-auto text-xs mt-2">
                  View scan history
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="bg-green-950/30 border border-green-900">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {/* <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger> */}
                <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                {/* <TabsTrigger value="reports">Reports</TabsTrigger> */}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-green-950/10 border border-green-900 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          Recent Audits
                        </h2>
                        <Button variant="outline" className="text-xs h-8 border-green-800 text-green-500">
                          View All <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-green-900">
                              <th className="text-left py-2 text-xs font-medium text-green-400">Contract</th>
                              <th className="text-left py-2 text-xs font-medium text-green-400">Wallet</th>
                              <th className="text-left py-2 text-xs font-medium text-green-400">Transaction</th>
                              <th className="text-left py-2 text-xs font-medium text-green-400">Date</th>
                              <th className="text-center py-2 text-xs font-medium text-green-400">Score</th>
                              <th className="text-center py-2 text-xs font-medium text-green-400">Issues</th>
                              <th className="text-right py-2 text-xs font-medium text-green-400">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentAudits
                              .filter((audit) => 
                                !searchQuery || 
                                audit.contractName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                audit.contractAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                audit.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((audit) => (
                              <tr key={audit.id} className="border-b border-green-900/50 hover:bg-green-950/20">
                                <td className="py-3">
                                  <div className="font-bold">{audit.contractName}</div>
                                  <div className="text-xs text-green-400 truncate max-w-[140px]">
                                    {audit.contractAddress}
                                  </div>
                                </td>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <Wallet className="h-3 w-3 mr-1 text-green-400" />
                                    <span className="text-xs text-green-400 truncate max-w-[100px]">
                                      {audit.walletAddress}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3">
                                  <div className="flex items-center">
                                    <ExternalLink className="h-3 w-3 mr-1 text-green-400" />
                                    <span className="text-xs text-green-400 truncate max-w-[100px]">
                                      {audit.transactionHash}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 text-sm">{formatDate(audit.timestamp)}</td>
                                <td className="py-3 text-center">
                                  <span className={`font-bold ${getScoreColor(audit.score)}`}>{audit.score}</span>
                                </td>
                                <td className="py-3">
                                  <div className="flex justify-center space-x-1">
                                    {audit.issues.critical > 0 && (
                                      <span className="px-1.5 py-0.5 bg-red-500/20 text-red-500 rounded text-xs">
                                        {audit.issues.critical}
                                      </span>
                                    )}
                                    {audit.issues.high > 0 && (
                                      <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-500 rounded text-xs">
                                        {audit.issues.high}
                                      </span>
                                    )}
                                    {audit.issues.medium > 0 && (
                                      <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-xs">
                                        {audit.issues.medium}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 text-xs text-green-500"
                                    onClick={() => router.push(`/audit-reports/${audit.id}`)}
                                  >
                                    View Report
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold flex items-center">
                          <Brain className="h-5 w-5 mr-2" />
                          AI Security Insights
                        </h2>
                        <Button 
                          variant="outline" 
                          className="text-xs h-8 border-green-800 text-green-500"
                          onClick={() => setShowAllInsights(!showAllInsights)}
                        >
                          {showAllInsights ? 'Show Less' : 'View All'} <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${showAllInsights ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {aiInsights.slice(0, showAllInsights ? aiInsights.length : 6).map((insight, index) => (
                          <div key={index} className="bg-green-950/20 border border-green-900 rounded-lg p-4">
                            <div className="flex items-start">
                              <div className={`p-2 rounded-full ${getSeverityBgColor(insight.severity)} mr-3`}>
                                <AlertTriangle className={`h-4 w-4 ${getSeverityColor(insight.severity)}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-bold">{insight.title}</h3>
                                  <span className={`text-xs ${getSeverityColor(insight.severity)}`}>
                                    {insight.severity}
                                  </span>
                                </div>
                                <p className="text-sm text-green-400 mt-1">{insight.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-green-400">{insight.location}</span>
                                  <span className="text-xs">AI Confidence: {insight.confidence}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <Button variant="link" className="text-green-500 w-full">
                          View All AI Insights <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div> */}
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-green-950/10 border border-green-900 rounded-lg p-6 mb-6">
                      <h2 className="text-xl font-bold flex items-center mb-4">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Vulnerability Breakdown
                      </h2>

                      <div className="space-y-4">
                        {vulnerabilityTypes.slice(0, 5).map((vuln, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>{vuln.name}</span>
                              <span className={`text-xs ${getSeverityColor(vuln.severity)}`}>{vuln.count} issues</span>
                            </div>
                            <Progress
                              value={vuln.count * 10}
                              className="h-1.5 bg-green-950"
                              indicatorClassName={`${
                                vuln.severity === "Critical"
                                  ? "bg-red-500"
                                  : vuln.severity === "High"
                                    ? "bg-orange-500"
                                    : vuln.severity === "Medium"
                                      ? "bg-yellow-500"
                                      : vuln.severity === "Low"
                                        ? "bg-blue-500"
                                        : "bg-gray-500"
                              }`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-green-900">
                        <div className="flex items-center justify-between text-sm">
                          <span>Total Issues</span>
                          <span>{vulnerabilityTypes.reduce((sum, item) => sum + item.count, 0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-950/10 border border-green-900 rounded-lg p-6 mb-6">
                      <h2 className="text-xl font-bold flex items-center mb-4">
                        <Activity className="h-5 w-5 mr-2" />
                        Security Metrics
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Code Coverage</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-1.5 bg-green-950" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Test Coverage</span>
                            <span>87%</span>
                          </div>
                          <Progress value={87} className="h-1.5 bg-green-950" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Documentation</span>
                            <span>76%</span>
                          </div>
                          <Progress value={76} className="h-1.5 bg-green-950" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Best Practices</span>
                            <span>89%</span>
                          </div>
                          <Progress value={89} className="h-1.5 bg-green-950" />
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vulnerabilities" className="mt-6">
                <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Detected Vulnerabilities
                    </h2>

                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="h-8 border-green-800 text-green-500">
                        <Filter className="h-3 w-3 mr-1" />
                        Filter
                      </Button>

                      <Button variant="outline" size="sm" className="h-8 border-green-800 text-green-500">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>

                  <div className="text-center py-16 text-green-400">
                    <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-yellow-500 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Vulnerability Analysis</h3>
                    <p className="max-w-md mx-auto">
                      Select the "Overview" tab to see a summary of detected vulnerabilities or run a new audit to scan
                      for security issues.
                    </p>
                    <Button className="mt-6 bg-green-600 hover:bg-green-700 text-black font-bold">Run New Audit</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-insights" className="mt-6">
                <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      AI-Generated Security Insights
                    </h2>

                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="h-8 border-green-800 text-green-500">
                        <Filter className="h-3 w-3 mr-1" />
                        Filter
                      </Button>

                      <Button variant="outline" size="sm" className="h-8 border-green-800 text-green-500">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="bg-green-950/20 border border-green-900 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full ${getSeverityBgColor(insight.severity)} mr-3`}>
                            <AlertTriangle className={`h-4 w-4 ${getSeverityColor(insight.severity)}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold">{insight.title}</h3>
                              <span className={`text-xs ${getSeverityColor(insight.severity)}`}>
                                {insight.severity}
                              </span>
                            </div>
                            <p className="text-sm text-green-400 mt-1">{insight.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-green-400">{insight.location}</span>
                              <span className="text-xs">AI Confidence: {insight.confidence}%</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-green-900/50 flex justify-between items-center">
                              <div className="text-xs text-green-400">
                                <span className="font-bold">Recommendation:</span> Apply fix and re-scan contract
                              </div>
                              <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700 text-black">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-green-900">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-green-400">
                        Showing {aiInsights.length} insights from latest scan
                      </div>
                      <Button variant="link" className="text-green-500 p-0 h-auto">
                        View Historical Insights
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Audit Reports
                    </h2>

                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="h-8 border-green-800 text-green-500">
                        <Filter className="h-3 w-3 mr-1" />
                        Filter
                      </Button>

                      <Button variant="outline" size="sm" className="h-8 border-green-800 text-green-500">
                        <Download className="h-3 w-3 mr-1" />
                        Export All
                      </Button>
                    </div>
                  </div>

                  <div className="text-center py-16 text-green-400">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-green-500 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Report Archive</h3>
                    <p className="max-w-md mx-auto">
                      View and download detailed security reports for all your audited contracts. Reports include
                      vulnerability details, code snippets, and remediation steps.
                    </p>
                    <Button className="mt-6 bg-green-600 hover:bg-green-700 text-black font-bold">
                      Generate New Report
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Recommendations
                </h2>

                <Button variant="outline" className="text-xs h-8 border-green-800 text-green-500">
                  View All <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-950/20 border border-green-900 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-orange-500/20 rounded-full mr-3">
                      <Lock className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Implement Reentrancy Guard</h3>
                      <p className="text-sm text-green-400">
                        Add OpenZeppelin's ReentrancyGuard to vulnerable functions in TokenVault contract.
                      </p>
                      <Button variant="link" className="text-green-500 p-0 h-auto text-xs mt-2">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-950/20 border border-green-900 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-yellow-500/20 rounded-full mr-3">
                      <Shield className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Upgrade Access Controls</h3>
                      <p className="text-sm text-green-400">
                        Implement multi-signature requirements for critical admin functions.
                      </p>
                      <Button variant="link" className="text-green-500 p-0 h-auto text-xs mt-2">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-950/20 border border-green-900 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-500/20 rounded-full mr-3">
                      <Activity className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Implement Price Oracle</h3>
                      <p className="text-sm text-green-400">
                        Use Chainlink price feeds to prevent flash loan manipulation attacks.
                      </p>
                      <Button variant="link" className="text-green-500 p-0 h-auto text-xs mt-2">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

