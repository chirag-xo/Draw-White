'use client';

import React from 'react';
import styles from './journal-components.module.css';

interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  activeId: string;
}

export const TableOfContents = ({ headings, activeId }: TableOfContentsProps) => {
  if (headings.length === 0) return null;

  return (
    <nav className={styles.tocSidebar}>
      <span className={styles.sidebarLabel}>CONTENTS</span>
      <div className={styles.tocList}>
        <div className={styles.tocLine} />
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`${styles.tocItem} ${activeId === heading.id ? styles.tocItemActive : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </nav>
  );
};
