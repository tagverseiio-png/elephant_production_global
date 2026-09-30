'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { REGION_META } from '@/lib/region';
import { useRegionContext } from '@/components/site/region-context';

type ProjectType = 'Wedding' | 'Pre-Wedding' | 'Maternity' | 'Newborn' | 'Family' | 'Corporate' | 'Other';

const projectTypes: ProjectType[] = [
  'Wedding',
  'Pre-Wedding',
  'Maternity',
  'Newborn',
  'Family',
  'Corporate',
  'Other',
];

const studioLocations = [
  {
    city: 'Singapore HQ',
    country: 'Singapore',
    email: 'hello@elephantproduction.com',
    phone: '+65 93515143 / +65 83505914',
    address: '7A Cuff Road #02-01, Little India, Singapore 209718',
  },
  {
    city: 'Chennai',
    country: 'India',
    email: 'hello@elephantproduction.com',
    phone: '+91 8012248366',
    address:
      'Old No.148/7, New No.30/2, Habibullah Road, T.Nagar, Chennai 600017',
  },
  {
    city: 'Karaikudi',
    country: 'India',
    email: 'hello@elephantproduction.com',
    phone: '+91 8012248366',
    address: 'Ananda Nagar, Alagappapuram, Karaikudi',
  },
  {
    city: 'Kuala Lumpur',
    country: 'Malaysia — Destination via Singapore HQ',
    email: 'hello@elephantproduction.com',
    phone: '+65 93515143',
    address: 'Destination wedding coverage in KL, Penang, Johor & Langkawi',
  },
];

