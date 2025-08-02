"use client"

import { useState, useEffect } from "react"
import { Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useOCAuth } from '@opencampus/ocid-connect-js';

export function Navigation() {
  const { ocAuth } = useOCAuth();
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

 
  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: 'opencampus' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm py-3 shadow-lg shadow-green-900/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-green-500 mr-2" />
          <span className="text-xl font-bold"><Link href="/">Sentinel</Link></span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href='/features' className="text-green-400 hover:text-green-300 transition-colors">
            Features
          </Link>
          <Link href="/upload-contract" className="text-green-400 hover:text-green-300 transition-colors">
            Upload Contract
          </Link>
          <Link href="https://sentinel-whitepaper.vercel.app/" className="text-green-400 hover:text-green-300 transition-colors">
            Whitepaper
          </Link>
          <Link href="/about" className="text-green-400 hover:text-green-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-green-400 hover:text-green-300 transition-colors">
            Contact
          </Link>
          <Link href="/dashboard" className="text-green-400 hover:text-green-300 transition-colors">
            Dashboard
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button onClick={handleLogin}  variant="outline" className="border-green-500 text-green-500 hover:bg-green-950">
            OC-ID Login
          </Button>
          <Button onClick={()=> {window.location.href="https://github.com/Aryanzutshi/Sentinel"}} className="bg-green-600 hover:bg-green-700 text-black">Github</Button>
        </div>

        <button className="md:hidden text-green-500" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button className="text-green-500" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link href="/features" className="text-green-400 text-2xl" onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="/upload-contract" className="text-green-400 text-2xl" onClick={() => setMobileMenuOpen(false)}>
            Upload Contract
          </Link>
          <Link href="/documentation" className="text-green-400 text-2xl" onClick={() => setMobileMenuOpen(false)}>
            Documentation
          </Link>
          <Link href="/about" className="text-green-400 text-2xl" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="text-green-400 text-2xl" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/dashboard" className="text-green-400 text-2xl" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>

          <div className="pt-8 flex flex-col space-y-4">
            <Button onClick={handleLogin} variant="outline" className="border-green-500 text-green-500 hover:bg-green-950">
              OC-ID Login
            </Button>
            <Button onClick={()=> {window.location.href="https://github.com/Aryanzutshi/Sentinel"}} className="bg-green-600 hover:bg-green-700 text-black">Github</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

