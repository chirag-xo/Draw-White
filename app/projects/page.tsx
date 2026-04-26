'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { projects } from '@/data/projects';
import AllProjectsButton from '@/components/projects/AllProjectsButton';


const TRANSITION_MS = 900;

export default function ProjectsPage() {
  const [current, setCurrent]           = useState(0);
  const [prev, setPrev]                 = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection]       = useState<1 | -1>(1);
  const [cursorType, setCursorType]     = useState<'default' | 'prev' | 'next'>('default');
  const containerRef = useRef<HTMLDivElement>(null);
  const lockRef      = useRef(false);
  const total        = projects.length;

  // ── Navigate ──────────────────────────────────────────
  const goTo = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setIsTransitioning(true);
      setDirection(dir);
      setPrev(current);
      setCurrent((c) => {
        const next = c + dir;
        if (next < 0) return total - 1;
        if (next >= total) return 0;
        return next;
      });
      setTimeout(() => {
        lockRef.current = false;
        setIsTransitioning(false);
        setPrev(null);
      }, TRANSITION_MS + 100);
    },
    [current, total]
  );

  // Wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if ((e.target as Element).closest && (e.target as Element).closest('#all-projects-panel')) return;
      if (Math.abs(e.deltaY) < 20) return;
      e.preventDefault();
      goTo(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(1);
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo]);

  // Touch
  const touchStartY = useRef(0);
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 60) goTo(diff > 0 ? 1 : -1);
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend',   onEnd,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend',   onEnd);
    };
  }, [goTo]);

  // Cursor zone tracking
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const third = window.innerWidth / 3;
    if (e.clientX < third)           setCursorType('prev');
    else if (e.clientX > third * 2)  setCursorType('next');
    else                             setCursorType('default');
  }, []);

  const onAreaClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    const third = window.innerWidth / 3;
    if (e.clientX < third)          goTo(-1);
    else if (e.clientX > third * 2) goTo(1);
  }, [goTo]);

  const project = projects[current];

  // Slide variants: incoming slides from direction, outgoing scales down
  const imgVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? '100%' : '-100%',
      scale: 1.08,
    }),
    center: {
      y: '0%',
      scale: 1,
      transition: {
        y: { duration: TRANSITION_MS / 1000, ease: [0.77, 0, 0.175, 1] },
        scale: { duration: TRANSITION_MS / 1000, ease: [0.77, 0, 0.175, 1] },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-30%' : '30%',
      scale: 0.95,
      transition: {
        y: { duration: TRANSITION_MS / 1000, ease: [0.77, 0, 0.175, 1] },
        scale: { duration: TRANSITION_MS / 1000, ease: [0.77, 0, 0.175, 1] },
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -24,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#080605',
        overflow: 'hidden',
        cursor:
          cursorType === 'prev'
            ? 'w-resize'
            : cursorType === 'next'
            ? 'e-resize'
            : 'default',
      }}
      onMouseMove={onMouseMove}
      onClick={onAreaClick}
    >
      {/* ── All Projects expand button ── */}
      <AllProjectsButton />

      {/* ── Background image stack ─────────── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'transform',
          }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="100vw"
            priority={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable={false}
          />

          {/* Gradient overlay — bottom heavy, like TCM */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Top vignette for navbar readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom-left text block (TCM style) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'absolute',
            bottom: 'clamp(48px, 8vh, 96px)',
            left:  'clamp(24px, 5vw, 80px)',
            zIndex: 10,
            maxWidth: '680px',
            pointerEvents: 'none',
          }}
        >
          {/* Project title — compact heading */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            {project.title}
          </h1>

          {/* CTA */}
          <Link
            href={`/projects/${project.slug}`}
            style={{
              pointerEvents: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '11px 20px',
              borderRadius: '2px',
              transition: 'all 0.35s ease',
              backdropFilter: 'blur(4px)',
              background: 'rgba(255,255,255,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#0D0D0D';
              e.currentTarget.style.borderColor = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
          >
            View Project
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M0 4.5H11M11 4.5L7.5 1M11 4.5L7.5 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </AnimatePresence>



      {/* ── Vertical progress dots (right center) ── */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(24px, 5vw, 80px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              if (lockRef.current || i === current) return;
              lockRef.current = true;
              setIsTransitioning(true);
              setDirection(i > current ? 1 : -1);
              setPrev(current);
              setCurrent(i);
              setTimeout(() => { lockRef.current = false; setIsTransitioning(false); setPrev(null); }, TRANSITION_MS + 100);
            }}
            aria-label={`Go to project ${i + 1}`}
            style={{
              width:  i === current ? '3px' : '2px',
              height: i === current ? '28px' : '10px',
              borderRadius: '2px',
              background: i === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.77,0,0.175,1)',
            }}
          />
        ))}
      </div>

      {/* ── Slide counter — top right ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(70px, 8vw, 120px)',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.2)' }}
        />
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          Scroll
        </p>
      </motion.div>
    </div>
  );
}
