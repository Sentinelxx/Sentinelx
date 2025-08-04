'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Redirect component to handle audit-reports URLs
export default function AuditReportsRedirect() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Redirect from /audit-reports/[id] to /audit-results/[id]
    const auditId = params.id as string
    router.replace(`/audit-results/${auditId}`)
  }, [params.id, router])

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent mx-auto mb-4" />
        <div>Redirecting to audit results...</div>
      </div>
    </div>
  )
}