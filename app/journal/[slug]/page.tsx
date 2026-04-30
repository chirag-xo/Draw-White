import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedHeading from '@/components/animations/AnimatedHeading';
import { journalPosts } from '@/data/journal';
import styles from './journal-post.module.css';

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = journalPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — DRAW Studio`,
    description: post.excerpt,
  };
}

export default function JournalPostPage({ params }: PostPageProps) {
  const post = journalPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const titleWords = post.title.split(' ');
  const accentIndex = Math.floor(titleWords.length / 2);
  const beforeAccent = titleWords.slice(0, accentIndex).join(' ');
  const accentWord = titleWords[accentIndex];
  const afterAccent = titleWords.slice(accentIndex + 1).join(' ');

  return (
    <article className={styles.article}>
      <header className={styles.hero}>
        <Link href="/journal" className={styles.backLink}>
          ← Back to <span className="font-serif-accent">Journal</span>
        </Link>
        
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
        
        <AnimatedHeading elementType="h1" className={styles.title}>
          <>
            {beforeAccent && <>{beforeAccent}{' '}</>}
            <span className="font-serif-accent">{accentWord}</span>
            {afterAccent && <>{' '}{afterAccent}</>}
          </>
        </AnimatedHeading>
      </header>

      <div className={styles.heroImage}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
      </div>

      <JournalPostContent 
        content={post.content || ''} 
        excerpt={post.excerpt} 
      />

      {/* Spacing for footer transition */}
      <div className={styles.footerSpacer} />
    </article>
  );
}

import { JournalPostContent } from '@/components/journal/JournalPostContent';
