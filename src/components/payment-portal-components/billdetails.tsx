"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentDetails {
  customerName: string
  address: string
  meterSerialNumber: string
  customerType: string
  billAmount: number
  charges: { id: string; description: string; amount: number }[]
}

export default function BillDetails({
  paymentDetails,
  handlePayment,
}: {
  paymentDetails: PaymentDetails | null
  handlePayment: () => void
}) {
  return (
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
                <p className="font-medium text-gray-500">Meter Serial Number</p>
                <p className="font-semibold">{paymentDetails.meterSerialNumber}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Address</p>
                <p className="font-semibold">{paymentDetails.address}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Customer Type</p>
                <p className="font-semibold">{paymentDetails.customerType}</p>
              </div>
            </div>

            <Separator />

            {/* list of charges to be paid with amount using map */}
            <div className="space-y-2">
              {paymentDetails.charges.map((charge) => (
                <div key={charge.id} className="flex justify-between">
                  <span className="text-sm font-semibold">{charge.description}</span>
                  <span className="text-sm font-semibold">₹{charge.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>

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
  )
}
