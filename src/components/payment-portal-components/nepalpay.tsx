/* eslint-disable */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import "./nepalpay.css";
import {
  generateQR,
  checkStatusViaWebSocket,
  checkStatusViaReport,
} from "../../api/paymentservices";

type QrCodeDetails = {
  timestamp: string;
  responseCode: string;
  responseStatus: string;
  responseMessage: string;
  data: {
    qrString: string;
    validationTraceId: string;
    qrImage: string;
  };
};

interface NepalPayPopupProps {
  isOpen: boolean;
  amount: number;
  customerId: string;
  tenant: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
  onPaymentFailed: () => void;
}

const NepalPayPopup: React.FC<NepalPayPopupProps> = ({
  isOpen,
  amount,
  customerId,
  tenant,
  onClose,
  onPaymentSuccess,
  onPaymentFailed,
}) => {
  if (!isOpen) return null;

  const [qrCodeDetails, setQrCodeDetails] = useState<QrCodeDetails | null>(
    null
  );
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [isWebSocketResponseReceived, setIsWebSocketResponseReceived] =
    useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchQrCodeDetails = async () => {
      try {
        const response = await generateQR(amount.toString(), customerId, tenant);
        console.log("Full API response:", response);
        if (response.responseStatus === "SUCCESS") {
          setQrCodeDetails(response);

          // Check status via WebSocket
          const statusResponse = await checkStatusViaWebSocket(
            response.data.validationTraceId, tenant
          );

          // simulate the WebSocket response for demo purposes
          // setTimeout(() => {
          //   console.log("Simulating WebSocket response");
          //   setIsWebSocketResponseReceived(true);
          // }, 6000); // Simulate a WebSocket response after 3 seconds

          if (statusResponse.status === "COMPLETED") {
            console.log("Payment successful:", statusResponse);
            setIsPaymentCompleted(true);
            onPaymentSuccess();
          } else {
            console.log("Payment failed:", statusResponse);
            onPaymentFailed();
          }

          // simulate the successful payment for demo purposes
          // setTimeout(() => {
          //   console.log("Simulating successful payment");
          //   setIsPaymentCompleted(true);
          //   onPaymentSuccess();
          // }, 3000); // Simulate a successful payment after 3 seconds

          // simulate the failed payment for demo purposes
          // setTimeout(() => {
          //   console.log("Simulating failed payment");
          //   setIsPaymentCompleted(false);
          //   onPaymentFailed();
          // }, 3000); // Simulate a failed payment after 3 seconds

          setIsWebSocketResponseReceived(true);
        }
      } catch (error) {
        console.error("Error fetching QR code details:", error);
        // Even if there's an error, mark WebSocket as "responded" so button can be enabled
        setIsWebSocketResponseReceived(true);
      }
    };
    if (isOpen && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchQrCodeDetails();
    }
  }, []);

  const handleAfterPaymentClick = async () => {
    if (!qrCodeDetails) return;

    setIsCheckingStatus(true);
    try {
      const reportResponse = await checkStatusViaReport(
        qrCodeDetails.data.validationTraceId, tenant
      );
      console.log("Report status response:", reportResponse);

      // Handle the report response based on your business logic
      if (reportResponse.responseStatus === "SUCCESS") {
        setIsPaymentCompleted(true);
        onPaymentSuccess();
      } else {
        onPaymentFailed();
      }

      // simulate the report response for demo purposes
      // setTimeout(() => {
      //   console.log("Simulating report response");
      //   setIsPaymentCompleted(true);
      //   onPaymentSuccess();
      // }, 3000); // Simulate a successful report response after 3 seconds

    } catch (error) {
      console.error("Error checking status via report:", error);
      onPaymentFailed();
    } finally {
      setIsCheckingStatus(false);
    }
  };

  return (
    <div className="np-popup-container">
      <div className="np-popup-content">
        {/* Amount and Customer Info */}

        {/* Header */}
        <div className="np-header">
          <p className="accept-text">We Accept</p>

          {/* NepalPay Logo */}
          <div className="nepal-pay-logo">
            <div className="np-logo-content">
              <img
                src="/img/nepalpayqrtagline.png"
                alt="Logo"
                className="np-np-logo"
              />
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="qr-container">
          {qrCodeDetails ? (
            <div className="qr-code">
              <QRCodeSVG
                value={qrCodeDetails.data.qrString || ""}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
              {/* Success Tick Overlay */}
              {isPaymentCompleted && (
                <img
                  src="/img/greentick.png"
                  alt="Logo"
                  className="np-qr-success-tick-image"
                />
              )}
            </div>
          ) : (
            <div className="qr-loading-spinner">
              <div className="qr-minimal-loader">
                <div className="qr-dot"></div>
                <div className="qr-dot"></div>
                <div className="qr-dot"></div>
              </div>
              <span className="loading-text">Loading QR</span>
            </div>
          )}
        </div>

        <div className="nepal-pay-logo">
          <div className="np-logo-content">
            <img
              src="/img/lumbini-logo.png"
              alt="Logo"
              className="np-lb-logo"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-[4px]">
        <Button
          className={`w-[230px] text-white text-[14px] py-4 rounded-md disabled:cursor-not-allowed ${
            isPaymentCompleted
              ? "bg-green-600"
              : "bg-[#145cac] hover:bg-[#004494] disabled:bg-gray-400"
          }`}
          disabled={
            isPaymentCompleted ||
            !isWebSocketResponseReceived ||
            isCheckingStatus
          }
          onClick={handleAfterPaymentClick}
        >
          {isPaymentCompleted
            ? "Payment Received"
            : isCheckingStatus
            ? "Checking Payment Status ..."
            : !isWebSocketResponseReceived
            ? "Waiting for payment ..."
            : "Validate the payment"}
        </Button>

        <p className="accept-text">Pay using :</p>
        <img src="/img/pay-using.png" alt="Logo" className="w-[200px]" />
      </div>
    </div>
  );
};

export default NepalPayPopup;
