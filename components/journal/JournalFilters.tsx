'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
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
  const [isMobile, setIsMobile] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={styles.filtersSection}>
      <div className={styles.blogHeader}>
        <AnimatedHeading elementType="h2" className={styles.blogTitle}>
          Journal
        </AnimatedHeading>
      </div>
      
      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          {isMobile ? (
            <div className={styles.dropdownWrapper}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={styles.dropdownTrigger}
              >
                <span className={styles.activeFilterLabel}>
                  {activeFilter === 'All' ? 'ALL CATEGORIES' : activeFilter.toUpperCase()}
                </span>
                <motion.svg
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={styles.dropdownMenu}
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          onFilterChange(cat);
                          setDropdownOpen(false);
                        }}
                        className={`${styles.dropdownItem} ${activeFilter === cat ? styles.activeItem : ''}`}
                      >
                        {cat === 'All' ? 'ALL CATEGORIES' : cat.toUpperCase()}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            categories.map((category) => (
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
            ))
          )}
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
