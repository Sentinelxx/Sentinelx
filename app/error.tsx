"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { AlertTriangle, RefreshCw, Terminal, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import NeonCursor from "@/components/neonCursor"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const [glitchLevel, setGlitchLevel] = useState(0)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "SYSTEM ERROR DETECTED",
    "SECURITY BREACH IN PROGRESS",
    "INITIATING EMERGENCY PROTOCOLS",
    "TYPE 'help' FOR AVAILABLE COMMANDS",
  ])
  const [errorCodes] = useState([
    Math.floor(Math.random() * 900) + 100,
    Math.floor(Math.random() * 900) + 100,
    Math.floor(Math.random() * 900) + 100,
    Math.floor(Math.random() * 900) + 100,
  ])
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Increase glitch effect over time
    const glitchInterval = setInterval(() => {
      setGlitchLevel((prev) => Math.min(prev + 1, 10))
    }, 3000)

    // Random glitch spikes
    const randomGlitch = () => {
      setGlitchLevel(10)
      setTimeout(() => setGlitchLevel(5), 200)
    }

    const randomGlitchInterval = setInterval(randomGlitch, 5000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(randomGlitchInterval)
    }
  }, [])

  useEffect(() => {
    // Scroll terminal to bottom when output changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!terminalInput.trim()) return

    // Add user input to terminal
    setTerminalOutput((prev) => [...prev, `> ${terminalInput}`])

    // Process commands
    const command = terminalInput.trim().toLowerCase()

    if (command === "help") {
      setTerminalOutput((prev) => [
        ...prev,
        "AVAILABLE COMMANDS:",
        "  help       - Display this help message",
        "  status     - Check system status",
        "  reset      - Attempt system reset",
        "  fix        - Run auto-repair sequence",
        "  home       - Return to home page",
        "  clear      - Clear terminal",
      ])
    } else if (command === "status") {
      setTerminalOutput((prev) => [
        ...prev,
        "SYSTEM STATUS:",
        "  Core Services: OFFLINE",
        "  Firewall: BREACHED",
        "  Security Level: CRITICAL",
        `  Error Code: ${errorCodes.join("-")}`,
        "  Last Known Good Configuration: NOT FOUND",
      ])
    } else if (command === "reset") {
      setTerminalOutput((prev) => [
        ...prev,
        "INITIATING SYSTEM RESET...",
        "REBUILDING SECURITY PROTOCOLS...",
        "RESET COMPLETE. REFRESHING PAGE...",
      ])
      setTimeout(reset, 2000)
    } else if (command === "fix") {
      setTerminalOutput((prev) => [
        ...prev,
        "RUNNING AUTO-REPAIR SEQUENCE...",
        "ANALYZING ERROR PATTERNS...",
        "APPLYING SECURITY PATCHES...",
        "AUTO-REPAIR COMPLETE. SYSTEM STABILITY IMPROVED.",
      ])
      setGlitchLevel(2)
    } else if (command === "home") {
      setTerminalOutput((prev) => [...prev, "NAVIGATING TO HOME PAGE...", "ESTABLISHING SECURE CONNECTION..."])
      setTimeout(() => router.push("/"), 2000)
    } else if (command === "clear") {
      setTerminalOutput([])
    } else {
      setTerminalOutput((prev) => [
        ...prev,
        `COMMAND NOT RECOGNIZED: '${command}'`,
        "TYPE 'help' FOR AVAILABLE COMMANDS",
      ])
    }

    setTerminalInput("")
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid with glitch effect */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-20"
        style={{
          filter: `blur(${glitchLevel / 2}px)`,
          transform: `skew(${glitchLevel / 10}deg, ${glitchLevel / 20}deg)`,
        }}
      />

      <NeonCursor />

      {/* Random noise lines */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-green-500 opacity-30"
            style={{
              height: `${Math.random() * 2}px`,
              width: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `glitch-line ${Math.random() * 5 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main error content */}
      <div className={`relative z-10 max-w-2xl w-full mx-auto px-4 ${glitchLevel > 5 ? "animate-glitch" : ""}`}>
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-6">
            <AlertTriangle className={`h-24 w-24 text-red-500 ${glitchLevel > 3 ? "animate-pulse" : ""}`} />
            {glitchLevel > 7 && (
              <>
                <AlertTriangle className="h-24 w-24 text-green-500 absolute top-0 left-1 opacity-70 animate-glitch-1" />
                <AlertTriangle className="h-24 w-24 text-blue-500 absolute top-0 left-0 opacity-70 animate-glitch-2" />
              </>
            )}
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold text-red-500 mb-4 ${glitchLevel > 5 ? "animate-shake" : ""}`}>
            SECURITY BREACH
          </h1>

          <div className="flex items-center justify-center space-x-2 mb-4">
            {errorCodes.map((code, index) => (
              <div
                key={index}
                className={`text-xl font-mono bg-red-950/30 border border-red-800 px-3 py-1 rounded ${
                  glitchLevel > 7 ? "animate-number-glitch" : ""
                }`}
              >
                {code}
              </div>
            ))}
          </div>

          <p className={`text-green-400 max-w-lg ${glitchLevel > 4 ? "animate-text-glitch" : ""}`}>
            A critical error has occurred in the security system. Unauthorized access detected.
            {glitchLevel > 6 && " D4TA C0RRUPT10N D3T3CT3D."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={reset}
            className="bg-green-600 hover:bg-green-700 text-black font-bold flex items-center justify-center gap-2"
          >
            <RefreshCw className={`h-5 w-5 ${glitchLevel > 5 ? "animate-spin" : ""}`} />
            Reset System
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="bg-green-950/50 hover:bg-green-950/70 border border-green-800 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Return to Safety
          </Button>
        </div>

        <div className="mb-8">
          <Button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className="w-full bg-black border border-green-800 hover:bg-green-950/30 flex items-center justify-center gap-2"
          >
            <Terminal className="h-5 w-5" />
            {terminalOpen ? "Close Emergency Terminal" : "Open Emergency Terminal"}
          </Button>
        </div>

        {terminalOpen && (
          <div className="bg-black border border-green-800 rounded-md overflow-hidden">
            <div className="bg-green-950/30 p-2 flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              <span className="text-sm font-bold">Emergency Recovery Terminal</span>
            </div>

            <div ref={terminalRef} className="h-64 overflow-y-auto p-4 font-mono text-sm">
              {terminalOutput.map((line, index) => (
                <div key={index} className={line.startsWith(">") ? "text-green-300" : "text-green-500"}>
                  {line}
                </div>
              ))}

              <form onSubmit={handleTerminalSubmit} className="flex items-center mt-2">
                <span className="text-green-500 mr-2">&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-green-500 w-full"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-green-700 mt-8">
          <p>ERROR DETAILS: {error.message || "Unknown error"}</p>
          {error.digest && <p>DIGEST: {error.digest}</p>}
        </div>
      </div>

      {/* Flickering effect overlay */}
      {glitchLevel > 8 && <div className="absolute inset-0 bg-red-500/5 animate-flicker pointer-events-none"></div>}
    </div>
  )
}

