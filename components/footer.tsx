import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/buildwithvelvet/',
      label: 'Instagram',
    },
    // { icon: Github, href: 'https://github.com/johndoeblocks', label: 'GitHub' },
    // {
    //   icon: Linkedin,
    //   href: 'https://www.linkedin.com/in/jo%C3%A3o-manteigas/',
    //   label: 'LinkedIn',
    // },
  ];

  const quickLinks = [
    { label: t('home'), href: '/' as const },
    { label: navT('services'), href: '/#services' as const },
    { label: navT('work'), href: '/#portfolio' as const },
    { label: navT('contact'), href: '/#contact' as const },
    { label: navT('blog'), href: '/blog' as const },
  ];

  const solutionLinks = [
    { label: t('solutions_ai_agents'), href: '/agentes-ia' as const },
    { label: t('solutions_automation'), href: '/automacao-processos' as const },
    { label: t('solutions_web_apps'), href: '/aplicacoes-web' as const },
    { label: t('solutions_ecommerce'), href: '/sites-ecommerce' as const },
    { label: t('solutions_ai_visibility'), href: '/optimize-for-ai' as const },
  ];

  return (
    <footer className="border-t border-brand-border bg-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/ico.svg"
                alt=""
                width={32}
                height={32}
                aria-hidden="true"
                className="h-8 w-8 rounded-full object-contain"
              />
              <span className="text-base font-semibold tracking-tight text-brand-ink">
                Velvet Neuron
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted">
              {t('tagline')}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-muted transition-colors hover:text-brand-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">
              {t('quick_links')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-brand-muted">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-brand-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">
              {t('solutions')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-brand-muted">
              {solutionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-brand-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">
              {t('contact_title')}
            </h3>
            <div className="mt-5 space-y-3 text-sm text-brand-muted">
              <p>{t('location')}</p>
              <Link href="/#contact" className="block transition-colors hover:text-brand-ink">
                {t('email_label')}
              </Link>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/privacy"
                  className="text-xs transition-colors hover:text-brand-ink"
                >
                  {t('privacy')}
                </Link>
                <span className="text-xs text-brand-border">·</span>
                <Link
                  href="/terms"
                  className="text-xs transition-colors hover:text-brand-ink"
                >
                  {t('terms')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-border pt-6 text-sm text-brand-muted">
          © {currentYear} {t('company')}. {t('rights')}
        </div>
      </div>
    </footer>
  );
};
