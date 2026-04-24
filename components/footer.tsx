import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const navT = useTranslations('nav');
  const currentYear = new Date().getFullYear();
  const emailHref = ['mailto:', 'hello', '@', 'velvetneuron.com'].join('');

  const socialLinks = [
    { icon: Github, href: 'https://github.com/johndoeblocks', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/jo%C3%A3o-manteigas/',
      label: 'LinkedIn',
    },
  ];

  return (
    <footer className="border-t border-slate-900/10 bg-white/70">
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
                className="rounded-full"
              />
              <span className="text-base font-semibold tracking-tight text-slate-900">
                Velvet Neuron
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {t('navigation')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/#services" className="transition-colors hover:text-slate-900">
                  {navT('services')}
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="transition-colors hover:text-slate-900">
                  {navT('work')}
                </Link>
              </li>
              <li>
                <Link href="/#process" className="transition-colors hover:text-slate-900">
                  {navT('process')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-slate-900">
                  {navT('blog')}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition-colors hover:text-slate-900">
                  {navT('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {t('resources')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/blog" className="transition-colors hover:text-slate-900">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/cv" className="transition-colors hover:text-slate-900">
                  {t('cv')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-slate-900">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-slate-900">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {t('follow')}
            </h3>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white text-slate-600 transition-colors hover:text-slate-900"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <a href={emailHref} className="block transition-colors hover:text-slate-900">
                {t('email_label')}
              </a>
              <p>{t('location')}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900/8 pt-6 text-sm text-slate-500">
          © {currentYear} {t('company')}. {t('rights')}
        </div>
      </div>
    </footer>
  );
};
