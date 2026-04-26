'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredProjects } from '@/data/projects';
import styles from './FeaturedProjects.module.css';

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Header */}
      <div className={`${styles.header} ${visible ? styles.visible : ''}`}>
        <div>
          <p className={`text-eyebrow ${styles.eyebrow}`}>Selected Work</p>
          <h2 className={styles.title}>Our Projects</h2>
        </div>
        <Link href="/projects" className={styles.viewAll}>
          View all work
          <span className={styles.arrow}>→</span>
        </Link>
      </div>

      {/* Bento Grid */}
      <div className={styles.grid}>
        {/* Large featured card */}
        <Link
          href={`/projects/${featuredProjects[0].slug}`}
          className={`${styles.cardLarge} ${visible ? styles.cardVisible : ''}`}
          style={{ '--delay': '0ms' } as React.CSSProperties}
        >
          <div className={styles.imageWrap}>
            <Image
              src={featuredProjects[0].gallery[1] || featuredProjects[0].img}
              alt={featuredProjects[0].title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 900px) 100vw, 66vw"
            />
          </div>
          <div className={styles.cardOverlay}>
            <div className={styles.cardMeta}>
              <span className={styles.location}>{featuredProjects[0].location}</span>
              <span className={styles.category}>{featuredProjects[0].category}</span>
            </div>
            <div className={styles.cardBottom}>
              <h3 className={styles.cardTitle}>{featuredProjects[0].title}</h3>
              <p className={styles.cardTagline}>{featuredProjects[0].description}</p>
              <span className={styles.cardCta}>View Project →</span>
            </div>
          </div>
          <span className={styles.cardNumber}>01</span>
        </Link>

        {/* Stacked smaller cards */}
        <div className={styles.stackCol}>
          {featuredProjects.slice(1, 3).map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`${styles.cardSmall} ${visible ? styles.cardVisible : ''}`}
              style={{ '--delay': `${(i + 1) * 120}ms` } as React.CSSProperties}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={project.gallery[1] || project.img}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
              </div>
              <div className={styles.cardOverlay}>
                <div className={styles.cardMeta}>
                  <span className={styles.location}>{project.location}</span>
                  <span className={styles.category}>{project.category}</span>
                </div>
                <div className={styles.cardBottom}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={styles.cardCta}>View Project →</span>
                </div>
              </div>
              <span className={styles.cardNumber}>0{i + 2}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
