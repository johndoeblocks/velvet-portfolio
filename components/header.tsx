'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export const Header: React.FC = () => {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const normalizedPathname = pathname.replace(/^\/(en|pt)(?=\/|$)/, '') || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: t('work'), href: '#portfolio' },
    { label: t('services'), href: '#services' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
  ];

  const handleLanguageToggle = (locale: 'en' | 'pt') => {
    router.replace(normalizedPathname as '/', { locale });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logo.png"
            alt="Velvet Neuron"
            width={36}
            height={36}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-white font-bold text-lg tracking-tight group-hover:text-purple-300 transition-colors duration-300">
            Velvet Neuron
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-3/4 transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Language Switcher & CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-white/[0.04] rounded-full px-1 py-1 border border-white/[0.06]">
            {(['en', 'pt'] as const).map((locale) => (
              <motion.button
                key={locale}
                onClick={() => handleLanguageToggle(locale)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  currentLocale === locale
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {currentLocale === locale && (
                  <motion.div
                    layoutId="locale-indicator"
                    className="absolute inset-0 bg-purple-600/80 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{locale.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>

          <motion.a
            href="#contact"
            className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-purple-100 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t('contact')}
          </motion.a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-3">
          <div className="flex items-center bg-white/[0.04] rounded-full px-1 py-1 border border-white/[0.06]">
            {(['en', 'pt'] as const).map((locale) => (
              <motion.button
                key={locale}
                onClick={() => handleLanguageToggle(locale)}
                className={`relative px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                  currentLocale === locale
                    ? 'text-white'
                    : 'text-gray-500'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {currentLocale === locale && (
                  <motion.div
                    layoutId="locale-indicator-mobile"
                    className="absolute inset-0 bg-purple-600/80 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{locale.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-1">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-gray-300 hover:text-white py-3 text-lg font-medium transition-colors border-b border-white/[0.04]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
