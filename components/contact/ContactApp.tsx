'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedHeading from "../animations/AnimatedHeading";
import RevealStagger from "../animations/RevealStagger";
import styles from "./ContactApp.module.css";

const areaRanges = ["250-400", "400-600", "600-1000", "1000-5000", "5000+"];
const propertyTypes = ["Commercial", "Apartments", "House", "Institutional", "Architecture"];

/* ── Floating Label Input ── */
const FloatingInput = ({
  label,
  type = "text",
  isTextarea = false,
}: {
  label: string;
  type?: string;
  isTextarea?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  const baseProps = {
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      setHasValue(e.target.value.length > 0);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0);
    },
    className: styles.input,
  };

  return (
    <div className={styles.floatWrap}>
      <span
        className={`${styles.floatLabel} ${isActive ? styles.floatLabelActive : styles.floatLabelInactive
          } ${focused ? styles.floatLabelFocused : ""}`}
      >
        {label}
      </span>

      {isTextarea ? (
        <textarea rows={1} {...baseProps} />
      ) : (
        <input type={type} {...baseProps} />
      )}

      {/* Underline layers */}
      <div className={styles.lineBase} />
      <div className={styles.lineActive} style={{ width: focused ? "100%" : "0%" }} />
    </div>
  );
};

/* Stagger helper for form fields */
const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ContactApp() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [formType, setFormType] = useState<"message" | "callback">("message");
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabSwitch = useCallback((type: "message" | "callback") => {
    if (type === formType || isAnimating) return;
    setIsAnimating(true);
    setFormType(type);
    setTimeout(() => setIsAnimating(false), 500);
  }, [formType, isAnimating]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        },
      );

      const img = imageRef.current?.querySelector("img");
      if (img) {
        gsap.fromTo(img, { scale: 1 }, { scale: 1.05, duration: 12, ease: "none", repeat: -1, yoyo: true });
      }

      if (imageRef.current) {
        gsap.fromTo(imageRef.current, { y: 0 }, {
          y: -40, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFileAdd = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
  };
  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <section id="contact" ref={sectionRef} className={styles.host}>
      {/* Header Block — Full Width Sketch Background */}
      <div className={styles.header}>
        <RevealStagger>
          <div className={styles.eyebrowWrap}>
            <p className="text-eyebrow" style={{ color: "var(--color-text-muted)" }}>GET IN TOUCH</p>
            <div className={styles.eyebrowLine} />
          </div>
          <AnimatedHeading elementType="h1" className={styles.title}>
            Start Your Design Journey
          </AnimatedHeading>
          <p className={styles.subtitle}>
            Tell us about your project and we'll get back within 24 hours.
          </p>
        </RevealStagger>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Form column */}
          <div className={styles.formCol}>
            {/* Tab switch */}
            <div className={styles.tabs}>
              <button
                onClick={() => handleTabSwitch("message")}
                className={`${styles.tab} ${formType === "message" ? styles.tabActive : ""}`}
              >
                Send A Message
              </button>
              <button
                onClick={() => handleTabSwitch("callback")}
                className={`${styles.tab} ${formType === "callback" ? styles.tabActive : ""}`}
              >
                Request a Call Back
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className={styles.formBody}>
              <AnimatePresence mode="wait">
                {formType === "message" ? (
                  <motion.div
                    key="message"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }}
                    style={{ flex: 1, display: "flex", flexDirection: "column", gap: "32px" }}
                  >
                    <motion.div custom={0} variants={fieldVariants} className={styles.fieldRow}>
                      <FloatingInput label="Full Name" />
                      <FloatingInput label="Phone" type="tel" />
                    </motion.div>
                    <motion.div custom={1} variants={fieldVariants} className={styles.fieldRow}>
                      <FloatingInput label="Your City" />
                      <FloatingInput label="Email" type="email" />
                    </motion.div>
                    <motion.div custom={2} variants={fieldVariants} className={styles.fieldRow}>
                      <div className={styles.selectWrap}>
                        <select className={styles.select} defaultValue="">
                          <option value="" disabled hidden>Property Type</option>
                          {propertyTypes.map((type) => (
                            <option key={type} value={type.toLowerCase()}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                    <motion.div custom={3} variants={fieldVariants}>
                      <FloatingInput label="Your Message" isTextarea />
                    </motion.div>

                    <motion.div custom={4} variants={fieldVariants} className={styles.areaSection}>
                      <p className={styles.sectionTitle}>Area (m<sup>2</sup>)</p>
                      <div className={styles.areaGrid}>
                        {areaRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setSelectedArea(range)}
                            className={`${styles.areaBtn} ${selectedArea === range ? styles.areaBtnActive : ""}`}
                          >
                            <div className={styles.areaCircle}>
                              <div className={styles.areaCircleInner} />
                            </div>
                            <span className={styles.areaLabel}>{range}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div custom={5} variants={fieldVariants} className={styles.formFooter}>
                      <div>
                        <button type="button" onClick={handleFileAdd} className={styles.uploadBtn}>
                          <div className={styles.uploadIcon}>
                            {/* SVG Plus Icon replacing lucide-react */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" />
                              <path d="M12 5v14" />
                            </svg>
                          </div>
                          <div className={styles.uploadText}>
                            <p className={styles.uploadTitle}>Add File</p>
                            <p className={styles.uploadDesc}>file size max 40MB</p>
                          </div>
                        </button>
                        <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileChange} className="hidden" style={{ display: 'none' }} />
                        {files.length > 0 && (
                          <div className={styles.filesList}>
                            {files.map((file, i) => (
                              <span key={i} className={styles.fileChip}>
                                {file.name}
                                <button type="button" onClick={() => removeFile(i)}>&times;</button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button type="submit" className={styles.submitBtn}>Send Request</button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="callback"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
                    style={{ flex: 1, display: "flex", flexDirection: "column", gap: "32px" }}
                  >
                    <motion.div custom={0} variants={fieldVariants} className={styles.fieldRow}>
                      <FloatingInput label="Full Name" />
                      <FloatingInput label="Email Address" type="email" />
                    </motion.div>
                    <motion.div custom={1} variants={fieldVariants} className={styles.fieldRow}>
                      <FloatingInput label="Phone Number" type="tel" />
                    </motion.div>
                    <motion.label custom={2} variants={fieldVariants} className={styles.checkWrap}>
                      <input type="checkbox" required />
                      <span>I agree to the terms and conditions</span>
                    </motion.label>
                    <motion.div custom={3} variants={fieldVariants} style={{ marginTop: '24px' }}>
                      <button type="submit" className={styles.submitBtn}>Request Callback</button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Image column — desktop/tablet only */}
          <div className={styles.imageCol}>
            <div ref={imageRef} className={styles.stickyImageWrap}>
              <img
                src="/full logo.webp"
                alt="Architecture presentation"
                className={styles.stickyImage}
              />
              <div className={styles.imageOverlayX} />
              <div className={styles.imageOverlayY} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
