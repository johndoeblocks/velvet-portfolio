"use client"

import { useEffect } from "react"
import emailjs from "@emailjs/browser"

export default function EmailJSInit() {
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("_UA2I8YcHBm1v__5S")
  }, [])

  return null
}
