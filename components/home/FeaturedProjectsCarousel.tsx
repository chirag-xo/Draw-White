'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { projects } from '@/data/projects';

const AUTOPLAY_INTERVAL = 3500;
const TRANSITION_DURATION = 1.2;
const EASING = 'power3.inOut';

function wrap(i: number, total: number): number {
  return ((i % total) + total) % total;
}

function getSlotConfig(
  slot: number,
  containerW: number,
  isMobile: boolean,
  isTablet: boolean,
  containerH: number
) {
  const activeW = isMobile
    ? Math.min(containerW - 48, containerW * 0.82)
    : isTablet
    ? 680
    : 1060;
  const adjW  = isMobile ? 140 : isTablet ? 320 : 460;
  const farW  = isMobile ? 80  : isTablet ? 180 : 300;

  const activeH = isMobile ? 260 : isTablet ? 440 : 600;
  const adjH   = isMobile ? 160 : isTablet ? 300 : 420;
  const farH   = isMobile ? 100 : isTablet ? 220 : 320;

  const centerX = containerW / 2;
  const gap = isMobile ? 10 : 18;
  const centerY = (h: number) => (containerH - h) / 2;

  switch (slot) {
    case 0:
      return { x: centerX - activeW / 2, y: centerY(activeH), width: activeW, height: activeH, scale: 1, opacity: 1, brightness: 1, zIndex: 5 };
    case 1:
      return { x: centerX + activeW / 2 + gap, y: centerY(adjH), width: adjW, height: adjH, scale: 1, opacity: 0.75, brightness: 0.5, zIndex: 3 };
    case -1:
      return { x: centerX - activeW / 2 - adjW - gap, y: centerY(adjH), width: adjW, height: adjH, scale: 1, opacity: 0.75, brightness: 0.5, zIndex: 3 };
    case 2:
      return { x: centerX + activeW / 2 + adjW + gap * 2, y: centerY(farH), width: farW, height: farH, scale: 1, opacity: 0.35, brightness: 0.3, zIndex: 1 };
    case -2:
      return { x: centerX - activeW / 2 - adjW - farW - gap * 2, y: centerY(farH), width: farW, height: farH, scale: 1, opacity: 0.35, brightness: 0.3, zIndex: 1 };
    default:
      return slot > 0
        ? { x: containerW + 100, y: centerY(farH), width: farW, height: farH, scale: 0.9, opacity: 0, brightness: 0.2, zIndex: 0 }
        : { x: -farW - 100,      y: centerY(farH), width: farW, height: farH, scale: 0.9, opacity: 0, brightness: 0.2, zIndex: 0 };
  }
}

