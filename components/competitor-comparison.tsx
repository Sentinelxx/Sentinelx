"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Check, X, AlertTriangle, Info, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Competitor comparison data
const comparisonCategories = [
  {
    name: "Security Features",
    items: [
      { feature: "Smart Contract Firewall", sentinel: true, competitor1: true, competitor2: false },
      { feature: "AI-Powered Audits", sentinel: true, competitor1: false, competitor2: false },
      { feature: "Self-Healing Contracts", sentinel: true, competitor1: false, competitor2: false },
      { feature: "MEV Protection", sentinel: true, competitor1: true, competitor2: true },
      { feature: "Real-time Monitoring", sentinel: true, competitor1: true, competitor2: true },
    ],
  },
  {
    name: "Performance",
    items: [
      { feature: "Threat Detection Speed", sentinel: "< 50ms", competitor1: "< 200ms", competitor2: "< 500ms" },
      { feature: "False Positive Rate", sentinel: "< 0.1%", competitor1: "< 1%", competitor2: "< 3%" },
      { feature: "Scan Completion Time", sentinel: "2-5 min", competitor1: "10-15 min", competitor2: "30+ min" },
      { feature: "Max Contracts Supported", sentinel: "Unlimited", competitor1: "100", competitor2: "50" },
    ],
  },
  {
    name: "Compliance",
    items: [
      { feature: "Automated Compliance", sentinel: true, competitor1: false, competitor2: false },
      { feature: "Multi-Framework Support", sentinel: true, competitor1: true, competitor2: false },
      { feature: "Compliance Reporting", sentinel: true, competitor1: true, competitor2: true },
      { feature: "Audit Trail", sentinel: true, competitor1: true, competitor2: false },
    ],
  },
]

// Certification badges
const certifications = [
  { name: "ISO 27001", logo: "/ISO-logo.png" },
  { name: "SOC 2 Type II", logo: "/SOC-type2.png" },
  { name: "GDPR Compliant", logo: "/GDPR_logo.jpg" },
  { name: "NIST Cybersecurity", logo: "/nist.png" },
]

export function CompetitorComparison() {
  const [activeCategory, setActiveCategory] = useState(comparisonCategories[0].name)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([comparisonCategories[0].name])
  const [glitchActive, setGlitchActive] = useState(false)

  // Trigger occasional glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 10000)

    return () => clearInterval(glitchInterval)
  }, [])

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category))
    } else {
      setExpandedCategories([...expandedCategories, category])
    }
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    if (!expandedCategories.includes(category)) {
      toggleCategory(category)
    }

    // Trigger glitch effect on change
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 300)
  }

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

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm">Competitive Analysis</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${glitchActive ? "animate-text-glitch" : ""}`}>
            <span className="text-green-400">{">"}</span> Why Choose Sentinel
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-green-400">
            See how Sentinel outperforms other security solutions in the market
          </p>
        </div>

        <div className="bg-green-950/10 border border-green-900 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-1"></div>
            <div className="col-span-1 text-center">
              <div className="bg-green-950/30 rounded-lg p-4 border-2 border-green-500">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-bold text-lg">Sentinel</h3>
              </div>
            </div>
            <div className="col-span-1 text-center">
              <div className="bg-green-950/30 rounded-lg p-4">
                <h3 className="font-bold text-lg">Competitor A</h3>
              </div>
            </div>
            <div className="col-span-1 text-center">
              <div className="bg-green-950/30 rounded-lg p-4">
                <h3 className="font-bold text-lg">Competitor B</h3>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {comparisonCategories.map((category) => (
              <div key={category.name} className="border border-green-900 rounded-lg overflow-hidden">
                <button
                  className={`w-full p-4 text-left font-bold text-lg flex justify-between items-center ${
                    activeCategory === category.name ? "bg-green-950/50" : "bg-green-950/20"
                  }`}
                  onClick={() => toggleCategory(category.name)}
                >
                  {category.name}
                  {expandedCategories.includes(category.name) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedCategories.includes(category.name) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4">
                        {category.items.map((item, index) => (
                          <div
                            key={index}
                            className={`grid grid-cols-4 gap-4 py-3 ${
                              index !== category.items.length - 1 ? "border-b border-green-900/30" : ""
                            }`}
                          >
                            <div className="col-span-1 font-medium">{item.feature}</div>
                            <div className="col-span-1 text-center">
                              {typeof item.sentinel === "boolean" ? (
                                item.sentinel ? (
                                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500 mx-auto" />
                                )
                              ) : (
                                <span className="text-green-500 font-bold">{item.sentinel}</span>
                              )}
                            </div>
                            <div className="col-span-1 text-center">
                              {typeof item.competitor1 === "boolean" ? (
                                item.competitor1 ? (
                                  <Check className="h-5 w-5 text-green-500/50 mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500 mx-auto" />
                                )
                              ) : (
                                <span className="text-green-400/70">{item.competitor1}</span>
                              )}
                            </div>
                            <div className="col-span-1 text-center">
                              {typeof item.competitor2 === "boolean" ? (
                                item.competitor2 ? (
                                  <Check className="h-5 w-5 text-green-500/50 mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-red-500 mx-auto" />
                                )
                              ) : (
                                <span className="text-green-400/70">{item.competitor2}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Industry Certifications
              </h3>
              <p className="text-green-400 mb-6">
                Sentinel maintains the highest security standards and complies with major regulatory frameworks
              </p>
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-green-950/30 p-3 rounded-lg border border-green-900 flex items-center"
                    whileHover={{ scale: 1.05, borderColor: "#22c55e" }}
                  >
                    <Image
                      src={cert.logo || "/placeholder.svg"}
                      alt={cert.name}
                      width={40}
                      height={40}
                      className="mr-3"
                    />
                    <span className="font-medium">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 md:pl-8 border-t md:border-t-0 md:border-l border-green-900 pt-8 md:pt-0">
              <div className="bg-green-950/30 border border-green-900 rounded-lg p-4">
                <div className="flex items-start mb-4">
                  <Info className="h-5 w-5 text-green-500 mr-2 mt-1" />
                  <h4 className="font-bold">Independent Security Assessment</h4>
                </div>
                <p className="text-green-400 mb-4">
                  According to independent security researchers, Sentinel outperforms competitors in 9 out of 10 key
                  security metrics.
                </p>
                <div className="flex items-center justify-between border-t border-green-900/50 pt-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm">Last updated: March 2025</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-green-800 text-green-500 hover:bg-green-950/50"
                  >
                    View Full Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

