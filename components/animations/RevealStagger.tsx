'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface Props {
  children: React.ReactNode;
  className?: string; // Class for the container
  itemSelector?: string; // Selector for items to animate (defaults to direct children)
  delay?: number;
  stagger?: number;
  yOffset?: number;
  threshold?: number;
}

export default function RevealStagger({ 
  children, 
  className = '', 
  itemSelector, 
  delay = 0, 
  stagger = 0.1,
  yOffset = 30,
  threshold = 0.9 // Default to triggering when element is at 90% of viewport height
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = itemSelector 
        ? gsap.utils.toArray(itemSelector, containerRef.current) 
        : Array.from(containerRef.current.children);

      if (items.length === 0) return;

      // Using individual triggers for each item for a more "professional" feel
      // that responds to the specific position of each element.
      items.forEach((item: any, i) => {
        gsap.fromTo(
          item,
          { 
            autoAlpha: 0, 
            y: yOffset 
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            delay: delay + (i * stagger * 0.5), // Subtle base stagger
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: `top ${threshold * 100}%`,
              toggleActions: 'play none none none',
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
