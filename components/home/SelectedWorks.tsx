'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import { projects } from '@/data/projects';
import { ProjectTransition, ProjectTransitionRef } from '@/components/projects/ProjectTransition';
import styles from './SelectedWorks.module.css';

const selectedProjects = projects.map((p) => ({
  src: p.img,
  alt: p.title,
  title: p.title,
  category: p.category,
  location: p.location,
  year: p.year,
  slug: p.slug,
}));

const totalProjects = selectedProjects.length;
const inactiveCount = totalProjects - 1;
const inactiveRem = inactiveCount * 4.5; // Each inactive card is 4.5rem
const gapsPx = inactiveCount * 8; // Each gap is 8px

export default function SelectedWorks() {
  const [activeDesktop, setActiveDesktop] = useState<number>(0);
  const [activeMobile, setActiveMobile] = useState<number>(0);
  const transitionRef = useRef<ProjectTransitionRef>(null);

  const handleProjectClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    transitionRef.current?.start(x, y, `/projects/${slug}`);
  };

  return (
    <section
      aria-labelledby="selected-works-heading"
      style={{
        background: '#fff',
        padding: 'clamp(60px, 8vw, 100px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(40px, 6vw, 80px)',
          padding: '0 var(--gutter, 5vw)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            marginBottom: '16px',
          }}
        >
          Portfolio
        </p>
        <AnimatedHeading
          elementType="h2"
          id="selected-works-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            color: '#0D0D0D',
            lineHeight: 1.1,
          }}
        >
          Selected Works
        </AnimatedHeading>
      </div>

      {/* DESKTOP GALLERY */}
      <div className={styles.desktopOnly}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 var(--gutter, 5vw)',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '1600px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {selectedProjects.map((project, index) => (
              <motion.div
                key={index}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  flexShrink: 0,
                  willChange: 'width',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
                initial={{ width: 'calc(0% + 4.5rem + 0px)', height: '38rem' }}
                animate={{
                  width: activeDesktop === index 
                    ? `calc(100% + -${inactiveRem}rem + -${gapsPx}px)` 
                    : 'calc(0% + 4.5rem + 0px)',
                  height: '38rem',
                }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                onHoverStart={() => setActiveDesktop(index)}
                onClick={() => setActiveDesktop(index)}
              >

                {/* Dark gradient overlay on active */}
                <AnimatePresence>
                  {activeDesktop === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                        zIndex: 1,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Project Info on active */}
                <AnimatePresence>
                  {activeDesktop === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '28px 24px',
                        zIndex: 2,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '9px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.5)',
                          marginBottom: '6px',
                        }}
                      >
                        {project.category} — {project.year}
                      </p>
                      <AnimatedHeading
                        elementType="h3"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(18px, 2vw, 24px)',
                          fontWeight: 300,
                          letterSpacing: '-0.02em',
                          color: '#fff',
                          lineHeight: 1.2,
                          marginBottom: '16px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {project.title}
                      </AnimatedHeading>
                      <div
                        onClick={(e) => handleProjectClick(e, project.slug)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.7)',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(255,255,255,0.3)',
                          paddingBottom: '2px',
                          transition: 'color 0.3s, border-color 0.3s',
                          cursor: 'pointer',
                        }}
                      >
                        View Project
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image */}
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 36rem"
                  priority={index < 2}
                  style={{
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    transform: activeDesktop === index ? 'scale(1)' : 'scale(1.05)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MOBILE GALLERY */}
      <div className={styles.mobileOnly}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px', padding: '0 var(--gutter, 5vw)' }}>
          {selectedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full"
            >
              <motion.div
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  width: '100%',
                  border: '1px solid rgba(0,0,0,0.05)',
                  willChange: 'height',
                }}
                initial={{ height: '4.5rem' }}
                animate={{
                  height: activeMobile === index ? '24rem' : '4.5rem',
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => setActiveMobile(index)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Dark gradient overlay on active */}
                <AnimatePresence>
                  {activeMobile === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                        zIndex: 1,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Project Info on active */}
                <AnimatePresence>
                  {activeMobile === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px 20px',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '9px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.5)',
                          marginBottom: '6px',
                        }}
                      >
                        {project.category} — {project.year}
                      </p>
                      <AnimatedHeading
                        elementType="h3"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '20px',
                          fontWeight: 300,
                          letterSpacing: '-0.02em',
                          color: '#fff',
                          lineHeight: 1.2,
                          marginBottom: '16px',
                        }}
                      >
                        {project.title}
                      </AnimatedHeading>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(e, project.slug);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.7)',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(255,255,255,0.3)',
                          paddingBottom: '2px',
                          cursor: 'pointer',
                        }}
                      >
                        View Project
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Inactive label (subtle hint of project title) */}
                <AnimatePresence>
                  {activeMobile !== index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        background: 'rgba(0,0,0,0.35)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '10px',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#fff',
                        }}
                      >
                        {project.title}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image */}
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 36rem"
                  priority={index < 2}
                  style={{
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    transform: activeMobile === index ? 'scale(1)' : 'scale(1.05)',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 'clamp(48px, 6vw, 80px)',
        }}
      >
        <Link
          href="/projects?view=all"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#0D0D0D',
            textDecoration: 'none',
            padding: '14px 32px',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: '100px',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0D0D0D';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = '#0D0D0D';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#0D0D0D';
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
          }}
        >
          Discover All Works
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <ProjectTransition ref={transitionRef} />
    </section>
  );
}
