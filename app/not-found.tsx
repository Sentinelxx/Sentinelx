"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Search, Shield, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import NeonCursor from "@/components/neonCursor"

export default function NotFound() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanLines, setScanLines] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Matrix rain effect
  useEffect(() => {
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

    const matrix = "404PAGE NOT FOUND404ERROR404SENTINEL"

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

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push("/")
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />

      {scanLines && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-green-500/10" style={{ top: `${i * 10}px` }} />
          ))}
        </div>
      )}

      <NeonCursor />

      <div className={`relative z-20 max-w-xl w-full mx-auto px-4 text-center ${glitchActive ? "animate-glitch" : ""}`}>
        <div className="relative mb-8">
          <div className="text-[150px] font-bold leading-none text-green-500 opacity-20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className={`h-32 w-32 text-green-500 ${glitchActive ? "animate-shake" : ""}`} />
          </div>
        </div>

        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-green-500 ${glitchActive ? "animate-shake" : ""}`}>
          LOCATION NOT FOUND
        </h1>

        <p className="text-green-400 mb-8 max-w-md mx-auto">
          The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <form onSubmit={handleSearch} className="mb-8 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for resources..."
            className="w-full bg-black border border-green-800 focus:border-green-500 text-green-500 rounded-md py-2 px-4 pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-green-800" />
        </form>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => router.back()}
            className="bg-green-950/50 hover:bg-green-950/70 border border-green-800 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-700 text-black font-bold flex items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Return Home
          </Button>
        </div>

        <div className="mt-12 text-xs text-green-700">
          <button onClick={() => setScanLines(!scanLines)} className="hover:text-green-500 transition-colors">
            [Toggle Scan Lines]
          </button>
        </div>
      </div>
    </div>
  )
}

