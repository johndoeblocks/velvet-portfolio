'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/language-switcher';

export const Header: React.FC = () => {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuId = 'mobile-navigation';

  const navItems = [
    { label: t('services'), href: '/#services' },
    { label: t('work'), href: '/#portfolio' },
    { label: t('process'), href: '/#process' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-900/10 bg-[#f6f1e8]/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icon.svg"
            alt=""
            width={38}
            height={38}
            aria-hidden="true"
            priority
            className="rounded-full"
          />
          <span className="text-base font-semibold tracking-tight text-slate-900">
            Velvet Neuron
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-300 hover:bg-white hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-full bg-[#0f4c5c] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0c3d49]"
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
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-slate-900/10 bg-white text-slate-900 shadow-sm"
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
        className={`overflow-hidden border-b border-slate-900/10 bg-[#f6f1e8]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-transparent px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:border-slate-900/10 hover:bg-white hover:text-slate-900"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-3 inline-flex items-center justify-center rounded-full bg-[#0f4c5c] px-5 py-3 text-sm font-semibold text-white"
            onClick={() => setMenuOpen(false)}
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </header>
  );
};
