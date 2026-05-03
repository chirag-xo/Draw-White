'use client';

import { motion, MotionValue, useScroll, useTransform, Variants } from 'framer-motion';
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

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function Moodboard() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  const { height } = dimension;
  const y  = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  // Tablet staggered motion values (gentler than desktop)
  const tabletY1 = useTransform(scrollYProgress, [0, 1], [0, height * 0.4]);
  const tabletY2 = useTransform(scrollYProgress, [0, 1], [0, height * 0.8]);
  const tabletY3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.2]);

  // Static MotionValues of 0 used on mobile to disable parallax offsets
  const zero = useTransform(scrollYProgress, [0, 1], [0, 0]);

  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      setDimension({ width: w, height: window.innerHeight });
      setIsMobile(w <= 640);
      setIsTablet(w > 640 && w <= 1024);
      setIsDesktop(w > 1024);
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
          {isMobile ? (
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Moodboard &amp; Materiality
            </motion.h2>
          ) : (
            <AnimatedHeading elementType="h2" className={styles.title}>
              Moodboard &amp; Materiality
            </AnimatedHeading>
          )}
        </div>
      </div>

      {isDesktop ? (
        <div ref={gallery} className={styles.gallery}>
          <Column images={[images[0], images[1], images[2]]} y={y} />
          <Column images={[images[3], images[4], images[5]]} y={y2} />
          <Column images={[images[6], images[7], images[8]]} y={y3} />
          <Column images={[images[9], images[10], images[11]]} y={y4} />
        </div>
      ) : (
        <motion.div
          ref={gallery}
          className={styles.responsiveGrid}
          variants={isMobile ? containerVariants : undefined}
          initial={isMobile ? "hidden" : false}
          whileInView={isMobile ? "show" : undefined}
          viewport={isMobile ? { once: false, margin: "-40px" } : undefined}
        >
          {images.slice(0, isMobile ? 8 : 12).map((src, index) => {
            const columns = isMobile ? 2 : 3;
            const isFirstRow = index < columns;

            // Apply transform stagger on tablet, none on mobile or first row
            let transformY = zero;
            if (!isMobile && !isFirstRow) {
              const colIndex = index % columns;
              if (colIndex === 0) transformY = tabletY1;
              else if (colIndex === 1) transformY = tabletY2;
              else transformY = tabletY3;
            }

            // Keep tablet animation logic unchanged
            const initialTablet = isTablet ? { opacity: 0, y: 30 } : false;
            const whileInViewTablet = isTablet ? { opacity: 1, y: 0 } : undefined;
            const viewportTablet = isTablet ? { once: true, margin: "-50px" } : undefined;
            const transitionTablet = isTablet ? { duration: 0.8, ease: "easeOut" as const, delay: (index % columns) * 0.15 } : undefined;

            return (
              <motion.div
                key={index}
                className={styles.responsiveImageCard}
                style={{ y: transformY }}
                variants={isMobile ? itemVariants : undefined}
                initial={isMobile ? undefined : initialTablet}
                whileInView={isMobile ? undefined : whileInViewTablet}
                viewport={isMobile ? undefined : viewportTablet}
                transition={isMobile ? undefined : transitionTablet}
                whileTap={{ scale: 0.97 }}
              >
                <Image
                  src={src}
                  alt="Process and Materiality"
                  fill
                  className={styles.image}
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

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
