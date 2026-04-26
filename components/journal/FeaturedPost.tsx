'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { JournalPost } from '@/data/journal';
import styles from './Journal.module.css';

interface FeaturedPostProps {
  post: JournalPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className={styles.featuredSection}>
      <Link href={`/journal/${post.slug}`} className={styles.featuredLink}>
        <div className={styles.featuredHero}>
          <motion.div style={{ y }} className={styles.parallaxWrapper}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className={styles.featuredImage}
              sizes="100vw"
            />
          </motion.div>
          <div className={styles.featuredOverlay} />
          
          <div className={styles.featuredContent}>
            <div className={styles.featuredText}>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={styles.featuredCategoryBadge}
              >
                {post.category}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className={styles.featuredTitle}
              >
                {post.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={styles.featuredExcerpt}
              >
                {post.excerpt}
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.featuredAuthor}
            >
              <span className={styles.featuredAuthorName}>{post.author.name}</span>
              <div className={styles.featuredDateMeta}>
                <span>{post.date}</span>
                <span style={{ margin: '0 8px' }}>•</span>
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FeaturedPost;
