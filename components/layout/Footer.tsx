'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';


const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/media', label: 'Media' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

/* ── Animated Draw Logo ─────────────────────────────────── */
function AnimatedFooterLogo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const wrap = wrapRef.current;
    const logoSvg = svgRef.current;
    const textEl = textRef.current;
    if (!wrap) return;

    let hasAnimated = false;
    const timeouts: number[] = [];

    // Reset all paths to fully hidden
    const paths = logoSvg
      ? Array.from(logoSvg.querySelectorAll<SVGPathElement>('path'))
      : [];

    paths.forEach((path) => {
      const len = path.getTotalLength();
      path.style.transition = 'none';
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });

    // Reset text
    if (textEl) {
      textEl.style.transition = 'none';
      textEl.style.opacity = '0';
      textEl.style.transform = 'translateY(10px)';
    }

    if (logoSvg) logoSvg.getBoundingClientRect(); // force reflow

    const runAnimation = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      // Draw each path with stagger
      paths.forEach((path, i) => {
        const t = window.setTimeout(() => {
          path.style.transition = `stroke-dashoffset 0.9s cubic-bezier(0.65, 0, 0.35, 1)`;
          path.style.strokeDashoffset = '0';
        }, 100 + i * 90);
        timeouts.push(t);
      });

      // Fade in brand text after paths finish drawing
      const textDelay = 100 + paths.length * 90 + 300;
      const tText = window.setTimeout(() => {
        if (textEl) {
          textEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          textEl.style.opacity = '1';
          textEl.style.transform = 'translateY(0)';
        }
      }, textDelay);
      timeouts.push(tText);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return (
    <div ref={wrapRef} className={styles.footerLogoWrap}>
      <svg
        ref={svgRef}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.footerLogoSvg}
      >
        {/* Left slope — Apex → Left-corner */}
        <path d="M 99.2 0 L 0 44.3" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right slope — Apex → Right-corner */}
        <path d="M 99.2 0 L 200 47" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
        {/* Left body — Left-corner → Left-end */}
        <path d="M 0 44.3 L 76.3 180.4" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right body — Right-corner → Right-end */}
        <path d="M 200 47 L 123.7 180.4" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
        {/* Inner spine — Apex → Chev-peak (same weight as rest) */}
        <path d="M 99.2 0 L 99.2 163.7" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
        {/* Chevron — Left-end ∧ Chev-peak ∧ Right-end */}
        <path d="M 76.3 180.4 L 99.2 163.7 L 123.7 180.4" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
        {/* Left nib — Left-end → Tip */}
        <path d="M 76.3 180.4 L 99.2 220" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right nib — Right-end → Tip */}
        <path d="M 123.7 180.4 L 99.2 220" strokeWidth="2.2" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Brand text — fades in after draw completes */}
      <div ref={textRef} className={styles.footerLogoText}>
        <div className={styles.footerLogoName}>
          <span>D</span><span>R</span><span>A</span><span>W</span>
        </div>
        <span className={styles.footerLogoSub}>Design Research Workshop</span>
      </div>
    </div>
  );
}

/* ── Footer ─────────────────────────────────────────────── */
export default function Footer() {
  const pathname = usePathname();

  // Full-screen fixed layout — no footer needed
  if (pathname === '/projects') return null;

  return (
    <footer className={styles.footer}>
      {/* Footer Bar */}
      <div className={styles.bar}>
        <div className={styles.barInner}>
          {/* 1. Logo Column */}
          <div className={styles.logoCol}>
            <AnimatedFooterLogo />
          </div>

          {/* 2. Sitemap Column */}
          <nav className={styles.footerNav}>
            <span className={styles.columnHeading}>SITEMAP</span>
            {footerNav.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                <span className={styles.rollText} data-text={link.label}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* 3. Contact Column */}
          <div className={styles.contactCol}>
            <span className={styles.columnHeading}>CONTACT</span>
            <p className={styles.footerMeta}>
              A 517 Basement Sushant Lok 1,<br />
              Near Iffco metro Station Gurgaon,<br />
              Haryana 122002
            </p>
            <div className={styles.footerContactInfo}>
              <a href="mailto:hello@draw-studio.com" className={styles.footerContactLink}>hello@drawstudio.com</a>
              <a href="tel:+919876543210" className={styles.footerContactLink}>+91 98765 43210</a>
            </div>
          </div>

          {/* 4. Socials Column */}
          <div className={styles.socialCol}>
            <span className={styles.columnHeading}>SOCIALS</span>
            <div className={styles.socials}>
              {/* Instagram */}
              <a href="https://www.instagram.com/draw.design.in/" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Pinterest */}
              <a href="https://in.pinterest.com/Drawdesign01/" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Pinterest">
                <svg viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/draw-design-research-and-workshop" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/drawsocial" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.barBottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} DRAW Studio. All rights reserved.</p>
          <p className={styles.hours}>Monday–Friday · 9am–6pm IST</p>
        </div>
      </div>
    </footer>
  );
}
