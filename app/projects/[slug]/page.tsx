'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import { projects } from '@/data/projects';
import { ProjectTransition, ProjectTransitionRef } from '@/components/projects/ProjectTransition';
import styles from './case-study.module.css';

interface Props {
  params: { slug: string };
}

export default function ProjectCaseStudy({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  const transitionRef = useRef<ProjectTransitionRef>(null);

  const handleProjectClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    transitionRef.current?.start(x, y, `/projects/${slug}`);
  };

  return (
    <article className={styles.page}>
      {/* Back Button (Sticky/Floating) */}
      <Link href="/projects" className={styles.backButton}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15.8333 10H4.16667M4.16667 10L9.16667 15M4.16667 10L9.16667 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Projects
      </Link>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={project.img}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={styles.heroContent}
        >
          <p className={`text-eyebrow ${styles.heroCategory}`}>{project.category}</p>
          <AnimatedHeading elementType="h1" className={styles.heroTitle}>
            {project.title}
          </AnimatedHeading>
          <p className={styles.heroLocation}>{project.location} · {project.year}</p>
        </motion.div>
      </div>

      {/* Brief / Stats Bar */}
      <div className={styles.brief}>
        <div className={styles.briefGrid}>
          {[
            { label: 'Project', value: project.title },
            { label: 'Location', value: project.location },
            { label: 'Year', value: project.year },
            { label: 'Category', value: project.category },
            { label: 'Area', value: project.area },
          ].map((item, i) => (
            <motion.div 
              key={item.label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={styles.briefItem}
            >
              <span className={styles.briefLabel}>{item.label}</span>
              <span className={styles.briefValue}>{item.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Narrative Section 1: The Brief */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={`text-eyebrow ${styles.sectionLabel}`}>The Brief</p>
          <AnimatedHeading elementType="h2" className={styles.challengeText}>
            {project.challenge}
          </AnimatedHeading>
          <p className={styles.descriptionText}>{project.description}</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className={styles.imageGrid}>
        {project.gallery.map((img, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`${styles.narrativeImage} ${i % 3 === 0 ? styles.wide : ''}`}
          >
            <Image
              src={img}
              alt={`${project.title} — view ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 66vw"
            />
          </motion.div>
        ))}
      </div>

      {/* Narrative Section 2: The Solution */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={`text-eyebrow ${styles.sectionLabel}`}>The Solution</p>
          <AnimatedHeading elementType="h2" className={styles.challengeText}>
            {project.solution}
          </AnimatedHeading>
        </div>
      </div>

      {/* Optional: Materials & Textures Section */}
      <div className={styles.materials}>
        <div className={styles.sectionInner}>
           <p className={`text-eyebrow ${styles.sectionLabel}`}>Materials & Textures</p>
           <div className={styles.materialGrid}>
              {['Natural Stone', 'Brushed Brass', 'Smoked Oak', 'Textured Plaster'].map((m, i) => (
                <div key={m} className={styles.materialItem}>
                  <div className={styles.materialSwatch} style={{ background: i % 2 === 0 ? '#E5E4E2' : '#C4A484' }} />
                  <span className={styles.materialName}>{m}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Next project Transition */}
      <div 
        onClick={(e) => handleProjectClick(e, nextProject.slug)}
        className={styles.nextProject}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.nextImage}>
          <Image
            src={nextProject.img}
            alt={nextProject.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className={styles.nextOverlay} />
        </div>
        <div className={styles.nextContent}>
          <p className={`text-eyebrow ${styles.nextLabel}`}>Next Project</p>
          <AnimatedHeading elementType="h2" className={styles.nextTitle}>
            {nextProject.title}
          </AnimatedHeading>
          <span className={styles.nextCta}>View Project →</span>
        </div>
      </div>

      <ProjectTransition ref={transitionRef} />
    </article>
  );
}
