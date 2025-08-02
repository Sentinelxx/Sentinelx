"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Shield, RefreshCw } from "lucide-react"
import NeonCursor from "@/components/neonCursor"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [countdown, setCountdown] = useState(10)
  const [glitchIntensity, setGlitchIntensity] = useState(0)

  useEffect(() => {
    // Countdown to auto-reset
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      reset()
    }
  }, [countdown, reset])

  useEffect(() => {
    // Increase glitch effect as countdown progresses
    setGlitchIntensity(10 - countdown)

    // Random glitch spikes
    const randomGlitch = () => {
      setGlitchIntensity(10)
      setTimeout(() => setGlitchIntensity(10 - countdown), 200)
    }

    const interval = setInterval(randomGlitch, 2000)
    return () => clearInterval(interval)
  }, [countdown])

  return (
    <html>
      <body className="bg-black text-green-500 font-mono">
        <NeonCursor />
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

          {/* Random glitch lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-red-500"
              style={{
                height: `${Math.random() * 2}px`,
                width: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                left: 0,
                opacity: Math.random() * 0.3,
                transform: `translateX(${Math.random() * 100}%)`,
                animation: `glitch-line ${Math.random() * 3 + 1}s infinite`,
              }}
            />
          ))}

          {/* Main content */}
          <div
            className={`relative z-10 max-w-md mx-auto text-center p-6 ${glitchIntensity > 5 ? "animate-glitch" : ""}`}
          >
            <div className="relative mb-6 mx-auto w-32 h-32">
              <Shield className={`w-full h-full text-red-500 ${glitchIntensity > 3 ? "animate-pulse" : ""}`} />
              {glitchIntensity > 7 && (
                <>
                  <Shield className="w-full h-full text-green-500 absolute top-0 left-1 opacity-70 animate-glitch-1" />
                  <Shield className="w-full h-full text-blue-500 absolute top-0 left-0 opacity-70 animate-glitch-2" />
                </>
              )}
              <AlertTriangle className="absolute inset-0 m-auto w-12 h-12 text-black" />
            </div>

            <h1 className={`text-4xl font-bold mb-4 text-red-500 ${glitchIntensity > 5 ? "animate-shake" : ""}`}>
              CRITICAL SYSTEM FAILURE
            </h1>

            <p className={`mb-6 text-green-400 ${glitchIntensity > 4 ? "animate-text-glitch" : ""}`}>
              A fatal error has occurred in the Sentinel core system.
              {glitchIntensity > 6 && " S3CUR1TY C0MPR0M1S3D."}
            </p>

            <div className="mb-8">
              <div className="w-full h-2 bg-green-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-200"
                  style={{ width: `${(10 - countdown) * 10}%` }}
                />
              </div>
              <p className="mt-2 text-sm">Auto-reset in {countdown} seconds</p>
            </div>

            <button
              onClick={reset}
              className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className={`h-5 w-5 ${glitchIntensity > 5 ? "animate-spin" : ""}`} />
              Manual Reset
            </button>

            <div className="mt-8 text-xs text-green-700">
              <p>ERROR: {error.message || "Unknown error"}</p>
              {error.digest && <p>DIGEST: {error.digest}</p>}
            </div>
          </div>

          {/* Flickering effect overlay */}
          {glitchIntensity > 8 && (
            <div className="absolute inset-0 bg-red-500/5 animate-flicker pointer-events-none"></div>
          )}
        </div>
      </body>
    </html>
  )
}

