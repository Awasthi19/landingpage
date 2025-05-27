"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-screen-xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#06476d]">
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">P</div>
          </div>
          <span className="text-xl font-bold tracking-tight">PSI Technologies</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="#" className="text-sm font-medium hover:text-[#06476d] transition-colors">
            Home
          </Link>
          <Link href="#works" className="text-sm font-medium hover:text-[#06476d] transition-colors">
            Works
          </Link>
          <Link href="#clients" className="text-sm font-medium hover:text-[#06476d] transition-colors">
            Clients
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-[#06476d] transition-colors">
            Testimonials
          </Link>
          <Link href="/payment-portal" className="text-sm font-medium hover:text-[#06476d] transition-colors">
            Payment Services
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-[#06476d] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Get in Touch Button */}
        <Link href="#contact" className="hidden md:block">
          <Button className="bg-[#06476d] hover:bg-[#053a5a] text-white">Get in Touch</Button>
        </Link>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <Link
              href="#"
              onClick={closeMenu}
              className="text-sm font-medium hover:text-[#06476d] transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="#works"
              onClick={closeMenu}
              className="text-sm font-medium hover:text-[#06476d] transition-colors py-2"
            >
              Works
            </Link>
            <Link
              href="#clients"
              onClick={closeMenu}
              className="text-sm font-medium hover:text-[#06476d] transition-colors py-2"
            >
              Clients
            </Link>
            <Link
              href="#testimonials"
              onClick={closeMenu}
              className="text-sm font-medium hover:text-[#06476d] transition-colors py-2"
            >
              Testimonials
            </Link>
            <Link
              href="/payment-portal"
              onClick={closeMenu}
              className="text-sm font-medium hover:text-[#06476d] transition-colors py-2"
            >
              Payment Services
            </Link>
            <Link
              href="#contact"
              onClick={closeMenu}
              className="text-sm font-medium hover:text-[#06476d] transition-colors py-2"
            >
              Contact
            </Link>
            <div className="pt-4 border-t">
              <Link href="#contact" onClick={closeMenu}>
                <Button className="w-full bg-[#06476d] hover:bg-[#053a5a] text-white">Get in Touch</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
