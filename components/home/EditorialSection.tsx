import React from 'react';
import Testimonials from './Testimonials';
import FaqSection from './FaqSection';
import styles from './EditorialSection.module.css';

export default function EditorialSection() {
  return (
    <div className={styles.wrapper}>
      <img 
        src="/sketches/v1.jpeg" 
        alt="" 
        className={styles.backgroundImage}
      />
      <div className={styles.content}>
        <Testimonials />
        <FaqSection />
      </div>
    </div>
  );
}
