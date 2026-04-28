import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
        
        <h1 className={styles.title}>
          {post.title.split(' ').map((word, i, arr) => (
            i === Math.floor(arr.length / 2) ? <span key={i} className="font-serif-accent">{word} </span> : word + ' '
          ))}
        </h1>
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
