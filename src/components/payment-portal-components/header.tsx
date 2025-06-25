"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-medium hover:text-[#06476d] transition-colors"
          >
            <ArrowLeft className="h-8 w-8" />
            Home
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#06476d]">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">P</div>
            </div>
            <span className="text-lg font-bold tracking-tight">Payment Portal</span>
          </div>
        </div>
      </div>
    </header>
  )
}
