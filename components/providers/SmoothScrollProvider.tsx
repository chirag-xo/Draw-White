'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

declare global {
  interface Window {
    lenis: Lenis | null;
  }
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Check if intro is already marked as done globally
    const isIntroDone = (window as any).introDone;

    if (!isIntroDone) {
      // stop Lenis so the intro loader can play without scrolling intervention
      lenis.stop();
    }

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Listen for the custom event broadcast by IntroLoader.tsx or PageTransition.tsx
    const startLenis = () => {
      (window as any).introDone = true;
      lenis.start();
      ScrollTrigger.refresh();
    };

    window.addEventListener('intro-complete', startLenis);

    // Safety fallback: if no event fires within 3.5s, unlock anyway
    const safetyUnlock = setTimeout(startLenis, 3500);

    return () => {
      window.removeEventListener('intro-complete', startLenis);
      clearTimeout(safetyUnlock);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
