'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import styles from './Moodboard.module.css';

const images = [
  '/images/projects/DSC06981.jpg',
  '/images/moodboard/1.png',
  '/images/projects/House%206.jpg',
  '/images/projects/DSC07337.jpg',
  '/images/moodboard/8.png',
  '/images/projects/DSC07091.jpg',
  '/images/projects/TONY%20_%20GUY%20AGRA%20(20).jpg',
  '/images/moodboard/3.png',
  '/images/projects/TGP03823-HDR-1.jpg',
  '/images/projects/tng-1%20-%20Edited.jpg',
  '/images/moodboard/6.png',
  '/images/moodboard/3.png',
  '/images/projects/DSC06981.jpg',
];

export default function Moodboard() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={styles.moodboardContainer}>
      <div className={styles.scrollHeader}>
        <div className={styles.headerContent}>
          <span className={styles.scrollCue}>
            The Creative Process
          </span>
          <AnimatedHeading elementType="h2" className={styles.title}>
            Moodboard & Materiality
          </AnimatedHeading>
        </div>
      </div>

      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>

      <div className={styles.scrollFooter}>
        <div className={styles.footerContent}>
          <span className={styles.scrollCue}>
            Crafting Vision into Reality
          </span>
        </div>
      </div>
    </section>
  );
}

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className={styles.imageCard}>
          <Image
            src={src}
            alt="Process and Materiality"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      ))}
    </motion.div>
  );
}
