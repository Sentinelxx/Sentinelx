"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, MessageSquare, MapPin, Phone, Send, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import NeonCursor from "@/components/neonCursor"

export default function ContactPage() {
  const [loaded, setLoaded] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />
        <NeonCursor />

        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="text-sm">Get in Touch</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> Contact Sentinel
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">
                Have questions about our security solutions? We&apos;re here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-green-950/10 border border-green-900 rounded-lg p-8 h-full">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Email</h3>
                        <p className="text-green-400">zutshiaryan5@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Phone</h3>
                        <p className="text-green-400">+91 896 855 6472</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 mr-4 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Office</h3>
                        <p className="text-green-400">
                          Chandigarh University
                          <br />
                          Mohali, Punjab
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://github.com/aryanzutshi" className="bg-green-950/30 hover:bg-green-950/50 transition-colors p-3 rounded-full">
                      <Github className="h-6 w-6" />
                    </a>
                    <a href="https://X.com/aryanzutshi12" className="bg-green-950/30 hover:bg-green-950/50 transition-colors p-3 rounded-full">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="https://linkedin.com/in/aryanzutshi" className="bg-green-950/30 hover:bg-green-950/50 transition-colors p-3 rounded-full">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>

                  {/* <div className="mt-12">
                    <h3 className="font-bold mb-4">Office Hours</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Monday - Friday:</div>
                      <div>9:00 AM - 6:00 PM PST</div>
                      <div>Saturday:</div>
                      <div>10:00 AM - 4:00 PM PST</div>
                      <div>Sunday:</div>
                      <div>Closed</div>
                    </div>
                  </div> */}
                </div>
              </div>

              <div>
                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="bg-green-950/10 border border-green-900 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          className="bg-black border-green-800 focus:border-green-500 text-green-500"
                          placeholder="John"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          className="bg-black border-green-800 focus:border-green-500 text-green-500"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-black border-green-800 focus:border-green-500 text-green-500"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label>Inquiry Type</Label>
                      <RadioGroup defaultValue="general" className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="general" value="general" />
                          <Label htmlFor="general">General</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="support" value="support" />
                          <Label htmlFor="support">Technical Support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="sales" value="sales" />
                          <Label htmlFor="sales">Sales</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="partnership" value="partnership" />
                          <Label htmlFor="partnership">Partnership</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        className="bg-black border-green-800 focus:border-green-500 text-green-500 min-h-[150px]"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-black font-bold w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="bg-green-950/10 border border-green-900 rounded-lg p-8 flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <Send className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                    <p className="text-center text-green-400 mb-6">
                      Thank you for contacting Sentinel. We&apos;ll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      className="bg-green-600 hover:bg-green-700 text-black font-bold"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                  <h3 className="font-bold mb-2">How does Sentinel protect my smart contracts?</h3>
                  <p className="text-green-400 text-sm">
                    Sentinel provides a comprehensive security layer that monitors transactions, blocks malicious
                    activities, and prevents exploits in real-time.
                  </p>
                </div>

                <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                  <h3 className="font-bold mb-2">Is Sentinel compatible with all blockchains?</h3>
                  <p className="text-green-400 text-sm">
                    Sentinel currently supports Ethereum, Polygon, BSC, Arbitrum, Optimism, and other EVM-compatible
                    chains. Support for Solana and other chains is coming soon.
                  </p>
                </div>

                <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                  <h3 className="font-bold mb-2">How much does Sentinel cost?</h3>
                  <p className="text-green-400 text-sm">
                    Sentinel is currently free to use as we are in the beta phase.
                  </p>
                </div>

                <div className="bg-green-950/10 border border-green-900 rounded-lg p-6">
                  <h3 className="font-bold mb-2">Do you offer emergency response services?</h3>
                    <p className="text-green-400 text-sm">
                      No, Sentinel does not offer emergency response services at this time.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

