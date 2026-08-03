"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, PlayCircle, ShieldCheck, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.psi.ebijuli";
const TUTORIAL_URL =
  "https://drive.google.com/file/d/1GwqgOmWrRxwFeR3CQl7ENQ_6n8ouMSdZ/view?usp=sharing";

export default function AppAnnouncement() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-announcement-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        lang="ne"
        className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl"
        style={{
          fontFamily:
            "var(--font-noto-devanagari), Noto Sans Devanagari, system-ui, sans-serif",
        }}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
          aria-label="Close app announcement"
        >
          <X size={18} />
        </button>

        <div className="px-6 pb-6 pt-7">
          <div className="mb-5 flex items-center gap-3 pr-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06476d] text-white shadow-sm">
              <Smartphone size={25} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-green-700">
                अब मोबाइल एपमा पनि उपलब्ध छ
              </p>
              <h2
                id="app-announcement-title"
                className="text-lg font-bold text-gray-950"
              >
                eBijuli एपबाट अझ सजिलै बिल तिर्नुहोस
              </h2>
            </div>
          </div>

          <p className="text-sm leading-6 text-gray-600">
            आफ्नो विद्युत महसुल हेर्न, बिलको विवरण प्राप्त गर्न तथा FonePay QR
            मार्फत सुरक्षित रूपमा भुक्तानी गर्न eBijuli एप Google Play Store बाट डाउनलोड गर्नुहोस।
          </p>

          <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <ShieldCheck
                className="mt-0.5 text-green-600"
                size={18}
                strokeWidth={2}
              />
              <p>
                एप डाउनलोड गर्ने र भुक्तानी गर्ने तरिका जान्न छोटो भिडियो
                ट्युटोरियल हेर्नुहोस।
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button
              asChild
              className="h-11 bg-[#06476d] text-white hover:bg-[#053a5a]"
              onClick={close}
            >
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={17} />
                डाउनलोड एप
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 border-gray-200 text-gray-800 hover:bg-gray-50"
              onClick={close}
            >
              <a href={TUTORIAL_URL} target="_blank" rel="noopener noreferrer">
                <PlayCircle size={17} />
                भिडियो हेर्नुहोस
              </a>
            </Button>
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-4 w-full text-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-800"
          >
            Website बाट भुक्तानी जारी राख्नुहोस
          </button>
        </div>
      </div>
    </div>
  );
}
