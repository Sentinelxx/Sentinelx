"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Cookie, FileText, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import NeonCursor from "@/components/neonCursor"

export default function CookiePolicyPage() {
  const [loaded, setLoaded] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const sections = [
    {
      title: "What Are Cookies",
      content: `Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
        
      Cookies serve various functions, including:
        
      • Remembering your preferences and settings
      • Enabling certain features and functionality
      • Authenticating users and maintaining sessions
      • Collecting analytics data about how you use our site
      • Providing personalized content and experiences
        
      Cookies may be set by our website (first-party cookies) or by third parties providing services to us (third-party cookies).`,
    },
    {
      title: "Types of Cookies We Use",
      content: `Sentinel uses the following types of cookies:
        
      1. Essential Cookies:
      These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessing secure areas. You cannot opt out of these cookies.
        
      2. Functional Cookies:
      These cookies enable us to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
        
      3. Analytics Cookies:
      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
        
      4. Performance Cookies:
      These cookies collect information about how visitors use our website, such as which pages they visit most often and if they receive error messages.
        
      5. Security Cookies:
      These cookies help detect and prevent security risks and unauthorized activities. They may track suspicious behavior and protect our services from attacks.`,
    },
    {
      title: "How We Use Cookies",
      content: `We use cookies for various purposes, including:
        
      • Authentication: To recognize you when you log in to your account and maintain your session.
        
      • Security: To protect our services from fraudulent activity, unauthorized access, and other security threats.
        
      • Preferences: To remember your settings and preferences, such as language preference and security configurations.
        
      • Analytics: To understand how users interact with our website, which features are most used, and how we can improve our services.
        
      • Performance Monitoring: To identify and resolve technical issues and optimize website performance.
        
      • Service Improvement: To test new features and understand user behavior to enhance our security offerings.`,
    },
    {
      title: "Third-Party Cookies",
      content: `Some cookies are placed by third parties on our behalf. These third parties may include:
        
      • Analytics providers (like Google Analytics) to help us understand how our website is used
      • Security services to protect against unauthorized access and attacks
      • Infrastructure and hosting providers to deliver and maintain our services
      • Feature functionality providers that enhance our website capabilities
        
      We carefully select our third-party service providers and require them to respect your privacy. However, we do not control these third parties' cookies directly. We recommend reviewing the privacy and cookie policies of these third parties for more information about their practices.`,
    },
    {
      title: "Managing Cookies",
      content: `You can control and manage cookies in various ways:
        
      Browser Settings:
      Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options," "Preferences," or "Settings" menu of your browser. You can:
        
      • Delete all cookies
      • Block all cookies
      • Allow all cookies
      • Block third-party cookies
      • Clear cookies when the browser is closed
        
      Cookie Consent Tool:
      We provide a cookie consent management tool on our website that allows you to select your cookie preferences when you first visit our site and modify them at any time.
        
      Please note that blocking some types of cookies may impact your experience on our website and the services we offer. In particular, essential cookies cannot be disabled as they are necessary for our website to function properly.`,
    },
    {
      title: "Data Collected by Cookies",
      content: `The specific information collected by cookies varies depending on the type of cookie, but may include:
        
      • IP address and approximate location (country or city level)
      • Browser type and version
      • Operating system
      • Device type
      • Pages visited, time spent on pages, and links clicked
      • Referring website or source
      • Login status and authentication information
      • User preferences and settings
      • Technical information about your interactions with our services
        
      This information helps us understand how our services are used, detect and prevent security issues, and improve our offerings based on user behavior.`,
    },
    {
      title: "Cookie Lifespan",
      content: `Cookies can remain on your device for different periods of time:
        
      • Session Cookies: These are temporary cookies that exist only during your browser session. They are deleted when you close your browser.
        
      • Persistent Cookies: These cookies remain on your device for a set period or until you delete them manually. The duration varies depending on the purpose of the cookie.
        
      We regularly review our cookies and their lifespans to ensure they are not stored longer than necessary. The specific retention period for each cookie depends on its purpose and is designed to be proportionate to that purpose.`,
    },
    {
      title: "Updates to Cookie Policy",
      content: `We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date.
        
      Significant changes will be notified to you through a prominent notice on our website or by email, where appropriate. We encourage you to periodically review this Cookie Policy to stay informed about our use of cookies.
        
      Continued use of our website after any changes to this policy constitutes your acceptance of such changes.`,
    },
  ]

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      <div className={`transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />

        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-green-950/50 px-4 py-2 rounded-full mb-6">
                <Cookie className="h-4 w-4 mr-2" />
                <NeonCursor />
                <span className="text-sm">How We Use Cookies</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> Cookie Policy
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">Last Updated: March 23, 2025</p>
            </div>

            <div className="mb-10 bg-green-950/10 border border-green-900 rounded-lg p-6">
              <div className="flex items-start">
                <Info className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <p className="text-green-400">
                  This Cookie Policy explains how Sentinel uses cookies and similar technologies to recognize and
                  remember you when you visit our website. It explains what these technologies are, why we use them, and
                  your rights to control our use of them.
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
                      <Cookie className="h-5 w-5 mr-2 text-green-400" />
                      {section.title}
                    </h2>
                    <div className="text-green-400 whitespace-pre-line">{section.content}</div>
                  </div>
                ))}

                <div className="mt-12 mb-10 bg-green-950/20 border border-green-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Cookie Preferences</h2>
                  <p className="text-green-400 mb-6">
                    You can manage your cookie preferences at any time. Click the button below to update your settings.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-black font-bold">
                    Manage Cookie Preferences
                  </Button>
                </div>

                <div className="mt-12 mb-10 bg-green-950/20 border border-green-900 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-green-400 mb-4">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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

