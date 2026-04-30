'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TableOfContents } from './TableOfContents';
import { SocialShare } from './SocialShare';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
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
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
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
            // Mark as completed when we reach or pass it
            setCompletedSections(prev => {
              const next = new Set(prev);
              next.add(entry.target.id);
              return next;
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const element = contentRef.current;
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY - (element.offsetTop - 100);
      const totalHeight = element.scrollHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    const parts = content.split('\n\n');
    return parts.map((part, i) => {
      if (part.startsWith('## ')) {
        const text = part.replace('## ', '');
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        return (
          <AnimatedHeading key={i} elementType="h2" id={id} className={styles.sectionHeading}>
            {text}
          </AnimatedHeading>
        );
      }
      return <p key={i}>{part}</p>;
    });
  };

  return (
    <div className={styles.layoutWrapper} ref={contentRef}>
      <aside className={styles.sidebarLeft}>
        <TableOfContents 
          headings={headings} 
          activeId={activeId} 
          completedSections={completedSections}
          progress={scrollProgress}
        />
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
