'use client';

import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useState, useEffect, useMemo, useRef } from 'react';
import { testimonials } from '@/data/testimonials';
import { featuredProjects } from '@/data/projects';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './Testimonials.module.css';

// Horizontal loop helper for GSAP
function horizontalLoop(items: HTMLElement[], config: any) {
  let timeline = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete: () => {
      timeline.totalTime(timeline.rawTime() + timeline.duration() * 100);
    },
  });

  let totalWidth = 0;
  let widths: number[] = [];
  let xPercents: number[] = [];
  let curIndex = 0;
  let pixelsPerSecond = (config.speed || 1) * 100;
  let snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1);
  let populateWidths = () => {
    totalWidth = 0;
    items.forEach((item, i) => {
      widths[i] = parseFloat(gsap.getProperty(item, 'width', 'px') as string);
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(item, 'x', 'px') as string) / widths[i]) * 100 +
        (gsap.getProperty(item, 'xPercent') as number)
      );
      totalWidth += widths[i];
    });
  };

  populateWidths();

  gsap.set(items, { xPercent: (i) => xPercents[i] });

  let itemWidth: number;
  let curX: number;
  let distanceToStart: number;
  let distanceToLoop: number;

  items.forEach((item, i) => {
    itemWidth = widths[i];
    curX = (xPercents[i] / 100) * itemWidth;
    distanceToStart = item.offsetLeft + curX;
    distanceToLoop = distanceToStart + totalWidth;

    timeline.to(
      item,
      {
        xPercent: snap(((curX - totalWidth) / itemWidth) * 100),
        duration: totalWidth / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      { xPercent: snap(((curX - totalWidth + totalWidth) / itemWidth) * 100) },
      {
        xPercent: snap((curX / itemWidth) * 100),
        duration: totalWidth / pixelsPerSecond,
        immediateRender: false,
      },
      totalWidth / pixelsPerSecond
    );
  });

  timeline.progress(1).progress(0);

  if (config.reversed) {
    timeline.vars.onReverseComplete?.();
    timeline.reverse();
  }

  return timeline;
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Combine testimonials and project images for the marquee
  const combinedItems = useMemo(() => {
    const items = [];
    const count = Math.max(testimonials.length, featuredProjects.length);

    for (let i = 0; i < count; i++) {
      const project = featuredProjects[i % featuredProjects.length];
      items.push({ type: 'image', data: project });

      const quote = testimonials[i % testimonials.length];
      items.push({ type: 'quote', data: quote });
    }

    return [...items, ...items, ...items];
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayItems = isMobile ? testimonials.map(t => ({ type: 'quote', data: t })) : combinedItems;



  useGSAP(
    () => {
      if (isMobile) return;
      if (!trackRef.current || !containerRef.current) return;


      const items = gsap.utils.toArray<HTMLElement>(`.${styles.card}`, trackRef.current);

      const loop = horizontalLoop(items, {
        repeat: -1,
        speed: 0.6, // Very slow for premium feel
        paddingRight: 40,
      });

      const track = trackRef.current;
      const container = containerRef.current;

      let isDragging = false;
      let startX = 0;
      let startTime = 0;

      // Pause on hover (only on desktop where hover makes sense)
      const onMouseEnter = () => { if (!isDragging) loop.pause(); };
      const onMouseLeave = () => { if (!isDragging) loop.play(); };
      track.addEventListener('mouseenter', onMouseEnter);
      track.addEventListener('mouseleave', onMouseLeave);

      // Drag / Swipe logic
      const onDown = (e: MouseEvent | TouchEvent) => {
        isDragging = true;
        loop.pause();
        startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
        startTime = loop.totalTime();
        // Prevent default only for mouse to avoid text selection
        if (e instanceof MouseEvent) e.preventDefault();
      };

      const onMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const currentX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
        const diffX = currentX - startX;
        
        // At speed 0.6, pixels per second is 60.
        // Multiply by 1.2 for slightly more responsive drag tracking.
        const timeOffset = (diffX / 60) * 1.2;
        
        let newTime = startTime - timeOffset;
        if (newTime < 0) {
          newTime += loop.duration() * 1000;
        }
        loop.totalTime(newTime);
      };

      const onUp = () => {
        if (isDragging) {
          isDragging = false;
          loop.play();
        }
      };

      container.addEventListener('mousedown', onDown);
      container.addEventListener('touchstart', onDown, { passive: true });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);

      return () => {
        loop.kill();
        track.removeEventListener('mouseenter', onMouseEnter);
        track.removeEventListener('mouseleave', onMouseLeave);
        container.removeEventListener('mousedown', onDown);
        container.removeEventListener('touchstart', onDown);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);
      };
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Testimonials</p>
        <AnimatedHeading elementType="h2" id="testimonials-heading" className={styles.title}>
          What Our Clients Say
        </AnimatedHeading>
      </div>

      <div 
        key={isMobile ? 'mobile' : 'desktop'}
        className={`${styles.marqueeContainer} ${isMobile ? styles.mobileScroll : ''}`} 
        ref={containerRef}
      >
        <div className={styles.track} ref={trackRef}>
          {displayItems.map((item, index) => {
            if (item.type === 'image') {
              const project = item.data as any; // Cast to bypass union property mismatch
              return (
                <div key={`img-${index}`} className={`${styles.card} ${styles.imageCard}`}>
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className={styles.image}
                    sizes="380px"
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.imageCaption}>{project.title}</span>
                </div>
              );
            } else {
              const t = item.data as any; // Cast to bypass union property mismatch
              // Specific emphasis words for the marquee
              let quote = t.quote;
              if (t.id === '01') {
                quote = quote.replace('calm', '<span class="font-serif-accent">calm</span>')
                  .replace('balanced', '<span class="font-serif-accent">balanced</span>');
              } else if (t.id === '02') {
                quote = quote.replace('honesty', '<span class="font-serif-accent">honesty</span>');
              } else if (t.id === '03') {
                quote = quote.replace('effortless', '<span class="font-serif-accent">effortless</span>');
              } else if (t.id === '04') {
                quote = quote.replace('silence', '<span class="font-serif-accent">silence</span>');
              }

              return (
                <div key={`quote-${index}`} className={`${styles.card} ${styles.quoteCard}`}>
                  <p
                    className={styles.quoteText}
                    dangerouslySetInnerHTML={{ __html: `“${quote}”` }}
                  />
                  <div className={styles.quoteMetadata}>
                    <p className={styles.author}>{t.author}</p>
                    <p className={styles.role}>{t.role}, {t.company}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
