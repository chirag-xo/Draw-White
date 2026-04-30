'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import { JournalPost } from '@/data/journal';
import styles from './Journal.module.css';

interface JournalCardProps {
  post: JournalPost;
  isLarge?: boolean; // Kept for prop compatibility, but layout is now uniform
}

const JournalCard: React.FC<JournalCardProps> = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className={styles.card}
    >
      <Link href={`/journal/${post.slug}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <motion.div 
            className={styles.imageWrapper}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className={styles.cardImage}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
          <div className={styles.cardBadge}>{post.category}</div>
        </div>
        
        <motion.div 
          className={styles.cardInfo}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className={styles.cardMeta}>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <AnimatedHeading elementType="h3" className={styles.cardTitle}>
            {post.title}
          </AnimatedHeading>
          
          <div className={styles.cardFooter}>
            <motion.div 
              className={styles.authorAvatar}
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              {post.author.name.charAt(0)}
            </motion.div>
            <span>{post.author.name}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default JournalCard;
