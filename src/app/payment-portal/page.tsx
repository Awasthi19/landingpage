"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Zap, CreditCard } from "lucide-react"
import Link from "next/link"

interface PaymentDetails {
  customerName: string;
  address: string;
  billAmount: number;
  dueDate: string;
  billNumber: string;
  units: number;
  tariff: string;
}

export default function PaymentPortal() {
  const [selectedOffice, setSelectedOffice] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const electricityOffices = [
    { value: "pseb", label: "Baijanath Gramin Ltd. AK22" },
  ]

  const handleGetPaymentDetails = async () => {
    if (!selectedOffice || !customerId) {
      alert("Please select an electricity office and enter customer ID")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setPaymentDetails({
        customerName: "John Doe",
        address: "123 Main Street, City, State",
        billAmount: 2450.75,
        dueDate: "2024-02-15",
        billNumber: "EB2024001234",
        units: 245,
        tariff: "Domestic",
      })
      setIsLoading(false)
    }, 1500)
  }

  const handlePayment = () => {
    alert("Redirecting to payment gateway...")
    // Here you would integrate with actual payment gateway
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium hover:text-[#06476d] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#06476d]">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">P</div>
              </div>
              <span className="text-lg font-bold tracking-tight">Payment Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#06476d] rounded-full">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Electricity Bill Payment</h1>
            <p className="text-gray-600">Pay your electricity bills quickly and securely</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Bill Payment Details
                </CardTitle>
                <CardDescription>Select your electricity office and enter customer details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="office">Electricity Office</Label>
                  <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your electricity office" />
                    </SelectTrigger>
                    <SelectContent>
                      {electricityOffices.map((office) => (
                        <SelectItem key={office.value} value={office.value}>
                          {office.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID / Consumer Number</Label>
                  <Input
                    id="customerId"
                    placeholder="Enter your customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleGetPaymentDetails}
                  disabled={isLoading || !selectedOffice || !customerId}
                  className="w-full bg-[#06476d] hover:bg-[#053a5a]"
                >
                  {isLoading ? "Fetching Details..." : "Get Payment Details"}
                </Button>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Bill Details</CardTitle>
                <CardDescription>
                  {paymentDetails
                    ? "Review your bill details before payment"
                    : "Enter customer details to view bill information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paymentDetails ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">Customer Name</p>
                        <p className="font-semibold">{paymentDetails.customerName}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Bill Number</p>
                        <p className="font-semibold">{paymentDetails.billNumber}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-medium text-gray-500">Address</p>
                        <p className="font-semibold">{paymentDetails.address}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Units Consumed</p>
                        <p className="font-semibold">{paymentDetails.units} kWh</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Tariff Category</p>
                        <p className="font-semibold">{paymentDetails.tariff}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Due Date</p>
                        <p className="font-semibold text-red-600">{paymentDetails.dueDate}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Total Amount</span>
                        <span className="text-2xl font-bold text-[#06476d]">
                          ₹{paymentDetails.billAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handlePayment}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      Pay Now - ₹{paymentDetails.billAmount.toFixed(2)}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Please enter your customer details to fetch bill information</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 bg-white rounded-lg border">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Payment</h3>
              <p className="text-sm text-gray-600">Pay your bills instantly with secure payment gateway</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Payment Options</h3>
              <p className="text-sm text-gray-600">Pay using UPI, cards, net banking, and wallets</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-sm text-gray-600">Bank-grade security with instant confirmation</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
