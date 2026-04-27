'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './OurJourney.module.css';

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: "2013",
    title: "The Genesis",
    story: "It began with two college friends, one laptop, and countless conversations over coffee at Cafe Coffee Day. What started with small renovations and family projects was driven by a much larger vision—to shape spaces that feel timeless.",
    img: "/sketches/01.png"
  },
  {
    year: "2015",
    title: "The First Studio",
    story: "The vision took form with the opening of Draw Design’s first studio in Gurgaon, led by a small team of 4. From compact renovations to boutique interiors, every project became a step toward something bigger.",
    img: "/sketches/02.png"
  },
  {
    year: "2017",
    title: "The Turning Point",
    story: "Recognition followed with the studio’s first design award, marking the moment Draw Design stepped into a new league. The scale grew. So did the ambition—luxury villas, high-rise residences, and larger lifestyle spaces soon followed.",
    img: "/sketches/03.png"
  },
  {
    year: "2026",
    title: "Still Evolving",
    story: "Today, Draw Design is a 40+ strong team of architects and designers, crafting large-scale residences, resort-style villas, and landmark spaces. What began in a coffee shop continues to evolve, still growing, still redefining spaces, and still driven by the same passion that started it all.",
    img: "/sketches/04.png"
  }
];

export default function OurJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray('[data-journey-step]') as HTMLElement[];

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    // Refresh ScrollTrigger to ensure all positions are calculated correctly
    ScrollTrigger.refresh();

    // Progress pill animation
    const pill = containerRef.current.querySelector(`.${styles.pill}`);

    if (pill && styles.pill) {
      gsap.to(pill, {
        y: 260, // Total line height (300) - pill height (40)
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.section} id="journey">
      <div className={styles.stickyContent}>
        <div className={styles.leftCol}>
          <div className={styles.contentWrap}>
            <p className={styles.eyebrow}>Our Journey</p>

            <div className={styles.timelineProgress}>
              <div className={styles.line}>
                <div className={styles.pill} />
              </div>
            </div>

            <div className={styles.textContainer}>
              {journeyData.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.textBlock} ${activeIndex === i ? styles.active : ''}`}
                >
                  <span className={styles.year}>{item.year}</span>
                  <AnimatedHeading elementType="h3" className={styles.title}>
                    {item.title}
                  </AnimatedHeading>
                  <p className={styles.story}>{item.story}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.imageStack}>
            {journeyData.map((item, i) => {
              const isSketch = item.img.startsWith('/sketches/');
              return (
                <div
                  key={i}
                  className={styles.imageWrap}
                  data-journey-step
                  style={isSketch ? { backgroundColor: '#ffffff' } : {}}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className={styles.image}
                    style={isSketch ? { objectFit: 'contain', padding: '15%' } : {}}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
