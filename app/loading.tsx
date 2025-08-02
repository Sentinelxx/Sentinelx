"use client"

import { useEffect, useState, useRef } from "react"
import { Shield } from "lucide-react"
import NeonCursor from "@/components/neonCursor"

export default function Loading() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loadingText, setLoadingText] = useState("")
  const [loadingPercentage, setLoadingPercentage] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)

  // Matrix rain effect
  useEffect(() => {
    const canvas: any= canvasRef.current
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

    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

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

  // Loading text animation
  useEffect(() => {
    const messages = [
      "Initializing security protocols",
      "Establishing secure connection",
      "Loading encryption modules",
      "Scanning for vulnerabilities",
      "Activating firewall",
      "Deploying countermeasures",
      "Securing perimeter",
      "Analyzing threat vectors",
      "Preparing defense systems",
      "Sentinel activation imminent",
    ]

    let currentMessageIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let typingSpeed = 50

    const typeWriter = () => {
      const currentMessage = messages[currentMessageIndex]

      if (isDeleting) {
        setLoadingText(currentMessage.substring(0, currentCharIndex - 1))
        currentCharIndex--
        typingSpeed = 30
      } else {
        setLoadingText(currentMessage.substring(0, currentCharIndex + 1))
        currentCharIndex++
        typingSpeed = 50
      }

      if (!isDeleting && currentCharIndex === currentMessage.length) {
        // Pause at the end of typing
        typingSpeed = 1500
        isDeleting = true
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false
        currentMessageIndex = (currentMessageIndex + 1) % messages.length
        typingSpeed = 500
      }

      setTimeout(typeWriter, typingSpeed)
    }

    typeWriter()

    // Loading percentage animation
    const incrementPercentage = () => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) return 100
        const increment = Math.random() * 5
        return Math.min(prev + increment, 100)
      })
    }

    const percentageInterval = setInterval(incrementPercentage, 200)

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => {
      clearInterval(percentageInterval)
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div
        className={`relative z-10 flex flex-col items-center justify-center ${glitchActive ? "animate-glitch" : ""}`}
      >
        <div className="relative">
          <Shield className={`h-24 w-24 text-green-500 animate-pulse ${glitchActive ? "animate-shake" : ""}`} />
          {glitchActive && (
            <>
              <Shield className="h-24 w-24 text-red-500 absolute top-0 left-0 opacity-50 animate-glitch-1" />
              <Shield className="h-24 w-24 text-blue-500 absolute top-0 left-0 opacity-50 animate-glitch-2" />
            </>
          )}
        </div>

        <NeonCursor />

        <h1 className={`text-4xl font-bold mt-8 text-green-500 ${glitchActive ? "animate-shake" : ""}`}>SENTINEL</h1>

        <div className="mt-8 w-64 h-2 bg-green-900 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-200" style={{ width: `${loadingPercentage}%` }} />
        </div>

        <div className="h-8 mt-4">
          <p className="text-green-500 font-mono">
            {loadingText}
            <span className="animate-blink">_</span>
          </p>
        </div>

        <div className="mt-8 font-mono text-green-500 text-sm">
          <p className={glitchActive ? "animate-shake" : ""}>{Math.floor(loadingPercentage)}% COMPLETE</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-green-500 text-xs font-mono">
        <p>PRESS ESC TO ABORT SEQUENCE</p>
      </div>
    </div>
  )
}

