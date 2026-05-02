'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './OurJourney.module.css';

// ── Data ─────────────────────────────────────────────────────────────────────
// Single source-of-truth: each milestone owns its text AND its image.
const journeyData = [
  {
    year: '2013',
    title: 'The Genesis',
    story: `It began with two college friends, one laptop, and countless conversations over coffee at Cafe Coffee Day. What started with small renovations and family projects was driven by a much larger vision—to shape spaces that feel timeless.`,
    image: '/sketches/01 - Edited.png',
  },
  {
    year: '2015',
    title: 'The First Studio',
    story: `The vision took form with the opening of Draw Design's first studio in Gurgaon, led by a small team of 4. From compact renovations to boutique interiors, every project became a step toward something bigger.`,
    image: '/sketches/02 - Edited.png',
  },
  {
    year: '2017',
    title: 'The Turning Point',
    story: `Recognition followed with the studio's first design award, marking the moment Draw Design stepped into a new league. The scale grew. So did the ambition—luxury villas, high-rise residences, and larger lifestyle spaces soon followed.`,
    image: '/sketches/03 - Edited.png',
  },
  {
    year: '2026',
    title: 'Still Evolving',
    story: `Today, Draw Design is a 40+ strong team of architects and designers, crafting large-scale residences, resort-style villas, and landmark spaces. What began in a coffee shop continues to evolve—still growing, still redefining spaces.`,
    image: '/sketches/04 - Edited.png',
  },
];

// ── Hook: Intersection Observer entry animation ───────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ── Tablet milestone card (Text + Image paired) ───────────────────────────────
function MilestoneCard({
  item,
  index,
}: {
  item: (typeof journeyData)[0];
  index: number;
}) {
  const textReveal = useReveal();
  const imgReveal = useReveal();
  const isSketch = item.image.startsWith('/sketches/');

  return (
    <article className={styles.milestoneCard}>
      {/* Text block */}
      <div
        ref={textReveal.ref}
        className={`${styles.milestoneText} ${textReveal.visible ? styles.revealed : ''}`}
      >
        <span className={styles.year}>{item.year}</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.story}>{item.story}</p>
      </div>

      {/* Image block — delayed reveal */}
      <div
        ref={imgReveal.ref}
        className={`${styles.milestoneImageWrap} ${imgReveal.visible ? styles.revealedImage : ''}`}
        style={isSketch ? { backgroundColor: '#ffffff' } : {}}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={styles.image}
          style={isSketch ? { objectFit: 'contain', padding: '12%' } : {}}
          sizes="(max-width: 968px) 100vw, 55vw"
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
    </article>
  );
}

// ── Desktop: sticky left panel with active-index tracking ─────────────────────
function DesktopTextPanel({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className={styles.leftCol}>
      <div className={styles.contentWrap}>
        <p className={styles.eyebrow}>Our Journey</p>

        <div className={styles.timelineProgress}>
          <div className={styles.line}>
            <div
              className={styles.pill}
              style={{
                transform: `translateY(${(activeIndex / (journeyData.length - 1)) * 260}px)`,
              }}
            />
          </div>
        </div>

        <div className={styles.textContainer}>
          {journeyData.map((item, i) => (
            <div
              key={i}
              className={`${styles.textBlock} ${activeIndex === i ? styles.active : ''}`}
            >
              <span className={styles.year}>{item.year}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.story}>{item.story}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function OurJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);

  // Detect breakpoint (client-only)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 968px)');
    setIsTablet(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Desktop: track active step via IntersectionObserver on image panels
  useEffect(() => {
    if (isTablet) return;

    const images = sectionRef.current?.querySelectorAll('[data-journey-step]');
    if (!images?.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.journeyStep);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    images.forEach((img) => obs.observe(img));
    return () => obs.disconnect();
  }, [isTablet]);

  return (
    <section ref={sectionRef} className={styles.section} id="journey">
      {/* ── TABLET / MOBILE: interleaved card layout ── */}
      {isTablet ? (
        <div className={styles.mobileLayout}>
          <p className={styles.eyebrowMobile}>Our Journey</p>
          {journeyData.map((item, i) => (
            <MilestoneCard key={i} item={item} index={i} />
          ))}
        </div>
      ) : (
        /* ── DESKTOP: sticky text + scrolling image stack ── */
        <div className={styles.stickyContent}>
          <DesktopTextPanel activeIndex={activeIndex} />

          <div className={styles.rightCol}>
            <div className={styles.imageStack}>
              {journeyData.map((item, i) => {
                const isSketch = item.image.startsWith('/sketches/');
                return (
                  <div
                    key={i}
                    className={styles.imageWrap}
                    data-journey-step={i}
                    style={isSketch ? { backgroundColor: '#ffffff' } : {}}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.image}
                      style={isSketch ? { objectFit: 'contain', padding: '15%' } : {}}
                      sizes="55vw"
                      priority={i === 0}
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
