'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from '../animations/AnimatedHeading';
import RevealStagger from '../animations/RevealStagger';
import styles from './ProcessTimeline.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const phases = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We begin with the site, the brief, and the habits that will live inside the finished space.',
  },
  {
    number: '02',
    title: 'Concept',
    description:
      'Plans, material studies, and atmosphere are edited down until the direction feels singular.',
  },
  {
    number: '03',
    title: 'Refinement',
    description:
      'Every junction is coordinated in detail so clarity survives the construction process.',
  },
  {
    number: '04',
    title: 'Execution',
    description:
      'We stay close to site, calibrating the built outcome until it matches the original intent.',
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="process-heading">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left Side: Heading */}
          <div className={styles.header}>
            <RevealStagger threshold={0.8} stagger={0.15}>
              <p className={styles.eyebrow}>How We Work</p>
              <AnimatedHeading
                id="process-heading"
                className={styles.title}
                threshold={0.8}
              >
                Our <span className="font-serif-accent italic">Process</span>
              </AnimatedHeading>
              <p className={styles.subtitle}>
                A structured journey from raw site to refined architecture.
              </p>
            </RevealStagger>
          </div>

          {/* Right Side: 2x2 Cards */}
          <div className={styles.cardsGrid}>
            {phases.map((phase, i) => (
              <div key={phase.number} className={styles.processCard}>
                <span className={styles.stepNumber}>{phase.number}</span>
                <h3 className={styles.stepTitle}>{phase.title}</h3>
                <p className={styles.stepDescription}>{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
