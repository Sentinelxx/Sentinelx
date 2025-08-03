"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Brain, Zap, LineChart, Lock, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import NeonCursor from "@/components/neonCursor"

export default function FeaturesPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const features = [
    {
      title: "Smart Contract Firewall",
      icon: <Shield className="h-16 w-16" />,
      description:
        "Our core protection layer that monitors and blocks malicious transactions before they can execute on your smart contracts.",
      details: [
        "Real-time transaction monitoring and filtering",
        "Customizable security rules and policies",
        "Automatic blocking of known attack vectors",
        "Zero latency protection with minimal gas overhead",
      ],
    },
    {
      title: "Self-Healing Contracts",
      icon: <Lock className="h-16 w-16" />,
      description:
        "Revolutionary technology that enables smart contracts to automatically recover from exploits and vulnerabilities.",
      details: [
        "Automatic rollback of malicious transactions",
        "On-chain patching of vulnerable code",
        "Exploit containment and damage mitigation",
        "Continuous vulnerability monitoring",
      ],
    },
    {
      title: "MEV Protection",
      icon: <Zap className="h-16 w-16" />,
      description: "Advanced protection against Miner Extractable Value attacks, front-running, and sandwich attacks.",
      details: [
        "Private transaction mempool",
        "Cryptographic transaction ordering",
        "Anti-front-running mechanisms",
        "Fair execution guarantees",
      ],
    },
    {
      title: "AI-Powered Audits",
      icon: <Brain className="h-16 w-16" />,
      description: "Continuous smart contract auditing powered by advanced machine learning algorithms.",
      details: [
        "Automated vulnerability detection",
        "Pattern recognition from past exploits",
        "Continuous learning from new attack vectors",
        "Human-verified security recommendations",
      ],
    },
    {
      title: "Decentralized Security Network",
      icon: <Network className="h-16 w-16" />,
      description:
        "A distributed network of security nodes that provide consensus-based threat detection and mitigation.",
      details: [
        "Decentralized security oracles",
        "Distributed threat intelligence",
        "Consensus-based attack verification",
        "Incentivized security participation",
      ],
    },
    {
      title: "Security Analytics",
      icon: <LineChart className="h-16 w-16" />,
      description: "Comprehensive dashboards and reporting tools to monitor your smart contract security in real-time.",
      details: [
        "Real-time security metrics and KPIs",
        "Historical attack analysis",
        "Risk scoring and vulnerability assessment",
        "Customizable security alerts and notifications",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />

        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
                <Shield className="h-4 w-4 mr-2" />
                <NeonCursor />
                <span className="text-sm">Advanced Protection Features</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> Sentinel Security Features
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">
                Comprehensive protection for your smart contracts with our advanced security features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-green-950/10 border border-green-900 rounded-lg p-6 hover:bg-green-950/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="text-green-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-green-400">{feature.description}</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">{">"}</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button onClick={()=> {window.location.href="/upload-contract"}} className="bg-green-600 hover:bg-green-700 text-black font-bold px-8 py-3 rounded-md text-lg">
                Get Started with Sentinel
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

