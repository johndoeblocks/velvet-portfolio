"use client"

import { Code, Layers, Mail, Rocket } from "lucide-react"
import Image from "next/image"
import ContactForm from "@/components/contact-form"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import { LanguageProvider, useLanguage } from "@/context/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 inline-block relative">
            <LanguageText textKey="aboutUs" />
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-700 to-emerald-500"></span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            <LanguageText textKey="aboutIntro" />
          </p>
          <p className="text-gray-400 mb-12 leading-relaxed">
            <LanguageText textKey="aboutDescription" />
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-emerald-400 mb-2">5+</p>
              <p className="text-gray-400">
                <LanguageText textKey="yearsExperience" />
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-emerald-400 mb-2">50+</p>
              <p className="text-gray-400">
                <LanguageText textKey="projectsCompleted" />
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-emerald-400 mb-2">30+</p>
              <p className="text-gray-400">
                <LanguageText textKey="happyClients" />
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-bold text-emerald-400 mb-2">100%</p>
              <p className="text-gray-400">
                <LanguageText textKey="clientSatisfaction" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center inline-block relative">
          <LanguageText textKey="ourServices" />
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-700 to-emerald-500"></span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all hover:translate-y-[-5px] group">
            <div className="w-14 h-14 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition-colors">
              <Code className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <LanguageText textKey="webDevelopment" />
            </h3>
            <p className="text-gray-400 mb-4">
              <LanguageText textKey="webDevelopmentDesc" />
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>
                • <LanguageText textKey="reactNextjs" />
              </li>
              <li>
                • <LanguageText textKey="fullStack" />
              </li>
              <li>
                • <LanguageText textKey="apiDev" />
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all hover:translate-y-[-5px] group">
            <div className="w-14 h-14 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition-colors">
              <Layers className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <LanguageText textKey="web3" />
            </h3>
            <p className="text-gray-400 mb-4">
              <LanguageText textKey="web3Desc" />
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>
                • <LanguageText textKey="smartContract" />
              </li>
              <li>
                • <LanguageText textKey="dappDev" />
              </li>
              <li>
                • <LanguageText textKey="walletConnections" />
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all hover:translate-y-[-5px] group">
            <div className="w-14 h-14 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition-colors">
              <Layers className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <LanguageText textKey="uiuxDesign" />
            </h3>
            <p className="text-gray-400 mb-4">
              <LanguageText textKey="uiuxDesc" />
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>
                • <LanguageText textKey="userCentered" />
              </li>
              <li>
                • <LanguageText textKey="wireframing" />
              </li>
              <li>
                • <LanguageText textKey="designSystems" />
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all hover:translate-y-[-5px] group">
            <div className="w-14 h-14 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition-colors">
              <Rocket className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <LanguageText textKey="seoPerformance" />
            </h3>
            <p className="text-gray-400 mb-4">
              <LanguageText textKey="seoDesc" />
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>
                • <LanguageText textKey="technicalSeo" />
              </li>
              <li>
                • <LanguageText textKey="performanceOpt" />
              </li>
              <li>
                • <LanguageText textKey="coreWebVitals" />
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all hover:translate-y-[-5px] group">
            <div className="w-14 h-14 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition-colors">
              <Rocket className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <LanguageText textKey="startupMvp" />
            </h3>
            <p className="text-gray-400 mb-4">
              <LanguageText textKey="startupDesc" />
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>
                • <LanguageText textKey="rapidPrototyping" />
              </li>
              <li>
                • <LanguageText textKey="leanDev" />
              </li>
              <li>
                • <LanguageText textKey="iterativeImprovement" />
              </li>
            </ul>
          </div>
          <div className="p-8 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all hover:translate-y-[-5px] group">
            <div className="w-14 h-14 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-900/50 transition-colors">
              <Code className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <LanguageText textKey="maintenance" />
            </h3>
            <p className="text-gray-400 mb-4">
              <LanguageText textKey="maintenanceDesc" />
            </p>
            <ul className="text-gray-500 space-y-2">
              <li>
                • <LanguageText textKey="regularUpdates" />
              </li>
              <li>
                • <LanguageText textKey="performanceMonitoring" />
              </li>
              <li>
                • <LanguageText textKey="securityPatches" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center inline-block relative" tabIndex={-1}>
            <LanguageText textKey="getInTouch" />
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-700 to-emerald-500"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                <LanguageText textKey="contactUs" />
              </h3>
              <p className="text-gray-400 mb-8">
                <LanguageText textKey="contactDesc" />
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-emerald-400 mr-4" size={20} />
                  <a
                    href="mailto:joaooliveiramanteigas@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    joaooliveiramanteigas@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 bg-gray-950 border-t border-green-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9B1jcD6hpOyJWyQrf9ycJ6A0XVaFKh.png"
              alt="Velvet Neuron Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="font-bold tracking-wide">Velvet Neuron</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Velvet Neuron. <LanguageText textKey="allRightsReserved" />
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="mailto:joaooliveiramanteigas@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function LanguageText({ textKey }: { textKey: string }) {
  const { t } = useLanguage()
  return <>{t(textKey)}</>
}
