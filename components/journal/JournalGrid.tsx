'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { JournalPost } from '@/data/journal';
import JournalCard from './JournalCard';
import styles from './Journal.module.css';

interface JournalGridProps {
  posts: JournalPost[];
}

const JournalGrid: React.FC<JournalGridProps> = ({ posts }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <AnimatePresence>
          {posts.map((post) => (
            <JournalCard 
              key={post.id} 
              post={post} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JournalGrid;
