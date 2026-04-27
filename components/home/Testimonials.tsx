'use client';

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { testimonials } from '@/data/testimonials';
import { featuredProjects } from '@/data/projects';
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

    // Strictly alternate to ensure no two quotes or two images are adjacent
    for (let i = 0; i < count; i++) {
      const project = featuredProjects[i % featuredProjects.length];
      items.push({ type: 'image', data: project });

      const quote = testimonials[i % testimonials.length];
      items.push({ type: 'quote', data: quote });
    }

    // Multi-cloning for a truly infinite feel
    return [...items, ...items, ...items];
  }, []);


  useGSAP(
    () => {
      if (!trackRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>(`.${styles.card}`, trackRef.current);

      const loop = horizontalLoop(items, {
        repeat: -1,
        speed: 0.6, // Very slow for premium feel
        paddingRight: 40,
      });

      // Pause on hover
      const track = trackRef.current;
      track.addEventListener('mouseenter', () => loop.pause());
      track.addEventListener('mouseleave', () => loop.play());

      return () => {
        loop.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Testimonials</p>
        <h2 id="testimonials-heading" className={styles.title}>
          What Our Clients Say
        </h2>
      </div>

      <div className={styles.marqueeContainer} ref={containerRef}>
        <div className={styles.track} ref={trackRef}>
          {combinedItems.map((item, index) => {
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
