'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import RevealStagger from '@/components/animations/RevealStagger';
import styles from './media.module.css';

const featuredPress = [
  {
    title: "Project of the Year: The Restful Monolith",
    source: "Architectural Digest India",
    date: "2024 Edition",
    image: "/images/projects/DSC07091.jpg"
  },
  {
    title: "Cinematic Interiors and the Art of Silence",
    source: "Wallpaper*",
    date: "Issue 284",
    image: "/images/projects/DSC07337.jpg"
  },
  {
    title: "Emerging Practice: A Study in Materiality",
    source: "Dezeen",
    date: "Global Design Awards",
    image: "/images/projects/House 6.jpg"
  }
];

const mediaMentions = [
  { 
    title: "The Mumbai Apartment That Asks Nothing of You", 
    source: "AD India", 
    date: "Mar 2024", 
    link: "#",
    image: "/images/projects/DSC06981.jpg"
  },
  { 
    title: "Top 50 Architects to Watch 2024", 
    source: "Elle Decor", 
    date: "Feb 2024", 
    link: "#",
    image: "/images/projects/House 6.jpg"
  },
  { 
    title: "Material Research: The New Standard", 
    source: "Design Anthology", 
    date: "Jan 2024", 
    link: "#",
    image: "/images/projects/DSC07091.jpg"
  },
  { 
    title: "Residential Excellence Award 2023", 
    source: "IIID", 
    date: "Dec 2023", 
    link: "#",
    image: "/images/projects/DSC07329.jpg"
  },
  { 
    title: "Cinematic Lighting in Architecture", 
    source: "Frame Magazine", 
    date: "Nov 2023", 
    link: "#",
    image: "/images/projects/TGP03936-HDR-1.jpg"
  },
  { 
    title: "The Economics of Restraint — Studio Profile", 
    source: "Forbes India", 
    date: "Oct 2023", 
    link: "#",
    image: "/images/projects/Malani Marble (40).jpg"
  },
];

export default function MediaPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <RevealStagger>
          <AnimatedHeading elementType="p" className={`text-eyebrow ${styles.eyebrow}`}>
            Accolades & Features
          </AnimatedHeading>
          <AnimatedHeading elementType="h1" className={styles.pageTitle}>
            Selected <span className="font-serif-accent italic">Recognition</span>
          </AnimatedHeading>
          <p className={styles.pageSubtitle}>
            A curated record of our studio's journey through global publications and design awards.
          </p>
        </RevealStagger>
      </div>

      {/* Featured Press Grid */}
      <div className={styles.pressGrid}>
        {featuredPress.map((item, i) => (
          <div key={i} className={styles.pressCard}>
            <div className={styles.pressImageContainer}>
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className={styles.pressImage}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className={styles.pressOverlay} />
            </div>
            <div className={styles.pressInfo}>
              <div className={styles.pressTag}>Featured</div>
              <AnimatedHeading elementType="h3" className={styles.pressTitle}>
                {item.title}
              </AnimatedHeading>
              <div className={styles.pressMeta}>
                <span className={styles.pressSource}>{item.source}</span>
                <span className={styles.pressSeparator}>—</span>
                <span className={styles.pressDate}>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Mentions List */}
      <div className={styles.mentionsSection}>
        <RevealStagger>
          <AnimatedHeading elementType="p" className={`text-eyebrow ${styles.sectionLabel}`}>
            Selected Mentions
          </AnimatedHeading>
          <AnimatedHeading elementType="h2" className={styles.editorialHeading}>
            A Discourse on <span className="font-serif-accent">Design</span> & Detail
          </AnimatedHeading>
        </RevealStagger>
        <div 
          ref={containerRef}
          className={styles.mentionsList}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {mediaMentions.map((m, i) => (
            <a 
              key={i} 
              href={m.link} 
              className={styles.mentionItem}
              onMouseEnter={() => setHoveredIndex(i)}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className={styles.mentionDate}>{m.date}</span>
              <span className={styles.mentionTitle}>{m.title}</span>
              <span className={styles.mentionSource}>{m.source}</span>
            </a>
          ))}

          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                className={styles.hoverImageContainer}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: mousePos.x + 20, 
                  y: mousePos.y - 150 
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
                style={{ 
                  position: 'fixed',
                  pointerEvents: 'none',
                  zIndex: 999,
                  width: '380px',
                  aspectRatio: '3/2',
                  overflow: 'hidden',
                  borderRadius: '6px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
                  left: 0,
                  top: 0,
                  x: mousePos.x + 20,
                  y: mousePos.y - 120
                }}
              >
                <Image
                  src={mediaMentions[hoveredIndex].image}
                  alt={mediaMentions[hoveredIndex].title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="280px"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
