"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {
  Upload,
  FileText,
  Code,
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";

export default function UploadContract() {
  const [contractCode, setContractCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [originalUploadedCode, setOriginalUploadedCode] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

      // Create a unique ID for the audit session
      const auditId = Date.now().toString();

      // Store the result in sessionStorage temporarily
      sessionStorage.setItem(
        `audit-${auditId}`,
        JSON.stringify({
          contractCode,
          auditResult: data.response,
          timestamp: new Date().toISOString(),
        })
      );

      // Navigate to the results page
      toast.dismiss(); // Dismiss loading toast
      toast.success("Audit completed successfully!");
      router.push(`/audit-results/${auditId}`);
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
