'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealStagger from '../animations/RevealStagger';
import AnimatedHeading from '../animations/AnimatedHeading';
import styles from './HeroSection.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VIDEO_SRC = '/studio-home-hero.mp4';
const POSTER_SRC =
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1800&q=90';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlayback = () => {
      video.play().catch(() => {});
    };

    attemptPlayback();
    window.addEventListener('intro-complete', () => {
      attemptPlayback();
      setShowContent(true);
    });

    // Fallback if no intro loader
    const timer = setTimeout(() => setShowContent(true), 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('intro-complete', attemptPlayback);
    };
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !videoRef.current) return;

      const video = videoRef.current;
      const section = sectionRef.current;

      gsap.to(video, {
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
        <video
          ref={videoRef}
          className={`${styles.video} ${isReady ? styles.ready : ''}`}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      {showContent && (
        <div className={styles.content}>
          <RevealStagger delay={0.2}>
            <p className={styles.kicker}>DRAW / Interior Architecture Studio</p>
          </RevealStagger>
          
          <div className={styles.metaRow}>
            <RevealStagger delay={0.4}>
              <span>Mumbai</span>
            </RevealStagger>
            <AnimatedHeading 
              elementType="span" 
              delay={0.6}
              threshold={0.1} // Start almost immediately
            >
              Spaces shaped by proportion, <span className="font-serif-accent">light, and restraint</span>
            </AnimatedHeading>
          </div>

          <RevealStagger delay={1.2}>
            <Link href="/projects" className={styles.cta}>
              View Selected Works
            </Link>
          </RevealStagger>
        </div>
      )}

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  );
}

