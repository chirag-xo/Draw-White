'use client';

import React, { useState, useMemo } from 'react';
import FeaturedPost from '@/components/journal/FeaturedPost';
import JournalFilters from '@/components/journal/JournalFilters';
import JournalGrid from '@/components/journal/JournalGrid';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import RevealStagger from '@/components/animations/RevealStagger';
import { journalPosts } from '@/data/journal';
import styles from './journal.module.css'; // We'll keep the page-level background styling here

export default function JournalPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const featuredPost = useMemo(() => {
    return journalPosts.find(post => post.featured) || journalPosts[0];
  }, []);

  const filteredPosts = useMemo(() => {
    // Exclude featured post from the grid
    let posts = journalPosts.filter(post => post.id !== featuredPost.id);
    
    // Filter by category
    if (activeFilter !== 'All') {
      posts = posts.filter(post => post.category === activeFilter);
    }

    // Sort by date
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'Newest' ? dateB - dateA : dateA - dateB;
    });
  }, [activeFilter, featuredPost, sortBy]);

  return (
    <main className={styles.page}>
      {/* Step 1: Featured Section */}
      <div className={styles.featuredSection}>
        <FeaturedPost post={featuredPost} />
      </div>

      {/* Step 2: Filters */}
      <JournalFilters 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Step 3: Editorial Grid */}
      <JournalGrid posts={filteredPosts} />
      
      {/* Extra space for scroll quality */}
      <div style={{ height: '10vh' }} />
    </main>
  );
}
