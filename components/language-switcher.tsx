'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LANGUAGE_OPTIONS = [
  { locale: 'en', label: 'EN', flag: '🇬🇧' },
  { locale: 'pt', label: 'PT', flag: '🇵🇹' },
] as const;

type LanguageSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({
  className,
  compact = false,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const activeLocale = locale.startsWith('pt') ? 'pt' : 'en';

  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] p-1 backdrop-blur-sm',
        className
      )}
      aria-label="Language switcher"
    >
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = option.locale === activeLocale;

        return (
          <Link
            key={option.locale}
            href={pathname}
            locale={option.locale}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative inline-flex items-center rounded-full font-semibold tracking-[0.18em] text-white/65 transition-all duration-300 hover:text-white',
              compact ? 'gap-1 px-2.5 py-1 text-[11px]' : 'gap-1.5 px-3 py-1.5 text-xs',
              isActive && 'bg-white/[0.08] text-white'
            )}
          >
            <span aria-hidden="true" className={compact ? 'text-xs' : 'text-sm'}>
              {option.flag}
            </span>
            <span>{option.label}</span>
            <span
              className={cn(
                'absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-white/20 via-white to-white/20 transition-opacity duration-300',
                isActive ? 'opacity-100' : 'opacity-0'
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
