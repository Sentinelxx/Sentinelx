"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, TerminalIcon, X, Maximize2, Minimize2, Copy, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdvancedTerminalProps {
  className?: string
  height?: string
}

export function AdvancedTerminal({ className = "", height = "300px" }: AdvancedTerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const welcomeMessage = [
    "███████╗███████╗███╗   ██╗████████╗██╗███╗   ██╗███████╗██╗     ",
    "██╔════╝██╔════╝████╗  ██║╚══██╔══╝██║████╗  ██║██╔════╝██║     ",
    "███████╗█████╗  ██╔██╗ ██║   ██║   ██║██╔██╗ ██║█████╗  ██║     ",
    "╚════██║██╔══╝  ██║╚██╗██║   ██║   ██║██║╚██╗██║██╔══╝  ██║     ",
    "███████║███████╗██║ ╚████║   ██║   ██║██║ ╚████║███████╗███████╗",
    "╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝",
    "                                                                 ",
    "Welcome to Sentinel CLI v1.0.0",
    "Type 'help' to see available commands.",
    "Initializing security protocols...",
  ]

  const commands = {
    help: () => [
      "Available commands:",
      "  help                 - Show this help message",
      "  clear                - Clear the terminal",
      "  status               - Check Sentinel status",
      "  scan <address>       - Scan a contract for vulnerabilities",
      "  protect <address>    - Deploy protection to a contract",
      "  monitor <address>    - Start monitoring a contract",
      "  list                 - List protected contracts",
      "  version              - Show Sentinel version",
      "  exit                 - Exit the terminal",
    ],
    clear: () => {
      setHistory([])
      return []
    },
    status: () => [
      "Sentinel Status:",
      "✓ Core Services: Online",
      "✓ Firewall: Active",
      "✓ MEV Protection: Active",
      "✓ Self-Healing: Active",
      "✓ Monitoring: Active",
      "✓ Connected to Ethereum Mainnet",
      "Last update: " + new Date().toLocaleTimeString(),
    ],
    scan: (address: string) => {
      if (!address) return ["Error: Please provide a contract address to scan"]
      return [
        `Scanning contract ${address || "0x1234..."}...`,
        "Analyzing bytecode...",
        "Checking for known vulnerabilities...",
        "Running static analysis...",
        "Simulating attack vectors...",
        "",
        "Scan complete!",
        "Results:",
        "- No critical vulnerabilities found",
        "- 2 medium risk issues detected",
        "- 5 low risk issues detected",
        "",
        "Run 'protect " + (address || "0x1234...") + "' to deploy protection",
      ]
    },
    protect: (address: string) => {
      if (!address) return ["Error: Please provide a contract address to protect"]
      return [
        `Deploying protection to ${address || "0x1234..."}...`,
        "Initializing Smart Contract Firewall...",
        "Configuring MEV Protection...",
        "Setting up Self-Healing protocols...",
        "Deploying security monitors...",
        "",
        "Protection successfully deployed!",
        "Your contract is now protected by Sentinel.",
      ]
    },
    monitor: (address: string) => {
      if (!address) return ["Error: Please provide a contract address to monitor"]
      return [
        `Starting monitoring for ${address || "0x1234..."}...`,
        "Initializing real-time transaction monitoring...",
        "Setting up anomaly detection...",
        "Configuring alert notifications...",
        "",
        "Monitoring active!",
        "You will receive alerts for any suspicious activity.",
      ]
    },
    list: () => [
      "Protected Contracts:",
      "1. 0x742d35Cc6634C0532925a3b844Bc454e4438f44e (Token)",
      "2. 0x123f681646d4a755815f9cb19e1acc8565a0c2ac (DEX)",
      "3. 0x7be8076f4ea4a4ad08075c2508e481d6c946d12b (NFT)",
      "",
      "Total: 3 contracts protected",
    ],
    version: () => [
      "Sentinel CLI v1.0.0",
      "Build: 2023.10.15",
      "Core: v1.0.5",
      "Firewall: v1.2.1",
      "MEV Protection: v0.9.8",
      "Self-Healing: v0.7.3",
    ],
    exit: () => ["Exiting Sentinel CLI...", "Thank you for using Sentinel!"],
  }

  useEffect(() => {
    // Initialize with welcome message
    const initializeTerminal = async () => {
      for (const line of welcomeMessage) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        setHistory((prev) => [...prev, line])
      }
    }
    initializeTerminal()

    // Cursor blinking effect
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory(1)
    }
  }

  const navigateHistory = (direction: number) => {
    const newIndex = historyIndex + direction
    if (newIndex >= -1 && newIndex < commandHistory.length) {
      setHistoryIndex(newIndex)
      if (newIndex === -1) {
        setInput("")
      } else {
        setInput(commandHistory[newIndex])
      }
    }
  }

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim()
    const [command, ...args] = trimmedCmd.split(" ")

    // Add command to history
    setHistory((prev) => [...prev, `> ${trimmedCmd}`])
    setCommandHistory((prev) => [trimmedCmd, ...prev])
    setHistoryIndex(-1)

    // Process command
    if (command in commands) {
      const result = commands[command as keyof typeof commands](args.join(" "))

      if (result.length > 0) {
        setIsTyping(true)
        for (const line of result) {
          if (isPaused) {
            await new Promise((resolve) => {
              const checkPause = setInterval(() => {
                if (!isPaused) {
                  clearInterval(checkPause)
                  resolve(true)
                }
              }, 100)
            })
          }
          await new Promise((resolve) => setTimeout(resolve, Math.random() * 50 + 30))
          setHistory((prev) => [...prev, line])
        }
        setIsTyping(false)
      }
    } else if (command) {
      setHistory((prev) => [...prev, `Command not found: ${command}. Type 'help' for available commands.`])
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const copyToClipboard = () => {
    const text = history.join("\n")
    navigator.clipboard.writeText(text)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div
      className={`relative border border-green-800 rounded-lg overflow-hidden w-[57%] h-[50vh] mb-9 ${className}`}
      style={{ height: isFullscreen ? "90vh" : height }}
    >
      <div className="bg-green-950/30 p-2 flex items-center justify-between">
        <div className="flex items-center">
          <TerminalIcon className="h-4 w-4 mr-2" />
          <span className="text-sm font-bold">Sentinel Terminal</span>
          {isTyping && !isPaused && (
            <span className="ml-2 text-xs bg-green-500/20 px-2 py-0.5 rounded-full">Processing...</span>
          )}
          {isPaused && <span className="ml-2 text-xs bg-yellow-500/20 px-2 py-0.5 rounded-full">Paused</span>}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-green-950/50"
            onClick={togglePause}
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-green-950/50"
            onClick={copyToClipboard}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-green-950/50"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-green-950/50"
            onClick={() => executeCommand("clear")}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="bg-black p-4 overflow-auto font-mono text-sm h-[calc(100%-40px)]"
        onClick={focusInput}
      >
        <div className="whitespace-pre-line">
          {history.map((line, index) => (
            <div key={index} className={line.startsWith(">") ? "text-green-300 font-bold" : "text-green-500"}>
              {line}
            </div>
          ))}
          <div className="flex items-center mt-2">
            <ChevronRight className="h-4 w-4 text-green-500 mr-2 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-green-500 w-full"
              autoFocus
            />
            <span
              className={`inline-block w-2 h-4 bg-green-500 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
            ></span>
          </div>
        </div>
      </div>
    </div>
  )
}

