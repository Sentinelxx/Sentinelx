"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, ChevronRight, Check, ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdvancedTerminal } from "@/components/advanced-terminal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NeonCursor from "@/components/neonCursor"

export default function GetStartedPage() {
  const [loaded, setLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const steps = [
    {
      title: "Create Account",
      description: "Sign up for a Sentinel account to get started.",
    },
    {
      title: "Connect Wallet",
      description: "Connect your wallet to authenticate and manage your contracts.",
    },
    {
      title: "Register Contracts",
      description: "Add the smart contracts you want to protect.",
    },
    {
      title: "Configure Protection",
      description: "Set up your security rules and protection level.",
    },
    {
      title: "Deploy Firewall",
      description: "Activate protection for your smart contracts.",
    },
  ]

  const plans = [
    {
      name: "Basic",
      price: "$500",
      period: "per month",
      description: "Essential protection for smaller projects",
      features: [
        "Smart Contract Firewall",
        "Basic MEV Protection",
        "Email Alerts",
        "Up to 3 Contracts",
        "Standard Support",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Pro",
      price: "$2,000",
      period: "per month",
      description: "Advanced protection for established projects",
      features: [
        "Everything in Basic",
        "Advanced MEV Protection",
        "Self-Healing Contracts",
        "Up to 10 Contracts",
        "Priority Support",
        "Weekly Security Reports",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Maximum security for high-value protocols",
      features: [
        "Everything in Pro",
        "Custom Security Rules",
        "Dedicated Security Team",
        "Unlimited Contracts",
        "24/7 Emergency Response",
        "Private Mempool Access",
        "Custom Integration Support",
      ],
      cta: "Contact Sales",
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
                <span className="text-sm">Start Protecting Your Contracts</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-green-400">{">"}</span> Get Started with Sentinel
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-green-400">
                Follow these simple steps to secure your smart contracts against exploits and attacks.
              </p>
            </div>

            <div className="mb-20">
              <div className="flex flex-wrap justify-center mb-12">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col items-center ${index < steps.length - 1 ? "w-1/5" : "w-1/5"}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                        currentStep > index + 1
                          ? "bg-green-600 text-black"
                          : currentStep === index + 1
                            ? "bg-green-500 text-black border-2 border-green-300"
                            : "bg-green-950 text-green-500 border border-green-800"
                      }`}
                      onClick={() => setCurrentStep(index + 1)}
                    >
                      {currentStep > index + 1 ? <Check className="h-6 w-6" /> : index + 1}
                    </div>
                    <div className="text-center mt-4">
                      <div className="font-bold">{step.title}</div>
                      <div className="text-xs text-green-400 mt-1 hidden md:block">{step.description}</div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-6 left-1/2 w-full h-0.5 ${
                          currentStep > index + 1 ? "bg-green-600" : "bg-green-950"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-green-950/10 border border-green-900 rounded-lg p-8">
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Create Your Sentinel Account</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <form className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              className="bg-black border-green-800 focus:border-green-500 text-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              className="bg-black border-green-800 focus:border-green-500 text-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="••••••••"
                              className="bg-black border-green-800 focus:border-green-500 text-green-500"
                            />
                          </div>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-black font-bold w-full"
                            onClick={() => setCurrentStep(2)}
                          >
                            Create Account
                          </Button>
                        </form>
                        <div className="mt-4 text-center text-sm text-green-400">
                          Already have an account?{" "}
                          <a href="#" className="text-green-500 underline">
                            Log in
                          </a>
                        </div>
                      </div>
                      <div className="bg-green-950/20 p-6 rounded-lg">
                        <h3 className="font-bold mb-4">Why Create an Account?</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Manage all your protected contracts in one place</span>
                          </li>
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Receive security alerts and notifications</span>
                          </li>
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Access detailed security analytics and reports</span>
                          </li>
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Configure custom security rules and policies</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Connect Your Wallet</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <p className="mb-6 text-green-400">
                          Connect your wallet to authenticate and manage your smart contracts. We support multiple
                          wallet providers.
                        </p>
                        <div className="space-y-4">
                          <Button className="bg-green-950/30 hover:bg-green-950/50 border border-green-800 text-green-500 font-bold w-full flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4" />
                              </div>
                              MetaMask
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                          <Button className="bg-green-950/30 hover:bg-green-950/50 border border-green-800 text-green-500 font-bold w-full flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4" />
                              </div>
                              WalletConnect
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                          <Button className="bg-green-950/30 hover:bg-green-950/50 border border-green-800 text-green-500 font-bold w-full flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                <Shield className="h-4 w-4" />
                              </div>
                              Coinbase Wallet
                            </div>
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="mt-6 flex justify-between">
                          <Button
                            variant="outline"
                            className="border-green-800 text-green-500"
                            onClick={() => setCurrentStep(1)}
                          >
                            Back
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-black font-bold"
                            onClick={() => setCurrentStep(3)}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                      <div className="bg-green-950/20 p-6 rounded-lg">
                        <h3 className="font-bold mb-4">Why Connect Your Wallet?</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Securely authenticate your identity</span>
                          </li>
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Verify contract ownership</span>
                          </li>
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Sign transactions to deploy protection</span>
                          </li>
                          <li className="flex items-start">
                            <Shield className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <span>Manage security settings for your contracts</span>
                          </li>
                        </ul>
                        <div className="mt-6 p-4 bg-green-950/30 rounded-lg border border-green-800">
                          <div className="flex items-start">
                            <Lock className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                            <div>
                              <span className="font-bold">Security Note:</span>
                              <p className="text-sm mt-1">
                                We never store your private keys or have access to your funds. All wallet connections
                                are secure and encrypted.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Register Your Smart Contracts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <p className="mb-6 text-green-400">
                          Add the smart contracts you want to protect. You can register contracts manually or import
                          them from your connected wallet.
                        </p>

                        <Tabs defaultValue="manual" className="mb-6">
                          <TabsList className="bg-green-950/30 border border-green-900">
                            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                            <TabsTrigger value="import">Import</TabsTrigger>
                          </TabsList>
                          <TabsContent value="manual" className="mt-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="contractName">Contract Name</Label>
                              <Input
                                id="contractName"
                                placeholder="MyToken"
                                className="bg-black border-green-800 focus:border-green-500 text-green-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="contractAddress">Contract Address</Label>
                              <Input
                                id="contractAddress"
                                placeholder="0x..."
                                className="bg-black border-green-800 focus:border-green-500 text-green-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="network">Network</Label>
                              <select
                                id="network"
                                className="w-full bg-black border border-green-800 focus:border-green-500 text-green-500 rounded-md p-2"
                              >
                                <option value="ethereum">Ethereum Mainnet</option>
                                <option value="polygon">Polygon</option>
                                <option value="bsc">Binance Smart Chain</option>
                                <option value="arbitrum">Arbitrum</option>
                                <option value="optimism">Optimism</option>
                              </select>
                            </div>
                            <Button className="bg-green-600 hover:bg-green-700 text-black font-bold">
                              Add Contract
                            </Button>
                          </TabsContent>
                          <TabsContent value="import" className="mt-4">
                            <div className="bg-green-950/30 border border-green-800 rounded-lg p-4 mb-4">
                              <p className="text-sm">
                                We&apos;ll scan your connected wallet for deployed contracts. Select the ones you want to
                                protect.
                              </p>
                            </div>
                            <Button className="bg-green-600 hover:bg-green-700 text-black font-bold">
                              Scan Wallet for Contracts
                            </Button>
                          </TabsContent>
                        </Tabs>

                        <div className="mt-6 flex justify-between">
                          <Button
                            variant="outline"
                            className="border-green-800 text-green-500"
                            onClick={() => setCurrentStep(2)}
                          >
                            Back
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-black font-bold"
                            onClick={() => setCurrentStep(4)}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="bg-green-950/20 p-6 rounded-lg mb-6">
                          <h3 className="font-bold mb-4">Registered Contracts</h3>
                          <div className="text-center py-8 text-green-400">
                            <p>No contracts registered yet</p>
                            <p className="text-sm mt-2">Add your first contract to get started</p>
                          </div>
                        </div>

                        <div className="bg-black border border-green-800 rounded-lg p-4">
                          <h3 className="font-bold mb-2">Try the Sentinel CLI</h3>
                          <p className="text-sm text-green-400 mb-4">
                            Power users can also register contracts using our command-line interface.
                          </p>
                          <AdvancedTerminal className="h-48" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Configure Protection Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <p className="mb-6 text-green-400">
                          Customize your security settings to match your specific needs. Choose protection levels and
                          configure security rules.
                        </p>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label>Protection Level</Label>
                            <div className="grid grid-cols-3 gap-2">
                              <Button
                                variant="outline"
                                className="border-green-800 text-green-500 hover:bg-green-950/30"
                              >
                                Basic
                              </Button>
                              <Button className="bg-green-600 hover:bg-green-700 text-black font-bold">Standard</Button>
                              <Button
                                variant="outline"
                                className="border-green-800 text-green-500 hover:bg-green-950/30"
                              >
                                Maximum
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Security Features</Label>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input type="checkbox" id="firewall" className="mr-2" checked />
                                <Label htmlFor="firewall">Smart Contract Firewall</Label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="mev" className="mr-2" checked />
                                <Label htmlFor="mev">MEV Protection</Label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="selfhealing" className="mr-2" checked />
                                <Label htmlFor="selfhealing">Self-Healing Contracts</Label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="monitoring" className="mr-2" checked />
                                <Label htmlFor="monitoring">24/7 Monitoring</Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Alert Notifications</Label>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input type="checkbox" id="email" className="mr-2" checked />
                                <Label htmlFor="email">Email Alerts</Label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="slack" className="mr-2" />
                                <Label htmlFor="slack">Slack Notifications</Label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="discord" className="mr-2" />
                                <Label htmlFor="discord">Discord Alerts</Label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <Button
                            variant="outline"
                            className="border-green-800 text-green-500"
                            onClick={() => setCurrentStep(3)}
                          >
                            Back
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-black font-bold"
                            onClick={() => setCurrentStep(5)}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="bg-green-950/20 p-6 rounded-lg mb-6">
                          <h3 className="font-bold mb-4">Protection Level Details</h3>
                          <div className="space-y-4">
                            <div className="p-3 border border-green-800 rounded-md">
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-2">
                                  <Shield className="h-3 w-3" />
                                </div>
                                <span className="font-bold">Basic</span>
                              </div>
                              <p className="text-sm mt-2 text-green-400">
                                Essential protection against common vulnerabilities and attacks.
                              </p>
                            </div>
                            <div className="p-3 border-2 border-green-500 bg-green-950/30 rounded-md">
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                  <Shield className="h-3 w-3 text-black" />
                                </div>
                                <span className="font-bold">Standard</span>
                              </div>
                              <p className="text-sm mt-2 text-green-400">
                                Comprehensive protection with real-time monitoring and MEV protection.
                              </p>
                            </div>
                            <div className="p-3 border border-green-800 rounded-md">
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-2">
                                  <Shield className="h-3 w-3" />
                                </div>
                                <span className="font-bold">Maximum</span>
                              </div>
                              <p className="text-sm mt-2 text-green-400">
                                Enterprise-grade security with custom rules and dedicated support.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-black border border-green-800 rounded-lg p-4">
                          <h3 className="font-bold mb-2">Advanced Configuration</h3>
                          <p className="text-sm text-green-400 mb-4">
                            Power users can configure advanced settings using our JSON configuration.
                          </p>
                          <div className="bg-black border border-green-800 rounded-md p-3 text-xs overflow-auto h-48">
                            <pre className="text-green-500">
                              {`{
  "firewall": {
    "enabled": true,
    "rules": [
      "block-reentrancy",
      "block-flash-loans",
      "prevent-self-destruct"
    ],
    "customRules": [
      {
        "name": "max-gas-price",
        "params": { "maxGasPrice": "100000000000" }
      }
    ]
  },
  "mevProtection": {
    "enabled": true,
    "privateMempool": true,
    "fairOrdering": true
  },
  "selfHealing": {
    "enabled": true,
    "autoRollback": true,
    "patchingEnabled": true
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Deploy Sentinel Protection</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <p className="mb-6 text-green-400">
                          You&apos;re ready to deploy Sentinel protection to your smart contracts. Review your settings and
                          activate your security shield.
                        </p>

                        <div className="bg-green-950/20 p-6 rounded-lg mb-6">
                          <h3 className="font-bold mb-4">Protection Summary</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Contracts:</span>
                              <span className="font-bold">1</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Protection Level:</span>
                              <span className="font-bold">Standard</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Features:</span>
                              <span className="font-bold">4 Enabled</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Alerts:</span>
                              <span className="font-bold">Email</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-950/20 p-6 rounded-lg mb-6">
                          <h3 className="font-bold mb-4">Deployment Steps</h3>
                          <ol className="space-y-3 list-decimal pl-5">
                            <li>Sign the deployment transaction with your wallet</li>
                            <li>Wait for transaction confirmation (usually 1-2 minutes)</li>
                            <li>Verify protection is active on the dashboard</li>
                          </ol>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <Button
                            variant="outline"
                            className="border-green-800 text-green-500"
                            onClick={() => setCurrentStep(4)}
                          >
                            Back
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-black font-bold">
                            Deploy Protection
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="bg-black border border-green-800 rounded-lg p-4 mb-6">
                          <h3 className="font-bold mb-4">Deployment Terminal</h3>
                          <AdvancedTerminal className="h-64" />
                        </div>

                        <div className="bg-green-950/20 p-6 rounded-lg">
                          <h3 className="font-bold mb-4">What&apos;s Next?</h3>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                              <span>Access your security dashboard</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                              <span>Configure additional security rules</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                              <span>Set up monitoring and alerts</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                              <span>Explore advanced security features</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center">Choose Your Protection Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-green-950/10 border ${plan.highlighted ? "border-green-500" : "border-green-900"} rounded-lg p-8 ${plan.highlighted ? "ring-2 ring-green-500 transform scale-105" : ""}`}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-center justify-center">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-green-400 ml-2">{plan.period}</span>
                      </div>
                      <p className="text-green-400 mt-2">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 mt-0.5 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.highlighted ? "bg-green-600 hover:bg-green-700 text-black" : "bg-green-950/50 hover:bg-green-950/70 border border-green-800"} font-bold`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Smart Contracts?</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8 text-green-400">
                Start protecting your smart contracts today with Sentinel&apos;s advanced security features.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-black font-bold px-8 py-3 rounded-md text-lg">
                Get Started Now
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

