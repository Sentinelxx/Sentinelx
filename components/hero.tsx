"use client"

import { useState, useEffect } from "react"
import { Shield, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/wallet/ConnectWallet"
import { useSDK } from "@metamask/sdk-react"

export function Hero() {
  const [titleText, setTitleText] = useState("")
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const { connected, chainId } = useSDK()
  
  // Check if wallet is properly connected to the right chain
  const isWalletReady = connected && chainId === "0x20a55"

  const fullTitle = "Sentinel: The Ultimate Firewall for Smart Contracts"

  useEffect(() => {
    let i = 0
    const typingTitle = setInterval(() => {
      setTitleText(fullTitle.substring(0, i))
      i++
      if (i > fullTitle.length) {
        clearInterval(typingTitle)
        setTimeout(() => setSubtitleVisible(true), 500)
      }
    }, 70)

    return () => clearInterval(typingTitle)
  }, [])

  useEffect(() => {
    if (subtitleVisible) {
      setTimeout(() => setButtonsVisible(true), 1000)
    }
  }, [subtitleVisible])

  return (
    <section id="hero" className="relative overflow-hidden py-20 px-4 h-screen w-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
          <Shield className="h-4 w-4 mr-2" />
          <span className="text-sm">Protecting Web3 One Contract at a Time</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 min-h-[80px]">
          {titleText}
          <span
            className={`inline-block w-2 h-8 bg-green-500 ml-1 ${titleText.length === fullTitle.length ? "animate-blink" : "opacity-0"}`}
          ></span>
        </h1>

        <div className={`transition-opacity duration-1000 ${subtitleVisible ? "opacity-100" : "opacity-0"}`}>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A comprehensive security layer that protects smart contracts from exploits, front-running attacks, and
            vulnerabilities in real-time.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-4 transition-opacity duration-1000 ${buttonsVisible ? "opacity-100" : "opacity-0"}`}
        >
          {!isWalletReady ? (
            <ConnectWallet />
          ) : (
            <>
              <Button onClick={()=>window.location.href="/upload-contract"} className="bg-green-600 hover:bg-green-700 text-black font-bold px-6 py-3 rounded-md">
                Get Started
              </Button>
              <Button onClick={()=> window.location.href="https://app.gitbook.com/o/UO3hYGggJBMeQGIczTah/s/pDNUEw0AjuWkqfI1z0U9/"} variant="outline" className="border-green-500 text-green-500 hover:bg-green-950 px-6 py-3 rounded-md">
                View Documentation
              </Button>
            </>
          )}
        </div>

        {/* <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-1000 delay-300 ${buttonsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="bg-green-950/30 p-6 rounded-lg border border-green-800">
            <Lock className="h-10 w-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Smart Contract Firewall</h3>
            <p className="text-green-400">Blocks malicious transactions before execution</p>
          </div>

          <div className="bg-green-950/30 p-6 rounded-lg border border-green-800">
            <Shield className="h-10 w-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Self-Healing Contracts</h3>
            <p className="text-green-400">Auto-rollback and patching for exploited contracts</p>
          </div>

          <div className="bg-green-950/30 p-6 rounded-lg border border-green-800">
            <Zap className="h-10 w-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">MEV Protection</h3>
            <p className="text-green-400">Prevents front-running and sandwich attacks</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}

