'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './StudioStory.module.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 42, label: 'Projects' },
  { value: 14, label: 'Years' },
  { value: 8,  label: 'Awards' },
  { value: 3,  label: 'Continents' },
];

function StatItem({ value, label }: { value: number; label: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      nodeRef.current,
      { innerText: 0 },
      {
        innerText: value,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: nodeRef.current,
          start: 'top 90%',
        },
      }
    );
  }, [value]);

  return (
    <div className={styles.stat}>
      <span className={styles.statValue} ref={nodeRef}>0</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function StudioStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !imageWrapRef.current || !textColRef.current || !imageRef.current) return;

    // 1. Text column stagger reveal
    const textChildren = textColRef.current.children;
    gsap.fromTo(
      textChildren,
      { opacity: 0, y: 40, filter: 'blur(4px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    // 2. Image clipping mask reveal
    gsap.fromTo(
      imageWrapRef.current,
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.6,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: 'top 85%',
        },
      }
    );

    // 3. Image subtle zoom/parallax
    gsap.to(imageRef.current, {
      yPercent: 15,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.grid}>
        {/* Left: image */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrap} ref={imageWrapRef}>
            <Image
              ref={imageRef}
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85"
              alt="DRAW Studio workspace"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="50vw"
            />
          </div>
          <div className={styles.imageLabel}>
            <span>DRAW Studio</span>
            <span>Mumbai, India</span>
          </div>
        </div>

        {/* Right: text */}
        <div className={styles.textCol} ref={textColRef}>
          <p className={`text-eyebrow ${styles.eyebrow}`}>
            Our Studio
          </p>
          <AnimatedHeading elementType="h2" className={styles.title}>
            Architecture Rooted in<br />
            <span className="font-serif-accent">Intention</span>
          </AnimatedHeading>
          <div className={styles.body}>
            <p>
              DRAW was founded on a single belief: that the best room you can design is the one that asks nothing of you. No performance. No explanation. Just proportions that feel inevitable and materials that age with grace.
            </p>
            <p>
              We design for clarity first, then beauty — knowing that the two are rarely different things. Our work spans private residences, hospitality interiors, and commercial environments across India and beyond.
            </p>
            <p>
              Every project begins with a long period of listening. We want to understand a site's light before we touch its walls. We want to understand a client's life before we specify a single material.
            </p>
          </div>
          <div className={styles.contact}>
            <a href="mailto:hello@draw-studio.com" className={styles.contactLink}>
              hello@draw-studio.com
            </a>
            <span className={styles.separator}>·</span>
            <a href="tel:+919999999999" className={styles.contactLink}>
              +91 99 9999 9999
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        {stats.map((s) => (
          <StatItem key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}
