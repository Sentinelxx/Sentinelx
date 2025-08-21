//@ts-nocheck
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { solidity } from 'highlightjs-solidity';
import { Packer } from 'docx';
import { Document, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share, FileText, Shield, Clock, PenTool, CheckCircle } from "lucide-react"

hljs.registerLanguage('solidity', solidity);

export default function AuditResults() {
  const params = useParams()
  const router = useRouter()
  const [auditData, setAuditData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const reportRef = useRef(null)

  useEffect(() => {
    const auditId = params.id as string
    const storedData = sessionStorage.getItem(`audit-${auditId}`)
    
    if (storedData) {
      setAuditData(JSON.parse(storedData))
    } else {
      // Check if we're in the browser before redirecting
      if (typeof window !== 'undefined') {
        console.log(`No audit data found for ID: ${auditId}`)
        // Instead of immediate redirect, show a message with options
        setAuditData(null)
      }
    }
    setLoading(false)
  }, [params.id, router])

  useEffect(() => {
    if (auditData) {
      hljs.highlightAll()
    }
  }, [auditData])

  const downloadDOCX = () => {
    if (!auditData) return

    const lines = auditData.auditResult.split('\n');
    const children: any[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];

    lines.forEach((line: string) => {
      if (line.trim() === '```solidity') {
        inCodeBlock = true;
        codeLines = [];
        return;
      } else if (line.trim() === '```' && inCodeBlock) {
        inCodeBlock = false;
        children.push(new Paragraph({
          children: codeLines.map(codeLine => new TextRun({
            text: codeLine,
            font: 'Courier New',
            size: 22,
            break: 1
          })),
          spacing: { before: 200, after: 200 }
        }));
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line + '\n');
        return;
      }

      if (line.startsWith('# ')) {
        children.push(new Paragraph({
          text: line.replace('# ', ''),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: line.replace('# ', ''), size: 32 })]
        }));
      } else if (line.startsWith('## ')) {
        children.push(new Paragraph({
          text: line.replace('## ', ''),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 },
          children: [new TextRun({ text: line.replace('## ', ''), size: 32 })]
        }));
      } else if (line.startsWith('### ')) {
        children.push(new Paragraph({
          text: line.replace('### ', ''),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: line.replace('### ', ''), size: 32 })]
        }));
      } else if (line.startsWith('- **')) {
        const text = line.replace('- **', '').replace('**:', ':').trim();
        children.push(new Paragraph({
          children: [
            new TextRun({ text: text.split(':')[0] + ': ', bold: true, size: 22 }),
            new TextRun({ text: text.split(':')[1] || '', size: 22 })
          ],
          bullet: { level: 0 },
          spacing: { before: 100, after: 100 }
        }));
      } else if (line.startsWith('- ')) {
        children.push(new Paragraph({
          text: line.replace('- ', ''),
          bullet: { level: 0 },
          spacing: { before: 100, after: 100 },
          children: [new TextRun({ text: line.replace('- ', ''), size: 22 })]
        }));
      } else if (line.trim()) {
        const textRuns: any[] = [];
        let remaining = line;
        while (remaining) {
          const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
          if (boldMatch) {
            const before = remaining.substring(0, boldMatch.index);
            if (before) textRuns.push(new TextRun({ text: before, size: 22 }));
            textRuns.push(new TextRun({ text: boldMatch[1], bold: true, size: 22 }));
            remaining = remaining.substring(boldMatch.index! + boldMatch[0].length);
          } else {
            textRuns.push(new TextRun({ text: remaining, size: 22 }));
            remaining = '';
          }
        }
        children.push(new Paragraph({
          children: textRuns,
          spacing: { before: 100, after: 100 }
        }));
      } else {
        children.push(new Paragraph({ spacing: { before: 200 } }));
      }
    });

    const doc = new Document({
      sections: [{
        properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
        children,
      }],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `audit-report-${params.id}.docx`);
    }).catch((err) => {
      console.error('Error generating DOCX:', err);
    });
  };

  const shareReport = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Smart Contract Audit Report',
          text: 'Check out this smart contract audit report',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-500 border-t-transparent mx-auto mb-4" />
          <div>Loading audit results...</div>
        </div>
      </main>
    )
  }

  if (!auditData) {
    return (
      <main className="min-h-screen bg-black text-green-500 font-mono">
        <Navigation />
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-green-950/10 border border-green-900 rounded-lg p-8">
              <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
              <h1 className="text-2xl font-bold mb-4 text-red-400">Audit Results Not Found</h1>
              <p className="text-green-400 mb-6">
                The audit results for ID <code className="bg-green-950/50 px-2 py-1 rounded">{params.id}</code> could not be found.
                This might happen if:
              </p>
              <div className="text-left max-w-md mx-auto mb-8">
                <ul className="list-disc list-inside space-y-2 text-green-400">
                  <li>The audit session has expired</li>
                  <li>The page was refreshed after the audit</li>
                  <li>The audit ID is incorrect</li>
                  <li>The audit was completed in a different browser session</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => router.push('/upload-contract')} 
                  className="bg-green-600 hover:bg-green-700 text-black font-bold"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Start New Audit
                </Button>
                <Button 
                  onClick={() => router.push('/')} 
                  variant="outline"
                  className="border-green-800 text-green-500 hover:bg-green-950/50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <Navigation />
      
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <Button
                variant="outline"
                onClick={() => router.push('/upload-contract')}
                className="mb-4 border-green-800 text-green-500 hover:bg-green-950/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Upload
              </Button>
              {/* <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-4">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm">AI Security Analysis Complete</span>
              </div> */}
              
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="text-green-400">{">"}</span> Audit Report
              </h1>
              
              <div className="flex items-center text-sm text-green-400 mt-2">
                <Clock className="h-4 w-4 mr-1" />
                Generated on {formatDate(auditData.timestamp)}
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button
                onClick={shareReport}
                variant="outline"
                className="border-green-800 text-green-500 hover:bg-green-950/50"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button
                onClick={downloadDOCX}
                className="bg-green-600 hover:bg-green-700 text-black font-bold"
              >
                <Download className="h-4 w-4 mr-2" />
                Download DOCX
              </Button>
            </div>
          </div>

          {/* Contract Info */}
          <div className="bg-green-950/10 border border-green-900 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Contract Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
              <div>
                <span className="text-green-400">Lines of Code:</span> {auditData.contractCode.split('\n').length}
              </div>
              <div>
                <span className="text-green-400">Characters:</span> {auditData.contractCode.length}
              </div>
              <div>
                <span className="text-green-400">Analysis Time:</span> ~30 seconds
              </div>
            </div>

            {/* Signature Verification Info */}
            {auditData.signatureHash && (
              <div className="border-t border-green-800 pt-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <PenTool className="h-4 w-4 mr-2" />
                  Verification Details
                </h3>
                <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-400 font-semibold">Audit Verified</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-400">Wallet Address:</span>
                      <div className="font-mono text-xs bg-green-950/50 px-2 py-1 rounded mt-1">
                        {auditData.walletAddress}
                      </div>
                    </div>
                    <div>
                      <span className="text-green-400">Signature Hash:</span>
                      <div className="font-mono text-xs bg-green-950/50 px-2 py-1 rounded mt-1">
                        {auditData.signatureHash.substring(0, 20)}...
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-green-400 mt-3">
                    This audit was verified through cryptographic signature, ensuring authenticity and integrity.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Audit Report */}
          <div className="bg-green-950/10 border border-green-900 rounded-lg overflow-hidden">
            <div 
              ref={reportRef}
              className="p-8"
              style={{
                background: 'white',
                color: '#333',
                fontFamily: 'Arial, sans-serif',
                lineHeight: 1.6,
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <pre {...props} style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                        <code className={className} style={{ fontFamily: 'Courier New, monospace' }}>{children}</code>
                      </pre>
                    ) : (
                      <code className={className} {...props} style={{ background: '#f4f4f4', padding: '2px 4px', borderRadius: '4px' }}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => <h1 style={{ color: '#006400', borderBottom: '1px solid #eee', marginTop: '20px' }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ color: '#006400', borderBottom: '1px solid #eee', marginTop: '20px' }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ color: '#006400', marginTop: '20px' }}>{children}</h3>,
                  ul: ({ children }) => <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>{children}</ul>,
                  ol: ({ children }) => <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>{children}</ol>,
                  p: ({ children }) => <p style={{ margin: '10px 0' }}>{children}</p>,
                  strong: ({ children }) => <strong style={{ color: '#006400' }}>{children}</strong>
                }}
              >
                {auditData.auditResult}
              </ReactMarkdown>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 text-center">
            <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => router.push('/upload-contract')}
                  variant="outline"
                  className="border-green-800 text-green-500 hover:bg-green-950/50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Audit Another Contract
                </Button>
                
                <Button
                  onClick={downloadDOCX}
                  variant="outline"
                  className="border-green-800 text-green-500 hover:bg-green-950/50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                
                <Button
                  onClick={() => router.push('/dashboard')}
                  className="bg-green-600 hover:bg-green-700 text-black font-bold"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}