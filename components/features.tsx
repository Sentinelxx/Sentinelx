"use client"

import { useState, useEffect, useRef } from "react"
import { Shield, Brain, Zap, Database, LineChart } from "lucide-react"

export function Features() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const features = [
    {
      title: "Core Security Features",
      icon: <Shield className="h-8 w-8" />,
      items: [
        "Smart Contract Firewall – Blocks malicious transactions before execution.",
        "AI-Powered Audits – Uses machine learning for continuous vulnerability detection.",
        "Self-Healing Smart Contracts – Auto-rollback and patching for exploited contracts.",
      ],
    },
    {
      title: "MEV-Resistant Execution Layer",
      icon: <Zap className="h-8 w-8" />,
      items: [
        "Private Mempools – Encrypts transactions to prevent MEV attacks.",
        "Fair Transaction Ordering – Uses cryptography to eliminate front-running.",
        "Batch Execution Mechanism – Reduces MEV risks and ensures fair trade execution.",
      ],
    },
    {
      title: "Advanced Threat Protection",
      icon: <Brain className="h-8 w-8" />,
      items: [
        "Decentralized Security Oracles – On-chain risk scoring and anomaly detection.",
        "Rug Pull Protection – Detects and blocks unauthorized liquidity withdrawals.",
        "Immutable Threat Intelligence Database – Stores past exploits to prevent repeat attacks.",
      ],
    },
    {
      title: "Security Analytics & Reporting",
      icon: <LineChart className="h-8 w-8" />,
      items: [
        "Real-Time Security Dashboards – Monitors contract health and active threats.",
        "On-Chain Reputation Scoring – Assigns risk ratings to contracts and protocols.",
        "Developer Security Toolkit – Includes static analysis, fuzzing, and formal verification tools.",
      ],
    },
    {
      title: "Integration & Governance",
      icon: <Database className="h-8 w-8" />,
      items: [
        "Multi-Chain Support – Compatible with L2 rollups (Arbitrum, zkSync, StarkNet).",
        "On-Chain Governance – Community-driven security upgrades and bounty distribution.",
        "Bug Bounty & White Hat Incentives – Encourages responsible vulnerability disclosure.",
      ],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveSection(index)
            }
          }
        })
      },
      { threshold: 0.6 },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <section className="py-20 px-4 bg-black/80">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-green-400">{">"}</span> Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-10 sticky top-32 self-start">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }}
                className={`flex items-center w-full text-left p-4 rounded-md transition-all ${
                  activeSection === index
                    ? "bg-green-900/30 border-l-4 border-green-500"
                    : "bg-transparent hover:bg-green-900/20"
                }`}
              >
                <div className="mr-3 text-green-500">{feature.icon}</div>
                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                </div>
              </button>
            ))}
          </div>

          <div className="md:col-span-2 space-y-24">
            {features.map((feature, index) => (
              <div key={index} ref={(el) => { sectionRefs.current[index] = el }} className="scroll-mt-20">
                <div className="flex items-center mb-6">
                  <div className="text-green-500 mr-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>

                <div className="space-y-6">
                  {feature.items.map((item, itemIndex) => {
                    const [title, description] = item.split(" – ")
                    return (
                      <div
                        key={itemIndex}
                        className="bg-green-950/20 border border-green-900 p-6 rounded-lg hover:bg-green-950/30 transition-all"
                      >
                        <h4 className="font-bold mb-2">{title}</h4>
                        <p className="text-green-400">{description}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-12 border-b border-green-900/50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