export default function FeaturedProjectsCarousel() {
  const TOTAL = projects.length;
  const [current, setCurrent]               = useState(0);
  const [displayCurrent, setDisplayCurrent] = useState(0);
  const animatingRef  = useRef(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [isTablet, setIsTablet]   = useState(false);
  const [containerW, setContainerW] = useState(1200);
  const [autoPlayActive, setAutoPlayActive] = useState(true);
  const [dotProgress, setDotProgress]       = useState(0);

  const containerRef   = useRef<HTMLDivElement>(null);
  const cardRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs        = useRef<(HTMLImageElement | null)[]>([]);
  const autoPlayRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef    = useRef<number | null>(null);
  const progressStartRef = useRef<number>(0);
  const kenBurnsRef    = useRef<gsap.core.Tween | null>(null);

  // Responsive
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const positionCards = useCallback(
    (activeIndex: number) => {
      const cw = containerRef.current?.offsetWidth ?? containerW;
      projects.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const diff = i - activeIndex;
        const wrappedDiff = Math.abs(diff) <= TOTAL / 2 ? diff : diff > 0 ? diff - TOTAL : diff + TOTAL;
        const slot = Math.max(-3, Math.min(3, wrappedDiff));
        const ch = isMobile ? 260 : isTablet ? 440 : 600;
        const config = getSlotConfig(slot, cw, isMobile, isTablet, ch);
        gsap.set(el, { x: config.x, y: config.y, width: config.width, height: config.height, opacity: config.opacity, scale: config.scale, zIndex: config.zIndex });
        el.style.filter = config.brightness < 1 ? `brightness(${config.brightness})` : 'none';
      });
    },
    [containerW, isMobile, isTablet, TOTAL]
  );

  useEffect(() => { positionCards(current); }, [isMobile, isTablet, containerW]); // eslint-disable-line

  const startKenBurns = useCallback((activeIndex: number) => {
    if (kenBurnsRef.current) kenBurnsRef.current.kill();
    const img = imgRefs.current[activeIndex];
    if (!img) return;
    imgRefs.current.forEach((im) => { if (im) gsap.set(im, { scale: 1 }); });
    kenBurnsRef.current = gsap.to(img, { scale: 1.06, duration: 6, ease: 'none' });
  }, []);

  useEffect(() => { startKenBurns(current); }, []); // eslint-disable-line

  const animateTo = useCallback(
    (newIndex: number) => {
      if (animatingRef.current) return;
      const target = wrap(newIndex, TOTAL);
      if (target === current) return;
      animatingRef.current = true;
      const cw = containerRef.current?.offsetWidth ?? containerW;
      if (kenBurnsRef.current) kenBurnsRef.current.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          animatingRef.current = false;
          setCurrent(target);
          setDisplayCurrent(target);
          startKenBurns(target);
        },
      });

      projects.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const diff = i - target;
        const wrappedDiff = Math.abs(diff) <= TOTAL / 2 ? diff : diff > 0 ? diff - TOTAL : diff + TOTAL;
        const slot = Math.max(-3, Math.min(3, wrappedDiff));
        const ch = isMobile ? 260 : isTablet ? 440 : 600;
        const config = getSlotConfig(slot, cw, isMobile, isTablet, ch);
        tl.to(el, {
          x: config.x, y: config.y, width: config.width, height: config.height,
          opacity: config.opacity, scale: config.scale, zIndex: config.zIndex,
          duration: TRANSITION_DURATION, ease: EASING,
          onUpdate: () => { el.style.filter = config.brightness < 1 ? `brightness(${config.brightness})` : 'none'; },
        }, 0);
      });

      const currentImg = imgRefs.current[current];
      if (currentImg) tl.to(currentImg, { scale: 1, duration: TRANSITION_DURATION, ease: EASING }, 0);
    },
    [current, containerW, isMobile, isTablet, startKenBurns, TOTAL]
  );

  const clearTimers = useCallback(() => {
    if (autoPlayRef.current)  { clearTimeout(autoPlayRef.current);       autoPlayRef.current  = null; }
    if (progressRef.current)  { cancelAnimationFrame(progressRef.current); progressRef.current = null; }
  }, []);

  const goNext = useCallback(() => animateTo(current + 1), [current, animateTo]);
  const goPrev = useCallback(() => animateTo(current - 1), [current, animateTo]);

  const goTo = useCallback((index: number) => {
    if (animatingRef.current) return;
    setAutoPlayActive(false);
    clearTimers();
    setDotProgress(0);
    animateTo(index);
    setTimeout(() => setAutoPlayActive(true), TRANSITION_DURATION * 1000 + 100);
  }, [animateTo, clearTimers]);

  // Auto-play with progress
  useEffect(() => {
    if (!autoPlayActive) return;
    setDotProgress(0);
    progressStartRef.current = Date.now();
    const update = () => {
      const pct = Math.min(((Date.now() - progressStartRef.current) / AUTOPLAY_INTERVAL) * 100, 100);
      setDotProgress(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(update);
    };
    progressRef.current = requestAnimationFrame(update);
    autoPlayRef.current = setTimeout(() => animateTo(current + 1), AUTOPLAY_INTERVAL);
    return () => clearTimers();
  }, [current, autoPlayActive, clearTimers, animateTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Touch swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { if (diff > 0) goNext(); else goPrev(); }
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend',   onEnd,   { passive: true });
    return () => { el.removeEventListener('touchstart', onStart); el.removeEventListener('touchend', onEnd); };
  }, [goNext, goPrev]);

  // Click on thirds
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isMobile) return;
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a')) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const third = rect.width / 3;
      if (x < third) goPrev();
      else if (x > third * 2) goNext();
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [goNext, goPrev, isMobile]);

  const getSlot = (index: number): number => {
    const diff = index - displayCurrent;
    const wrappedDiff = Math.abs(diff) <= TOTAL / 2 ? diff : diff > 0 ? diff - TOTAL : diff + TOTAL;
    return wrappedDiff;
  };

  const carouselH = isMobile ? 260 : isTablet ? 440 : 600;

  return (
    <section
      aria-labelledby="featured-projects-heading"
      style={{ background: '#fff', paddingBottom: '60px' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px) clamp(32px, 4vw, 48px)',
        maxWidth: '100%',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            marginBottom: '16px',
          }}>
            Portfolio
          </p>
          <div style={{ width: '42px', height: '1px', background: '#000', marginBottom: '20px' }} />
          <h2
            id="featured-projects-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              color: '#0D0D0D',
              lineHeight: 1.1,
            }}
          >
            Featured <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Projects</em>
          </h2>
        </div>

        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', paddingBottom: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            fontWeight: 300,
            color: '#0D0D0D',
            lineHeight: 1,
            transition: 'all 0.5s ease',
          }}>
            {String(displayCurrent + 1).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'rgba(0,0,0,0.3)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.04em' }}>
            {String(TOTAL).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        onMouseEnter={() => { setAutoPlayActive(false); clearTimers(); setDotProgress(0); }}
        onMouseLeave={() => setAutoPlayActive(true)}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          cursor: 'default',
          height: carouselH,
        }}
      >
        {projects.map((project, index) => {
          const slot = getSlot(index);
          const isActive   = slot === 0;
          const isAdjacent = Math.abs(slot) === 1;

          return (
            <div
              key={project.slug}
              ref={(el) => { cardRefs.current[index] = el; }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#1a1815',
                willChange: 'width, height, transform, opacity',
              }}
            >
              <div
                ref={(el) => { imgRefs.current[index] = el; }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  willChange: 'transform',
                }}
              >
                <Image
                  src={project.gallery[1] || project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 680px, 1060px"
                  priority={index < 3}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Non-active darkening */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: isActive ? 'transparent' : 'rgba(8,6,5,0.15)',
                transition: 'background 0.8s ease',
                zIndex: 2,
                pointerEvents: 'none',
              }} />

              {/* Bottom gradient (active only) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.8) 100%)',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.6s ease',
                zIndex: 3,
                pointerEvents: 'none',
              }} />

              {/* Adjacent card label */}
              {!isActive && isAdjacent && (
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  zIndex: 4,
                }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {project.category}
                  </span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
                    {project.year}
                  </span>
                </div>
              )}

              {/* Active card info */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 24px 28px',
                zIndex: 4,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                pointerEvents: isActive ? 'auto' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                    {project.category}
                  </span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>
                    {project.year}
                  </span>
                </div>

                {isActive ? (
                  <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }} onClick={(e) => e.stopPropagation()}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      display: 'block',
                      fontSize: 'clamp(22px, 2.5vw, 32px)',
                      fontWeight: 300,
                      letterSpacing: '-0.01em',
                      color: '#fff',
                      lineHeight: 1.2,
                      marginBottom: '6px',
                    }}>
                      {project.title}
                    </span>
                  </Link>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    display: 'block',
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    color: '#fff',
                    lineHeight: 1.2,
                    marginBottom: '6px',
                  }}>
                    {project.title}
                  </span>
                )}

                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {project.location} · {project.area}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress dot indicators */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '22px' }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            style={{
              position: 'relative',
              border: 'none',
              padding: 0,
              borderRadius: '2px',
              cursor: 'pointer',
              overflow: 'hidden',
              width: i === displayCurrent ? '52px' : '6px',
              height: '3px',
              background: 'rgba(0,0,0,0.12)',
              transition: 'width 0.4s cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          >
            {i === displayCurrent && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                borderRadius: '2px',
                background: '#0D0D0D',
                width: `${dotProgress}%`,
              }} />
            )}
            {i !== displayCurrent && (
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '2px',
                background: i < displayCurrent ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.12)',
              }} />
            )}
          </button>
        ))}
      </div>

      {isMobile && (
        <p style={{ textAlign: 'center', marginTop: '12px', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.15)' }}>
          Swipe to navigate
        </p>
      )}
    </section>
  );
}
