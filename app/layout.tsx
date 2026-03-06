import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import EmailJSInit from "@/components/email-js-init"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Velvet Neuron | Desenvolvimento Web em Póvoa de Santa Iria, Portugal",
  description:
    "Empresa de desenvolvimento web em Póvoa de Santa Iria, Portugal. Especialistas em soluções web inovadoras, desenvolvimento full-stack, design UI/UX e soluções web3.",
  keywords:
    "desenvolvimento web, portugal, póvoa de santa iria, web development, full-stack, UI/UX, web3, react, next.js",
  openGraph: {
    title: "Velvet Neuron | Desenvolvimento Web em Póvoa de Santa Iria, Portugal",
    description:
      "Empresa de desenvolvimento web em Póvoa de Santa Iria, Portugal. Especialistas em soluções web inovadoras, desenvolvimento full-stack, design UI/UX e soluções web3.",
    url: "https://velvetneuron.com",
    siteName: "Velvet Neuron",
    locale: "pt_PT",
    type: "website",
  },
  alternates: {
    languages: {
      en: "/en",
      pt: "/",
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={inter.className}>
        <EmailJSInit />
        {children}
      </body>
    </html>
  )
}
