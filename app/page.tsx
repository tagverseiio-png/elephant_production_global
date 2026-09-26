'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navigation from '@/components/site/navigation';
import Footer from '@/components/site/footer';
import HeroSection from '@/components/site/hero-section';
import ServicesSection from '@/components/site/services-section';
import GlobalPresenceSection from '@/components/site/global-presence-section';
import ProcessSection from '@/components/site/process-section';
import WorkPage from '@/components/site/work-page';
import WorkDetailPage from '@/components/site/work-detail-page';
import ContactPage from '@/components/site/contact-page';
import AboutPage from '@/components/site/about-page';
import ServicesPage from '@/components/site/services-page';
import ServiceDetailPage from '@/components/site/service-detail-page';
import LocationsPage from '@/components/site/locations-page';
import LocationDetailPage from '@/components/site/location-detail-page';
import FaqPage from '@/components/site/faq-page';
import PrivacyPage from '@/components/site/privacy-page';
import TermsPage from '@/components/site/terms-page';
import CancellationPage from '@/components/site/cancellation-page';
import { RegionContext } from '@/components/site/region-context';
import { useRegion } from '@/hooks/use-region';
import type { PortfolioWork } from '@/lib/data';

export type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'locations'
  | 'location-detail'
  | 'faq'
  | 'work'
  | 'work-detail'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cancellation';

