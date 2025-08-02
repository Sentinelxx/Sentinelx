"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Info, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Compliance standards data
const complianceStandards = [
  {
    id: "gdpr",
    name: "GDPR",
    logo: "/GDPR_logo.jpg",
    description:
      "General Data Protection Regulation - EU data privacy and security law that regulates how personal data should be handled.",
    color: "border-blue-500",
    link: "https://gdpr.eu/",
  },
  {
    id: "hipaa",
    name: "HIPAA",
    logo: "/hipaa_logo.jpeg",
    description:
      "Health Insurance Portability and Accountability Act - US legislation for data privacy and security for medical information.",
    color: "border-red-500",
    link: "https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    logo: "/ISO-logo.png",
    description:
      "International standard for information security management systems (ISMS) to systematically manage sensitive company information.",
    color: "border-yellow-500",
    link: "https://www.iso.org/obp/ui/en/#iso:std:iso-iec:27001:ed-3:v1:en",
  },
  {
    id: "soc2",
    name: "SOC 2",
    logo: "/SOC-type2.png",
    description:
      "Service Organization Control 2 - Auditing procedure ensuring service providers securely manage customer data.",
    color: "border-purple-500",
    link: "https://secureframe.com/hub/soc-2/what-is-soc-2",
  },
  {
    id: "pci-dss",
    name: "PCI DSS",
    logo: "/pci-dss.png",
    description:
      "Payment Card Industry Data Security Standard - Information security standard for organizations handling credit card data.",
    color: "border-green-500",
    link: "https://www.pcisecuritystandards.org/standards/",
  },
  {
    id: "ccpa",
    name: "CCPA",
    logo: "/ccpa.avif",
    description:
      "California Consumer Privacy Act - State statute enhancing privacy rights and consumer protection for California residents.",
    color: "border-orange-500",
    link: "https://oag.ca.gov/privacy/ccpa",
  },
  {
    id: "nist",
    name: "NIST CSF",
    logo: "/nist.png",
    description:
      "National Institute of Standards and Technology Cybersecurity Framework - Guidelines for private sector organizations to assess and improve security.",
    color: "border-teal-500",
    link: "https://www.nist.gov/cyberframework",
  },
]

export function ComplianceCarousel() {
  const [activeStandard, setActiveStandard] = useState<string | null>(null)
  const [glitchActive, setGlitchActive] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  // Trigger occasional glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Auto-scroll carousel
  useEffect(() => {
    if (!autoScroll || !carouselRef.current) return

    const interval = setInterval(() => {
      if (!carouselRef.current) return

      const scrollAmount = 200 // Approximate width of a logo + margin
      const currentScroll = carouselRef.current.scrollLeft
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth

      if (currentScroll >= maxScroll - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        carouselRef.current.scrollTo({ left: currentScroll + scrollAmount, behavior: "smooth" })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [autoScroll])

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    // Pause auto-scroll when manually scrolling
    setAutoScroll(false)
    setTimeout(() => setAutoScroll(true), 5000)

    const scrollAmount = 200 // Approximate width of a logo + margin
    const currentScroll = carouselRef.current.scrollLeft

    carouselRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    })

    // Trigger glitch effect on scroll
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 200)
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm">Regulatory Compliance</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${glitchActive ? "animate-text-glitch" : ""}`}>
            <span className="text-green-400">{">"}</span> Compliance Standards
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-green-400">
            Sentinel helps you meet the requirements of major regulatory frameworks
          </p>
        </div>

        <div className="relative mb-12">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-green-800 text-green-500 hover:bg-green-950/50 rounded-full h-10 w-10"
            onClick={() => scrollCarousel("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-6 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {complianceStandards.map((standard) => (
              <motion.div
                key={standard.id}
                whileHover={{ scale: 1.05, y: -5 }}
                className="min-w-[150px] mx-4 first:ml-0 last:mr-0"
              >
                <button
                  className={`bg-green-950/20 border-2 ${
                    activeStandard === standard.id ? standard.color : "border-green-900"
                  } rounded-lg p-4 w-full h-[150px] flex flex-col items-center justify-center transition-colors hover:bg-green-950/30`}
                  onClick={() => {
                    setActiveStandard(standard.id === activeStandard ? null : standard.id)
                    setGlitchActive(true)
                    setTimeout(() => setGlitchActive(false), 200)
                  }}
                >
                  <Image
                    src={standard.logo || "/placeholder.svg"}
                    alt={standard.name}
                    width={80}
                    height={80}
                    className="mb-3"
                    style={{ width: "auto", height: "auto"}}
                  />
                  <span className="font-bold">{standard.name}</span>
                </button>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 border-green-800 text-green-500 hover:bg-green-950/50 rounded-full h-10 w-10"
            onClick={() => scrollCarousel("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {activeStandard ? (
            <motion.div
              key={activeStandard}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-green-950/10 border border-green-900 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                {complianceStandards.map(
                  (standard) =>
                    standard.id === activeStandard && (
                      <div key={standard.id} className="flex flex-col md:flex-row items-start">
                        <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
                          <div
                            className={`bg-green-950/20 border-2 ${standard.color} rounded-lg p-4 w-[150px] h-[150px] flex flex-col items-center justify-center`}
                          >
                            <Image
                              src={standard.logo || "/placeholder.svg"}
                              alt={standard.name}
                              width={80}
                              height={80}
                              className="mb-3"
                              style={{ width: "auto", height: "auto"}}
                            />
                            <span className="font-bold">{standard.name}</span>
                          </div>
                        </div>
                        <div className="md:w-3/4 md:pl-6">
                          <h3 className="text-2xl font-bold mb-4 flex items-center">
                            <Info className="h-5 w-5 mr-2" />
                            {standard.name} Compliance
                          </h3>
                          <p className="text-green-400 mb-6">{standard.description}</p>
                          <div className="bg-green-950/20 border border-green-900 rounded-lg p-4">
                            <h4 className="font-bold mb-2">How Sentinel Helps</h4>
                            <ul className="space-y-2 text-sm text-green-400">
                              <li className="flex items-start">
                                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                                <span>Automated compliance checks against {standard.name} requirements</span>
                              </li>
                              <li className="flex items-start">
                                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                                <span>Real-time monitoring for compliance violations</span>
                              </li>
                              <li className="flex items-start">
                                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                                <span>Detailed compliance reports for auditors</span>
                              </li>
                              <li className="flex items-start">
                                <Shield className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                                <span>Remediation recommendations for non-compliant elements</span>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-6 text-right">
                            <Button onClick={() =>  { window.location.href = standard.link; }} className="bg-green-600 hover:bg-green-700 text-black font-bold">
                              Learn More About {standard.name}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-950/10 border border-green-900 rounded-lg p-6 text-center"
            >
              <p className="text-green-400">
                Select a compliance standard above to learn more about how Sentinel helps you meet regulatory
                requirements.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

