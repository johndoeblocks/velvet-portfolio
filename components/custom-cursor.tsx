'use client';

import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const targetPosition = useRef({ x: -100, y: -100 });
  const currentPosition = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    setIsVisible(true);
    document.body.classList.add('has-custom-cursor');

    const renderCursor = () => {
      currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * 0.18;
      currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * 0.18;

      const transform = `translate3d(${currentPosition.current.x}px, ${currentPosition.current.y}px, 0)`;

      if (dotRef.current) {
        dotRef.current.style.transform = transform;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = transform;
      }

      frameRef.current = window.requestAnimationFrame(renderCursor);
    };

    const moveCursor = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    frameRef.current = window.requestAnimationFrame(renderCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('has-custom-cursor');
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ease-out ${
            isHovering ? 'h-12 w-12 opacity-80' : 'h-2 w-2 opacity-100'
          }`}
        />
      </div>

      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`rounded-full border border-purple-500/30 transition-all duration-300 ease-out ${
            isHovering ? 'h-16 w-16 opacity-60' : 'h-8 w-8 opacity-30'
          }`}
        />
      </div>
    </>
  );
};
