"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
 
export const MouseFollowingEyes: React.FC = () => {
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);
  const pupil1Ref = useRef<HTMLDivElement>(null);
  const pupil2Ref = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const eyes = [
      { eye: eye1Ref, pupil: pupil1Ref },
      { eye: eye2Ref, pupil: pupil2Ref },
    ];

    const handleMouseMove = (e: MouseEvent) => {
      eyes.forEach(({ eye, pupil }) => {
        if (!eye.current || !pupil.current) return;

        const rect = eye.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) return;

        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const angle = Math.atan2(dy, dx);
        const maxMove = 5;

        pupil.current.style.transform = `translate(${Math.cos(angle) * maxMove}px, ${Math.sin(angle) * maxMove}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
 
  return (
    <div className="flex gap-1.5">
      <Eye eyeRef={eye1Ref} pupilRef={pupil1Ref} />
      <Eye eyeRef={eye2Ref} pupilRef={pupil2Ref} />
    </div>
  );
};
 
interface EyeProps {
  eyeRef: React.RefObject<HTMLDivElement | null>;
  pupilRef: React.RefObject<HTMLDivElement | null>;
}
 
const Eye: React.FC<EyeProps> = ({ eyeRef, pupilRef }) => {
  return (
    <div
      ref={eyeRef}
      className="relative bg-white border-[2.5px] border-brand-primary rounded-full h-8 w-8 flex items-center justify-center overflow-hidden"
    >
      <div
        ref={pupilRef}
        className="absolute bg-brand-primary rounded-full h-3.5 w-3.5 transition-all duration-[5ms]"
      >
        <div className="w-[3px] h-[3px] bg-white rounded-full absolute bottom-0.5 right-0.5"></div>
      </div>
    </div>
  );
};
