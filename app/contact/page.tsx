import type { Metadata } from 'next';
import ContactApp from '@/components/contact/ContactApp';

export const metadata: Metadata = {
  title: 'Contact — DRAW Studio',
  description: 'Start a conversation with DRAW Studio. We work with residential, hospitality, and commercial clients across India and beyond.',
};

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <ContactApp />
    </main>
  );
}
