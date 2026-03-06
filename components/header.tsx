"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/context/language-context"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()

    // Find the contact section or the Get In Touch heading
    const contactSection = document.getElementById("contact")
    const getInTouchHeading = document.querySelector("#contact h2")

    if (contactSection) {
      // Scroll to the contact section with offset to account for fixed header
      const headerHeight = 80 // Approximate header height
      const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Focus on the heading for accessibility
      if (getInTouchHeading && getInTouchHeading instanceof HTMLElement) {
        getInTouchHeading.focus()
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-green-900/30 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9B1jcD6hpOyJWyQrf9ycJ6A0XVaFKh.png"
            alt="Velvet Neuron Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-bold text-xl tracking-wide">Velvet Neuron</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            <Link href="#about" className="text-sm hover:text-emerald-400 transition-colors">
              {t("about")}
            </Link>
            <Link href="#services" className="text-sm hover:text-emerald-400 transition-colors">
              {t("services")}
            </Link>
            <Link href="#contact" className="text-sm hover:text-emerald-400 transition-colors">
              {t("contact")}
            </Link>
          </nav>
          <LanguageSwitcher />
        </div>
        <Button
          onClick={scrollToContact}
          className="bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white border-0"
        >
          {t("getInTouch")}
        </Button>
      </div>
    </header>
  )
}
