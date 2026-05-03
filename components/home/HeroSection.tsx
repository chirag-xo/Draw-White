'use client';

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const IMAGES = [
  '/images/projects/DSC06981.jpg',
  '/images/projects/DSC07329.jpg',
  '/images/projects/House%206.jpg',
  '/images/projects/TGP03936-HDR-1.jpg',
  '/images/projects/DSC07337.jpg',
  '/images/projects/DSC07091.jpg',
  '/images/projects/TONY%20_%20GUY%20AGRA%20(20).jpg',
  '/images/projects/Malani%20Marble%20(40).jpg',
  '/images/projects/Copy%20of%20TGP04029-HDR-1.jpg',
  '/images/projects/tng-1%20-%20Edited.jpg',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;

      gsap.to(`.${styles.imageWrapper}`, {
        yPercent: 4,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="DRAW studio homepage hero">
      <div className={styles.mediaLayer}>
        <AnimatePresence>
          <motion.div
            key={IMAGES[index]}
            initial={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
            transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
            className={styles.imageWrapper}
          >
            <Image
              src={IMAGES[index]}
              alt={`Project Showcase ${index + 1}`}
              fill
              priority
              className={styles.heroImage}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

      </div>

      <div className={styles.overlay} aria-hidden="true" />

      {/* Text content removed per user request */}

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
