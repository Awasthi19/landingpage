"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

interface Props {
  selectedOffice: string
  setSelectedOffice: (val: string) => void
  customerId: string
  setCustomerId: (val: string) => void
  isLoading: boolean
  handleGetPaymentDetails: () => void
  offices: { value: string; label: string }[]
}

export default function PaymentForm({
  selectedOffice,
  setSelectedOffice,
  customerId,
  setCustomerId,
  isLoading,
  handleGetPaymentDetails,
  offices,
}: Props) {
  return (
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
              {offices.map((office) => (
                <SelectItem key={office.value} value={office.value}>
                  {office.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerId">Customer ID</Label>
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
  )
}
