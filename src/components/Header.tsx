import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-screen-xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#06476d]">
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">
            PSI Technologies
          </span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:text-[#06476d] transition-colors"
          >
            Home
          </Link>
          <Link
            href="#works"
            className="text-sm font-medium hover:text-[#06476d] transition-colors"
          >
            Works
          </Link>
          <Link
            href="#clients"
            className="text-sm font-medium hover:text-[#06476d] transition-colors"
          >
            Clients
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-[#06476d] transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-[#06476d] transition-colors"
          >
            Contact
          </Link>
        </nav>
        <Link href="/payment-portal">
          <Button className="bg-[#06476d] hover:bg-[#053a5a] text-white">
            Payment Services
          </Button>
        </Link>
      </div>
    </header>
  );
}
