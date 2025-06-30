"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { Zap, QrCode } from "lucide-react";
import Header from "@/components/payment-portal-components/header";
import PaymentForm from "@/components/payment-portal-components/paymentform";
import BillDetails from "@/components/payment-portal-components/billdetails";
import NepalPayPopup from "@/components/payment-portal-components/nepalpay";
import Features from "@/components/payment-portal-components/features";

import { getPaymentDetails } from "../../api/paymentservices";

// Define types
interface PaymentDetails {
  customerName: string;
  address: string;
  meterSerialNumber: string;
  customerType: string;
  billAmount: number;
  charges: { id: string; description: string; amount: number }[];
}
interface Charge {
  id: string;
  description: string;
  amount: number;
}
interface ElectricityOffice {
  value: string;
  label: string;
}

export default function PaymentPortal() {
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNepalPayPopup, setShowNepalPayPopup] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Refs for scrolling
  const billDetailsRef = useRef<HTMLDivElement | null>(null);
  const nepalPayRef = useRef<HTMLDivElement | null>(null);

  const electricityOffices: ElectricityOffice[] = [
    { value: "tenant1", label: "Baijanath Gramin Ltd. AK22" },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1280); // xl breakpoint is 1280px
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Smooth scroll function
  const scrollToElement = (
    elementRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (isMobile && elementRef.current) {
      const elementTop = elementRef.current.offsetTop;
      const offset = 160; // Adjust this value to control how much less to scroll

      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  // Fetch payment details
  const handleGetPaymentDetails = useCallback(async () => {
    if (!selectedOffice || !customerId) {
      alert("Please select an electricity office and enter customer ID");
      return;
    }

    setIsLoading(true);
    try {
      const data = await getPaymentDetails(customerId, selectedOffice);

      // Map the response to match the PaymentDetails interface
      const mappedDetails: PaymentDetails = {
        customerName: data.customerName,
        address: data.address,
        meterSerialNumber: data.meterSerialNumber,
        customerType: data.customerType,
        billAmount: data.billAmount,
        charges: data.charges.map((charge: Charge) => ({
          id: charge.id,
          description: charge.description,
          amount: charge.amount,
        })),
      };

      setPaymentDetails(mappedDetails);

      // Scroll to bill details after data loads (only on mobile)
      setTimeout(() => {
        scrollToElement(billDetailsRef);
      }, 100);
    } catch (error) {
      console.error("Failed to fetch payment details:", error);
      alert("Failed to fetch payment details");
    } finally {
      setIsLoading(false);
    }
  }, [selectedOffice, customerId, isMobile]);

  // Handle payment initiation
  const handlePayment = useCallback(() => {
    if (!paymentDetails) {
      alert("No payment details available");
      return;
    }

    if (paymentDetails.billAmount < 1) {
      alert("Payment amount must be at least 1 to proceed.");
      return;
    }

    setShowNepalPayPopup(true);

    // Scroll to NepalPay popup after it shows (only on mobile)
    setTimeout(() => {
      scrollToElement(nepalPayRef);
    }, 100);
  }, [paymentDetails, isMobile]);

  // Handle NepalPay success
  const handleNepalPaySuccess = useCallback(() => {
    console.log("Payment successful");
  }, []);

  // Handle NepalPay failure
  const handleNepalPayFailed = useCallback(() => {
    console.log("Payment failed");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex text-center justify-center mb-5 gap-2">
            <div className="flex items-center justify-center">
              <div className="p-2 bg-[#06476d] rounded-full ">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <h1 className="text-xl font-bold text-gray-900">
                Electricity Bill Payment
              </h1>
              <p className="text-gray-600 text-sm">
                Pay your electricity bills quickly and securely
              </p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-3">
            <PaymentForm
              selectedOffice={selectedOffice}
              setSelectedOffice={setSelectedOffice}
              customerId={customerId}
              setCustomerId={setCustomerId}
              isLoading={isLoading}
              handleGetPaymentDetails={handleGetPaymentDetails}
              offices={electricityOffices}
            />

            <div ref={billDetailsRef}>
              <BillDetails
                paymentDetails={paymentDetails}
                handlePayment={handlePayment}
              />
            </div>

            <div ref={nepalPayRef}>
              {!showNepalPayPopup && (
                <div className="w-full max-w-[390px] h-[500px] bg-white overflow-hidden flex flex-col justify-center items-center rounded-xl border border-black/10 text-[var(--card-foreground)] shadow-md">
                  <QrCode className="h-16 w-16 text-gray-300 mb-4" />
                  <span className="text-gray-500 text-center px-4">
                    Please click pay to view the QR code here. Take a screenshot
                    and complete your payment, then return to validate the
                    transaction.
                  </span>
                </div>
              )}

              {showNepalPayPopup && paymentDetails && paymentDetails.billAmount >= 1 && (
                <NepalPayPopup
                  isOpen={showNepalPayPopup}
                  amount={paymentDetails.billAmount}
                  customerId={customerId}
                  tenant={selectedOffice}
                  onClose={() => setShowNepalPayPopup(false)}
                  onPaymentSuccess={handleNepalPaySuccess}
                  onPaymentFailed={handleNepalPayFailed}
                />
              )}
            </div>
          </div>

          <Features />
        </div>
      </main>
    </div>
  );
}
