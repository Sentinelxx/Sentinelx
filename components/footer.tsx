import { Shield, Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black border-t border-green-900/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-xl font-bold"><Link href={"/"}>Sentinel</Link></span>
            </div>
            <p className="text-green-400 mb-4">The ultimate firewall for smart contracts.</p>
            <div className="flex space-x-4">
              <Link href="https://github.com/Linkryanzutshi/Sentinel" className="text-green-500 hover:text-green-400">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://x.com.aryanzutshi12" className="text-green-500 hover:text-green-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/in/aryanzutshi" className="text-green-500 hover:text-green-400">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-green-400 hover:text-green-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/get-started" className="text-green-400 hover:text-green-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="https://app.gitbook.com/o/UO3hYGggJBMeQGIczTah/s/pDNUEw0AjuWkqfI1z0U9/" className="text-green-400 hover:text-green-300">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="text-green-400 hover:text-green-300">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-green-400 hover:text-green-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="text-green-400 hover:text-green-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="text-green-400 hover:text-green-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-400 hover:text-green-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-green-400 hover:text-green-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-green-400 hover:text-green-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-green-400 hover:text-green-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-900/50 mt-12 pt-8 text-center text-green-400">
          <p>© {new Date().getFullYear()} Sentinel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

