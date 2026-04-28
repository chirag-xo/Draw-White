'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredProjects } from '@/data/projects';
import { ProjectTransition, ProjectTransitionRef } from '@/components/projects/ProjectTransition';
import styles from './FeaturedProjects.module.css';

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<ProjectTransitionRef>(null);
  const [visible, setVisible] = useState(false);

  const handleProjectClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    transitionRef.current?.start(x, y, `/projects/${slug}`);
  };

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
        <div
          onClick={(e) => handleProjectClick(e, featuredProjects[0].slug)}
          className={`${styles.cardLarge} ${visible ? styles.cardVisible : ''}`}
          style={{ '--delay': '0ms', cursor: 'pointer' } as React.CSSProperties}
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
        </div>

        {/* Stacked smaller cards */}
        <div className={styles.stackCol}>
          {featuredProjects.slice(1, 3).map((project, i) => (
            <div
              key={project.slug}
              onClick={(e) => handleProjectClick(e, project.slug)}
              className={`${styles.cardSmall} ${visible ? styles.cardVisible : ''}`}
              style={{ '--delay': `${(i + 1) * 120}ms`, cursor: 'pointer' } as React.CSSProperties}
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
            </div>
          ))}
        </div>
      </div>
      <ProjectTransition ref={transitionRef} />
    </section>
  );
}
