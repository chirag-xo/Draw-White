'use client';

import AnimatedHeading from '@/components/animations/AnimatedHeading';
import RevealStagger from '@/components/animations/RevealStagger';
import OurJourney from '@/components/about/OurJourney';
import SupportingTeam from '@/components/about/SupportingTeam';
import FounderSection from '@/components/about/FounderSection';
import LottiePlayer from '@/components/about/LottiePlayer';
import styles from './about.module.css';

import clarityData from '@/public/animations/clarity.json';
import CubeData from '@/public/animations/Cube.json';
import empathyData from '@/public/animations/empathy.json';
import enduranceData from '@/public/animations/endurance.json';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Manifesto Hero */}
      <div className={styles.manifestoHero}>
        <RevealStagger>
          <AnimatedHeading
            elementType="h1"
            className={styles.manifestoTitle}
          >
            About Us
          </AnimatedHeading>
        </RevealStagger>
      </div>

      <OurJourney />

      {/* Values */}
      <div className={styles.valuesSection}>
        <div className={styles.valuesContainer}>
          <AnimatedHeading elementType="p" className={`text-eyebrow ${styles.sectionLabel}`}>
            Core Values
          </AnimatedHeading>
          <AnimatedHeading elementType="h2" className={styles.sectionTitle}>
            Architectural Integrity & <span className="font-serif-accent italic">Intentionality</span>
          </AnimatedHeading>
          <RevealStagger
            stagger={0.1}
            itemSelector={`.${styles.valueItem}`}
            className={styles.valuesGrid}
          >
            {[
              { title: 'Clarity', body: 'Every space begins with a singular idea. Reduced, refined, and resolved into its most essential form.', data: clarityData },
              { title: 'Precision', body: 'Every detail is considered. From material to junction, nothing is accidental—everything is intentional.', data: CubeData },
              { title: 'Empathy', body: 'Design begins with people. Spaces adapt to how they are lived, felt, and experienced.', data: empathyData },
              { title: 'Endurance', body: 'Built to last beyond trends. Quiet, balanced environments that remain relevant over time.', data: enduranceData },
            ].map((v, idx) => (
              <div key={idx} className={styles.valueItem}>
                <LottiePlayer
                  animationData={v.data}
                  className={styles.valueAnimation}
                />
                <div className={styles.valueContent}>
                  <AnimatedHeading elementType="h3" className={styles.valueTitle}>
                    {v.title}
                  </AnimatedHeading>
                  <p className={styles.valueBody}>{v.body}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>

      {/* Founders */}
      <FounderSection />

      {/* Supporting Team */}
      <SupportingTeam />

    </div>
  );
}
