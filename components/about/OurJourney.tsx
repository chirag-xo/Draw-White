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
    year: "2010",
    title: "Foundation",
    story: "DRAW was founded on a single belief: that the best room is the one that asks nothing of you. We started in a small studio in Mumbai, focusing on the raw integrity of materials and the quiet power of proportions.",
    img: "/sketches/a.png"
  },
  {
    year: "2014",
    title: "Exploration",
    story: "Our middle years were defined by a rigorous study of light and local topographies. We moved beyond simple interiors to architecture that responds to the specific climate and culture of its site.",
    img: "/sketches/b.png"
  },
  {
    year: "2018",
    title: "Breakthrough",
    story: "A defining period where our language of measured restraint became singular. We began coordinating every junction in detail, ensuring spatial clarity survived the construction process.",
    img: "/sketches/c.png"
  },
  {
    year: "2022",
    title: "Expansion",
    story: "Taking the intimacy of residential design to a larger scale. Our work expanded into hospitality and commercial environments that prioritize atmosphere and human habits over spectacle.",
    img: "/sketches/d.png"
  },
  {
    year: "Present",
    title: "Ongoing Evolution",
    story: "Today, we continue to calibrate built outcomes until they match the original intent. The methodology remains intentionally spare: less noise, more silence.",
    img: "/sketches/e.png"
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
        start: "top 70%", // Trigger when item enters 70% from top
        end: "bottom 30%", // End when item leaves 30% from top
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

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
      {isMounted && (
        <div className={styles.backgroundWrap}>
          <Image
            src="/sketches/about-1.jpeg"
            alt=""
            fill
            className={styles.backgroundImage}
            priority
          />
        </div>
      )}
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
