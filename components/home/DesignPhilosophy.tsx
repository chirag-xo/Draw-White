'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './DesignPhilosophy.module.css';

// ── useLoop (provided, unmodified) ─────────────────────────────────────────
const useLoop = (delay = 1000) => {
  const [key, setKey] = useState(0);

  const incrementKey = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(incrementKey, delay);
    return () => clearInterval(interval);
  }, [delay, incrementKey]);

  return { key };
};

// ── Word set ───────────────────────────────────────────────────────────────
const WORDS = [
  'intentional',
  'calibrated',
  'refined',
  'effortless',
  'enduring',
  'inevitable',
] as const;

// ── Component ──────────────────────────────────────────────────────────────
export default function DesignPhilosophy() {
  const { key } = useLoop(2800);

  const currentWord = useMemo(
    () => WORDS[key % WORDS.length],
    [key]
  );

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

        {/*
          The outer wrapper fades in once on scroll entry.
          overflow: hidden clips the vertical slide of AnimatePresence.
          The entire quote line slides as one block — the static prefix
          is identical on every frame so only the last word registers
          as different to the eye. Feels like a thought evolving,
          not a widget cycling.
        */}
        <div
          ref={wrapRef}
          className={styles.quoteWrap}
          aria-label={`We shape spaces that feel ${currentWord}.`}
          id="design-philosophy-heading"
          role="heading"
          aria-level={2}
        >
          <AnimatePresence mode="popLayout">
            <motion.blockquote
              key={currentWord}
              className={styles.quote}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"      /* real label is on wrapper */
            >
              {/* Static prefix — identical every cycle */}
              <span className={styles.staticPart}>We shape spaces that feel </span>

              {/* Dynamic last word — italic serif, different each cycle */}
              <span className={styles.dynamicWord}>{currentWord}.</span>
            </motion.blockquote>
          </AnimatePresence>
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
