import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Lost in the whitespace.</h1>
        <p className={styles.body}>
          This page doesn't exist — perhaps it was removed, or perhaps it was never built. 
          In either case, good design always knows where it belongs.
        </p>
        <Link href="/" className={styles.back}>
          Return to DRAW Studio →
        </Link>
      </div>
    </div>
  );
}
