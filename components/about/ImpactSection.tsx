'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './ImpactSection.module.css';

type Stat = {
  value: number;
  suffix: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imageTransform?: string;
};

const stats: Stat[] = [
  {
    value: 200,
    suffix: '+',
    title: 'Projects Completed',
    description: 'From villas to refined residences, each commission is shaped with clarity, restraint, and detail.',
    imageSrc: '/sketches/i1.png',
    imageAlt: 'Paper plane sketch',
    imageTransform: 'scale(1.92) translate(7%, -7%)',
  },
  {
    value: 50,
    suffix: '+',
    title: 'Ongoing Projects',
    description: 'Every home begins with listening. We design alongside clients with patience, rigor, and a strong point of view.',
    imageSrc: '/sketches/i2.png',
    imageAlt: 'Heart sketch',
    imageTransform: 'scale(2.25) translate(2%, -2%)',
  },
  {
    value: 13,
    suffix: '+',
    title: 'Years of Practice',
    description: 'A decade of building quiet, enduring spaces has sharpened both the instinct and the discipline behind the studio.',
    imageSrc: '/sketches/i3.png',
    imageAlt: 'Planet sketch',
    imageTransform: 'scale(2.28) translate(2%, -1%)',
  },
  {
    value: 40,
    suffix: '+',
    title: 'Designers & Architects',
    description: 'A multidisciplinary team working across interiors, architecture, detailing, and site execution as one studio.',
    imageSrc: '/sketches/i4.png',
    imageAlt: 'Hand sketch',
    imageTransform: 'scale(2.28) translate(3%, -2%)',
  },
];

function CountUp({
  value,
  suffix,
  isActive,
  duration = 1800,
}: {
  value: number;
  suffix: string;
  isActive: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let frameId = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [duration, isActive, value]);

  return (
    <span className={styles.number}>
      {count.toLocaleString()}
      <span className={styles.suffix}>{suffix}</span>
    </span>
  );
}

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="impact-heading">
      <div className={styles.container}>
        <div className={styles.headingBlock}>
          <p className={`text-eyebrow ${styles.eyebrow}`}>Not to flex, but...</p>
          <AnimatedHeading
            elementType="h2"
            id="impact-heading"
            className={styles.heading}
          >
            The Numbers Behind the Practice
          </AnimatedHeading>
        </div>

        <div className={styles.grid}>
          {stats.map((stat) => (
            <article key={stat.title} className={styles.card}>
              <div className={styles.iconWrap}>
                <div className={styles.iconInner}>
                  {stat.imageSrc ? (
                    <Image
                      src={stat.imageSrc}
                      alt={stat.imageAlt ?? stat.title}
                      fill
                      className={styles.iconImage}
                      sizes="144px"
                      style={{ transform: stat.imageTransform }}
                    />
                  ) : null}
                </div>
              </div>

              <div className={styles.copy}>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  isActive={isActive}
                />
                <h3 className={styles.title}>{stat.title}</h3>
                <p className={styles.description}>{stat.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
