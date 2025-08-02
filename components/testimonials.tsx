"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Testimonial data
const testimonials = [
  {
    id: "Web3 Fullstack Builder",
    company: "Anon",
    logo: "/anon.jpg",
    personName: "Nikhil Rathore",
    personRole: "Founder, Chief Executive Officer",
    quote:
      "We're handling millions in digital assets, and Sentinel helps us stay protected while deploying rapid updates. It's been a game-changer for our security posture.",
    personImage: "/testimonial_nikhil.jpg",
    caseStudyLink: "https://anon_arlink.ar.io/",
  },
  {
    id: "Web3 Startup focussed on Arweave",
    company: "Neaw",
    logo: "/neaw.jpg",
    personName: "Prashant Dubey",
    personRole: "Chief Executive Officer",
    quote:
      "Sentinel's AI-powered audits caught critical vulnerabilities that would have cost us millions. The self-healing contracts feature gives us confidence to innovate faster.",
    personImage: "/testimonial_prashant.jpeg",
    caseStudyLink: "https://neaw.vercel.app/",
  },
  {
    id: "a decentralized ML-platform",
    company: "AOLearn",
    logo: "/ao_learn.jpg",
    personName: "Satyansh Mittal",
    personRole: "Chief Technical Lead",
    quote:
      "As a decentralized organization, security is our top priority. Sentinel provides the protection we need while maintaining the transparency our community expects.",
    personImage: "/testimonial_satyansh.png",
    caseStudyLink: "https://www.aolearn.tech/",
  },
  {
    id: "Web3 Startup focussed on Cybersecurity",
    company: "EduX",
    logo: "/edux.png",
    personName: "Aryan Zutshi",
    personRole: "Founder, Chief Executive Officer",
    quote:
      "With millions of transactions daily, we can't afford security breaches. Sentinel's real-time monitoring and MEV protection have prevented countless attacks.",
    personImage: "/ProfilePic.jpeg",
    caseStudyLink: "https://eduxx.vercel.app/",
  },
  {
    id: "Web3 Gaming startup",
    company: "Boulevard",
    logo: "/boulevard.jpeg",
    personName: "Ayush Raj",
    personRole: "Lead Unity Game developer, Integration developer",
    quote:
      "Our gaming platform needs both security and performance. Sentinel delivers both, allowing us to focus on creating engaging experiences instead of worrying about exploits.",
    personImage: "/testimonial_ayush.jpeg",
    caseStudyLink: "#blockchain-gaming-case-study",
  },
]

export function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0])
  const [isChanging, setIsChanging] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  // Trigger occasional glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleLogoClick = (testimonial: (typeof testimonials)[0]) => {
    if (testimonial.id === activeTestimonial.id) return

    setIsChanging(true)
    setTimeout(() => {
      setActiveTestimonial(testimonial)
      setIsChanging(false)
    }, 300)

    // Trigger glitch effect on change
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 300)
  }

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Matrix-style background elements */}
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
            <span className="text-sm">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">{">"}</span> For Web3 Teams of All Sizes
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-green-400">
            From startups to large enterprises, blockchain teams trust Sentinel for smart contract security
          </p>
          <Button variant="link" className="text-green-500 mt-2 hover:text-green-400 transition-colors">
            Explore all customer stories <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Testimonial content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-black border border-green-900 rounded-lg p-8 relative overflow-hidden">
              {/* Geometric shapes in background */}
              <div className="absolute -left-20 top-0 bottom-0 w-64 opacity-20">
                <div className="absolute top-10 left-10 w-40 h-40 bg-green-500 rounded-full"></div>
                <div className="absolute bottom-10 left-20 w-32 h-32 bg-purple-500 rounded-full"></div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="mb-6">
                    <div className="text-xs text-green-400 uppercase tracking-wider mb-1">
                      {activeTestimonial.company}
                    </div>
                    <div className={`text-xl md:text-2xl font-bold mb-4 ${glitchActive ? "animate-text-glitch" : ""}`}>
                      "{activeTestimonial.quote}"
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="font-bold">{activeTestimonial.personName}</div>
                        <div className="text-sm text-green-400">{activeTestimonial.personRole}</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => { window.location.href = activeTestimonial.caseStudyLink; }} // ✅ FIXED
                    variant="outline"
                    size="sm"
                    className="text-xs border-green-800 text-green-500 hover:bg-green-950/50"
                  >
                    Visit {activeTestimonial.company}&apos;s Website <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`relative z-10 ${glitchActive ? "animate-glitch" : ""}`}
                >
                  <div className="bg-green-950/20 border border-green-900 rounded-lg p-2">
                    <div className="aspect-[3/4] relative overflow-hidden rounded-md">
                      <Image
                        src={activeTestimonial.personImage || "/placeholder.svg"}
                        alt={activeTestimonial.personName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay with matrix effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                      {/* Scan line effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="w-full h-px bg-green-500/20 absolute top-1/2 animate-scan"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-green-500/30 rounded-full"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-green-500/20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Company logos */}
        <div className="mt-16">
          <div className="text-center mb-6 text-sm text-green-400">Trusted by leading blockchain companies</div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {testimonials.map((testimonial) => (
              <button
                key={testimonial.id}
                onClick={() => handleLogoClick(testimonial)}
                className={`relative transition-all duration-300 ${
                  activeTestimonial.id === testimonial.id
                    ? "opacity-100 scale-110"
                    : "opacity-50 hover:opacity-80 hover:scale-105"
                }`}
              >
                <div className="h-12 w-32 relative bg-green-950/30 rounded-md flex items-center justify-center border border-transparent hover:border-green-800">
                  <Image
                    src={testimonial.logo || "/placeholder.svg"}
                    alt={testimonial.company}
                    width={120}
                    height={40}
                    className="max-h-8 w-auto"
                  />
                </div>
                {activeTestimonial.id === testimonial.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-green-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

