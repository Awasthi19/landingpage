import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center gap-5">
      <div className="bg-white rounded-2xl px-10 py-8 flex flex-col items-center gap-4 shadow-xl border border-black/10">
        <Loader2
          className="animate-spin text-[#06476d]"
          size={48}
          strokeWidth={1.5}
        />
        <div className="text-center">
          <p className="text-gray-900 font-semibold text-lg">
            Loading Payment Portal
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Please wait a moment…
          </p>
        </div>
      </div>
    </div>
  );
}
