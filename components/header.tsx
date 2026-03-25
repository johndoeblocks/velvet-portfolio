'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export const Header: React.FC = () => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const currentLocale = useLocale();
  const activeLocale: 'en' | 'pt' = currentLocale.startsWith('pt') ? 'pt' : 'en';
  const [menuOpen, setMenuOpen] = useState(false);

  const normalizedPathname = pathname.replace(/^\/(en|pt)(?=\/|$)/, '') || '/';
  const mobileMenuId = 'mobile-navigation';

  const navItems = [
    { label: t('work'), href: '#portfolio' },
    { label: t('services'), href: '#services' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <header
      className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl shadow-lg shadow-black/20"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            aria-hidden="true"
            priority
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-white font-bold text-lg tracking-tight group-hover:text-purple-300 transition-colors duration-300">
            Velvet Neuron
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-gray-400 hover:-translate-y-0.5 hover:text-white transition-all text-sm font-medium group"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-3/4 transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Language Switcher & CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-white/[0.04] rounded-full px-1 py-1 border border-white/[0.06]">
            {(['en', 'pt'] as const).map((locale) => (
              <Link
                key={locale}
                href={normalizedPathname as '/'}
                locale={locale}
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeLocale === locale
                    ? 'bg-purple-600/80 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>

          <a
            href="#contact"
            className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:scale-[1.03] hover:bg-purple-100 transition-all duration-300"
          >
            {t('contact')}
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-3">
          <div className="flex items-center bg-white/[0.04] rounded-full px-1 py-1 border border-white/[0.06]">
            {(['en', 'pt'] as const).map((locale) => (
              <Link
                key={locale}
                href={normalizedPathname as '/'}
                locale={locale}
                className={`relative px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeLocale === locale
                    ? 'bg-purple-600/80 text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
            className="text-white w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block h-px w-5 origin-center bg-white transition-transform duration-300 ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-all duration-200 ${
                menuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
            />
            <span
              className={`block h-px w-5 origin-center bg-white transition-transform duration-300 ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id={mobileMenuId}
        className={`overflow-hidden border-b border-white/[0.06] bg-black/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-b-transparent'
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-white/[0.04] py-3 text-lg font-medium text-gray-300 transition-colors hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
