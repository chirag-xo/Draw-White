'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedHeading from '../animations/AnimatedHeading';
import RevealStagger from '../animations/RevealStagger';
import styles from '@/app/projects/projects.module.css';
import { Project } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectChapterProps {
  project: Project;
  index: number;
}

export default function ProjectChapter({ project, index }: ProjectChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Image Mask Reveal
    gsap.fromTo(imageRef.current, 
      { clipPath: 'inset(100% 0 0 0)' },
      { 
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 90%',
        }
      }
    );

    // Subtle Parallax on Inner Image
    gsap.to(innerImageRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, { scope: containerRef });

  const isEven = index % 2 !== 0;

  return (
    <section ref={containerRef} className={styles.chapter}>
      <div className={styles.chapterContent}>
        {/* Main Immersive Image */}
        <div ref={imageRef} className={styles.mainImageWrap}>
          <div ref={innerImageRef} style={{ position: 'relative', width: '100%', height: '120%', top: '-10%' }}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index < 2}
            />
          </div>
        </div>

        {/* Project Info */}
        <div className={styles.chapterInfo}>
          <div className={styles.chapterHeader}>
            <AnimatedHeading elementType="h2" className={styles.projectTitle}>
              {project.title}
            </AnimatedHeading>
            <div className={styles.projectMeta}>
              <span>{project.location}</span>
              <span>{project.year}</span>
            </div>
          </div>
          
          <RevealStagger>
            <p className={styles.projectTagline}>
              {project.tagline}
            </p>
            <Link href={`/projects/${project.slug}`} className="text-link mt-8 inline-block">
              Explore Project —
            </Link>
          </RevealStagger>
        </div>

        {/* Secondary Image Grid - Varied Rhythm */}
        <div className={styles.imageGrid}>
          {project.images.slice(0, 3).map((img, i) => (
            <div 
              key={i} 
              className={styles.gridImage}
              style={{ 
                gridColumn: isEven 
                  ? (i === 0 ? '1 / 8' : i === 1 ? '9 / 13' : '3 / 9') 
                  : (i === 0 ? '6 / 13' : i === 1 ? '1 / 5' : '5 / 11'),
                aspectRatio: i === 0 ? '16/10' : i === 1 ? '4/5' : '3/2',
                marginTop: i === 1 ? '-100px' : i === 2 ? '80px' : '0',
                zIndex: i === 1 ? 2 : 1
              }}
            >
               <Image
                src={img}
                alt={`${project.title} detail ${i}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Background Architectural Element */}
      <div className="absolute right-[-2%] top-[10%] opacity-[0.03] pointer-events-none select-none overflow-hidden">
         <span className="font-display text-[45vw] leading-none uppercase tracking-tighter">
           {project.category[0]}
         </span>
      </div>
      
      {/* Scroll indicator for next chapter */}
      {index < 3 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 text-[10px] uppercase tracking-[0.3em] font-ui">
          Next Chapter
        </div>
      )}
    </section>
  );
}
