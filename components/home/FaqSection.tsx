'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "../animations/AnimatedHeading";
import styles from "./FaqSection.module.css";

// Internal Plus icon component
const Plus = ({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const faqs = [
  {
    q: 'What kinds of projects do you typically take on?',
    a: 'We work across high-end residences, hospitality, and select commercial interiors where detail, proportion, and material longevity matter deeply.',
  },
  {
    q: 'Do you handle both architecture and interiors?',
    a: 'Yes. Depending on the brief, we lead full architectural coordination, interior design, detailing, and site review through completion.',
  },
  {
    q: 'How early should we involve the studio?',
    a: 'Ideally at the beginning. Early collaboration gives us room to shape spatial logic, light, circulation, and construction strategy with far more clarity.',
  },
  {
    q: 'Can the process work for clients outside Mumbai?',
    a: 'Absolutely. We structure communication, site visits, and consultant coordination to work smoothly across cities and international time zones.',
  },
  {
    q: 'What is the typical timeline for a complete residential interior?',
    a: 'Timelines vary by scale, but generally, a full project takes between 6 to 10 months from the initial discovery phase to the final handover.',
  },
  {
    q: 'Do you help with sourcing bespoke furniture and art?',
    a: 'Yes. We curate and source everything from vintage furniture to custom-built joinery and art pieces, ensuring they integrate seamlessly into the overall spatial narrative.',
  },
  {
    q: 'How do you approach sustainability and material health?',
    a: 'We prioritize longevity over trends. This means selecting natural, low-impact materials that age gracefully and contribute to a healthy interior environment.',
  },
];


interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, answer]);

  return (
    <div
      className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}
      onClick={onToggle}
    >
      <button type="button" className={styles.trigger}>
        <span className={styles.triggerText}>
          {question}
        </span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
          <Plus className={styles.svgIcon} />
        </span>
      </button>

      <div
        className={styles.content}
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className={styles.contentInner}>
          <p className={`${styles.answer} ${isOpen ? styles.answerVisible : styles.answerHidden}`}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FaqSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const items = listRef.current?.querySelectorAll("[data-faq-item]");
    if (!items) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section id="faq" className={styles.section}>
      {isMounted && (
        <div className={styles.backgroundWrap}>
          <img 
            src="/sketches/v1.jpeg" 
            alt="" 
            className={styles.backgroundImage}
          />
        </div>
      )}
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* LEFT — Heading */}
          <div className={styles.header}>
            <p className={styles.eyebrow}>FAQ</p>
            <AnimatedHeading 
              elementType="h2"
              className={styles.title}
            >
              Have <span className="font-serif-accent italic">Questions?</span>
            </AnimatedHeading>
            <p className={styles.subtitle}>
              Everything you need to know about our process, pricing, and
              partnership. Can't find what you're looking for? Reach out anytime.
            </p>
          </div>

          {/* RIGHT — Accordion */}
          <div ref={listRef} className={styles.list}>
            {faqs.map((faq, i) => (
              <div key={i} data-faq-item className={styles.listItem} style={{ opacity: 0 }}>
                <FaqItem
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

