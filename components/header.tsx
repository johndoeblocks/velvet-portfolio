'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/language-switcher';

export const Header: React.FC = () => {
  const t = useTranslations('nav');
  const fT = useTranslations('footer');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const mobileMenuId = 'mobile-navigation';
  const routesWithoutLandingSections = [
    '/agentes-ia',
    '/automacao-processos',
    '/aplicacoes-web',
    '/sites-ecommerce',
    '/blog',
    '/privacy',
    '/terms',
    '/cv',
  ];
  const hasLandingSections = !routesWithoutLandingSections.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const sectionHref = (section: string) =>
    hasLandingSections ? `#${section}` : `/#${section}`;

  const navItems = [
    { label: t('work'), href: sectionHref('portfolio') },
    { label: t('process'), href: sectionHref('process') },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: sectionHref('contact') },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-brand-border bg-brand-paper/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/ico.svg"
            alt=""
            width={38}
            height={38}
            aria-hidden="true"
            priority
            className="h-[38px] w-[38px] rounded-full object-contain"
          />
          <span className="text-base font-semibold tracking-tight text-brand-ink">
            Velvet Neuron
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <div className="group relative">
            <Link href={sectionHref('services')} className="flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-brand-muted transition-colors duration-300 hover:bg-white hover:text-brand-ink">
              {fT('solutions')}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
            </Link>
            <div className="invisible absolute left-0 top-full mt-2 flex w-56 flex-col gap-1 rounded-2xl border border-brand-border bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <Link href="/agentes-ia" className="rounded-xl px-4 py-2.5 text-sm font-medium text-brand-muted transition-colors hover:bg-brand-paper hover:text-brand-ink">
                {fT('solutions_ai_agents')}
              </Link>
              <Link href="/automacao-processos" className="rounded-xl px-4 py-2.5 text-sm font-medium text-brand-muted transition-colors hover:bg-brand-paper hover:text-brand-ink">
                {fT('solutions_automation')}
              </Link>
              <Link href="/aplicacoes-web" className="rounded-xl px-4 py-2.5 text-sm font-medium text-brand-muted transition-colors hover:bg-brand-paper hover:text-brand-ink">
                {fT('solutions_web_apps')}
              </Link>
              <Link href="/sites-ecommerce" className="rounded-xl px-4 py-2.5 text-sm font-medium text-brand-muted transition-colors hover:bg-brand-paper hover:text-brand-ink">
                {fT('solutions_ecommerce')}
              </Link>
            </div>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-brand-muted transition-colors duration-300 hover:bg-white hover:text-brand-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href={sectionHref('contact')}
            className="inline-flex items-center rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
          >
            {t('cta')}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-brand-border bg-white text-brand-ink shadow-sm"
          >
            <span
              className={`block h-px w-4 origin-center bg-current transition-transform duration-300 ${
                menuOpen ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-4 bg-current transition-all duration-200 ${
                menuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
            />
            <span
              className={`block h-px w-4 origin-center bg-current transition-transform duration-300 ${
                menuOpen ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id={mobileMenuId}
        className={`overflow-hidden border-b border-brand-border bg-brand-paper/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-[38rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          <Link
            href={sectionHref('services')}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-muted"
            onClick={() => setMenuOpen(false)}
          >
            {fT('solutions')}
          </Link>
          <Link href="/agentes-ia" className="rounded-2xl border border-transparent px-4 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-border hover:bg-white hover:text-brand-ink" onClick={() => setMenuOpen(false)}>
            {fT('solutions_ai_agents')}
          </Link>
          <Link href="/automacao-processos" className="rounded-2xl border border-transparent px-4 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-border hover:bg-white hover:text-brand-ink" onClick={() => setMenuOpen(false)}>
            {fT('solutions_automation')}
          </Link>
          <Link href="/aplicacoes-web" className="rounded-2xl border border-transparent px-4 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-border hover:bg-white hover:text-brand-ink" onClick={() => setMenuOpen(false)}>
            {fT('solutions_web_apps')}
          </Link>
          <Link href="/sites-ecommerce" className="rounded-2xl border border-transparent px-4 py-2 text-sm font-medium text-brand-muted transition-colors hover:border-brand-border hover:bg-white hover:text-brand-ink" onClick={() => setMenuOpen(false)}>
            {fT('solutions_ecommerce')}
          </Link>
          <div className="my-2 h-px w-full bg-brand-border" />
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-transparent px-4 py-3 text-base font-medium text-brand-muted transition-colors hover:border-brand-border hover:bg-white hover:text-brand-ink"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={sectionHref('contact')}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white"
            onClick={() => setMenuOpen(false)}
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </header>
  );
};
