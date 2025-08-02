"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Lock, FileText } from "lucide-react"
import NeonCursor from "@/components/neonCursor"

export default function PrivacyPolicyPage() {
  const [loaded, setLoaded] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const sections = [
    {
      title: "Data Collection",
      content: `Sentinel collects information that you provide directly to us when you create an account, subscribe to our services, or communicate with us. This may include:
        
      • Personal identifiers such as name, email address, and wallet addresses
      • Contract addresses and blockchain transaction data
      • Security preferences and configuration settings
      • Communication history and support requests
        
      We also collect technical data from your interactions with our services, including:
        
      • Device information (browser type, operating system)
      • Usage data and interaction patterns
      • Network and connection information
      • Performance metrics and error logs`,
    },
    {
      title: "Use of Information",
      content: `We use the information we collect for the following purposes:
        
      • Providing, maintaining, and improving our security services
      • Processing transactions and deploying security protections
      • Monitoring for security threats and potential vulnerabilities
      • Sending notifications about attacks, vulnerabilities, and system status
      • Communicating with you about your account, updates, and new features
      • Research and development to enhance our security protocols
      • Compliance with legal obligations and enforcement of our terms`,
    },
    {
      title: "Data Sharing",
      content: `Sentinel prioritizes your privacy and limits sharing of your information to:
        
      • Service providers who assist in delivering our services
      • Security partners for threat intelligence and attack prevention
      • Legal and regulatory authorities when required by law
      • In connection with a business transfer, merger, or acquisition
        
      We implement strict data protection agreements with all third parties who process your information.
        
      We will never sell your personal information to advertisers or data brokers.`,
    },
    {
      title: "Security Measures",
      content: `We implement advanced security measures to protect your information:
        
      • End-to-end encryption for sensitive data
      • Multi-factor authentication for account access
      • Regular security audits and penetration testing
      • Strict access controls and monitoring
      • Secure, redundant data storage with encryption at rest
      • Regular backup procedures and disaster recovery plans
        
      Despite our efforts, no security system is impenetrable. We continuously update our security practices to adapt to emerging threats.`,
    },
    {
      title: "User Rights",
      content: `Depending on your location, you may have rights regarding your personal information:
        
      • Access to your personal information
      • Correction of inaccurate or incomplete data
      • Deletion of your personal information
      • Restriction or objection to certain processing activities
      • Data portability to transfer your information to another service
      • Withdrawal of consent for optional processing
        
      To exercise these rights, contact our privacy team at privacy@sentinel.security.`,
    },
    {
      title: "Data Retention",
      content: `We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
        
      When deciding how long to keep your information, we consider:
        
      • The nature of the information and its sensitivity
      • Potential risk of harm from unauthorized disclosure
      • Purposes for which we process the information
      • Legal and regulatory requirements
      • Security audit and compliance needs
        
      You can request deletion of your data at any time through your account settings.`,
    },
    {
      title: "International Transfers",
      content: `Sentinel operates globally, which means your information may be transferred to and processed in countries other than your own.
        
      When we transfer your information across borders, we implement appropriate safeguards:
        
      • Standard contractual clauses approved by regulatory authorities
      • Privacy Shield certification where applicable
      • Data processing agreements with strict security requirements
      • Assessment of data protection laws in recipient countries
        
      By using our services, you consent to these international transfers as necessary to provide you with our security services.`,
    },
    {
      title: "Changes to Policy",
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons.
        
      When we make material changes, we will:
        
      • Post the updated policy on our website
      • Update the "Last Updated" date at the top of the policy
      • Notify you via email for significant changes
      • Obtain consent when required by applicable law
        
      We encourage you to review this policy regularly to stay informed about our information practices.`,
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
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm">Your Data Security Is Our Priority</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> Privacy Policy
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">Last Updated: March 23, 2025</p>
            </div>

            <div className="mb-10 bg-green-950/10 border border-green-900 rounded-lg p-6">
              <p className="text-green-400">
                At Sentinel, we take your privacy seriously. This Privacy Policy explains how we collect, use, share,
                and protect your personal information when you use our website, products, and services. Please read this
                policy carefully to understand our practices regarding your information.
              </p>
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
                      <Lock className="h-5 w-5 mr-2 text-green-400" />
                      {section.title}
                    </h2>
                    <div className="text-green-400 whitespace-pre-line">{section.content}</div>
                  </div>
                ))}

                <div className="mt-12 mb-10 bg-green-950/20 border border-green-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-green-400 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                    practices, please contact us:
                  </p>
                  <div className="bg-black p-4 rounded-md border border-green-800 font-mono">
                    <p>zutshiaryan5@gmail.com</p>
                    <p>Sentinel, Inc.</p>
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

