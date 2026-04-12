"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentDetails {
  customerName: string;
  address: string;
  meterSerialNumber: string;
  customerType: string;
  billAmount: number;
  charges: { id: string; description: string; amount: number }[];
}

export default function BillDetails({
  paymentDetails,
  handlePayment,
  isLoading,
}: {
  paymentDetails: PaymentDetails | null;
  handlePayment: () => void;
  isLoading: boolean;
}) {
  if (isLoading) return <BillSkeleton />;
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
                <p className="font-semibold">
                  {paymentDetails.meterSerialNumber}
                </p>
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
              {paymentDetails.charges.length > 0 ? (
                paymentDetails.charges.map((charge) => (
                  <div key={charge.id} className="flex justify-between">
                    <span className="text-sm font-semibold">
                      {charge.description}
                    </span>
                    <span className="text-sm font-semibold">
                      Rs. {charge.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">
                  No itemized charges available
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-2xl font-bold text-[#06476d]">
                  रु{paymentDetails.billAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
              disabled={paymentDetails.billAmount < 1}
            >
              {paymentDetails.billAmount < 1
                ? "No Outstanding Bill"
                : `Pay Now - Rs. ${paymentDetails.billAmount.toFixed(2)}`}
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
  );
}

function BillSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mt-1" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          ))}
        </div>
        <div className="h-px bg-gray-200" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-7 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
        <div className="h-11 bg-gray-200 rounded w-full animate-pulse" />
      </CardContent>
    </Card>
  );
}
