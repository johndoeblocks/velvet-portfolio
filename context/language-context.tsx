"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "pt" | "en"

type Translations = {
  [key: string]: {
    pt: string
    en: string
  }
}

// All website text translations
export const translations: Translations = {
  // Navigation
  about: {
    pt: "Sobre",
    en: "About",
  },
  services: {
    pt: "Serviços",
    en: "Services",
  },
  contact: {
    pt: "Contacto",
    en: "Contact",
  },
  getInTouch: {
    pt: "Contacte-nos",
    en: "Get in Touch",
  },

  // Hero Section
  tagline: {
    pt: "Soluções Web Inovadoras para Projetos Visionários.",
    en: "Innovative Web Solutions for Visionary Projects.",
  },
  discoverMore: {
    pt: "Descubra Mais",
    en: "Discover More",
  },

  // About Section
  aboutUs: {
    pt: "Sobre Nós",
    en: "About Us",
  },
  aboutIntro: {
    pt: "Somos uma equipa de programadores e designers apaixonados que criam experiências digitais excepcionais.",
    en: "We are a team of passionate developers and designers crafting exceptional digital experiences.",
  },
  aboutDescription: {
    pt: "Na Velvet Neuron, especializamo-nos em desenvolvimento full-stack, design UI/UX e soluções web3. A nossa abordagem concentra-se na simplicidade, eficiência e desenvolvimento orientado ao desempenho que proporciona resultados tangíveis para os nossos clientes. Transformamos ideias complexas em soluções digitais elegantes e funcionais.",
    en: "At Velvet Neuron, we specialize in full-stack development, UI/UX design, and web3 solutions. Our approach focuses on simplicity, efficiency, and performance-driven development that delivers tangible results for our clients. We transform complex ideas into elegant, functional digital solutions.",
  },
  yearsExperience: {
    pt: "Anos de Experiência",
    en: "Years Experience",
  },
  projectsCompleted: {
    pt: "Projetos Concluídos",
    en: "Projects Completed",
  },
  happyClients: {
    pt: "Clientes Satisfeitos",
    en: "Happy Clients",
  },
  clientSatisfaction: {
    pt: "Satisfação do Cliente",
    en: "Client Satisfaction",
  },

  // Services Section
  ourServices: {
    pt: "Nossos Serviços",
    en: "Our Services",
  },
  webDevelopment: {
    pt: "Desenvolvimento Web Personalizado",
    en: "Custom Web Development",
  },
  webDevelopmentDesc: {
    pt: "Sites e aplicações responsivos e modernos construídos com React, Next.js e outras tecnologias de ponta.",
    en: "Modern, responsive websites and applications built with React, Next.js, and other cutting-edge technologies.",
  },
  reactNextjs: {
    pt: "React & Next.js",
    en: "React & Next.js",
  },
  fullStack: {
    pt: "Soluções full-stack",
    en: "Full-stack solutions",
  },
  apiDev: {
    pt: "Desenvolvimento de API",
    en: "API development",
  },
  web3: {
    pt: "Web3 & Blockchain",
    en: "Web3 & Blockchain",
  },
  web3Desc: {
    pt: "Integre tecnologia blockchain nas suas aplicações com os nossos serviços especializados de desenvolvimento web3.",
    en: "Integrate blockchain technology into your applications with our specialized web3 development services.",
  },
  smartContract: {
    pt: "Integração de smart contracts",
    en: "Smart contract integration",
  },
  dappDev: {
    pt: "Desenvolvimento de dApps",
    en: "dApp development",
  },
  walletConnections: {
    pt: "Conexões de carteiras",
    en: "Wallet connections",
  },
  uiuxDesign: {
    pt: "Design UI/UX",
    en: "UI/UX Design",
  },
  uiuxDesc: {
    pt: "Interfaces bonitas e intuitivas que melhoram a experiência do utilizador e impulsionam o envolvimento.",
    en: "Beautiful, intuitive interfaces that enhance user experience and drive engagement.",
  },
  userCentered: {
    pt: "Design centrado no utilizador",
    en: "User-centered design",
  },
  wireframing: {
    pt: "Wireframing & prototipagem",
    en: "Wireframing & prototyping",
  },
  designSystems: {
    pt: "Sistemas de design",
    en: "Design systems",
  },
  seoPerformance: {
    pt: "SEO & Desempenho",
    en: "SEO & Performance",
  },
  seoDesc: {
    pt: "Otimize a sua presença na web para motores de busca e maximize o desempenho para a melhor experiência do utilizador.",
    en: "Optimize your web presence for search engines and maximize performance for the best user experience.",
  },
  technicalSeo: {
    pt: "SEO técnico",
    en: "Technical SEO",
  },
  performanceOpt: {
    pt: "Otimização de desempenho",
    en: "Performance optimization",
  },
  coreWebVitals: {
    pt: "Core Web Vitals",
    en: "Core Web Vitals",
  },
  startupMvp: {
    pt: "Desenvolvimento de Startups & MVPs",
    en: "Startup & MVP Development",
  },
  startupDesc: {
    pt: "Coloque a sua ideia em prática rapidamente com os nossos serviços especializados de desenvolvimento de MVP para startups.",
    en: "Get your idea off the ground quickly with our specialized MVP development services for startups.",
  },
  rapidPrototyping: {
    pt: "Prototipagem rápida",
    en: "Rapid prototyping",
  },
  leanDev: {
    pt: "Desenvolvimento lean",
    en: "Lean development",
  },
  iterativeImprovement: {
    pt: "Melhoria iterativa",
    en: "Iterative improvement",
  },
  maintenance: {
    pt: "Manutenção & Suporte",
    en: "Maintenance & Support",
  },
  maintenanceDesc: {
    pt: "Mantenha os seus produtos digitais a funcionar sem problemas com os nossos serviços contínuos de manutenção e suporte.",
    en: "Keep your digital products running smoothly with our ongoing maintenance and support services.",
  },
  regularUpdates: {
    pt: "Atualizações regulares",
    en: "Regular updates",
  },
  performanceMonitoring: {
    pt: "Monitorização de desempenho",
    en: "Performance monitoring",
  },
  securityPatches: {
    pt: "Patches de segurança",
    en: "Security patches",
  },

  // Contact Section
  contactUs: {
    pt: "Contacte-nos",
    en: "Contact Us",
  },
  contactDesc: {
    pt: "Tem um projeto em mente? Vamos discutir como podemos ajudar a dar vida à sua visão.",
    en: "Have a project in mind? Let's discuss how we can help bring your vision to life.",
  },
  yourName: {
    pt: "O Seu Nome",
    en: "Your Name",
  },
  yourEmail: {
    pt: "O Seu Email",
    en: "Your Email",
  },
  yourMessage: {
    pt: "A Sua Mensagem",
    en: "Your Message",
  },
  sendMessage: {
    pt: "Enviar Mensagem",
    en: "Send Message",
  },
  sending: {
    pt: "A enviar...",
    en: "Sending...",
  },
  messageSent: {
    pt: "Mensagem enviada com sucesso! Entraremos em contacto em breve.",
    en: "Message sent successfully! We'll get back to you soon.",
  },
  fillAllFields: {
    pt: "Por favor, preencha todos os campos",
    en: "Please fill in all fields",
  },
  validEmail: {
    pt: "Por favor, insira um endereço de email válido",
    en: "Please enter a valid email address",
  },
  emailError: {
    pt: "Falha ao enviar o email. Por favor, tente novamente mais tarde.",
    en: "Failed to send email. Please try again later.",
  },

  // Footer
  allRightsReserved: {
    pt: "Todos os direitos reservados.",
    en: "All rights reserved.",
  },

  // Language Switcher
  switchToEnglish: {
    pt: "English",
    en: "English",
  },
  switchToPortuguese: {
    pt: "Português",
    en: "Português",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
