'use client';
import Link from 'next/link';
import ImageSlider3D from '@/components/animations/ImageSlider3D';
import styles from '@/components/layout/Footer.module.css';

/**
 * FooterCTA — rendered only on the homepage, immediately before the global footer.
 * Extracted from Footer.tsx so it doesn't appear on every page.
 */
export default function FooterCTA() {
  return (
    <div className={styles.ctaBand}>
      <div className={styles.ctaSlider}>
        <ImageSlider3D autoPlay={true} interval={5000} />
      </div>
      <div className={styles.ctaInner}>
        <p className={`text-eyebrow ${styles.ctaEyebrow}`}>Let&apos;s work together</p>
        <h2 className={styles.ctaHeadline}>
          Every great space begins<br />
          with <span className="font-serif-accent">a conversation</span>.
        </h2>
        <Link href="/contact" className={styles.ctaButton}>
          Start a Project
        </Link>
      </div>
    </div>
  );
}
