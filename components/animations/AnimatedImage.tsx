'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function AnimatedImage({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.8
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const img = containerRef.current.querySelector('img');
      if (!img) return;

      // Reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${threshold * 100}%`,
          toggleActions: 'play none none none',
        }
      });

      tl.fromTo(
        containerRef.current,
        { 
          autoAlpha: 0, 
          y: 30 
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          delay: delay,
          ease: 'power3.out'
        }
      );

      tl.fromTo(
        img,
        { 
          scale: 1.1,
          filter: 'grayscale(1)' 
        },
        {
          scale: 1,
          filter: 'grayscale(0)',
          duration: 1.5,
          ease: 'power2.out'
        },
        '<'
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  );
}
