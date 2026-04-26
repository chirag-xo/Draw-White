'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import styles from './IntroLoader.module.css';

export default function IntroLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!loaderRef.current || !logoWrapRef.current || !textRef.current || !svgRef.current) return;

    // Measure string lengths for SVG paths
    const paths = gsap.utils.toArray('.' + styles.lp, svgRef.current) as SVGPathElement[];
    paths.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len.toString();
      el.style.strokeDashoffset = len.toString();
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        (window as any).introDone = true;
        window.dispatchEvent(new CustomEvent('intro-complete'));
      }
    });

    // Intro drawing phasing
    tl.set(loaderRef.current, { opacity: 1 })
      // Slopes from apex
      .to('#lp1', { strokeDashoffset: 0, duration: 0.68, ease: 'power2.inOut' }, 0.4)
      .to('#lp2', { strokeDashoffset: 0, duration: 0.68, ease: 'power2.inOut' }, 0.4)
      // Body descends
      .to('#lp3', { strokeDashoffset: 0, duration: 0.62, ease: 'power2.inOut' }, '-=0.08')
      .to('#lp4', { strokeDashoffset: 0, duration: 0.62, ease: 'power2.inOut' }, '<')
      // Inner spine 
      .to('#lp8', { strokeDashoffset: 0, duration: 0.78, ease: 'power1.out' }, '<-0.12')
      // Crossbar
      .to('#lp5', { strokeDashoffset: 0, duration: 0.26, ease: 'power3.inOut' }, '+=0.05')
      // Nibs
      .to('#lp6', { strokeDashoffset: 0, duration: 0.24, ease: 'power2.inOut' }, '+=0.03')
      .to('#lp7', { strokeDashoffset: 0, duration: 0.24, ease: 'power2.inOut' }, '<')
      // Nibs complete — final strokes glow
      .to(['#lp6','#lp7'], { filter: 'drop-shadow(0 0 9px rgba(255,255,255,.85))', duration: 0.18 }, '+=0.02')
      
      // Text fade in
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '+=0.2')
      .to({}, { duration: 1.0 }) // Hold for reading
      
      // Fire the hero reveal sync event
      .add(() => {
        (window as any).introDone = true;
        window.dispatchEvent(new CustomEvent('intro-complete'));
      })
      
      // Curtain pull up!
      .to(loaderRef.current, { yPercent: -100, duration: 1.4, ease: 'power3.inOut' });

  }, { scope: loaderRef });

  if (isComplete) return null;

  return (
    <div id="loader" className={styles.loader} ref={loaderRef} style={{ pointerEvents: 'auto' }}>
      <div className={styles.logoWrap} ref={logoWrapRef}>
        <svg
          ref={svgRef}
          className={styles.logoSvg}
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* lp1: Left slope */}
          <path className={styles.lp} id="lp1" d="M 99.2 0 L 0 44.3" />
          {/* lp2: Right slope */}
          <path className={styles.lp} id="lp2" d="M 99.2 0 L 200 47" />
          {/* lp3: Left body */}
          <path className={styles.lp} id="lp3" d="M 0 44.3 L 76.3 180.4" />
          {/* lp4: Right body */}
          <path className={styles.lp} id="lp4" d="M 200 47 L 123.7 180.4" />
          {/* lp5: Chevron */}
          <path className={styles.lp} id="lp5" d="M 76.3 180.4 L 99.2 163.7 L 123.7 180.4" />
          {/* lp6: Left nib */}
          <path className={styles.lp} id="lp6" d="M 76.3 180.4 L 99.2 220" />
          {/* lp7: Right nib */}
          <path className={styles.lp} id="lp7" d="M 123.7 180.4 L 99.2 220" />
          {/* lp8: Inner spine */}
          <path className={styles.lp} id="lp8" d="M 99.2 0 L 99.2 163.7" stroke="rgba(255,255,255,0.42)" />
        </svg>

        <div className={styles.loaderText} ref={textRef}>
          <span className={styles.ltName}>
            D R A W <sup style={{ fontSize: '8px', letterSpacing: 0, opacity: 0.4, verticalAlign: 'super' }}>™</sup>
          </span>
          <span className={styles.ltSub}>Design Research Workshop</span>
        </div>
      </div>
      <div className={styles.scanline}></div>
    </div>
  );
}
