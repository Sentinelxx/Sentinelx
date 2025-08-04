"use client"

import { useEffect, useState } from "react"
// import { Terminal } from "@/components/terminal"
import { AdvancedTerminal } from "../components/advanced-terminal"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

import NeonCursor from "@/components/neonCursor"
import { Testimonials } from "@/components/testimonials"
import { ValueProposition } from "@/components/value-proposition"
import { CompetitorComparison } from "@/components/competitor-comparison"
import { VideoWalkthroughs } from "@/components/video-walkthrough"
import { ComplianceCarousel } from "@/components/compliance-carousel"

export default function Home() {
  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
    // Force scroll to top immediately
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
    
    // Set scroll restoration to manual to prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Small delay to ensure DOM is ready, then scroll to top again
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Additional scroll reset on route changes or page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        window.scrollTo(0, 0)
      }
    }

    const handleFocus = () => {
      window.scrollTo(0, 0)
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])


  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <NeonCursor />
        <Navigation />
        <Hero />
        <ValueProposition />
        <Features />
        <VideoWalkthroughs />
        <CompetitorComparison />
        <Testimonials />
        <ComplianceCarousel />
        <section id="demo" className="py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-green-400">{">"}</span> Demo
          </h2>
          <AdvancedTerminal className="w-[50%] h-[1000px] mx-auto" />
        </section>
        <Footer />
      </div>
    </main>
  )
}

