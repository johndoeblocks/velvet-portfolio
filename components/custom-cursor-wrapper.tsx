'use client';

import dynamic from 'next/dynamic';

const CustomCursorComponent = dynamic(() => import('./custom-cursor').then(mod => mod.CustomCursor), {
  ssr: false
});

export function CustomCursor() {
  return <CustomCursorComponent />;
}
