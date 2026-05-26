'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { MouseFollowingEyes } from '@/components/mouse-following-eyes';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const ContactSection: React.FC = () => {
  const t = useTranslations('contact');
  const footerT = useTranslations('footer');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const trackEvent = (action: string, label: string) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: action,
        event_category: 'Contact',
        event_label: label,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setError(false);

    try {
      const formData = new FormData(form);
      const payload = {
        name: String(formData.get('name') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        company: String(formData.get('company') ?? '').trim(),
        phone: String(formData.get('phone') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to send');
      }

      trackEvent('form_submission', 'Contact Form');
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (submissionError) {
      console.error('Error submitting form:', submissionError);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'mt-2 w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3.5 text-sm text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-primary/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/10';

  const expectationItems = [t('detail_1'), t('detail_2'), t('detail_3')];
  const openEmailClient = () => {
    const contactEmail = ['hello', '@', 'velvetneuron.com'].join('');
    trackEvent('email_click', contactEmail);
    window.location.href = ['mailto:', contactEmail].join('');
  };

  return (
    <section id="contact" className="px-6 pb-24 pt-24 sm:pb-28 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between rounded-[2rem] bg-brand-primary p-6 text-white shadow-[0_30px_80px_-50px_rgba(18,78,70,0.7)] sm:p-8 lg:p-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                {t('eyebrow')}
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
                {t('description')}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              {/*
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">{t('details_title')}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/72">
                  {t('details_intro')}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {expectationItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/84">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-tertiary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              */}

              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">{t('channels_title')}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/72">
                  {t('channels_description')}
                </p>

                <div className="mt-4 space-y-3 text-sm">
                  <button
                    type="button"
                    onClick={openEmailClient}
                    className="flex items-center gap-2.5 text-left text-white/86 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-white/60" />
                    <span>{t('form.email_cta')}</span>
                  </button>
                  <a
                    href="https://wa.me/351969370801"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', '+351969370801')}
                    className="flex items-center gap-2.5 text-white/86 transition-colors hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 text-white/60" />
                    <span>{t('form.whatsapp')}</span>
                  </a>
                  <div className="flex items-center gap-2.5 text-white/72">
                    <MapPin className="h-4 w-4 text-white/60" />
                    <span>{footerT('location')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-border bg-white p-8 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)] sm:p-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-brand-ink">
                  {t('form.name_label')}
                  <input
                    type="text"
                    name="name"
                    placeholder={t('form.name_placeholder')}
                    autoComplete="name"
                    required
                    className={inputClasses}
                  />
                </label>

                <label className="block text-sm font-medium text-brand-ink">
                  {t('form.email_label')}
                  <input
                    type="email"
                    name="email"
                    placeholder={t('form.email_placeholder')}
                    autoComplete="email"
                    required
                    className={inputClasses}
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-brand-ink">
                  {t('form.company_label')}
                  <input
                    type="text"
                    name="company"
                    placeholder={t('form.company_placeholder')}
                    autoComplete="organization"
                    className={inputClasses}
                  />
                </label>

                <label className="block text-sm font-medium text-brand-ink">
                  {t('form.phone_label')}
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('form.phone_placeholder')}
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClasses}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-brand-ink">
                {t('form.project_label')}
                <textarea
                  name="message"
                  placeholder={t('form.project_placeholder')}
                  required
                  rows={6}
                  className={`${inputClasses} resize-none`}
                />
              </label>

              <div className="relative pt-6 mt-2">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
                  <MouseFollowingEyes />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative z-20 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  ) : (
                    <>
                      <span>{t('form.submit')}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm leading-relaxed text-brand-muted">
                {t('privacy_note')}{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-brand-primary underline-offset-4 hover:underline"
                >
                  {footerT('privacy')}
                </Link>
                .
              </p>

              {success && (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {t('form.success')}
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {t('form.error')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
