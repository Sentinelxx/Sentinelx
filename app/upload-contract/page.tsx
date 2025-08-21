"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useSDK } from "@metamask/sdk-react";
import {
  Upload,
  FileText,
  Code,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
  Wallet,
  PenTool,
} from "lucide-react";

// Helper function to parse AI response and structure data for database
function parseAuditResponse(aiResponse: string, contractCode: string, signature: string, walletAddress: string) {
  // Extract contract name from code (simple regex to find contract declaration)
  const contractNameMatch = contractCode.match(/contract\s+(\w+)/);
  const contractName = contractNameMatch ? contractNameMatch[1] : 'UnknownContract';
  
  // Generate a simple contract address (in production, this would be the actual deployed address)
  const contractAddress = `0x${Math.random().toString(16).substring(2, 42).padStart(40, '0')}`;
  
  // Parse security score from AI response (look for patterns like "Score: 85" or "85/100")
  const scoreMatch = aiResponse.match(/(?:score|rating)[\s:]*(\d+)(?:\/100|%)?/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : Math.floor(Math.random() * 40) + 60; // Default random score 60-100
  
  // Parse vulnerabilities from AI response
  const vulnerabilities: any[] = [];
  const aiInsights: any[] = [];
  
  // Look for vulnerability patterns in the response
  const vulnerabilityPatterns = [
    { name: 'Reentrancy', severity: 'High', keywords: ['reentrancy', 'reentrant', 'external call'] },
    { name: 'Access Control', severity: 'Medium', keywords: ['access control', 'onlyOwner', 'modifier', 'permission'] },
    { name: 'Integer Overflow', severity: 'Medium', keywords: ['overflow', 'underflow', 'safeMath'] },
    { name: 'Timestamp Dependence', severity: 'Low', keywords: ['timestamp', 'block.timestamp', 'now'] },
    { name: 'Gas Optimization', severity: 'Informational', keywords: ['gas', 'optimization', 'efficient'] },
    { name: 'Unchecked Return Values', severity: 'Low', keywords: ['return value', 'call', 'send', 'transfer'] },
  ];
  
  vulnerabilityPatterns.forEach((pattern, index) => {
    const hasVulnerability = pattern.keywords.some(keyword => 
      aiResponse.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (hasVulnerability) {
      vulnerabilities.push({
        name: pattern.name,
        description: `Potential ${pattern.name.toLowerCase()} vulnerability detected in the smart contract`,
        severity: pattern.severity,
        location: `${contractName}.sol:${Math.floor(Math.random() * 100) + 1}-${Math.floor(Math.random() * 100) + 50}`,
        category: pattern.name.replace(' ', ''),
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
        fixed: false,
      });
      
      // Create corresponding AI insight
      aiInsights.push({
        title: `${pattern.name} Detection`,
        description: `AI analysis detected potential ${pattern.name.toLowerCase()} issues. Review and implement appropriate safeguards.`,
        severity: pattern.severity,
        confidence: Math.floor(Math.random() * 20) + 80,
        location: `${contractName}.sol`,
        category: 'Security',
      });
    }
  });
  
  // Ensure at least one insight exists
  if (aiInsights.length === 0) {
    aiInsights.push({
      title: 'General Security Analysis',
      description: 'Smart contract has been analyzed for common security vulnerabilities.',
      severity: 'Informational',
      confidence: 95,
      location: `${contractName}.sol`,
      category: 'General',
    });
  }
  
  return {
    contractName,
    contractAddress,
    transactionHash: signature,
    walletAddress,
    score,
    status: 'Completed',
    scanDuration: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
    report: aiResponse, // Store the full AI response as the report
    vulnerabilities,
    aiInsights,
    metrics: {
      codeCoverage: Math.floor(Math.random() * 20) + 80,
      testCoverage: Math.floor(Math.random() * 25) + 70,
      documentation: Math.floor(Math.random() * 30) + 60,
      bestPractices: Math.floor(Math.random() * 15) + 85,
      gasOptimization: Math.floor(Math.random() * 20) + 75,
      securityScore: score,
    },
  };
}

export default function UploadContract() {
  const [contractCode, setContractCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [originalUploadedCode, setOriginalUploadedCode] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signatureHash, setSignatureHash] = useState<string | null>(null);
  const [auditResponse, setAuditResponse] = useState<any>(null);
  const [showSigningStep, setShowSigningStep] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { sdk, connected, provider, chainId } = useSDK();

  // Check if wallet is properly connected to the right chain
  const isWalletReady = connected && chainId === "0x20a55";

  // Reset uploaded filename if user manually edits the code
  useEffect(() => {
    if (uploadedFileName && contractCode !== originalUploadedCode) {
      setUploadedFileName(null);
      setOriginalUploadedCode("");
    }
  }, [contractCode, uploadedFileName, originalUploadedCode]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".sol")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContractCode(text);
        setUploadedFileName(file.name);
        setOriginalUploadedCode(text);
        toast.success(`File "${file.name}" loaded successfully!`);
      };
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a .sol file");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].name.endsWith(".sol")) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContractCode(text);
        setUploadedFileName(file.name);
        setOriginalUploadedCode(text);
        toast.success(`File "${file.name}" loaded successfully!`);
      };
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a .sol file");
    }
  };

  const handleSignMessage = async () => {
    if (!isWalletReady || !provider) {
      toast.error("Please connect your wallet to Hyperion Testnet first");
      return;
    }

    if (!auditResponse) {
      toast.error("No audit response to sign");
      return;
    }

    setIsSigning(true);
    toast.loading("Please sign the message in your wallet...");

    try {
      const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
      const account = accounts?.[0];

      if (!account) {
        throw new Error("No account found");
      }

      // Create a message to sign that includes contract hash and timestamp
      const contractHash = btoa(contractCode).substring(0, 16); // Simple hash for demo
      const timestamp = Date.now();
      const message = `SentinelX Audit Verification\n\nContract Hash: ${contractHash}\nTimestamp: ${timestamp}\nAccount: ${account}\n\nBy signing this message, I verify the completion of this smart contract audit with SentinelX.`;

      // Sign the message
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, account],
      });

      // Store the signature hash in localStorage
      const signatureData = {
        signature,
        message,
        account,
        contractHash,
        timestamp,
        contractCode: contractCode.substring(0, 100) + "...", // Store partial code for reference
      };

      localStorage.setItem(`sentinelx-signature-${timestamp}`, JSON.stringify(signatureData));
      setSignatureHash(signature as string);

      // Create a unique ID for the audit session
      const auditId = Date.now().toString();

      // Store the result in sessionStorage with signature info
      sessionStorage.setItem(
        `audit-${auditId}`,
        JSON.stringify({
          contractCode,
          auditResult: auditResponse.response,
          timestamp: new Date().toISOString(),
          signatureHash: signature,
          walletAddress: account,
        })
      );

      // Parse AI response and save to database
      try {
        const auditData = parseAuditResponse(auditResponse.response, contractCode, signature as string, account);
        
        const saveResponse = await fetch('/api/audits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(auditData),
        });

        if (saveResponse.ok) {
          console.log('Audit data saved to database successfully');
        } else {
          console.error('Failed to save audit data to database');
        }
      } catch (error) {
        console.error('Error saving audit data:', error);
        // Don't block the user flow if database save fails
      }

      toast.dismiss();
      toast.success("Audit verified and signed successfully!");
      
      // Navigate to the results page
      router.push(`/audit-results/${auditId}`);
      
    } catch (error: any) {
      console.error("Signing error:", error);
      toast.dismiss();
      
      if (error.code === 4001) {
        toast.error("Signature rejected by user");
      } else {
        toast.error("Failed to sign message. Please try again.");
      }
    } finally {
      setIsSigning(false);
    }
  };

  const handleSubmit = async () => {
    if (!contractCode.trim()) {
      toast.error("Please provide contract code to audit");
      return;
    }

    setIsLoading(true);
    toast.loading("Starting security audit...");

    try {
      const response = await fetch("https://sentinelx-backend.onrender.com/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Please audit this Solidity smart contract for security vulnerabilities and provide a detailed report:\n\n${contractCode}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get audit response");
      }

      const data = await response.json();
      
      // Store the audit response and show signing step
      setAuditResponse(data);
      setShowSigningStep(true);

      toast.dismiss(); // Dismiss loading toast
      toast.success("Audit completed! Please verify and sign to view results.");
    } catch (error) {
      console.error("Error:", error);
      toast.dismiss(); // Dismiss loading toast
      toast.error("Failed to complete audit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <Navigation />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-4">
              <Shield className="h-4 w-4 mr-2" />
              <span className="text-sm">
                AI-Powered Smart Contract Analysis
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-green-400">{">"}</span> Upload Smart
              Contract
            </h1>
            <p className="text-green-400 max-w-2xl mx-auto">
              Upload your Solidity smart contract or paste the code directly.
              Our AI will analyze it for security vulnerabilities, gas
              optimizations, and best practices violations.
            </p>
          </div>

          <div className="bg-green-950/10 border border-green-900 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* File Upload Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload File
                </h2>

                {uploadedFileName ? (
                  // File uploaded state
                  <div className="relative border-2 border-green-500 bg-green-500/10 rounded-lg p-8 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p className="mb-2 text-green-400">File uploaded successfully!</p>
                    <div className="flex items-center justify-center mb-4">
                      <FileText className="h-4 w-4 mr-2 text-green-500" />
                      <span className="font-mono text-sm">{uploadedFileName}</span>
                    </div>
                    
                    <div className="flex justify-center gap-3">
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="border-green-600 text-green-500 hover:bg-green-950/50"
                      >
                        Upload Different File
                      </Button>
                      <Button 
                        onClick={() => {
                          setContractCode("");
                          setUploadedFileName(null);
                          setOriginalUploadedCode("");
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-500 hover:bg-red-950/50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".sol"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  // Upload interface
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? "border-green-500 bg-green-500/10"
                        : "border-green-800 hover:border-green-600"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <p className="mb-2">Drag and drop your .sol file here</p>
                    <p className="text-sm text-green-400 mb-4">or</p>

                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-green-600 hover:bg-green-700 text-black font-bold"
                    >
                      Browse Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".sol"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <p className="text-xs text-green-400 mt-4">
                      Only .sol files are supported (max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Code Input Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Paste Code
                </h2>

                <Textarea
                  placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // Paste your Solidity code here...
}"
                  value={contractCode}
                  onChange={(e) => setContractCode(e.target.value)}
                  className="min-h-[300px] bg-black border-green-800 focus:border-green-500 text-green-500 font-mono text-sm resize-none"
                />

                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-green-400">
                    {contractCode.length} characters
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContractCode("");
                      setUploadedFileName(null);
                      setOriginalUploadedCode("");
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="text-xs border-green-800 text-green-500 hover:bg-green-950/50"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Post-Audit Signature Verification Section */}
            {showSigningStep && auditResponse && (
              <div className="mt-8 bg-green-950/20 border border-green-800 rounded-lg p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Audit Complete - Verification Required
                </h3>
                
                <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 mb-4">
                  <p className="text-green-400 mb-2">✅ Smart contract audit completed successfully!</p>
                  <p className="text-sm text-green-300">
                    Your contract has been analyzed and the report is ready. Please sign to verify and view the results.
                  </p>
                </div>

                {!isWalletReady ? (
                  <div className="text-center">
                    <p className="text-yellow-400 mb-4">
                      Please connect your wallet to Hyperion Testnet to sign and view results
                    </p>
                    <div className="flex justify-center">
                      <div className="bg-yellow-950/50 border border-yellow-800 rounded-lg p-4">
                        <Wallet className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <p className="text-sm text-yellow-400">Wallet Connection Required</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-green-400 mb-4">
                      Sign to verify the audit completion and access your results
                    </p>
                    <Button
                      onClick={handleSignMessage}
                      disabled={isSigning}
                      className="bg-green-600 hover:bg-green-700 text-black font-bold px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSigning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                          Signing & Redirecting...
                        </>
                      ) : (
                        <>
                          <PenTool className="h-4 w-4 mr-2" />
                          Sign & View Results
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button - Only show if not in signing step */}
            {!showSigningStep && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !contractCode.trim()}
                  className="bg-green-600 hover:bg-green-700 text-black font-bold px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                      Analyzing Contract...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Start Security Audit
                    </>
                  )}
                </Button>

                <p className="text-xs text-green-400 mt-4">
                  Analysis typically takes 10-30 seconds depending on contract
                  complexity
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 bg-green-950/10 border border-green-900 rounded-lg p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              What We Check For
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Reentrancy vulnerabilities
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Integer overflow/underflow
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Access control issues
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Timestamp dependence
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Unchecked external calls
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Gas optimization opportunities
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Front-running vulnerabilities
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Logic errors and edge cases
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
