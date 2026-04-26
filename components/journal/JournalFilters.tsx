'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Journal.module.css';

interface JournalFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const categories = ['All', 'Architecture', 'Interior', 'Design', 'Process'];

const JournalFilters: React.FC<JournalFiltersProps> = ({ 
  activeFilter, 
  onFilterChange,
  sortBy,
  onSortChange
}) => {
  return (
    <section className={styles.filtersSection}>
      <div className={styles.blogHeader}>
        <h2 className={styles.blogTitle}>Journal</h2>
      </div>
      
      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`${styles.filterButton} ${activeFilter === category ? styles.active : ''}`}
            >
              <span className={styles.filterText}>{category}</span>
              {activeFilter === category && (
                <motion.div 
                  layoutId="activeFilterPill"
                  className={styles.activePill}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        
        <div className={styles.sortContainer}>
          <span className={styles.sortLabel}>Sort by:</span>
          <select 
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default JournalFilters;
