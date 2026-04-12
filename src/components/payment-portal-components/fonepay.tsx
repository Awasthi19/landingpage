/* eslint-disable */
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Loader2,
  X,
  RefreshCw,
  CheckCircle2,
  WifiOff,
} from "lucide-react";
import {
  generateFonePayQR,
  checkFonePayStatus,
} from "../../api/paymentservices";

/* ============================================================
   TYPES
============================================================ */
type FonePayQrDetails = {
  prn: string;
  qrMessage: string;
  status: string;
};

interface Props {
  isOpen: boolean;
  amount: number;
  customerId: string;
  customerName: string;
  tenant: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
  onPaymentFailed: (error?: string) => void;
  /** Called once the QR string is available — parent can hide its preload overlay */
  onQRReady?: () => void;
  maxDuration?: number;
  onAnalyticsEvent?: (event: string, data?: Record<string, any>) => void;
  bankLogoSrc?: string;
  bankLogoAlt?: string;
}

/* ============================================================
   CONSTANTS
============================================================ */
const DEFAULT_MAX_DURATION = 10 * 60 * 1000;
const POLL_INTERVAL = 5000;
const SLOW_POLL_INTERVAL = 10000;
const SLOW_POLL_THRESHOLD = 5 * 60 * 1000;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;

/* ============================================================
   COMPONENT
============================================================ */
const FonePayPopup: React.FC<Props> = ({
  isOpen,
  amount,
  customerId,
  customerName,
  tenant,
  onClose,
  onPaymentSuccess,
  onPaymentFailed,
  onQRReady,
  maxDuration = DEFAULT_MAX_DURATION,
  onAnalyticsEvent,
  bankLogoSrc,
  bankLogoAlt,
}) => {
  const [qr, setQr] = useState<FonePayQrDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const pollingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const onSuccessRef = useRef(onPaymentSuccess);
  const onFailedRef = useRef(onPaymentFailed);
  const onCloseRef = useRef(onClose);
  const onQRReadyRef = useRef(onQRReady);
  const sessionIdRef = useRef<string>(generateSessionId());

  useEffect(() => {
    onSuccessRef.current = onPaymentSuccess;
    onFailedRef.current = onPaymentFailed;
    onCloseRef.current = onClose;
    onQRReadyRef.current = onQRReady;
  }, [onPaymentSuccess, onPaymentFailed, onClose, onQRReady]);

  const trackEvent = useCallback(
    (event: string, data?: Record<string, any>) => {
      onAnalyticsEvent?.(event, {
        sessionId: sessionIdRef.current,
        amount,
        customerId,
        tenant,
        timestamp: new Date().toISOString(),
        ...data,
      });
    },
    [onAnalyticsEvent, amount, customerId, tenant],
  );

  useEffect(() => {
    const on = () => {
      setIsOnline(true);
      trackEvent("network_online");
    };
    const off = () => {
      setIsOnline(false);
      trackEvent("network_offline");
    };
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, [trackEvent]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearTimeout(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    stopPolling();
    abortRef.current?.abort();
    abortRef.current = null;
  }, [stopPolling]);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
      setQr(null);
      setCompleted(false);
      setError(null);
      setRetryCount(0);
      sessionIdRef.current = generateSessionId();
    }
  }, [isOpen, cleanup]);

  const startPolling = useCallback(
    (prn: string) => {
      startTimeRef.current = Date.now();
      trackEvent("polling_started", { prn });

      const poll = async () => {
        if (!isMountedRef.current) return;
        const elapsed = Date.now() - startTimeRef.current;
        if (elapsed > maxDuration) {
          stopPolling();
          setError("Payment session expired. Please try again.");
          trackEvent("payment_timeout", { elapsed });
          onFailedRef.current("Payment timeout");
          return;
        }
        if (!navigator.onLine) {
          pollingRef.current = setTimeout(
            poll,
            elapsed < SLOW_POLL_THRESHOLD ? POLL_INTERVAL : SLOW_POLL_INTERVAL,
          );
          return;
        }
        const controller = new AbortController();
        abortRef.current = controller;
        try {
          const res = await checkFonePayStatus(prn, tenant, {
            signal: controller.signal,
          });
          if (!isMountedRef.current) return;
          if (res?.paymentStatus === "PAID") {
            stopPolling();
            setCompleted(true);
            trackEvent("payment_success", { prn, elapsed });
            onSuccessRef.current();
            return;
          }
          trackEvent("polling_check", {
            status: res?.paymentStatus || "unknown",
            elapsed,
          });
        } catch (e: any) {
          if (
            e.name === "AbortError" ||
            e.name === "CanceledError" ||
            e.code === "ERR_CANCELED"
          )
            return;
          console.error("FonePay polling error:", e);
          trackEvent("polling_error", { error: e.message, elapsed });
        }
        if (isMountedRef.current) {
          pollingRef.current = setTimeout(
            poll,
            elapsed < SLOW_POLL_THRESHOLD ? POLL_INTERVAL : SLOW_POLL_INTERVAL,
          );
        }
      };
      poll();
    },
    [tenant, maxDuration, stopPolling, trackEvent],
  );

  const generateQRWithRetry = useCallback(
    async (attempt: number = 0): Promise<void> => {
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        trackEvent("qr_generation_attempt", { attempt });
        const res = await generateFonePayQR(
          amount.toString(),
          customerId,
          tenant,
          customerName,
          { signal: controller.signal },
        );
        if (!isMountedRef.current) return;
        if (res?.status !== "SUCCESS" || !res?.qrMessage || !res?.prn) {
          throw new Error(res?.message || "FonePay QR generation failed");
        }
        setQr({ prn: res.prn, qrMessage: res.qrMessage, status: res.status });
        setRetryCount(0);
        trackEvent("qr_generation_success", { prn: res.prn });
        // 🔑 Notify parent that QR is ready — parent hides full-screen overlay
        onQRReadyRef.current?.();
        startPolling(res.prn);
      } catch (e: any) {
        if (
          e.name === "AbortError" ||
          e.name === "CanceledError" ||
          e.code === "ERR_CANCELED"
        )
          return;
        console.error("FonePay QR generation error:", e);
        trackEvent("qr_generation_error", { error: e.message, attempt });
        if (isMountedRef.current && attempt < MAX_RETRY_ATTEMPTS) {
          setRetryCount(attempt + 1);
          await new Promise((r) => setTimeout(r, RETRY_DELAY));
          return generateQRWithRetry(attempt + 1);
        }
        if (isMountedRef.current) {
          setError("Unable to generate FonePay QR code. Please try again.");
          // Also notify parent on failure so overlay is dismissed
          onQRReadyRef.current?.();
          onFailedRef.current("QR generation failed");
        }
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    },
    [amount, customerId, tenant, startPolling, trackEvent],
  );

  useEffect(() => {
    isMountedRef.current = true;
    if (!isOpen) return;
    generateQRWithRetry(0);
    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [isOpen, generateQRWithRetry, cleanup]);

  const handleRetry = useCallback(() => {
    trackEvent("manual_retry");
    cleanup();
    setQr(null);
    setCompleted(false);
    setError(null);
    setRetryCount(0);
    generateQRWithRetry(0);
  }, [cleanup, generateQRWithRetry, trackEvent]);

  const handleClose = useCallback(() => {
    trackEvent("popup_closed", { completed, hasError: !!error });
    cleanup();
    onCloseRef.current();
  }, [cleanup, completed, error, trackEvent]);

  if (!isOpen) return null;

  /* ── Inline panel layout (no fixed overlay) ─────────────────────── */
  return (
    <div className="w-full max-w-[390px] bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden flex flex-col">
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="text-sm font-semibold text-gray-800">FonePay</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Scan QR to complete payment
          </p>
        </div>
        <button
          onClick={handleClose}
          disabled={loading && !error}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40"
          aria-label="Close"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* ── Amount pill ── */}
      {!error && (
        <div className="mx-5 mt-4 mb-2 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <span className="text-xs text-gray-500 font-medium">Amount due</span>
          <span className="text-base font-bold text-gray-900">
            रू {amount.toLocaleString("ne-NP")}
          </span>
        </div>
      )}

      {/* ── Error state ── */}
      {error && (
        <div
          className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center flex-1"
          role="alert"
        >
          <div className="p-4 rounded-full bg-red-50">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <div>
            <p className="text-gray-800 font-semibold">Something went wrong</p>
            <p className="text-gray-500 text-sm mt-1">{error}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-[#06476d] text-white text-sm font-medium rounded-lg hover:bg-[#053d5e] transition-colors"
            >
              <RefreshCw size={14} /> Try again
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── QR ready ── */}
      {qr && !error && (
        <div className="flex flex-col items-center gap-4 px-5 pb-6 pt-2">
          {/* Gateway tagline */}
          <img
            src="/img/fonepayqrtagline.png"
            alt="FonePay"
            className="h-8 object-contain"
          />

          {/* QR frame */}
          <div className="relative">
            <div
              className={`p-3 rounded-2xl border border-1.5 transition-all duration-500 ${
                completed
                  ? "border-green-400 bg-green-50"
                  : "border-[#ADD8E6] bg-white"
              }`}
            >
              <QRCodeSVG
                value={qr.qrMessage}
                size={190}
                bgColor="transparent"
                fgColor={completed ? "#16a34a" : "#111827"}
                level="M"
                aria-label="FonePay QR Code"
              />
              {/* Logo overlay — positioned on top of the excavated zone */}
              {!completed && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="bg-white rounded-full shadow-sm flex items-center justify-center"
                    style={{
                      width: 42,
                      height: 42,
                      border: "1.5px solid #ADD8E6",
                    }}
                  >
                    <img
                      src="/img/bwqrlogo.png"
                      alt=""
                      style={{ height: 20, width: "auto" }}
                    />
                  </div>
                </div>
              )}
            </div>
            {completed && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={52} />
                  <p className="text-green-700 font-semibold text-sm">
                    Payment received!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Offline warning */}
          {!completed && !isOnline && (
            <div
              className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg text-xs w-full justify-center"
              role="alert"
            >
              <WifiOff size={13} /> No internet — payment status may be delayed
            </div>
          )}

          {/* Bank logo */}
          {bankLogoSrc && (
            <img
              src={bankLogoSrc}
              alt={bankLogoAlt || "Bank"}
              className="h-8 object-contain"
            />
          )}

          {/* Status pill */}
          <div
            className={`w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-colors duration-500 ${
              completed
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {completed ? "✓ Payment Confirmed" : "Waiting for payment…"}
          </div>

          {/* Accepted apps */}
          <div className="flex flex-col items-center gap-1.5 w-full">
            <p className="text-xs text-gray-400 font-medium">Pay using</p>
            <img
              src="/img/pay-using-fonepay.png"
              alt="Supported payment methods"
              className="h-7 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default FonePayPopup;
