'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { team } from '@/data/team';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './TeamSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current || !joinRef.current) return;

    // Header reveal
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      }
    );

    // Cards stagger
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );

    // Join prompt reveal
    gsap.fromTo(
      joinRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: joinRef.current,
          start: 'top 90%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <p className={`text-eyebrow ${styles.eyebrow}`}>The People</p>
          <AnimatedHeading elementType="h2" className={styles.title}>
            Studio <span className="font-serif-accent">Culture</span>
          </AnimatedHeading>
        </div>

        {/* Team grid */}
        <div className={styles.grid} ref={gridRef}>
          {team.map((member) => (
            <div key={member.id} className={styles.card}>
              <div className={styles.portrait}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <div className={styles.info}>
                <AnimatedHeading elementType="h3" className={styles.name}>
                  {member.name}
                </AnimatedHeading>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Join prompt */}
        <div className={styles.join} ref={joinRef}>
          <p className={styles.joinText}>
            We are always interested in thoughtful architects and designers who value clarity and material integrity.
          </p>
          <Link href="/contact" className={styles.joinLink}>
            Get in touch →
          </Link>
        </div>
      </div>
    </section>
  );
}
