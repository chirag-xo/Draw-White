'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TableOfContents } from './TableOfContents';
import { SocialShare } from './SocialShare';
import styles from '../../app/journal/[slug]/journal-post.module.css';

interface Heading {
  id: string;
  text: string;
}

interface JournalPostContentProps {
  content: string;
  excerpt: string;
}

export const JournalPostContent = ({ content, excerpt }: JournalPostContentProps) => {
  const [activeId, setActiveId] = useState('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse content for headings
    const lines = content.split('\n');
    const detectedHeadings: Heading[] = [];
    
    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '');
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        detectedHeadings.push({ id, text });
      }
    });
    
    setHeadings(detectedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px' } // Detect when heading is in the upper part of viewport
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const renderContent = () => {
    const parts = content.split('\n\n');
    return parts.map((part, i) => {
      if (part.startsWith('## ')) {
        const text = part.replace('## ', '');
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        return (
          <h2 key={i} id={id} className={styles.sectionHeading}>
            {text}
          </h2>
        );
      }
      return <p key={i}>{part}</p>;
    });
  };

  return (
    <div className={styles.layoutWrapper}>
      <aside className={styles.sidebarLeft}>
        <TableOfContents headings={headings} activeId={activeId} />
        <div className={styles.readTimeMobile}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.clockIcon}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>6 min read</span>
        </div>
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.excerpt}>
          {excerpt}
        </div>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>

      <aside className={styles.sidebarRight}>
        <SocialShare />
      </aside>
    </div>
  );
};
