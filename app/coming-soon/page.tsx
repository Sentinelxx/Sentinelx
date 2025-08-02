"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, AlertTriangle, Clock, Bell, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NeonCursor from "@/components/neonCursor"

export default function ComingSoonPage() {
  const [loaded, setLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isTyping, setIsTyping] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const launchDate = new Date("2025-06-01T00:00:00").getTime()

  useEffect(() => {
    setLoaded(true)

    // Matrix effect for canvas
    const canvas: any = canvasRef.current
    if (!canvas) return

    const ctx: any = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const matrix = "COMING SOON SENTINEL V2 ADVANCED PROTECTION"

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const resizeHandler = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeHandler)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = launchDate - now

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  // Typing effect
  useEffect(() => {
    const fullText =
      "// Initializing Sentinel V1.0 - Advanced Smart Contract Protection System with AI-Powered Exploit Prevention"
    let currentIndex = 0
    setIsTyping(true)

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // This would typically connect to an API to save the email
      setSubmitted(true)
    }
  }

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />
        <NeonCursor />

        <section className="relative pt-32 pb-16 min-h-screen flex flex-col items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />

          <div className="relative z-10 max-w-6xl w-full mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                <span className="text-sm">Access Restricted</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 glitch-text">
                <span className="text-green-400">{">"}</span> Coming Soon
              </h1>

              <div className="w-full max-w-3xl mx-auto bg-green-950/20 border border-green-900 rounded-lg p-4 mb-8">
                <p className="text-xl font-mono text-green-500 text-left overflow-hidden whitespace-nowrap">
                  {displayText}
                  <span
                    className={`inline-block w-2 h-5 bg-green-500 ml-1 ${isTyping ? "animate-blink" : "opacity-0"}`}
                  ></span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-green-950/10 border border-green-900 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-10 w-10 text-green-500 mr-3" />
                  <h2 className="text-3xl font-bold">Sentinel V1.0</h2>
                </div>

                <p className="mb-6 text-green-400">
                  We're building the next generation of smart contract security. Sentinel V1.0 introduces
                  AI-powered threat detection, and advanced self-healing capabilities to
                  protect your blockchain assets like never before.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-green-950/30 p-2 rounded-full mr-3 mt-1">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Quantum-Resistant Security</h3>
                      <p className="text-sm text-green-400">
                        Post-quantum cryptographic algorithms to future-proof your smart contracts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-950/30 p-2 rounded-full mr-3 mt-1">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">AI-Powered Threat Prevention</h3>
                      <p className="text-sm text-green-400">
                        Predictive analytics to identify and neutralize exploits before they occur.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-950/30 p-2 rounded-full mr-3 mt-1">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Advanced Self-Healing</h3>
                      <p className="text-sm text-green-400">
                        Autonomous recovery systems that protect and restore compromised contracts in milliseconds.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-green-500/70 border-t border-green-900 pt-4">
                  *Features and capabilities subject to change before official release.
                </p>
              </div>

              <div>
                <div className="bg-green-950/10 border border-green-900 rounded-lg p-8 mb-8">
                  <div className="flex items-center mb-6">
                    <Clock className="h-6 w-6 text-green-500 mr-3" />
                    <h2 className="text-2xl font-bold">Launch Countdown</h2>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-950/30 border border-green-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">{countdown.days}</div>
                      <div className="text-xs text-green-400">DAYS</div>
                    </div>
                    <div className="bg-green-950/30 border border-green-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">{countdown.hours}</div>
                      <div className="text-xs text-green-400">HOURS</div>
                    </div>
                    <div className="bg-green-950/30 border border-green-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">{countdown.minutes}</div>
                      <div className="text-xs text-green-400">MINUTES</div>
                    </div>
                    <div className="bg-green-950/30 border border-green-800 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold mb-1">{countdown.seconds}</div>
                      <div className="text-xs text-green-400">SECONDS</div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-green-400">Sentinel V1.0 launches on June 1, 2025</div>
                </div>

                <div className="bg-green-950/10 border border-green-900 rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <Bell className="h-6 w-6 text-green-500 mr-3" />
                    <h2 className="text-2xl font-bold">Get Notified</h2>
                  </div>

                  {!submitted ? (
                    <form onSubmit={handleSubmit}>
                      <p className="mb-4 text-green-400">
                        Be the first to know when Sentinel V2.0 launches. Sign up for early access and exclusive
                        updates.
                      </p>
                      <div className="flex gap-4">
                        <div className="flex-grow">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-black border-green-800 focus:border-green-500 text-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-black font-bold">
                          Notify Me
                        </Button>
                      </div>
                      <p className="mt-3 text-xs text-green-500/70">We'll never share your email with third parties.</p>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                      <p className="text-green-400">
                        You're now on the list. We'll notify you when Sentinel V1.0 is ready.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button
                className="bg-green-950/50 hover:bg-green-950/70 border border-green-800 inline-flex items-center"
                onClick={() => (window.location.href = "/")}
              >
                Return to Current Version <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

