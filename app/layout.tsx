import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import '@/styles/globals.css';
import '@/styles/animations.css';

export const metadata: Metadata = {
  title: 'DRAW — Design Research Workshop | Architecture + Interior Design Studio',
  description: 'DRAW is a Mumbai-based architecture and interior design studio. We create calm, precisely structured spaces shaped by proportion, light, and material.',
  keywords: 'architecture studio Mumbai, interior design India, luxury architecture, DRAW studio',
  openGraph: {
    title: 'DRAW — Design Research Workshop',
    description: 'Architecture and interior design studio. Space is the medium. Silence is the style.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script 
          src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js" 
          defer
        />
      </head>
      <body>
        <SmoothScrollProvider>

          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
