"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"
import { useLanguage } from "@/context/language-context"

export default function ContactForm() {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!name || !email || !message) {
      setSubmitStatus("error")
      setErrorMessage(t("fillAllFields"))
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus("error")
      setErrorMessage(t("validEmail"))
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Prepare template parameters
      const templateParams = {
        name,
        email,
        message,
        time: new Date().toLocaleString(),
      }

      // Send email using EmailJS
      await emailjs.send("service_o1vhnkt", "template_rj9dqcm", templateParams, "_UA2I8YcHBm1v__5S")

      // Reset form and show success message
      setName("")
      setEmail("")
      setMessage("")
      setSubmitStatus("success")
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
      setErrorMessage(t("emailError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder={t("yourName")}
          className="bg-gray-800 border-gray-700 focus:border-emerald-500 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder={t("yourEmail")}
          className="bg-gray-800 border-gray-700 focus:border-emerald-500 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Textarea
          placeholder={t("yourMessage")}
          className="bg-gray-800 border-gray-700 focus:border-emerald-500 text-white min-h-[150px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {submitStatus === "success" && (
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/50 p-3 rounded-md">
          <CheckCircle size={18} />
          <span>{t("messageSent")}</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center gap-2 text-red-400 bg-red-950/50 p-3 rounded-md">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white border-0"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          t("sendMessage")
        )}
      </Button>
    </form>
  )
}