function HomePage({
  onServiceSelect,
}: {
  onServiceSelect: (slug: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection />
      <ServicesSection onServiceSelect={onServiceSelect} />
      <GlobalPresenceSection />
      <ProcessSection />
      {/* Site-wide SEO content — visually hidden, no UI change */}
      <div className="sr-only" aria-hidden={false}>
        <section>
          <h2>What is Elephant Production?</h2>
          <p>
            Elephant Production is a professional photography and videography
            service that accommodates to your needs. Founded in Singapore on 08
            Jan 2022 as THE ELEPHANT PRODUCTION, we specialize in Indian
            Wedding, Punjabi Wedding, Indian Muslim Wedding, ROM &amp;
            Reception, Christian Wedding, and Destination Weddings, plus
            Pre-Wedding, Maternity, Baby Photoshoot, Family and Corporate
            shoots across Singapore &amp; India.
          </p>
          <h2>About Elephant Production — Our Story From Singapore to Chennai &amp; Karaikudi</h2>
          <p>
            Every Moment Deserves To Be Remembered Beautifully. What began as a
            passion for storytelling through the lens in Little India,
            Singapore, grew into THE ELEPHANT PRODUCTION, registered on 08 Jan
            2022 at 7 Cuff Road #02-01, Singapore 209718. In 2025 we expanded
            as ELEPHANT PRODUCTION CHENNAI PRIVATE LIMITED at Old No.148/7,
            New No.30/2, Habibullah Road, T.Nagar, Chennai 600017. Today we
            operate from Singapore: 7A Cuff Road, Little India, Singapore
            209718 | +65 93515143 / +65 83505914, Chennai: Habibullah Road,
            T.Nagar, Chennai, Karaikudi: Ananda Nagar, Alagappapuram, Karaikudi
            | +91 8012248366, Malaysia: Destination Wedding Coverage in Kuala
            Lumpur, Penang, Langkawi — no physical office, on-request
            destination team.
          </p>
          <h2>Why choose us for your Indian wedding in Singapore &amp; Chennai?</h2>
          <p>
            Culture Understood: We shoot Punjabi, Tamil, Malayali, Telugu,
            Muslim, Christian weddings natively. We know rituals. One Team, Two
            Countries: Same editing style, same quality in Singapore, Chennai
            and Karaikudi. Sony Cinematic Team: Team Elephant Production
            shoots on Sony for true skin tones. 4.9 Rated: Very professional
            team, friendly too. Album and photos turned out very nice —
            Verified Review. Transparent Process: No hidden costs. On-time
            delivery.
          </p>
        </section>
        <section>
          <h2>Wedding Photographer in Singapore — Indian, Punjabi, Muslim &amp; Christian Weddings</h2>
          <p>
            If you are searching for a wedding photographer in Little India,
            Singapore who understands Indian wedding traditions, Elephant
            Production is based 2 minutes from Serangoon Road. We cover: Temple
            Wedding, Church Wedding, ROM, Reception, Destination Wedding in
            Malaysia &amp; Maldives. Includes: Candid + Traditional Photography,
            Cinematic Film, Same-Day Edit, Premium Album.
          </p>
          <h2>Wedding Photographer in Chennai &amp; Karaikudi — Chettinad &amp; Tamil Weddings</h2>
          <p>
            From T.Nagar to Karaikudi Alagappapuram, we are your local team. We
            understand Chettinad rituals, Tamil Muhurtham timings, and family
            dynamics. Keywords: wedding photographer in Karaikudi, candid
            wedding photographer Chennai, Chettinad wedding photographer.
          </p>
          <h2>Pre Wedding Photoshoot in Singapore, Chennai &amp; Malaysia</h2>
          <p>
            Looking for pre wedding photoshoot in Singapore with Indian wear?
            Or at KLCC Malaysia? We offer destination shoots at Furaveri
            Maldives, KLCC, Marina Bay, Mahabalipuram. Packages: 4 Hour, Full
            Day, Destination.
          </p>
          <h2>Maternity Photographer in Singapore &amp; Chennai — Elegant Motherhood Portraits</h2>
          <p>
            How much does a maternity photoshoot cost in Singapore? Packages
            start from consultation and include gowns, makeup, partner and
            sibling shots. Safe, comfortable studio with female assistant.
          </p>
          <h2>Newborn &amp; Baby Photoshoot in Chennai &amp; Singapore — Safe &amp; Patient</h2>
          <p>
            Best time for newborn shoot is 5-15 days. We maintain warm,
            hygienic, baby-led sessions. Props, wraps, family shots included.
          </p>
          <h2>Corporate Photographer in Singapore &amp; Chennai for Events &amp; Branding</h2>
          <p>
            For conferences, product launches, team headshots, we are punctual,
            polished and provide 48-hour delivery for corporate clients.
          </p>
        </section>
        <section>
          <h2>Our Locations</h2>
          <p>
            Elephant Production, 7A Cuff Road, Little India, Singapore 209718.
            Call +65 93515143. Near Tekka Market. Top-rated Indian wedding
            photographer in Little India for Indian Wedding, ROM &amp;
            Reception.
          </p>
          <p>
            Elephant Production Chennai, Old No.148/7, New No.30/2, Habibullah
            Road, T.Nagar, Chennai 600017. Serving T.Nagar, Anna Nagar, ECR.
            Specialists in Tamil &amp; Telugu weddings, Baby Photoshoot
            Chennai.
          </p>
          <p>
            The Elephant Production, Ananda Nagar Alagappapuram, Karaikudi,
            Tamil Nadu. Call +91 8012248366. Chettinad wedding specialists for
            Karaikudi, Devakottai, Tirupathur.
          </p>
          <p>
            Destination Wedding Photographer in Malaysia. While we do not have
            a registered office in Malaysia, our Singapore team travels to
            Kuala Lumpur, Penang, and Johor for Indian weddings, ROM and
            pre-wedding at KLCC. Malaysian clients book via our Singapore HQ
            +65 93515143.
          </p>
        </section>
        <section>
          <h2>Frequently Asked Questions</h2>
          <h3>Who is the best Indian wedding photographer in Singapore?</h3>
          <p>
            Elephant Production based at 7A Cuff Road, Little India, is rated
            4.9 for Indian, Punjabi, Muslim and Christian weddings in
            Singapore, specializing in candid + cinematic.
          </p>
          <h3>Does Elephant Production have a studio in Chennai and Karaikudi?</h3>
          <p>
            Yes. Chennai studio at Habibullah Road, T.Nagar — ELEPHANT
            PRODUCTION CHENNAI PRIVATE LIMITED — and Karaikudi at Ananda Nagar
            Alagappapuram, phone +91 8012248366.
          </p>
          <h3>Do you shoot in Malaysia?</h3>
          <p>
            Yes, we offer destination wedding photography and pre-wedding
            shoots in Kuala Lumpur, Malaysia as an extension of our Singapore
            team. No separate Malaysia registration.
          </p>
          <h3>What services does Elephant Production offer?</h3>
          <p>
            Photography / Videography, Pre-Wedding Photoshoot, Baby Photoshoot,
            Maternity, Corporate and Family as per our official Instagram
            @elephantproduction_sg.
          </p>
          <h3>How much does wedding photography cost in Singapore and Chennai?</h3>
          <p>
            Packages are customized by hours, functions, and deliverables.
            Contact +65 93515143 for Singapore/Malaysia and +91 8012248366 for
            Chennai/Karaikudi for transparent pricing.
          </p>
          <h3>How early should I book?</h3>
          <p>
            3-6 months for weddings, 2nd trimester for maternity, and within
            pregnancy for newborn.
          </p>
        </section>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { region, setRegion } = useRegion();

  useEffect(() => {
    if (currentPage !== 'work-detail') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [currentPage]);

  const handleWorkSelect = (work: PortfolioWork) => {
    setSelectedWork(work);
    setCurrentPage('work-detail');
  };

  const handleServiceSelect = (slug: string) => {
    if (!slug) {
      setSelectedService(null);
      setCurrentPage('services');
      return;
    }
    setSelectedService(slug);
    setCurrentPage('service-detail');
  };

  const handleLocationSelect = (slug: string) => {
    setSelectedLocation(slug);
    setCurrentPage('location-detail');
  };

  const handlePageChange = (page: Page) => {
    if (page !== 'work-detail') {
      setSelectedWork(null);
    }
    if (page !== 'service-detail') {
      setSelectedService(null);
    }
    if (page !== 'location-detail') {
      setSelectedLocation(null);
    }
    setCurrentPage(page);
  };

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
    <div className="font-sans antialiased text-[#111111] bg-white selection:bg-[#111] selection:text-white overflow-x-hidden w-full relative min-h-screen flex flex-col justify-between">
      <Navigation currentPage={currentPage} onNavigate={handlePageChange} />

      <main className="w-full flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <HomePage key="home" onServiceSelect={handleServiceSelect} />
          )}
          {currentPage === 'about' && <AboutPage key="about" />}
          {currentPage === 'services' && (
            <ServicesPage key="services" onServiceSelect={handleServiceSelect} />
          )}
          {currentPage === 'service-detail' && selectedService && (
            <ServiceDetailPage
              key="service-detail"
              slug={selectedService}
              onBack={() => handlePageChange('services')}
              onContact={() => handlePageChange('contact')}
            />
          )}
          {currentPage === 'locations' && (
            <LocationsPage
              key="locations"
              onLocationSelect={handleLocationSelect}
            />
          )}
          {currentPage === 'location-detail' && selectedLocation && (
            <LocationDetailPage
              key="location-detail"
              slug={selectedLocation}
              onBack={() => handlePageChange('locations')}
              onContact={() => handlePageChange('contact')}
            />
          )}
          {currentPage === 'faq' && (
            <FaqPage key="faq" onContact={() => handlePageChange('contact')} />
          )}
          {currentPage === 'privacy' && <PrivacyPage key="privacy" />}
          {currentPage === 'terms' && <TermsPage key="terms" />}
          {currentPage === 'cancellation' && (
            <CancellationPage
              key="cancellation"
              onContact={() => handlePageChange('contact')}
            />
          )}
          {currentPage === 'work' && (
            <WorkPage key="work" onWorkSelect={handleWorkSelect} />
          )}
          {currentPage === 'work-detail' && selectedWork && (
            <WorkDetailPage
              key="work-detail"
              work={selectedWork}
              onBack={() => handlePageChange('work')}
            />
          )}
          {currentPage === 'contact' && <ContactPage key="contact" />}
        </AnimatePresence>
      </main>

      <Footer onNavigate={(page) => handlePageChange(page)} />
    </div>
    </RegionContext.Provider>
  );
}
