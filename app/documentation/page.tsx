"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FileText, TerminalIcon, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NeonCursor from "@/components/neonCursor"

export default function DocumentationPage() {
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("getting-started")

  useEffect(() => {
    setLoaded(true)
  }, [])

  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "installation", label: "Installation" },
    { id: "configuration", label: "Configuration" },
    { id: "api-reference", label: "API Reference" },
    { id: "examples", label: "Examples" },
    { id: "troubleshooting", label: "Troubleshooting" },
  ]

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />
        <NeonCursor />

        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-sm">Comprehensive Documentation</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> Sentinel Documentation
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">
                Everything you need to know about integrating and using Sentinel security features.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-green-950/10 border border-green-900 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-4 border-b border-green-900 pb-2">Documentation</h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeSection === section.id
                            ? "bg-green-900/30 border-l-4 border-green-500"
                            : "hover:bg-green-900/20"
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="lg:col-span-3 bg-green-950/10 border border-green-900 rounded-lg p-6">
                {activeSection === "getting-started" && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Getting Started with Sentinel</h2>
                    <p className="mb-4">
                      Sentinel is a comprehensive security layer for smart contracts that protects against exploits,
                      front-running attacks, and vulnerabilities in real-time.
                    </p>
                    <h3 className="text-xl font-bold mt-8 mb-4">Prerequisites</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>Ethereum, Polygon, BSC, or other EVM-compatible blockchain</li>
                      <li>Solidity smart contracts (version 0.8.0 or higher)</li>
                      <li>Python (version 3.0 or higher) for local development</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-8 mb-4">Quick Start</h3>
                    <div className="bg-black border border-green-800 rounded-md p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-400">Terminal</span>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-green-400">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="text-green-500 overflow-x-auto">
                        <code>
                          {`# Install Sentinel CLI
npm install -g @sentinel/cli

# Check out Help
sentinel -h or sentinel --help

# Deploy protection to your contracts
sentinel scan <path-to-the-contract>

# Visualize your vulnerablities (coming Soon)
sentinel visualize <choice>`
}

                        </code>
                      </pre>
                    </div>

                    {/* <h3 className="text-xl font-bold mt-8 mb-4">Try It Out</h3>
                    <AdvancedTerminal className="mb-8" /> */}

                    <div className="flex justify-center mt-8">
                      <Button className="bg-green-600 hover:bg-green-700 text-black font-bold px-6 py-2 rounded-md">
                        Continue to Installation
                      </Button>
                    </div>
                  </div>
                )}

                {activeSection === "installation" && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Installation Guide</h2>
                    <p className="mb-6">
                      Follow these steps to install and set up Sentinel for your smart contract project.
                    </p>

                    <Tabs defaultValue="npm" className="mb-8">
                      <TabsList className="bg-green-950/30 border border-green-900">
                        <TabsTrigger value="npm">pip</TabsTrigger>
                        <TabsTrigger value="yarn">Yarn</TabsTrigger>
                        <TabsTrigger value="docker">Docker</TabsTrigger>
                      </TabsList>
                      <TabsContent value="npm" className="bg-black border border-green-800 rounded-md p-4 mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-400">Terminal</span>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-green-400">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="text-green-500 overflow-x-auto">
                          <code>
                            {`# Install Sentinel CLI globally
pip install -g @sentinel/cli
`}
                          </code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="yarn" className="bg-black border border-green-800 rounded-md p-4 mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-400">Terminal</span>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-green-400">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="text-green-500 overflow-x-auto">
                          <code>
                            {`# Install Sentinel CLI globally
yarn global add @sentinel/cli

# Install Sentinel in your project
yarn add @sentinel/core @sentinel/contracts`}
                          </code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="docker" className="bg-black border border-green-800 rounded-md p-4 mt-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-400">Terminal</span>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-green-400">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="text-green-500 overflow-x-auto">
                          <code>
                            {`# Pull the Sentinel Docker image
docker pull sentinel/security:latest

# Run Sentinel in a container
docker run -p 3000:3000 sentinel/security:latest`}
                          </code>
                        </pre>
                      </TabsContent>
                    </Tabs>

                    <h3 className="text-xl font-bold mt-8 mb-4">System Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-green-950/20 border border-green-900 rounded-md p-4">
                        <h4 className="font-bold mb-2">Minimum Requirements</h4>
                        <ul className="space-y-1">
                          <li>• 2 CPU cores</li>
                          <li>• 4GB RAM</li>
                          <li>• 20GB storage</li>
                          <li>• Python 3.0</li>
                        </ul>
                      </div>
                      <div className="bg-green-950/20 border border-green-900 rounded-md p-4">
                        <h4 className="font-bold mb-2">Recommended</h4>
                        <ul className="space-y-1">
                          <li>• 4+ CPU cores</li>
                          <li>• 8GB+ RAM</li>
                          <li>• 50GB+ SSD storage</li>
                          <li>• Python 3.0+</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-center mt-8">
                      <Button className="bg-green-600 hover:bg-green-700 text-black font-bold px-6 py-2 rounded-md">
                        Continue to Configuration
                      </Button>
                    </div>
                  </div>
                )}

                {activeSection === "configuration" && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Configuration Guide</h2>
                    <p className="mb-6">Learn how to configure Sentinel to protect your smart contracts.</p>

                    <h3 className="text-xl font-bold mt-8 mb-4">Basic Configuration</h3>
                    <div className="bg-black border border-green-800 rounded-md p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-400">sentinel.config.js</span>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-green-400">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="text-green-500 overflow-x-auto">
                        <code>
                          {/* {`module.exports = {
  network: "ethereum",
  contracts: [
    {
      name: "MyToken",
      address: "0x123abc...",
      protectionLevel: "high"
    }
  ],
  firewall: {
    enabled: true,
    rules: ["block-reentrancy", "block-flash-loans"]
  },
  monitoring: {
    enabled: true,
    alertThreshold: "medium"
  }
};
`} */}
Coming Soon
                        </code>
                      </pre>
                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4">Advanced Configuration</h3>
                    <div className="space-y-4 mb-8">
                      <div className="bg-green-950/20 border border-green-900 rounded-md p-4">
                        <h4 className="font-bold mb-2">Custom Security Rules</h4>
                        <p className="text-sm mb-2">
                          You can define custom security rules to protect against specific vulnerabilities.
                        </p>
                        <a href="#" className="text-green-400 flex items-center text-sm">
                          Learn more <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="bg-green-950/20 border border-green-900 rounded-md p-4">
                        <h4 className="font-bold mb-2">MEV Protection Settings</h4>
                        <p className="text-sm mb-2">
                          Configure private mempool and transaction ordering to prevent front-running.
                        </p>
                        <a href="#" className="text-green-400 flex items-center text-sm">
                          Learn more <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="bg-green-950/20 border border-green-900 rounded-md p-4">
                        <h4 className="font-bold mb-2">Alert Notifications</h4>
                        <p className="text-sm mb-2">
                          Set up email, Slack, or Discord notifications for security events.
                        </p>
                        <a href="#" className="text-green-400 flex items-center text-sm">
                          Learn more <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-center mt-8">
                      <Button className="bg-green-600 hover:bg-green-700 text-black font-bold px-6 py-2 rounded-md">
                        Continue to API Reference
                      </Button>
                    </div>
                  </div>
                )}

                {(activeSection === "api-reference" ||
                  activeSection === "examples" ||
                  activeSection === "troubleshooting") && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <TerminalIcon className="h-16 w-16 mb-6 text-green-500" />
                    <h2 className="text-2xl font-bold mb-4">Documentation Section Under Construction</h2>
                    <p className="text-center mb-6 max-w-md">
                      We&apos;re currently building this section of our documentation. Check back soon for updates.
                    </p>
                    <Button onClick={()=>{window.location.href="/documentation"}} className="bg-green-600 hover:bg-green-700 text-black font-bold">
                      Return to Documentation
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

