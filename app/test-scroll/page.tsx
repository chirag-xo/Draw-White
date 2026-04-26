'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TestScrollPage() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Validate that heading exists before animating
      if (!headingRef.current) return;

      // Animate text opacity + position using scrub
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      className="h-[300vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <h1 
          ref={headingRef} 
          className="test-heading text-4xl"
          style={{ willChange: 'transform, opacity' }} // Performance optimization
        >
          Scroll Animation Test
        </h1>
      </div>
    </section>
  );
}
