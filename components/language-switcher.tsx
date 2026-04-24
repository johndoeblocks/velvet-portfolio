'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { getLocalizedBlogPath } from '@/lib/blog-routes';
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
        'flex items-center rounded-full border border-slate-900/10 bg-white/80 p-1 shadow-sm backdrop-blur-sm',
        className
      )}
      aria-label="Language switcher"
    >
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = option.locale === activeLocale;
        const href = getLocalizedBlogPath(pathname, option.locale);

        return (
          <Link
            key={option.locale}
            href={href}
            locale={option.locale}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'inline-flex items-center rounded-full font-semibold tracking-[0.18em] transition-all duration-300',
              compact ? 'gap-1 px-2.5 py-1 text-[11px]' : 'gap-1.5 px-3 py-1.5 text-xs',
              isActive
                ? 'bg-[#0f4c5c] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <span aria-hidden="true" className={compact ? 'text-xs' : 'text-sm'}>
              {option.flag}
            </span>
            <span>{option.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
