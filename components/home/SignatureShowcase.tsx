'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './SignatureShowcase.module.css';

export default function SignatureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!imageRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      imageRef.current.style.transform = `translateY(${progress * 80}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Background image with parallax */}
      <div className={styles.imageWrap} ref={imageRef}>
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=90"
          alt="Meridian Hotel — signature interior by DRAW Studio"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className={styles.overlay} />

      {/* Text overlay */}
      <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
        <p className={`text-eyebrow ${styles.eyebrow}`}>Featured Project</p>
        <AnimatedHeading elementType="h2" className={styles.title}>
          Meridian Hotel
        </AnimatedHeading>
        <p className={styles.meta}>Goa, India · 2023 · Hospitality</p>
        <Link href="/projects/meridian-hotel" className={styles.cta}>
          <span>Explore this project</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>

      {/* Float label */}
      <div className={`${styles.floatLabel} ${visible ? styles.visible : ''}`}>
        <span>12,000 sq ft</span>
      </div>
    </section>
  );
}
