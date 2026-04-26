import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import styles from './case-study.module.css';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — DRAW Studio`,
    description: project.tagline,
  };
}

export default function ProjectCaseStudy({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={project.img}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={`text-eyebrow ${styles.heroCategory}`}>{project.category}</p>
          <h1 className={styles.heroTitle}>{project.title}</h1>
          <p className={styles.heroLocation}>{project.location} · {project.year}</p>
        </div>
      </div>

      {/* Brief */}
      <div className={styles.brief}>
        <div className={styles.briefGrid}>
          {[
            { label: 'Project', value: project.title },
            { label: 'Location', value: project.location },
            { label: 'Year', value: project.year },
            { label: 'Category', value: project.category },
            { label: 'Area', value: project.area },
          ].map((item) => (
            <div key={item.label} className={styles.briefItem}>
              <span className={styles.briefLabel}>{item.label}</span>
              <span className={styles.briefValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={`text-eyebrow ${styles.sectionLabel}`}>The Brief</p>
          <p className={styles.challengeText}>{project.challenge}</p>
        </div>
      </div>

      {/* Image narrative */}
      <div className={styles.imageGrid}>
        {project.gallery.map((img, i) => (
          <div key={i} className={`${styles.narrativeImage} ${i % 3 === 0 ? styles.wide : ''}`}>
            <Image
              src={img}
              alt={`${project.title} — view ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 66vw"
            />
          </div>
        ))}
      </div>

      {/* Solution */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={`text-eyebrow ${styles.sectionLabel}`}>The Solution</p>
          <p className={styles.challengeText}>{project.solution}</p>
        </div>
      </div>

      {/* Next project */}
      <Link href={`/projects/${nextProject.slug}`} className={styles.nextProject}>
        <div className={styles.nextImage}>
          <Image
            src={nextProject.img}
            alt={nextProject.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className={styles.nextOverlay} />
        </div>
        <div className={styles.nextContent}>
          <p className={`text-eyebrow ${styles.nextLabel}`}>Next Project</p>
          <h2 className={styles.nextTitle}>{nextProject.title}</h2>
          <span className={styles.nextCta}>View Project →</span>
        </div>
      </Link>
    </article>
  );
}
