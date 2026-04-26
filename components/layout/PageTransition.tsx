'use client';

import { motion } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import IntroLoader from "@/components/home/IntroLoader";
import styles from "./PageTransition.module.css";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(isHome);

  useEffect(() => {
    if (isHome) {
      setRevealed(true);
      return; 
    }

    setRevealed(false);
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    
    // Safety fallback: Always reveal after 2.5s in case GSAP fails to trigger onComplete
    const safetyTimeout = setTimeout(() => {
      setRevealed(true);
      window.dispatchEvent(new CustomEvent("intro-complete"));
    }, 2500);

    if (!overlay || !logo) {
      setRevealed(true);
      clearTimeout(safetyTimeout);
      return;
    }

    const paths = logo.querySelectorAll("path");
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out overlay, then reveal content and unlock scroll!
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            setRevealed(true);
            (window as any).introDone = true;
            window.dispatchEvent(new CustomEvent("intro-complete"));
            clearTimeout(safetyTimeout);
          },
        });
      },
    });

    // Set up line-draw
    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    });

    // Draw logo lines
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.04,
    });

    // Brief hold
    tl.to({}, { duration: 0.15 });

    return () => {
      tl.kill();
    };
  }, [isHome, pathname]);

  // After overlay reveals, stagger-animate content blocks and global headings
  useEffect(() => {
    if (!revealed) return;
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-page-animate]");
    const headings = el.querySelectorAll("h1, h2, .title");

    const ctx = gsap.context(() => {
      // 1. Stagger standard page elements
      if (targets.length) {
        gsap.set(targets, { opacity: 0, y: 40 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.05,
        });
      }

      // 2. Global cinematic text reveal for all page headings
      if (headings.length) {
        gsap.fromTo(
          headings,
          { 
            opacity: 0, 
            y: 45, 
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" 
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0 -50%, 100% -50%, 100% 150%, 0 150%)",
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.1,
            clearProps: "clipPath" // prevent clipping artifacts after animation
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [revealed]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={styles.container}
    >
      {/* Children always render so assets preload behind overlay */}
      {/* Children render but are kept hidden by opacity initially if not revealed */}
      <div 
        style={{ 
          opacity: isHome || revealed ? 1 : 0,
          transition: 'opacity 0.4s ease'
        }}
      >
        {children}
      </div>

      {/* Intro sequence for Home page */}
      {isHome && <IntroLoader />}

      {/* Logo reveal overlay (non-home pages only) */}
      {!isHome && !revealed && (
        <div ref={overlayRef} className={styles.overlay} style={{ pointerEvents: 'auto' }}>
          <svg
            ref={logoRef}
            viewBox="0 0 200 220"
            className={styles.logo}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className={styles.path} d="M 99.2 0 L 0 44.3" />
            <path className={styles.path} d="M 99.2 0 L 200 47" />
            <path className={styles.path} d="M 0 44.3 L 76.3 180.4" />
            <path className={styles.path} d="M 200 47 L 123.7 180.4" />
            <path className={styles.path} d="M 76.3 180.4 L 99.2 163.7 L 123.7 180.4" />
            <path className={styles.path} d="M 76.3 180.4 L 99.2 220" />
            <path className={styles.path} d="M 123.7 180.4 L 99.2 220" />
            <path className={styles.path} d="M 99.2 0 L 99.2 163.7" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default PageTransition;
