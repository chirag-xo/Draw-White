'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

/* ─── Inline SVG Kite Logo ─── */
const LogoSvg = ({ height = 36 }: { height?: number }) => (
  <svg
    viewBox="0 0 200 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height, width: 'auto', display: 'block' }}
  >
    <path d="M 99.2 0 L 0 44.3" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 99.2 0 L 200 47" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 0 44.3 L 76.3 180.4" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 200 47 L 123.7 180.4" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 76.3 180.4 L 99.2 163.7 L 123.7 180.4" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 76.3 180.4 L 99.2 220" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 123.7 180.4 L 99.2 220" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 99.2 0 L 99.2 163.7" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Studio Dropdown items ─── */
const studioItems = [
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Media', href: '/media' },
];

/* ─── Desktop Nav ─── */
function DesktopNav({ scrolled }: { scrolled: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 180);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <div className={styles.desktopNav}>
      {/* Left spacer — mirrors Let's Talk width so trio stays centered */}
      <div className={styles.navSpacer} />

      {/* Centred trio: Projects · Logo · Studio */}
      <div className={styles.navCentre}>
        <Link href="/projects" className={styles.navLink}>
          <span className={styles.rollTextOuter}>
            <span className={styles.rollTextInner} data-text="Projects">Projects</span>
          </span>
        </Link>

        <Link href="/" className={styles.logoLink} aria-label="DRAW Studio Home">
          <LogoSvg height={40} />
        </Link>

        {/* Studio dropdown */}
        <div
          className={styles.dropdownWrap}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <button className={styles.dropdownTrigger}>
            <span className={styles.rollTextOuter}>
              <span className={styles.rollTextInner} data-text="Studio">Studio</span>
            </span>
            <svg
              width="10" height="6" viewBox="0 0 10 6" fill="none"
              style={{
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                opacity: 0.55,
              }}
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className={styles.dropdown}
            style={{
              opacity: dropdownOpen ? 1 : 0,
              transform: dropdownOpen
                ? 'translateX(-50%) translateY(8px)'
                : 'translateX(-50%) translateY(18px)',
              pointerEvents: dropdownOpen ? 'auto' : 'none',
            }}
          >
            <div className={styles.dropdownGlow} />
            {studioItems.map((item, i) => (
              <div key={item.label}>
                <Link href={item.href} className={styles.dropdownItem}>
                  <span className={styles.rollTextOuter}>
                    <span className={styles.rollTextInner} data-text={item.label}>{item.label}</span>
                  </span>
                </Link>
                {i < studioItems.length - 1 && <div className={styles.dropdownDivider} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Far-right: Let's Talk */}
      <div className={styles.navRight}>
        <Link href="/contact" className={styles.ctaCircle}>Let's Talk</Link>
      </div>
    </div>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isHome && !scrolled ? styles.homeTop : ''}`}
      >
        {/* Subtle top-edge line that appears on scroll (removed) */}

        <div className={styles.inner}>
          {/* Desktop */}
          <DesktopNav scrolled={scrolled} />

          {/* Mobile: logo left, hamburger right */}
          <div className={styles.mobileRow}>
            <Link href="/" aria-label="DRAW Studio Home" className={styles.mobileLogo}>
              <LogoSvg height={24} />
            </Link>
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {[
          { href: '/projects', label: 'Projects' },
          { href: '/about', label: 'About' },
          { href: '/journal', label: 'Journal' },
          { href: '/media', label: 'Media' },
          { href: '/contact', label: 'Contact' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
          Let's Talk
        </Link>
      </div>
    </>
  );
}
