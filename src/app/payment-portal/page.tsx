"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { Zap, QrCode } from "lucide-react";
import Header from "@/components/payment-portal-components/header";
import PaymentForm from "@/components/payment-portal-components/paymentform";
import BillDetails from "@/components/payment-portal-components/billdetails";
import NepalPayPopup from "@/components/payment-portal-components/nepalpay";
import FonePayPopup from "@/components/payment-portal-components/fonepay";
import Features from "@/components/payment-portal-components/features";
import { Loader2 } from "lucide-react";

import {
  getPaymentDetails,
  getOnlinePaymentMethod,
} from "../../api/paymentservices";

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

type PaymentGateway = "NepalPay" | "FonePay" | null;

export default function PaymentPortal() {
  const [selectedOffice, setSelectedOffice] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeGateway, setActiveGateway] = useState<PaymentGateway>(null);

  // Global preload state — QR is being fetched before the popup opens
  const [isPreloadingQR, setIsPreloadingQR] = useState<boolean>(false);

  const billDetailsRef = useRef<HTMLDivElement | null>(null);

  const electricityOffices: ElectricityOffice[] = [
    { value: "tenant1", label: "Baijanath Gra. B. Ltd. AK22" },
    { value: "tenant2", label: "Baitada Gra. B. Ltd. LR.17B" },
  ];

  const bankLogos: Record<string, { src: string; alt: string }> = {
    tenant1: { src: "/img/lumbini-logo.png", alt: "Lumbini Bikas Bank" },
    tenant2: { src: "/img/nmb-logo.png", alt: "NMB Bank" },
  };

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1280);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const scrollToElement = (
    elementRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (isMobile && elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 160,
        behavior: "smooth",
      });
    }
  };

  const handleOfficeChange = useCallback(async (office: string) => {
    setSelectedOffice(office);
    setActiveGateway(null);
    setShowPopup(false);
    setPaymentDetails(null);
    if (!office) return;
    try {
      const method = await getOnlinePaymentMethod(office);
      setActiveGateway(method?.name === "FonePay" ? "FonePay" : "NepalPay");
    } catch {
      setActiveGateway("NepalPay");
    }
  }, []);

  const handleGetPaymentDetails = useCallback(async () => {
    if (!selectedOffice || !customerId) {
      alert("Please select an electricity office and enter customer ID");
      return;
    }
    setIsLoading(true);
    try {
      const data = await getPaymentDetails(customerId, selectedOffice);
      const mappedDetails: PaymentDetails = {
        customerName: data.customerName,
        address: data.address,
        meterSerialNumber: data.meterSerialNumber,
        customerType: data.customerType,
        billAmount: data.billAmount,
        charges: data.charges.map((c: Charge) => ({
          id: c.id,
          description: c.description,
          amount: c.amount,
        })),
      };
      setPaymentDetails(mappedDetails);
      setTimeout(() => scrollToElement(billDetailsRef), 100);
    } catch (error) {
      console.error("Failed to fetch payment details:", error);
      alert("Failed to fetch payment details");
    } finally {
      setIsLoading(false);
    }
  }, [selectedOffice, customerId, isMobile]);

  // Key change: handlePayment triggers a full-screen preloader, then opens the
  // popup only after the popup component signals it has its QR ready.
  // We do this by setting isPreloadingQR = true, opening the popup (which starts
  // fetching internally), and showing a full-screen overlay. The popup notifies
  // us via onQRReady (new prop) so we can hide the overlay.
  const handlePayment = useCallback(() => {
    if (!paymentDetails) {
      alert("No payment details available");
      return;
    }
    if (paymentDetails.billAmount < 1) {
      alert("Payment amount must be at least 1 to proceed.");
      return;
    }

    // If popup is already mounted, don't re-trigger the preloader
    if (showPopup) return;

    setIsPreloadingQR(true);
    setShowPopup(true);
  }, [paymentDetails, showPopup]);

  // Called by popup once the QR string is ready — dismiss the overlay, reveal popup
  const handleQRReady = useCallback(() => {
    setIsPreloadingQR(false);
  }, []);

  // If QR generation fails, also dismiss the overlay so error state shows inside popup
  const handlePaymentFailed = useCallback((error?: string) => {
    setIsPreloadingQR(false);
    console.log("Payment failed", error);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    console.log("Payment successful");
  }, []);

  const popupProps = {
    isOpen: showPopup,
    amount: paymentDetails?.billAmount ?? 0,
    customerId,
    customerName: paymentDetails?.customerName ?? "",
    tenant: selectedOffice,
    onClose: () => {
      setShowPopup(false);
      setIsPreloadingQR(false);
    },
    onPaymentSuccess: handlePaymentSuccess,
    onPaymentFailed: handlePaymentFailed,
    onQRReady: handleQRReady,
    bankLogoSrc: bankLogos[selectedOffice]?.src,
    bankLogoAlt: bankLogos[selectedOffice]?.alt,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Full-screen QR preload overlay */}
      {isPreloadingQR && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-5">
          <div className="bg-white rounded-2xl px-10 py-8 flex flex-col items-center gap-4 shadow-xl">
            <Loader2
              className="animate-spin text-[#06476d]"
              size={48}
              strokeWidth={1.5}
            />
            <div className="text-center">
              <p className="text-gray-900 font-semibold text-lg">
                Preparing your payment
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Generating a secure QR code…
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex text-center justify-center mb-5 gap-2">
            <div className="flex items-center justify-center">
              <div className="p-2 bg-[#06476d] rounded-full">
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
              setSelectedOffice={handleOfficeChange}
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
                isLoading={isLoading}
              />
            </div>

            <div>
              <div className="w-full max-w-[390px] h-[500px] bg-white overflow-hidden flex flex-col justify-center items-center rounded-xl border border-black/10 text-[var(--card-foreground)] shadow-md gap-4">
                <div className="p-5 rounded-full bg-gray-50 border border-gray-100">
                  <QrCode className="h-12 w-12 text-gray-300" />
                </div>
                <div className="text-center px-6">
                  <p className="text-gray-500 font-medium text-sm">
                    QR code will appear here
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Click Pay to generate your secure payment QR
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Popup overlay — mounted when payment is triggered, hidden until QR is ready */}
          {showPopup && paymentDetails && paymentDetails.billAmount >= 1 && (
            <div className={isPreloadingQR ? "invisible pointer-events-none" : "visible"}>
              {activeGateway === "FonePay" ? (
                <FonePayPopup {...popupProps} />
              ) : (
                <NepalPayPopup {...popupProps} />
              )}
            </div>
          )}

          <Features />
        </div>
      </main>
    </div>
  );
}
