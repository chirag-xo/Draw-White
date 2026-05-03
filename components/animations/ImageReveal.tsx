'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function ImageReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  distance = 40,
  once = true,
}: ImageRevealProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 1.05,
        filter: 'blur(4px)',
        ...(direction !== 'none' ? directions[direction] : {}) 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        x: 0, 
        y: 0 
      }}
      viewport={{ once, margin: "0px", amount: "some" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for premium feel
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
