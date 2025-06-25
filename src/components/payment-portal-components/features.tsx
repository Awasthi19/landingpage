"use client"
import { CreditCard, Zap } from "lucide-react"

export default function Features() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      <FeatureCard icon={<Zap className="h-6 w-6 text-green-600" />} title="Instant Payment" desc="Pay your bills instantly with secure payment gateway" bg="green" />
      <FeatureCard icon={<CreditCard className="h-6 w-6 text-blue-600" />} title="Multiple Payment Options" desc="Pay using UPI, cards, net banking, and wallets" bg="blue" />
      <FeatureCard icon={<div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"><span className="text-white text-xs font-bold">✓</span></div>} title="Secure & Reliable" desc="Bank-grade security with instant confirmation" bg="purple" />
    </div>
  )
}

function FeatureCard({ icon, title, desc, bg }: { icon: React.ReactNode, title: string, desc: string, bg: string }) {
  return (
    <div className={`text-center p-6 bg-white rounded-lg border`}>
      <div className={`w-12 h-12 bg-${bg}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}
