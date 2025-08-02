"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, FileText, Scale, AlertTriangle } from "lucide-react"
import NeonCursor from "@/components/neonCursor"

export default function TermsOfServicePage() {
  const [loaded, setLoaded] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const sections = [
    {
      title: "Acceptance of Terms",
      content: `By accessing or using Sentinel's website, security platform, or any of our services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services.
        
      We may modify these terms at any time. Continued use of our services after any changes constitutes your acceptance of the revised terms. It is your responsibility to regularly check for updates to these terms.
        
      These terms include our Privacy Policy and any other guidelines, rules, or disclaimers that may be posted and updated on our website or services.`,
    },
    {
      title: "Service Description",
      content: `Sentinel provides smart contract security services including but not limited to:
        
      • Smart Contract Firewall for monitoring and blocking malicious transactions
      • MEV protection against front-running and sandwich attacks
      • Self-healing protocols for vulnerability mitigation
      • Security monitoring and alert systems
      • Audit and vulnerability assessment tools
        
      Our services are provided on an "as is" and "as available" basis. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.`,
    },
    {
      title: "User Accounts",
      content: `To access certain features, you may need to create an account. You are responsible for:
        
      • Providing accurate and complete information
      • Maintaining the security of your account credentials
      • All activities that occur under your account
      • Notifying us immediately of any unauthorized access
        
      We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent, abusive, or illegal activity.
        
      You must be at least 18 years old to create an account and use our services.`,
    },
    {
      title: "User Responsibilities",
      content: `When using our services, you agree:
        
      • Not to use our services for any illegal purposes
      • Not to interfere with the proper working of our services
      • Not to attempt to bypass or circumvent our security measures
      • Not to introduce malware, viruses, or harmful code
      • Not to engage in activities that may disrupt our services
      • Not to access data not intended for you
      • To comply with all applicable laws and regulations
        
      You are solely responsible for your smart contracts and blockchain transactions, even when protected by our services.`,
    },
    {
      title: "Intellectual Property",
      content: `All content, features, and functionality available through our services, including but not limited to code, text, graphics, logos, icons, and software, are owned by Sentinel or our licensors and are protected by intellectual property laws.
        
      We grant you a limited, non-exclusive, non-transferable license to use our services for your personal or internal business purposes. You may not:
        
      • Copy, modify, or create derivative works
      • Reverse engineer or decompile our services
      • Remove any copyright or proprietary notices
      • Use our intellectual property without explicit permission
        
      We respect the intellectual property of others and expect users to do the same.`,
    },
    {
      title: "Limitation of Liability",
      content: `To the maximum extent permitted by law, Sentinel and our affiliates shall not be liable for:
        
      • Direct, indirect, incidental, consequential, or punitive damages
      • Loss of profits, revenue, data, or business opportunities
      • Damages resulting from unauthorized access to your accounts
      • Damages from smart contract exploits or vulnerabilities
      • Service interruptions or delays
      • Errors or inaccuracies in our services
        
      Our total liability for any claim arising out of or relating to these terms or our services shall not exceed the amount you paid to us for the services during the six months preceding the claim.`,
    },
    {
      title: "Disclaimers",
      content: `SENTINEL MAKES NO WARRANTIES OR REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, SECURITY, OR ACCURACY OF OUR SERVICES. THE SERVICES ARE PROVIDED "AS IS" WITHOUT ANY WARRANTIES OF ANY KIND.
        
      WE DO NOT GUARANTEE THAT:
        
      • OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE
      • VULNERABILITIES OR ATTACKS WILL BE DETECTED OR PREVENTED
      • YOUR SMART CONTRACTS WILL BE COMPLETELY SECURE
      • DATA TRANSMITTED THROUGH OUR SERVICES WILL BE SECURE
        
      YOU UNDERSTAND THAT BLOCKCHAIN TECHNOLOGY AND SMART CONTRACTS INVOLVE INHERENT RISKS, AND YOU ASSUME ALL RISKS ASSOCIATED WITH USING BLOCKCHAIN-BASED SYSTEMS.`,
    },
    {
      title: "Indemnification",
      content: `You agree to indemnify, defend, and hold harmless Sentinel, our affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
        
      • Your use of our services
      • Your violation of these terms
      • Your violation of any rights of a third party
      • Your smart contracts or blockchain transactions
      • Content or data you submit, post, or transmit through our services
        
      We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you.`,
    },
    {
      title: "Termination",
      content: `Sentinel may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including:
        
      • Breach of these Terms of Service
      • Violation of applicable laws or regulations
      • At our sole discretion when we believe termination is necessary
        
      Upon termination:
        
      • Your right to use our services will immediately cease
      • You remain liable for all amounts due up to the date of termination
      • Certain provisions of these terms will continue to remain in effect
        
      We are not responsible for any loss or damage that may result from termination of your access to our services.`,
    },
    {
      title: "Governing Law",
      content: `These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.
        
      Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in San Francisco County, California.
        
      You waive any objection to the exercise of jurisdiction over you by such courts and to venue in such courts.`,
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
                <Scale className="h-4 w-4 mr-2" />
                <span className="text-sm">Legal Framework for Our Services</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> Terms of Service
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">Last Updated: March 23, 2025</p>
            </div>

            <div className="mb-10 bg-green-950/10 border border-green-900 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                <p className="text-green-400">
                  Please read these Terms of Service ("Terms") carefully before using the Sentinel security platform,
                  website, or any related services. These Terms constitute a legally binding agreement between you and
                  Sentinel governing your access to and use of our services.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-green-950/10 border border-green-900 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-4 border-b border-green-900 pb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSectionIndex(index)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeSectionIndex === index
                            ? "bg-green-900/30 border-l-4 border-green-500"
                            : "hover:bg-green-900/20"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="lg:col-span-3">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    id={`section-${index}`}
                    className={`mb-10 bg-green-950/10 border border-green-900 rounded-lg p-6 ${
                      activeSectionIndex === index ? "ring-2 ring-green-500" : ""
                    }`}
                  >
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-400" />
                      {section.title}
                    </h2>
                    <div className="text-green-400 whitespace-pre-line">{section.content}</div>
                  </div>
                ))}

                <div className="mt-12 mb-10 bg-green-950/20 border border-green-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-green-400 mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="bg-black p-4 rounded-md border border-green-800 font-mono">
                    <p>zutshiaryan5@gmail.com</p>
                    <p>Sentinel, Inc</p>
                    <p>India</p>
                  </div>
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

