'use client';

import React, {
  useEffect,
  useRef,
} from 'react';
import TypingAnimation from '@/components/animations/TypingAnimation';
import styles from './DesignPhilosophy.module.css';

const WORDS = [
  'intentional',
  'refined',
  'effortless',
  'enduring',
  'inevitable',
] as const;

export default function DesignPhilosophy() {
  // ── Viewport entrance ──────────────────────────────────────────────────
  const wrapRef = useRef<HTMLDivElement>(null);
  const attrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [wrapRef.current, attrRef.current].filter(Boolean) as Element[];
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.section}
      aria-labelledby="design-philosophy-heading"
    >
      <div className={styles.inner}>

        <div
          ref={wrapRef}
          className={styles.quoteWrap}
          id="design-philosophy-heading"
          role="heading"
          aria-level={2}
        >
          <div className={styles.quote}>
            <span className={styles.staticPart}>We shape spaces that feel </span>
            <TypingAnimation
              words={[...WORDS]}
              className={styles.dynamicWord}
              typeSpeed={60}
              deleteSpeed={100}
              pauseDelay={2000}
              loop={true}
              showCursor={true}
              blinkCursor={true}
              cursorStyle="line"
            />

          </div>
        </div>

        {/* Attribution */}
        <div ref={attrRef} className={styles.attribution}>
          <span className={styles.attributionName}>Bhanu Kharbanda</span>
          <span className={styles.attributionRole}>Co-Founder · Principal Architect</span>
        </div>

      </div>
    </section>
  );
}
