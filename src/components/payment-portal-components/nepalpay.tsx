/* eslint-disable */
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, X, RefreshCw } from "lucide-react";
import { generateQR, checkStatusViaReport } from "../../api/paymentservices";

/* ============================================================
   TYPES
============================================================ */
type QrCodeDetails = {
  timestamp: string;
  responseStatus: string;
  data: {
    qrString: string;
    validationTraceId: string;
  };
};

interface Props {
  isOpen: boolean;
  amount: number;
  customerId: string;
  tenant: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
  onPaymentFailed: (error?: string) => void;
  maxDuration?: number;
  onAnalyticsEvent?: (event: string, data?: Record<string, any>) => void;
}

/* ============================================================
   CONSTANTS
============================================================ */
const DEFAULT_MAX_DURATION = 10 * 60 * 1000;
const FAST_POLL_INTERVAL = 5000;
const SLOW_POLL_INTERVAL = 10000;
const SLOW_POLL_THRESHOLD = 5 * 60 * 1000;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;

/* ============================================================
   COMPONENT
============================================================ */
const NepalPayPopup: React.FC<Props> = ({
  isOpen,
  amount,
  customerId,
  tenant,
  onClose,
  onPaymentSuccess,
  onPaymentFailed,
  maxDuration = DEFAULT_MAX_DURATION,
  onAnalyticsEvent,
}) => {
  const [qr, setQr] = useState<QrCodeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const pollingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const onSuccessRef = useRef(onPaymentSuccess);
  const onFailedRef = useRef(onPaymentFailed);
  const onCloseRef = useRef(onClose);
  const sessionIdRef = useRef<string>(generateSessionId());
  const isMountedRef = useRef(true);

  useEffect(() => {
    onSuccessRef.current = onPaymentSuccess;
    onFailedRef.current = onPaymentFailed;
    onCloseRef.current = onClose;
  }, [onPaymentSuccess, onPaymentFailed, onClose]);

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
    [onAnalyticsEvent, amount, customerId, tenant]
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      trackEvent("network_online");
    };

    const handleOffline = () => {
      setIsOnline(false);
      trackEvent("network_offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [trackEvent]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearTimeout(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    stopPolling();
    stopTimer();
    abortRef.current?.abort();
    abortRef.current = null;
  }, [stopPolling, stopTimer]);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
      setQr(null);
      setCompleted(false);
      setError(null);
      setTimeLeft(maxDuration);
      setRetryCount(0);
      sessionIdRef.current = generateSessionId();
    }
  }, [isOpen, cleanup, maxDuration]);

  useEffect(() => {
    if (!isOpen || !qr || completed || error) return;

    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, maxDuration - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        stopTimer();
      }
    }, 1000);

    return () => stopTimer();
  }, [isOpen, qr, completed, error, maxDuration, stopTimer]);

  const startPolling = useCallback(
    (traceId: string) => {
      startTimeRef.current = Date.now();
      trackEvent("polling_started", { traceId });

      const poll = async () => {
        // Stop polling if component unmounted
        if (!isMountedRef.current) {
          return;
        }

        const elapsed = Date.now() - startTimeRef.current;

        if (elapsed > maxDuration) {
          stopPolling();
          setError("Payment session expired. Please try again.");
          trackEvent("payment_timeout", { elapsed });
          onFailedRef.current("Payment timeout");
          return;
        }

        if (!navigator.onLine) {
          const delay =
            elapsed < SLOW_POLL_THRESHOLD
              ? FAST_POLL_INTERVAL
              : SLOW_POLL_INTERVAL;
          pollingRef.current = setTimeout(poll, delay);
          return;
        }

        const controller = new AbortController();
        abortRef.current = controller;

        try {
          const res = await checkStatusViaReport(traceId, tenant, {
            signal: controller.signal,
          });

          // Only process if still mounted
          if (!isMountedRef.current) {
            return;
          }

          // Only process SUCCESS responses, ignore everything else
          if (res?.responseStatus === "SUCCESS") {
            stopPolling();
            setCompleted(true);
            trackEvent("payment_success", { traceId, elapsed });
            onSuccessRef.current();
            return;
          }

          // For any other response (E012, pending, etc.), just continue polling
          trackEvent("polling_check", {
            status: res?.responseStatus || "unknown",
            elapsed,
          });
        } catch (e: any) {
          // Ignore abort/cancel errors - these are expected during cleanup
          if (e.name === "AbortError" || e.name === "CanceledError" || e.code === "ERR_CANCELED") {
            return;
          }

          console.error("Polling error:", e);
          trackEvent("polling_error", { error: e.message, elapsed });
        }

        // Only continue polling if still mounted
        if (isMountedRef.current) {
          const delay =
            elapsed < SLOW_POLL_THRESHOLD
              ? FAST_POLL_INTERVAL
              : SLOW_POLL_INTERVAL;
          pollingRef.current = setTimeout(poll, delay);
        }
      };

      poll();
    },
    [tenant, maxDuration, stopPolling, trackEvent]
  );

  const generateQRWithRetry = useCallback(
    async (attempt: number = 0): Promise<void> => {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        trackEvent("qr_generation_attempt", { attempt });

        const res = await generateQR(amount.toString(), customerId, tenant, {
          signal: controller.signal,
        });

        // Only process if still mounted
        if (!isMountedRef.current) {
          return;
        }

        if (!res || typeof res.responseStatus !== "string") {
          throw new Error("Invalid QR response format");
        }

        if (
          res.responseStatus !== "SUCCESS" ||
          !res.data?.qrString ||
          !res.data?.validationTraceId
        ) {
          throw new Error(res.responseMessage || "QR generation failed");
        }

        setQr(res);
        setRetryCount(0);
        trackEvent("qr_generation_success", {
          traceId: res.data.validationTraceId,
        });
        startPolling(res.data.validationTraceId);
      } catch (e: any) {
        // Ignore abort/cancel errors - these are expected during cleanup
        if (e.name === "AbortError" || e.name === "CanceledError" || e.code === "ERR_CANCELED") {
          return;
        }

        console.error("QR generation error:", e);
        trackEvent("qr_generation_error", { error: e.message, attempt });

        // Only retry if still mounted
        if (isMountedRef.current && attempt < MAX_RETRY_ATTEMPTS) {
          setRetryCount(attempt + 1);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return generateQRWithRetry(attempt + 1);
        }

        if (isMountedRef.current) {
          setError("Unable to generate payment QR code. Please try again.");
          onFailedRef.current("QR generation failed");
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [amount, customerId, tenant, startPolling, trackEvent]
  );

  useEffect(() => {
    isMountedRef.current = true;

    if (!isOpen) return;

    const run = async () => {
      if (isMountedRef.current) {
        await generateQRWithRetry(0);
      }
    };

    run();

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
    setTimeLeft(maxDuration);
    setRetryCount(0);
    generateQRWithRetry(0);
  }, [cleanup, maxDuration, generateQRWithRetry, trackEvent]);

  const handleClose = useCallback(() => {
    trackEvent("popup_closed", { completed, hasError: !!error });
    cleanup();
    onCloseRef.current();
  }, [cleanup, completed, error, trackEvent]);

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-2"
      role="dialog"
      aria-labelledby="nepalpay-title"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          handleClose();
        }
      }}
    >
      <div
        className="w-full max-w-[390px] h-[600px] my-auto bg-white overflow-hidden flex flex-col justify-start items-center rounded-xl border border-black/10 shadow pt-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          onClick={handleClose}
          disabled={loading}
          aria-label="Close payment popup"
          data-testid="close-button"
        >
          <X size={20} />
        </button>

        {/* Error State */}
        {error && (
          <div
            className="flex flex-col items-center justify-center gap-4 p-6 text-center"
            role="alert"
            data-testid="error-state"
          >
            <AlertCircle className="text-red-500" size={48} />
            <h3 className="text-lg font-semibold">Payment Error</h3>
            <p className="text-gray-600">{error}</p>
            <div className="flex gap-2">
              <Button
                onClick={handleRetry}
                data-testid="retry-button"
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Try Again
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div
            className="flex flex-col items-center justify-center gap-4 p-6"
            data-testid="loading-state"
          >
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <p className="text-gray-600">
              {retryCount > 0
                ? `Retrying... (${retryCount}/${MAX_RETRY_ATTEMPTS})`
                : "Generating secure payment QR code..."}
            </p>
          </div>
        )}

        {/* Success/Active State */}
        {qr && !error && !loading && (
          <div className="p-2.5 flex flex-col gap-2.5 w-full my-auto">
            <div className="text-center flex flex-col gap-0.5">
              <p className="text-gray-600 text-sm font-medium m-0">We Accept</p>
              <div className="p-2.5 inline-block mx-auto">
                <img
                  src="/img/nepalpayqrtagline.png"
                  alt="NepalPay"
                  className="w-[130px]"
                />
              </div>
            </div>

            {/* QR Code */}
            <div
              className="flex justify-center"
              data-testid="qr-code-container"
            >
              <div className="w-[200px] h-[200px] bg-white flex items-center justify-center relative">
                <QRCodeSVG
                  value={qr.data.qrString}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  aria-label="Payment QR Code"
                />
                {completed && (
                  <img
                    src="/img/greentick.png"
                    alt="Payment successful"
                    className="w-9 h-9 absolute bottom-[100px] right-[100px] translate-x-1/2 translate-y-1/2"
                    data-testid="success-icon"
                  />
                )}
              </div>
            </div>

            {/* Timer & Status */}
            {!completed && (
              <div className="flex flex-col items-center gap-2">
                <div
                  className="text-gray-600 text-sm"
                  data-testid="countdown-timer"
                ></div>
                {!isOnline && (
                  <div
                    className="flex items-center gap-2 text-orange-500 text-sm"
                    role="alert"
                  >
                    <AlertCircle size={16} />
                    <span>No internet connection</span>
                  </div>
                )}
              </div>
            )}

            {/* Lumbini Logo */}
            <div className="flex justify-center p-2.5">
              <img
                src="/img/lumbini-logo.png"
                alt="Lumbini"
                className="w-4/5"
              />
            </div>

            {/* Status Button */}
            <div className="flex flex-col gap-2">
              <Button
                className={` mx-24 ${
                  completed ? "bg-green-500 hover:bg-green-600" : ""
                }`}
                disabled={true}
                data-testid="status-button"
              >
                {completed ? "✓ Payment Received" : "Waiting for payment..."}
              </Button>

              <p className="text-gray-600 text-sm font-medium text-center m-0">
                Pay using:
              </p>
              <img
                src="/img/pay-using.png"
                alt="Supported payment methods"
                className="w-48 mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   UTILITIES
============================================================ */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default NepalPayPopup;