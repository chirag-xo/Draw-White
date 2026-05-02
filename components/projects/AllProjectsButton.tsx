'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

type Category = 'All' | 'Residential' | 'Hospitality' | 'Commercial';

const CATEGORIES: Category[] = ['All', 'Residential', 'Hospitality', 'Commercial'];

interface Props {
  /** Position of the trigger button (so we can start the circle from there) */
  originX: number;
  originY: number;
  onClose: () => void;
}

function AllProjectsPanel({ originX, originY, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    // Pause Lenis
    if ((window as any).lenis) (window as any).lenis.stop();
    document.body.style.overflow = 'hidden';

    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      // Resume Lenis
      if ((window as any).lenis) (window as any).lenis.start();
      document.body.style.overflow = '';
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // clip-path circle: starts at 0% radius from button, expands to cover full screen
  const origin = `${originX}px ${originY}px`;

  return (
    <motion.div
      id="all-projects-panel"
      data-lenis-prevent
      initial={{ clipPath: `circle(0% at ${origin})` }}
      animate={{ clipPath: `circle(150% at ${origin})` }}
      exit={{ clipPath: `circle(0% at ${origin})` }}
      transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        height: '100vh',
        zIndex: 900,
        background: '#F8F7F4',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        willChange: 'clip-path, opacity',
        pointerEvents: 'auto',
      }}
    >
      {/* ── Spacer for Navbar ────────────────────── */}
      <div style={{ height: '72px', width: '100%', background: '#F8F7F4', position: 'sticky', top: 0, zIndex: 15 }} />

      {/* ── Top bar ────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 10,
          background: '#F8F7F4',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(24px, 5vw, 80px)',
          height: '64px',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-ui)',
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.45)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#0D0D0D')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.45)')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Close
        </button>

        {/* Category filters */}
        {isMobile ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-ui)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#0D0D0D',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '64px',
              }}
            >
              {activeCategory === 'All' ? 'ALL WORK' : activeCategory.toUpperCase()}
              <motion.svg
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                width="10" height="6" viewBox="0 0 10 6" fill="none"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: '#F8F7F4',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    padding: '8px 0',
                    zIndex: 20,
                    minWidth: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setDropdownOpen(false);
                      }}
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '10px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: activeCategory === cat ? '#0D0D0D' : 'rgba(0,0,0,0.45)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '12px 24px',
                        textAlign: 'right',
                        width: '100%',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {cat === 'All' ? 'ALL WORK' : cat.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <nav style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: activeCategory === cat ? '#0D0D0D' : 'rgba(0,0,0,0.35)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 20px',
                  paddingBottom: '2px',
                  borderBottom: activeCategory === cat ? '1px solid #0D0D0D' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  lineHeight: '64px',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {cat === 'All' ? 'ALL WORK' : cat.toUpperCase()}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '14px',
                    marginLeft: '4px'
                  }}>
                    <AnimatePresence mode="wait">
                      {activeCategory === cat ? (
                        <motion.span
                          key="star"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 360 }}
                          exit={{ scale: 0, rotate: 45 }}
                          transition={{
                            scale: { type: 'spring', stiffness: 300, damping: 20 },
                            rotate: { duration: 6, repeat: Infinity, ease: "linear" }
                          }}
                          style={{ display: 'inline-flex', transformOrigin: 'center' }}
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0L13.46 10.54L24 12L13.46 13.46L12 24L10.54 13.46L0 12L10.54 10.54L12 0Z" />
                          </svg>
                        </motion.span>
                      ) : (
                        cat === 'All' && (
                          <motion.span
                            key="plus"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.35 }}
                            exit={{ opacity: 0 }}
                            style={{ fontSize: '13px', fontWeight: 300 }}
                          >
                            +
                          </motion.span>
                        )
                      )}
                    </AnimatePresence>
                  </span>
                </span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* ── Project grid ───────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '12px' : '2px',
          padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 80px)',
          paddingTop: 'clamp(40px, 6vw, 80px)',
        }}
      >
        <AnimatePresence>
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                willChange: 'transform, opacity',
                position: 'relative',
                zIndex: 1
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}
              >
                {/* Project Card Structure */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Image Wrapper */}
                  <motion.div
                    whileHover="hover"
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      background: '#E8E4DF',
                    }}
                  >
                    <motion.div
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ width: '100%', height: '100%', position: 'relative' }}
                    >
                      <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </motion.div>

                    {/* Hover Overlay Circle */}
                    <motion.div
                      variants={{
                        hover: { opacity: 1, scale: 1 }
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-36px',
                        marginLeft: '-36px',
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: '#111',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        pointerEvents: 'none',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Project Name */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#0D0D0D',
                      letterSpacing: '0',
                      margin: 0,
                      padding: '10px 0 24px',
                    }}
                  >
                    {project.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function AllProjectsButton() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('view=all')) {
      setOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setOpen(true);
    }
  }, []);

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setOrigin({
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      });
    }
    setOpen(true);
  }, []);

  return (
    <>
      {/* Trigger button — right side, vertically centered */}
      <button
        ref={btnRef}
        onClick={handleOpen}
        aria-label="View all projects"
        style={{
          position: 'fixed',
          right: 'clamp(24px, 5vw, 80px)',
          bottom: 'clamp(48px, 8vh, 96px)',
          zIndex: 20,
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
          cursor: 'pointer',
          whiteSpace: 'nowrap',
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
        All Projects
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{ marginTop: '-1px' }}
        >
          <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <AllProjectsPanel
            originX={origin.x}
            originY={origin.y}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
