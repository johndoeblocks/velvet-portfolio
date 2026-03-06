"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export default function HeroSection() {
  const { t } = useLanguage()

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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-green-950 to-gray-950"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-800 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-700 rounded-full filter blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mx-auto mb-8 w-32 h-32">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9B1jcD6hpOyJWyQrf9ycJ6A0XVaFKh.png"
            alt="Velvet Neuron Logo"
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
            Velvet Neuron
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">{t("tagline")}</p>
        <Button
          onClick={scrollToContact}
          className="bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white text-lg px-8 py-6 h-auto border-0"
        >
          {t("getInTouch")}
        </Button>
        <div className="mt-16">
          <Link href="#about" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <span className="mr-2">{t("discoverMore")}</span>
            <ChevronDown className="animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  )
}
