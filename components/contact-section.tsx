"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export const ContactSection: React.FC = () => {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setError(false);
    try {
      const formData = new FormData(form);
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        message: formData.get("message"),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-5 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all duration-300 text-sm";

  return (
    <section
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Subtle glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/[0.06] rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-purple-400/80 mb-4 block">
            Get in touch
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed font-light">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact info – left column */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-purple-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Email</h3>
              </div>
              <a
                href="mailto:hello@velvetneuron.com"
                className="text-gray-500 text-sm hover:text-purple-400 transition-colors ml-12"
              >
                hello@velvetneuron.com
              </a>
            </div>

            <div className="group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-purple-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Location</h3>
              </div>
              <p className="text-gray-500 text-sm ml-12">Lisbon, Portugal</p>
            </div>
          </motion.div>

          {/* Contact form – right column */}
          <motion.form
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder={t("form.name")}
                required
                className={inputClasses}
              />
              <input
                type="email"
                name="email"
                placeholder={t("form.email")}
                required
                className={inputClasses}
              />
            </div>
            <input
              type="text"
              name="company"
              placeholder={t("form.company")}
              required
              className={inputClasses}
            />
            <textarea
              name="message"
              placeholder={t("form.project")}
              required
              rows={4}
              className={`${inputClasses} resize-none`}
            />

            <motion.button
              type="submit"
              disabled={loading}
              className="group w-full px-6 py-3.5 bg-white text-black font-semibold rounded-xl inline-flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] disabled:opacity-50 transition-all duration-500 text-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t("form.submit")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  {t("form.success")}
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Something went wrong. Please try again or email us directly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
