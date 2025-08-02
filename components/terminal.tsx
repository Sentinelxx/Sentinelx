"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, TerminalIcon } from "lucide-react"

export function Terminal() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const fullText = `> Initializing Sentinel v1.0.0...
> Loading Smart Contract Firewall...
> Connecting to Decentralized Auditing Network...
> Establishing Private Mempool...
> Activating Self-Healing Protocols...
> Sentinel is now protecting your smart contracts.
> Type 'help' for available commands.`

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      setText(fullText.substring(0, i))
      i++
      if (i > fullText.length) {
        clearInterval(typing)
      }

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }, 40)

    const blinkCursor = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typing)
      clearInterval(blinkCursor)
    }
  }, [])

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center mb-4 gap-2">
        <TerminalIcon className="h-6 w-6 text-green-500" />
        <h2 className="text-2xl font-bold">Sentinel Terminal</h2>
      </div>
      <div
        ref={containerRef}
        className="bg-black border border-green-500 rounded-md p-4 h-80 overflow-y-auto font-mono text-sm"
      >
        <div className="whitespace-pre-line">
          {text}
          <span
            className={`inline-block w-2 h-4 bg-green-500 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
          ></span>
        </div>
        <div className="flex items-center mt-4">
          <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-green-500 w-full"
            placeholder="Type a command..."
          />
        </div>
      </div>
    </section>
  )
}

