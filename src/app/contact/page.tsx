'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import DecryptedText from '@/components/DecryptedText';
import { publicApi, SiteSettings } from '@/lib/public-api';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.settings.get()
      .then(setSettings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const [isEnquirySubmitted, setIsEnquirySubmitted] = useState(false);
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnquirySubmitted(true);
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-[#000000] text-elephant-ivory select-none flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-widest uppercase">Loading...</span>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] as const },
    },
  };

  return (
    <div className="min-h-screen bg-[#000000] text-elephant-ivory select-none flex flex-col justify-between">
      
      {/* Contact Content Container (Screenshot 5) */}
      <section className="pt-20 sm:pt-28 pb-10 sm:pb-12 px-5 sm:px-8 md:px-12 max-w-4xl w-full mx-auto flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Header Typography */}
          <div className="space-y-4 text-center">
            <motion.span 
              variants={itemVariants}
              className="font-mono text-[9px] font-bold tracking-widest uppercase block"
            >
              CONTACT US
            </motion.span>
            
            {/* Lined Craft text block */}
            <div className="relative py-8 my-8">
              {/* Animated Top Border Line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-elephant-ivory/25 origin-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
              />

              {/* Lined sheets backdrop (animated thin lines) */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1">
                <motion.div 
                  className="h-px w-full bg-elephant-ivory/15 origin-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.3 }}
                />
                <motion.div 
                  className="h-px w-full bg-elephant-ivory/15 origin-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
                />
                <motion.div 
                  className="h-px w-full bg-elephant-ivory/15 origin-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
                />
              </div>

              {/* Animated Bottom Border Line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-elephant-ivory/25 origin-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              />
              
              <motion.h1 
                variants={itemVariants}
                className="font-serif text-[clamp(2.5rem,8vw,4.5rem)] font-black tracking-tight uppercase leading-[0.9] text-left py-4"
              >
                <DecryptedText text="CRAFT" delay={300} />
                <br />
                <DecryptedText text="THE NEXT ACT" delay={650} />
              </motion.h1>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="flex flex-col gap-12 pt-8">
            
            {/* Project Inquiries Email */}
            <motion.div 
              variants={itemVariants} 
              className="relative py-6 flex flex-col justify-between group"
            >
              {/* Top border line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.7 }}
              />

              <span className="font-mono text-[8px] text-elephant-ivory/50 uppercase mt-2">
                GENERAL ENQUIRIES
              </span>
              <a 
                href={`mailto:${settings.email}?subject=${encodeURIComponent(settings.emailSubject)}`} 
                className="font-serif text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide hover:text-white transition-colors mt-2 break-all"
                data-cursor-text="MAIL"
              >
                {settings.email.toUpperCase()}
              </a>

              {/* Bottom border line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.9 }}
              />
            </motion.div>

            {/* Enquiry Form */}
            <div id="enquire" className="scroll-mt-32">
              <motion.span 
                variants={itemVariants}
                className="font-mono text-[9px] font-bold tracking-widest uppercase block mb-8 text-elephant-ivory/50"
              >
                START A PROJECT
              </motion.span>
              
              <motion.div variants={itemVariants} className="w-full">
                {!isEnquirySubmitted ? (
                  <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-8 pb-10">
                    {[
                      { num: '01', label: 'NAME', type: 'text', required: true },
                      { num: '02', label: 'EMAIL', type: 'email', required: true },
                      { num: '03', label: 'PHONE', type: 'tel', required: false },
                    ].map(field => (
                      <div key={field.num} className="flex flex-col relative group">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-mono text-[9px] text-elephant-ivory/40 font-bold tracking-wider">{field.num}</span>
                          <label className="font-sans text-[11px] font-bold tracking-[0.15em] text-elephant-ivory uppercase">{field.label}</label>
                        </div>
                        <input
                          type={field.type}
                          required={field.required}
                          className="w-full bg-transparent border-0 border-b border-elephant-ivory/20 focus:border-elephant-ivory/60 outline-none rounded-none px-0 py-2 font-sans text-sm text-elephant-ivory placeholder-elephant-ivory/30 transition-colors"
                          placeholder={`Your ${field.label.toLowerCase()}`}
                        />
                      </div>
                    ))}

                    <div className="flex flex-col relative group">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-mono text-[9px] text-elephant-ivory/40 font-bold tracking-wider">04</span>
                        <label className="font-sans text-[11px] font-bold tracking-[0.15em] text-elephant-ivory uppercase">PROJECT TYPE</label>
                      </div>
                      <div className="relative">
                        <select required className="w-full bg-transparent border-0 border-b border-elephant-ivory/20 focus:border-elephant-ivory/60 outline-none rounded-none px-0 py-2 font-sans text-sm text-elephant-ivory appearance-none transition-colors cursor-pointer">
                          <option className="bg-black text-elephant-ivory" value="" disabled selected hidden>Select a type...</option>
                          <option className="bg-black text-elephant-ivory" value="Commercial">Commercial</option>
                          <option className="bg-black text-elephant-ivory" value="Documentary">Documentary</option>
                          <option className="bg-black text-elephant-ivory" value="Music Video">Music Video</option>
                          <option className="bg-black text-elephant-ivory" value="Feature">Feature</option>
                          <option className="bg-black text-elephant-ivory" value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-elephant-ivory/40">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>

                    {[
                      { num: '05', label: 'BUDGET RANGE', type: 'text' },
                      { num: '06', label: 'TIMELINE', type: 'text' },
                    ].map(field => (
                      <div key={field.num} className="flex flex-col relative group">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-mono text-[9px] text-elephant-ivory/40 font-bold tracking-wider">{field.num}</span>
                          <label className="font-sans text-[11px] font-bold tracking-[0.15em] text-elephant-ivory uppercase">{field.label}</label>
                        </div>
                        <input
                          type={field.type}
                          className="w-full bg-transparent border-0 border-b border-elephant-ivory/20 focus:border-elephant-ivory/60 outline-none rounded-none px-0 py-2 font-sans text-sm text-elephant-ivory placeholder-elephant-ivory/30 transition-colors"
                        />
                      </div>
                    ))}

                    <div className="flex flex-col relative group">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-mono text-[9px] text-elephant-ivory/40 font-bold tracking-wider">07</span>
                        <label className="font-sans text-[11px] font-bold tracking-[0.15em] text-elephant-ivory uppercase">MESSAGE</label>
                      </div>
                      <textarea
                        rows={3}
                        required
                        className="w-full bg-transparent border-0 border-b border-elephant-ivory/20 focus:border-elephant-ivory/60 outline-none rounded-none px-0 py-2 font-sans text-sm text-elephant-ivory placeholder-elephant-ivory/30 transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-6 w-full flex items-center justify-between px-6 py-4 border border-elephant-ivory/20 hover:bg-elephant-ivory hover:text-[#000000] transition-colors cursor-pointer rounded-sm group relative overflow-hidden"
                      style={{ borderLeft: '2px dashed rgba(250,247,238,0.3)' }}
                    >
                      <span className="font-sans font-black tracking-[0.15em] text-[12px] uppercase">SUBMIT ENQUIRY</span>
                      <svg className="transform group-hover:translate-x-1 transition-transform" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1L12.5 5M12.5 5L8 9M12.5 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-16 text-center px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 rounded-full border border-elephant-ivory/10 flex items-center justify-center mb-6 text-elephant-ivory bg-elephant-ivory/5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <h3 className="font-serif text-3xl font-black uppercase tracking-widest text-elephant-ivory mb-4">Ticket Received</h3>
                    <p className="font-sans text-[13px] text-elephant-ivory/60 leading-relaxed max-w-[250px]">
                      Your enquiry has been successfully logged. We'll be in touch within 48 hours.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Our Presence */}
            <div>
              <motion.span 
                variants={itemVariants}
                className="font-mono text-[9px] font-bold tracking-widest uppercase block mb-6 text-elephant-ivory/50"
              >
                OUR PRESENCE
              </motion.span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Singapore Head Office */}
                <motion.div 
                  variants={itemVariants} 
                  className="relative py-4 flex flex-col justify-between group"
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.8 }}
                  />
                  <span className="font-mono text-[8px] text-elephant-ivory/50 uppercase mt-2">
                    HEAD OFFICE
                  </span>
                  <span className="font-serif text-xl md:text-2xl font-extrabold tracking-wide mt-2 mb-4">
                    🇸🇬 Singapore
                  </span>
                  <a 
                    href="tel:+6593515143" 
                    className="font-sans text-base md:text-lg font-black tracking-wider hover:text-white transition-colors mt-auto"
                    data-cursor-text="CALL"
                  >
                    📞 +65 9351 5143
                  </a>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 1.0 }}
                  />
                </motion.div>

                {/* Chennai Branch */}
                <motion.div 
                  variants={itemVariants} 
                  className="relative py-4 flex flex-col justify-between group"
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.9 }}
                  />
                  <span className="font-mono text-[8px] text-elephant-ivory/50 uppercase mt-2">
                    BRANCH
                  </span>
                  <span className="font-serif text-xl md:text-2xl font-extrabold tracking-wide mt-2 mb-4">
                    🇮🇳 Chennai
                  </span>
                  <a 
                    href="tel:+919003071700" 
                    className="font-sans text-base md:text-lg font-black tracking-wider hover:text-white transition-colors mt-auto"
                    data-cursor-text="CALL"
                  >
                    📞 +91 90030 71700
                  </a>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 1.1 }}
                  />
                </motion.div>

                {/* Karaikudi Branch */}
                <motion.div 
                  variants={itemVariants} 
                  className="relative py-4 flex flex-col justify-between group"
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 1.0 }}
                  />
                  <span className="font-mono text-[8px] text-elephant-ivory/50 uppercase mt-2">
                    BRANCH
                  </span>
                  <span className="font-serif text-xl md:text-2xl font-extrabold tracking-wide mt-2 mb-4">
                    🇮🇳 Karaikudi
                  </span>
                  <a 
                    href="tel:+918012248366" 
                    className="font-sans text-base md:text-lg font-black tracking-wider hover:text-white transition-colors mt-auto"
                    data-cursor-text="CALL"
                  >
                    📞 +91 80122 48366
                  </a>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-elephant-ivory/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 1.2 }}
                  />
                </motion.div>

              </div>
            </div>

          </div>
        </motion.div>
      </section>

    </div>
  );
}
