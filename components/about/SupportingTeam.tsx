'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { supportingTeam } from '@/data/supporting-team';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './SupportingTeam.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function SupportingTeam() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray(`.${styles.teamCard}`, containerRef.current);

    // Cards animation
    gsap.fromTo(cards,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="team-supporting" className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.headingBlock}>
          <span className={styles.sectionLabel}>Team</span>
          <AnimatedHeading className={styles.sectionHeading}>
            The People Behind the Work
          </AnimatedHeading>
        </div>

        <div className={styles.teamGrid}>
          {supportingTeam.map((member) => (
            <div 
              key={member.id} 
              className={styles.teamCard}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={styles.image}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <AnimatedHeading elementType="h3" className={styles.name}>
                    {member.name}
                  </AnimatedHeading>
                  <span className={styles.role}>{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
