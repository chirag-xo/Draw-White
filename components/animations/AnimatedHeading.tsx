'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

interface Props {
  children: React.ReactNode;
  className?: string;
  elementType?: keyof JSX.IntrinsicElements;
  id?: string;
  delay?: number;
  threshold?: number;
  style?: React.CSSProperties;
}

export default function AnimatedHeading({ 
  children, 
  className = '', 
  elementType: Component = 'h2', 
  id, 
  delay = 0,
  threshold = 0.9,
  style
}: Props) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const split = new SplitType(containerRef.current, {
        types: 'words',
        tagName: 'span'
      });

      // Wrap each word in an overflow-hidden container for the "reveal" effect
      split.words?.forEach(word => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'top';
        wrapper.style.padding = '0.2em 0.1em'; // Add breathing room
        wrapper.style.margin = '-0.2em -0.1em'; // Compensation
        
        word.parentNode?.insertBefore(wrapper, word);
        wrapper.appendChild(word);
        
        word.style.display = 'inline-block';
        word.style.transformOrigin = 'left bottom';
        word.style.paddingRight = '0.05em'; // Extra space for italic slants
      });

      gsap.fromTo(
        split.words,
        { 
          autoAlpha: 0, 
          yPercent: 100, // Move from fully hidden below
          rotateX: -20 
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.04,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top ${threshold * 100}%`,
            toggleActions: 'play none none none',
          },
        }
      );

      return () => split.revert();
    },
    { scope: containerRef }
  );

  const Comp = Component as any;
  return (
    <Comp 
      ref={containerRef as any} 
      className={className} 
      id={id} 
      style={{ perspective: '1000px', ...style }}
    >
      {children}
    </Comp>
  );
}
