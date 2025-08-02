"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Users } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import NeonCursor from "@/components/neonCursor"

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const teamMembers = [
    {
      name: "Aryan Zutshi",
      role: "Founder & CEO",
      bio: "Smart Contract Developer & Auditor, Founder of EduXX.",
      image: "/ProfilePic.jpeg",
    },
    // {
    //   name: "Sophia Rodriguez",
    //   role: "CTO",
    //   bio: "Smart contract auditor and core developer with contributions to major DeFi protocols.",
    //   image: "/placeholder.svg?height=200&width=200",
    // },
    // {
    //   name: "Marcus Johnson",
    //   role: "Head of Research",
    //   bio: "PhD in Cryptography with expertise in zero-knowledge proofs and MEV protection.",
    //   image: "/placeholder.svg?height=200&width=200",
    // },
    // {
    //   name: "Aisha Patel",
    //   role: "Lead Security Engineer",
    //   bio: "Discovered critical vulnerabilities in top DeFi protocols, saved over $300M in funds.",
    //   image: "/placeholder.svg?height=200&width=200",
    // },
  ]

  const timeline = [
    {
      year: "2025",
      title: "Inception",
      description: "Sentinel was founded with a mission to make Web3 safer for everyone.",
    },
    {
      year: "2026",
      title: "First Product Launch",
      description: "Releasing our Smart Contract Firewall, goal to getting a user onboarding of 10000+ in the first 4 months",
    },
    {
      year: "2026",
      title: "Seed Funding",
      description: "Raising over $5M from leading crypto VCs to accelerate development and growth.",
    },
    {
      year: "2026",
      title: "MEV Protection Launch",
      description: "Introducing our revolutionary MEV protection layer, aiming to preventing millions in front-running losses.",
    },
    {
      year: "2027",
      title: "Series A",
      description: "Securing $20M in Series A funding to expand our security offerings.",
    },
    {
      year: "2027",
      title: "Self-Healing Contracts",
      description: "Launching groundbreaking self-healing technology for smart contracts.",
    },
  ]

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />
        <NeonCursor />

        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">Our Story</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> About Sentinel
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">
                We&apos;re on a mission to make Web3 safer for everyone by protecting smart contracts from exploits and
                attacks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="mb-4 text-green-400">
                  At Sentinel, we believe that security should be accessible to everyone in the Web3 ecosystem. Our
                  mission is to protect the future of decentralized finance and applications by providing cutting-edge
                  security solutions that are easy to implement and effective against evolving threats.
                </p>
                <p className="mb-6 text-green-400">
                  Founded by a team of blockchain developer, Sentinel was born out of the need
                  for better security tools in the rapidly evolving blockchain landscape. We&apos;ve seen firsthand the
                  devastating impact of smart contract exploits and are committed to preventing them.
                </p>
                {/* <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-green-950/20 border border-green-900 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">$10B+</div>
                    <div className="text-sm text-green-400">Value Protected</div>
                  </div>
                  <div className="bg-green-950/20 border border-green-900 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-sm text-green-400">Contracts Secured</div>
                  </div>
                  <div className="bg-green-950/20 border border-green-900 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm text-green-400">Team Members</div>
                  </div>
                  <div className="bg-green-950/20 border border-green-900 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-sm text-green-400">Blockchains Supported</div>
                  </div>
                </div> */}
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="bg-green-950/20 border border-green-900 rounded-lg p-6 relative">
                  <Image
                    src="/about_pic.png"
                    alt="Sentinel Team"
                    width={500}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Plan</h2>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-900"></div>
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
                    >
                      <div
                        className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12 text-left"}`}
                      >
                        <div className="bg-green-950/20 border border-green-900 rounded-lg p-6">
                          <div className="text-green-400 font-bold mb-2">{item.year}</div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-green-400">{item.description}</p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-green-500 border-4 border-black z-10"></div>
                      <div className="w-1/2 hidden md:block"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-green-950/20 border border-green-900 rounded-lg p-6 text-center">
                    <div className="mb-4 mx-auto relative w-32 h-32 rounded-full overflow-hidden border-2 border-green-500">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <div className="text-green-400 mb-3">{member.role}</div>
                    <p className="text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8 text-green-400">
                We&apos;re always looking for talented individuals who are passionate about blockchain security.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-black font-bold px-8 py-3 rounded-md text-lg">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

