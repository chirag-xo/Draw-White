import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media — DRAW Studio',
  description: 'Press coverage, awards, and editorial mentions for DRAW Studio.',
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
