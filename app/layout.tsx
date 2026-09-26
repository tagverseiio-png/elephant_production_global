import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://elephantproductionsg.com'),
  title:
    'Elephant Production | Award-Winning Wedding, Maternity & Newborn Photographers in Singapore, Chennai & Karaikudi | Destination Malaysia',
  description:
    'Singapore-based photography studio with presence in Chennai & Karaikudi. Specializing in Indian Weddings, Pre-Wedding, Maternity, Baby, Family & Corporate. Serving Malaysia for destination weddings. Book Team Elephant Production.',
  keywords: [
    'wedding photographer Singapore',
    'wedding videographer Singapore',
    'Indian wedding photographer Singapore',
    'pre wedding photographer Singapore',
    'maternity photographer Singapore',
    'newborn photographer Chennai',
    'baby photoshoot Chennai',
    'corporate photographer Singapore',
    'wedding photographer Karaikudi',
    'destination wedding photographer Malaysia',
    'Elephant Production Singapore',
    'Elephant Production Chennai',
    'Elephant Production Karaikudi',
    'Best Indian Wedding Photographer in Singapore',
  ],
  openGraph: {
    title:
      'Elephant Production | Award-Winning Wedding, Maternity & Newborn Photographers in Singapore, Chennai & Karaikudi',
    description:
      'Singapore-based photography studio with presence in Chennai & Karaikudi. Specializing in Indian Weddings, Pre-Wedding, Maternity, Baby, Family & Corporate. Serving Malaysia for destination weddings.',
    url: 'https://elephantproductionsg.com',
    siteName: 'Elephant Production',
    locale: 'en_SG',
    type: 'website',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  alternates: {
    canonical: 'https://elephantproductionsg.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://elephantproductionsg.com/#business',
      name: 'Elephant Production',
      alternateName: [
        'THE ELEPHANT PRODUCTION',
        'ELEPHANT PRODUCTION CHENNAI PRIVATE LIMITED',
      ],
      url: 'https://elephantproductionsg.com',
      image: 'https://bolt.new/static/og_default.png',
      description:
        'Singapore-registered photography & videography studio specializing in Indian Wedding, Punjabi Wedding, Indian Muslim Wedding, ROM & Reception, Christian Wedding, Destination Weddings, Pre-Wedding, Maternity, Baby Photoshoot, Family and Corporate shoots across Singapore & India.',
      foundingDate: '2022-01-08',
      slogan: 'Turning Real Emotions Into Visuals That Last A Lifetime.',
      telephone: '+6593515143',
      email: 'hello@elephantproduction.com',
      sameAs: ['https://www.instagram.com/elephantproduction_sg'],
      identifier: {
        '@type': 'PropertyValue',
        name: 'SG UEN',
        value: '53444987E',
      },
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: '7A Cuff Road, Little India',
          addressLocality: 'Singapore',
          postalCode: '209718',
          addressCountry: 'SG',
        },
        {
          '@type': 'PostalAddress',
          streetAddress:
            'Old No.148/7, New No.30/2, Habibullah Road, T.Nagar',
          addressLocality: 'Chennai',
          postalCode: '600017',
          addressCountry: 'IN',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Ananda Nagar, Alagappapuram',
          addressLocality: 'Karaikudi',
          addressCountry: 'IN',
        },
      ],
      areaServed: ['Singapore', 'Chennai', 'Karaikudi', 'Kuala Lumpur'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
      },
    },
    {
      '@type': 'WebSite',
      url: 'https://elephantproductionsg.com',
      name: 'Elephant Production',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is the best Indian wedding photographer in Singapore?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Elephant Production based at 7A Cuff Road, Little India, is rated 4.9 for Indian, Punjabi, Muslim and Christian weddings in Singapore, specializing in candid + cinematic.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Elephant Production have a studio in Chennai and Karaikudi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Chennai studio at Habibullah Road, T.Nagar (ELEPHANT PRODUCTION CHENNAI PRIVATE LIMITED) and Karaikudi at Ananda Nagar Alagappapuram, phone +91 8012248366.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you shoot in Malaysia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer destination wedding photography and pre-wedding shoots in Kuala Lumpur, Malaysia as an extension of our Singapore team. No separate Malaysia registration.',
          },
        },
        {
          '@type': 'Question',
          name: 'What services does Elephant Production offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Photography / Videography, Pre-Wedding Photoshoot, Baby Photoshoot, Maternity, Corporate and Family as per our official Instagram @elephantproduction_sg.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does wedding photography cost in Singapore and Chennai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Packages are customized by hours, functions, and deliverables. Contact +65 93515143 for Singapore/Malaysia and +91 8012248366 for Chennai/Karaikudi for transparent pricing.',
          },
        },
        {
          '@type': 'Question',
          name: 'How early should I book?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '3-6 months for weddings, 2nd trimester for maternity, and within pregnancy for newborn.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
