import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Elephant Productionss',
  description: 'Elephant Productionss is a boutique production house dedicated to crafting groundbreaking narratives that push the boundaries of cinematic storytelling.',
  openGraph: {
    title: 'Elephant Productionss',
    description: 'Elephant Productionss is a boutique production house dedicated to crafting groundbreaking narratives that push the boundaries of cinematic storytelling.',
    url: 'https://www.elephantproductions.com',
    siteName: 'Elephant Productionss',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elephant Productionss',
    description: 'Elephant Productionss is a boutique production house dedicated to crafting groundbreaking narratives that push the boundaries of cinematic storytelling.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="font-sans antialiased bg-elephant-ivory text-elephant-black min-h-screen flex flex-col">
        <Navbar />
        <SmoothScroll>
          <main className="flex-1 flex flex-col">{children}</main>
        </SmoothScroll>

        {/* Global SVG mask and filter definitions for ticket cutouts, torn edges, and gothic arches */}
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <defs>
              <clipPath id="ticketMaskLarge" clipPathUnits="objectBoundingBox">
                <path d="M 0,0.03 A 0.03,0.03 0 0,0 0.03,0 L 0.67,0 A 0.03,0.04 0 0,0 0.73,0 L 0.97,0 A 0.03,0.03 0 0,0 1,0.03 L 1,0.97 A 0.03,0.03 0 0,0 0.97,1 L 0.73,1 A 0.03,0.04 0 0,0 0.67,1 L 0.03,1 A 0.03,0.03 0 0,0 0,0.97 Z" />
              </clipPath>
              <clipPath id="ticketMaskSmall" clipPathUnits="objectBoundingBox">
                <path d="M 0,0.15 A 0.15,0.15 0 0,0 0.15,0 L 0.85,0 A 0.15,0.15 0 0,0 1,0.15 L 1,0.85 A 0.15,0.15 0 0,0 0.85,1 L 0.15,1 A 0.15,0.15 0 0,0 0,0.85 Z" />
              </clipPath>
            <clipPath id="gothicArch" clipPathUnits="objectBoundingBox">
              <path d="M 0,1 L 0,0.45 C 0,0.22 0.22,0.03 0.5,0 C 0.78,0.03 1,0.22 1,0.45 L 1,1 Z" />
            </clipPath>

          </defs>
        </svg>
      </body>
    </html>
  );
}
