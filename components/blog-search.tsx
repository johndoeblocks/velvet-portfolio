'use client';

import React, { useDeferredValue, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { BlogPostPreview } from '@/lib/blog-data';

type BlogSearchProps = {
  posts: BlogPostPreview[];
  categories: string[];
  locale: 'en' | 'pt';
  labels: {
    title: string;
    description: string;
    searchPlaceholder: string;
    allCategories: string;
    noResults: string;
    readArticle: string;
    updated: string;
  };
};

export function BlogSearch({ posts, categories, locale, labels }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(labels.allCategories);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === labels.allCategories || post.category === activeCategory;
    const searchableText = [
      post.title,
      post.description,
      post.excerpt,
      post.category,
      ...post.keywords,
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && searchableText.includes(deferredQuery);
  });

  return (
    <section className="px-6 py-20" id="blog-search">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f4c5c]">
              Blog
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              {labels.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {labels.description}
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-900/10 bg-white p-3 shadow-sm">
            <label className="flex items-center gap-3 rounded-[1.5rem] bg-[#f6f1e8] px-5 py-4 text-slate-700">
              <Search className="h-5 w-5 text-[#0f4c5c]" aria-hidden="true" />
              <span className="sr-only">{labels.searchPlaceholder}</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={labels.searchPlaceholder}
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-500"
                type="search"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[labels.allCategories, ...categories].map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-[#0f4c5c] bg-[#0f4c5c] text-white'
                    : 'border-slate-900/10 bg-white text-slate-600 hover:border-[#0f4c5c]/40 hover:text-slate-950'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group flex min-h-[24rem] flex-col rounded-[2rem] border border-slate-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8"
            >
              <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span>{post.category}</span>
                <time dateTime={post.updatedAt}>
                  {labels.updated} {formatDate(post.updatedAt, locale)}
                </time>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
                <Link href={post.href} className="transition-colors group-hover:text-[#0f4c5c]">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-4 flex-1 text-base leading-7 text-slate-600">
                {post.excerpt}
              </p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-900/8 pt-5">
                <span className="text-sm text-slate-500">{post.readingTime}</span>
                <Link
                  href={post.href}
                  className="rounded-full bg-[#0f4c5c] px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  {labels.readArticle}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-900/20 bg-white/70 p-8 text-center text-slate-600">
            {labels.noResults}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function formatDate(value: string, locale: 'en' | 'pt') {
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-PT' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
