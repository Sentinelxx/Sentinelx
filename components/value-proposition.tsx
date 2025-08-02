"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Lock, Zap, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MetricProps {
  title: string
  percentage: number
  icon: React.ReactNode
  description: string
  color: string
}

const metrics: MetricProps[] = [
  {
    title: "Threat Detection Accuracy",
    percentage: 98,
    icon: <Shield className="h-6 w-6" />,
    description: "AI-powered detection identifies vulnerabilities with near-perfect accuracy",
    color: "bg-green-500",
  },
  {
    title: "Compliance Automation",
    percentage: 95,
    icon: <CheckCircle className="h-6 w-6" />,
    description: "Automate compliance checks across multiple regulatory frameworks",
    color: "bg-blue-500",
  },
  {
    title: "Attack Prevention Rate",
    percentage: 96,
    icon: <Lock className="h-6 w-6" />,
    description: "Our firewall blocks 99.7% of all attempted exploits in real-time",
    color: "bg-purple-500",
  },
  {
    title: "Response Time",
    percentage: 92,
    icon: <Zap className="h-6 w-6" />,
    description: "Self-healing protocols respond to threats in milliseconds",
    color: "bg-yellow-500",
  },
  {
    title: "Cost Reduction",
    percentage: 85,
    icon: <AlertTriangle className="h-6 w-6" />,
    description: "Reduce security incident costs by automating protection",
    color: "bg-red-500",
  },
]

export function ValueProposition() {
  const [glitchActive, setGlitchActive] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  // Trigger occasional glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Random glitch lines */}
      {glitchActive && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-green-500 opacity-30"
              style={{
                height: `${Math.random() * 2}px`,
                width: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                left: 0,
                transform: `translateX(${Math.random() * 100}%)`,
                animation: `glitch-line ${Math.random() * 3 + 1}s infinite`,
              }}
            />
          ))}
        </>
      )}

      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm">Industry-Leading Performance</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${glitchActive ? "animate-text-glitch" : ""}`}>
            <span className="text-green-400">{">"}</span> Security By The Numbers
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-green-400">
            Quantifiable results that demonstrate Sentinel's superior protection capabilities
          </p>
        </div>

        <div className="space-y-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-green-950/10 border border-green-900 rounded-lg p-6 hover:bg-green-950/20 transition-colors"
              onMouseEnter={() => {
                if (Math.random() > 0.7) {
                  setGlitchActive(true)
                  setTimeout(() => setGlitchActive(false), 200)
                }
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
                  <div className={`p-3 rounded-full ${metric.color}/20 mr-4`}>{metric.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{metric.title}</h3>
                    <p className="text-green-400 text-sm">{metric.description}</p>
                  </div>
                </div>

                <div className="md:w-2/3 md:pl-6">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="h-2 bg-green-950/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${metric.color}`}
                          initial={{ width: "0%" }}
                          animate={isInView ? { width: `${metric.percentage}%` } : { width: "0%" }}
                          transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-green-400">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div className="ml-4 w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                      <span className="text-xl font-bold">{metric.percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-black font-bold px-8 py-3">
            View Detailed Performance Metrics
          </Button>
        </div>
      </div>
    </section>
  )
}

