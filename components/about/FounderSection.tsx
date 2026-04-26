'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './FounderSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// ... (founders data remains same)

const founders = [
  {
    id: '01',
    name: "Ananya Sharma",
    role: "Founding Principal",
    description: "Trained at the Architectural Association, London. Believes that great interiors are discovered, not designed. Her approach is rooted in the dialogue between natural light and raw materials.",
    quote: "Design is not what we add, but what we allow to emerge.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=85",
    signature: "/images/signature1.svg"
  },
  {
    id: '02',
    name: "Vikram Nair",
    role: "Design Lead",
    description: "Former partner at a Milan studio. Specialises in material research and spatial sequencing with an emphasis on sensory experience. He views every project as a sequence of curated moments.",
    quote: "A space should not just be seen; it should be felt through the soles of your feet.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=85",
    signature: "/images/signature2.svg"
  },
  {
    id: '03',
    name: "Leila Desai",
    role: "Interior Architect",
    description: "Architect with a background in conservation. She ensures every new project understands its site before speaking. Her work often bridges the gap between historical context and modern utility.",
    quote: "Every building has a memory. Our job is to listen to it before we start sketching.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=85",
    signature: "/images/signature3.svg"
  }
];

const SignaturePlaceholder = () => (
  <svg width="140" height="50" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.signatureSvg}>
    <path d="M10 35C25 30 45 40 65 25C85 10 110 20 130 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 20C35 15 45 30 70 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    rowsRef.current.forEach((row, index) => {
      if (!row) return;

      const mask = row.querySelector(`.${styles.imageMask}`);
      const image = row.querySelector(`.${styles.founderImage}`);
      const otherText = row.querySelectorAll(`.${styles.role}, .${styles.description}, .${styles.quote}, .${styles.signature}`);

      // Initial States
      gsap.set(image, {
        scale: 1.1,
        yPercent: index % 2 === 0 ? 20 : -20,
        opacity: 0
      });

      gsap.set(mask, {
        yPercent: index % 2 === 0 ? 100 : -100
      });

      gsap.set([...Array.from(otherText)], {
        y: 40,
        opacity: 0
      });

      // Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 90%", // Reveal earlier
          toggleActions: "play none none none"
        }
      });

      // Image Mask Animation (Roll Reveal)
      tl.to(mask, {
        yPercent: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // Image Content Animation
      tl.to(image, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power3.out"
      }, "-=1");

      // Other text elements staggered
      tl.to(otherText, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

      // Optional Parallax
      gsap.to(image, {
        y: -40,
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="founders" className={styles.founderSection}>
      <div className={styles.container}>
        {founders.map((founder, index) => (
          <div 
            key={founder.id} 
            ref={el => { rowsRef.current[index] = el; }}
            className={`${styles.founderRow} ${index % 2 !== 0 ? styles.reverseRow : ''}`}
          >
            {/* Image Block */}
            <div className={styles.imageBlock}>
              <div className={styles.imageWrapper}>
                <div className={styles.imageMask}>
                  <div className={styles.founderImage}>
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className={styles.actualImage}
                      sizes="(max-width: 1400px) 60vw, 800px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Block */}
            <div className={styles.textBlock}>
              <div className={styles.textContent}>
                <p className={styles.role}>{founder.role}</p>
                <AnimatedHeading className={styles.name}>
                  {founder.name}
                </AnimatedHeading>
                <p className={styles.description}>{founder.description}</p>
                <blockquote className={styles.quote}>
                  {founder.quote}
                </blockquote>
                <div className={styles.signature}>
                  <SignaturePlaceholder />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
