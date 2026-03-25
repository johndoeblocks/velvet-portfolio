import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/johndoeblocks', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jo%C3%A3o-manteigas/', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4 group w-fit">
              <Image
                src="/logo.png"
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">
                Velvet Neuron
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Digital infrastructure for companies that want to move faster.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {['portfolio', 'services', 'contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-5">
              {t('follow')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/[0.2] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <p>
            © {currentYear} {t('company')}. {t('rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