export default function ContactPage() {
  const { region } = useRegionContext();
  const regionMeta = REGION_META[region];
  const orderedStudios = useMemo(() => {
    const order: Record<string, string[]> = {
      SG: ['Singapore HQ', 'Kuala Lumpur', 'Chennai', 'Karaikudi'],
      IN: ['Chennai', 'Karaikudi', 'Singapore HQ', 'Kuala Lumpur'],
      MY: ['Kuala Lumpur', 'Singapore HQ', 'Chennai', 'Karaikudi'],
    };
    const idx = (city: string) =>
      (order[region] ?? order.SG).indexOf(city);
    return [...studioLocations].sort((a, b) => idx(a.city) - idx(b.city));
  }, [region]);
  const [selectedType, setSelectedType] = useState<ProjectType>('Wedding');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    date: '',
    location: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', date: '', location: '', message: '' });
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[100vw] min-h-screen bg-[#0a0a0a] text-white relative overflow-x-clip isolate [color-scheme:dark]"
    >
      {/* Ambient background glow — hidden on small screens to avoid iOS Safari
          compositing bugs (large blur layers painting white blocks) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[120px] transform-gpu" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[100px] transform-gpu" />
      </div>

      {/* Top section: editorial intro */}
      <div className="relative z-10 w-full max-w-full min-w-0 pt-32 md:pt-40 px-6 md:px-12 pb-16 md:pb-24 bg-[#0a0a0a]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/10 pb-16">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-[#666]">
              <span className="w-8 h-[1px] bg-[#333]" />
              <span>(07) Contact</span>
            </div>
            <h1 className="text-[16vw] md:text-[10vw] lg:text-[8vw] font-bold tracking-[-0.05em] leading-[0.82] uppercase font-oswald">
              Book
              <br />
              <span className="text-white/40">Your Date</span>
            </h1>
            <p className="text-[11px] md:text-[12px] font-medium text-[#888] max-w-md leading-[1.8] tracking-wide">
              {regionMeta.contactIntro} Singapore HQ: 7A Cuff Road, Little
              India | Chennai: Habibullah Road, T.Nagar | Karaikudi: Ananda
              Nagar | Malaysia destination via +65 93515143. Tell us your event
              date, venue and function.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end md:text-right mt-8 md:mt-0 w-full md:w-auto min-w-0 max-w-full">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#555]">
              Direct Inquiry
            </div>
            <a
              href="mailto:hello@elephantproduction.com"
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-white border-b border-[#333] pb-2 hover:border-white/60 hover:text-white/80 transition-all duration-300 break-all max-w-full"
            >
              hello@elephantproduction.com
            </a>
            <div className="flex gap-3 mt-2">
              {[
                {
                  name: 'Instagram',
                  href: 'https://www.instagram.com/elephantproduction_sg',
                },
                { name: 'Vimeo', href: '#' },
                { name: 'Pinterest', href: '#' },
                { name: 'Facebook', href: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  {...(social.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="text-[9px] uppercase tracking-widest font-bold text-[#666] hover:text-white transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content: form + sidebar */}
      <div className="relative z-10 w-full max-w-full min-w-0 px-6 md:px-12 pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 bg-[#0a0a0a]">
        {/* Form column */}
        <div className="col-span-1 lg:col-span-8 min-w-0 max-w-full w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-0 w-full max-w-full min-w-0">
            {/* Project type selector */}
            <div className="flex flex-col gap-4 mb-12">
              <label className="text-[9px] uppercase tracking-widest font-bold text-[#666]">
                Project Type
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-full border transition-all duration-300 ${
                      selectedType === type
                        ? 'bg-white text-[#111] border-white'
                        : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Form fields grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 w-full max-w-full min-w-0">
              {/* Name */}
              <div className="flex flex-col gap-2 mb-8 group min-w-0 max-w-full">
                <label className="text-[9px] uppercase tracking-widest font-bold text-[#666] group-focus-within:text-white transition-colors">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="block w-full max-w-full min-w-0 appearance-none rounded-none bg-transparent border-b border-[#333] py-3 text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-[#333] [color-scheme:dark]"
                  placeholder="Jane Doe"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 mb-8 group min-w-0 max-w-full">
                <label className="text-[9px] uppercase tracking-widest font-bold text-[#666] group-focus-within:text-white transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={formState.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="block w-full max-w-full min-w-0 appearance-none rounded-none bg-transparent border-b border-[#333] py-3 text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-[#333] [color-scheme:dark]"
                  placeholder="jane@example.com"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2 mb-8 group min-w-0 max-w-full">
                <label className="text-[9px] uppercase tracking-widest font-bold text-[#666] group-focus-within:text-white transition-colors">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formState.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="block w-full max-w-full min-w-0 appearance-none rounded-none bg-transparent border-b border-[#333] py-3 min-h-[54px] text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-[#333] [color-scheme:dark]"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-2 mb-8 group min-w-0 max-w-full">
                <label className="text-[9px] uppercase tracking-widest font-bold text-[#666] group-focus-within:text-white transition-colors">
                  Event Location
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  value={formState.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="block w-full max-w-full min-w-0 appearance-none rounded-none bg-transparent border-b border-[#333] py-3 text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-white transition-colors duration-300 placeholder-[#333] [color-scheme:dark]"
                  placeholder={regionMeta.homeBase}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 mb-12 group min-w-0 max-w-full w-full">
              <label className="text-[9px] uppercase tracking-widest font-bold text-[#666] group-focus-within:text-white transition-colors">
                Tell Us About Your Vision
              </label>
              <textarea
                rows={4}
                required
                value={formState.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="block w-full max-w-full min-w-0 appearance-none rounded-none bg-transparent border-b border-[#333] py-3 text-base sm:text-lg md:text-xl text-white focus:outline-none focus:border-white transition-colors duration-300 resize-none placeholder-[#333] [color-scheme:dark]"
                placeholder="Share the details, the mood, the moments you want to remember forever..."
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center items-start gap-6 sm:gap-8 w-full max-w-full min-w-0">
              <button
                type="submit"
                className="group relative overflow-hidden bg-white text-[#111] px-10 py-4 text-[11px] font-bold tracking-widest uppercase transition-all duration-500 hover:px-12 max-w-full shrink-0"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Send Inquiry
                  <span className="text-[14px] group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </span>
              </button>
              <span className="text-[9px] uppercase tracking-widest text-[#444] font-medium">
                We reply within 48 hours
              </span>
            </div>

            {/* Success message */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#111]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Inquiry received
                    </p>
                    <p className="text-[10px] text-[#888] tracking-wide mt-1">
                      Thank you, {formState.name || 'friend'}. We&apos;ll be in touch
                      shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Sidebar: studio locations + booking info */}
        <div className="col-span-1 lg:col-span-4 min-w-0 max-w-full w-full flex flex-col gap-12 lg:pl-8 lg:border-l border-white/10 bg-[#0a0a0a]">
          {/* Booking intro */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold text-[#555]">
              <span className="w-6 h-[1px] bg-[#333]" />
              Studios
            </div>
            <p className="text-[11px] text-[#777] leading-[1.8] tracking-wide font-medium">
              With studios in Singapore, Chennai &amp; Karaikudi, we&apos;re
              ready to travel wherever your story takes us — including
              destination weddings in Kuala Lumpur, Malaysia. Reach the location
              nearest you.
            </p>
          </div>

          {/* Studio locations — region-first order */}
          <div className="flex flex-col gap-6">
            {orderedStudios.map((studio) => (
              <div
                key={studio.city}
                className="flex flex-col gap-2 group cursor-default"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {studio.city}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#555] font-medium">
                    {studio.country}
                  </span>
                </div>
                <span className="text-[11px] text-[#777] tracking-wide">
                  {(studio as { address?: string }).address}
                </span>
                <a
                  href={`mailto:${studio.email}`}
                  className="text-[11px] text-[#888] hover:text-white transition-colors tracking-wide"
                >
                  {studio.email}
                </a>
                <span className="text-[11px] text-[#666] tracking-wide">
                  {studio.phone}
                </span>
                <div className="h-[1px] w-full bg-white/5 mt-3 group-hover:bg-white/15 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Travel note */}
          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold text-[#555]">
              <span className="w-6 h-[1px] bg-[#333]" />
              Destination
            </div>
            <p className="text-[11px] text-[#777] leading-[1.8] tracking-wide font-medium">
              Planning a destination shoot in Malaysia? Our Singapore team
              travels to Kuala Lumpur, Penang, Johor &amp; Langkawi for Indian
              weddings, ROM and pre-wedding at KLCC. Book via Singapore HQ +65
              93515143 or WhatsApp https://wa.me/message/4QPXGLOZYIAAL1.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
