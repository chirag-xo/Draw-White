'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import styles from './journal-components.module.css';

// Register ScrollToPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  activeId: string;
  completedSections: Set<string>;
  progress: number;
}

export const TableOfContents = ({ headings, activeId, completedSections, progress }: TableOfContentsProps) => {
  if (headings.length === 0) return null;

  return (
    <nav className={styles.tocSidebar}>
      <span className={styles.sidebarLabel}>CONTENTS</span>
      
      <div className={styles.tocList}>
        {/* Animated Progress Line */}
        <div className={styles.tocLineContainer}>
          <div className={styles.tocLineBase} />
          <motion.div 
            className={styles.tocLineProgress}
            style={{ scaleY: progress }}
            initial={{ scaleY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          />
        </div>

        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isCompleted = completedSections.has(heading.id);
          
          return (
            <motion.a
              key={heading.id}
              href={`#${heading.id}`}
              className={`${styles.tocItem} ${isActive ? styles.tocItemActive : ''}`}
              animate={{ 
                opacity: isActive ? 1 : 0.4,
                x: isActive ? 10 : 0,
                scale: isActive ? 1.02 : 1
              }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  const offset = 120;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = el.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;

                  gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: offsetPosition, autoKill: true },
                    ease: "power3.inOut"
                  });
                }
              }}
            >
              <span className={styles.tocText}>{heading.text}</span>
              
              <AnimatePresence>
                {isCompleted && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={styles.tocCheck}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          );
        })}
      </div>

      <div className={styles.tocFooter}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>6 min read</span>
      </div>
    </nav>
  );
};
