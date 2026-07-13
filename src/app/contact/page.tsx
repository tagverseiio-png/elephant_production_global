'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import DecryptedText from '@/components/DecryptedText';
import { contactInfo } from '@/data/contact';

export default function ContactPage() {
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
    <div className="min-h-screen bg-[#FF0000] text-[#000000] select-none flex flex-col justify-between">
      
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
                className="absolute top-0 left-0 right-0 h-px bg-[#000000]/25 origin-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
              />

              {/* Lined sheets backdrop (animated thin lines) */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-1">
                <motion.div 
                  className="h-px w-full bg-[#000000]/15 origin-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.3 }}
                />
                <motion.div 
                  className="h-px w-full bg-[#000000]/15 origin-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
                />
                <motion.div 
                  className="h-px w-full bg-[#000000]/15 origin-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
                />
              </div>

              {/* Animated Bottom Border Line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-[#000000]/25 origin-center"
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
                className="absolute top-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.7 }}
              />

              <span className="font-mono text-[8px] text-[#000000]/50 uppercase mt-2">
                PROJECT INQUIRIES
              </span>
              <a 
                href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(contactInfo.emailSubject)}`} 
                className="font-serif text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide hover:text-black transition-colors mt-2 break-all"
                data-cursor-text="MAIL"
              >
                {contactInfo.email.toUpperCase()}
              </a>

              {/* Bottom border line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.9 }}
              />
            </motion.div>

            {/* Our Presence */}
            <div>
              <motion.span 
                variants={itemVariants}
                className="font-mono text-[9px] font-bold tracking-widest uppercase block mb-6 text-[#000000]/50"
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
                    className="absolute top-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.8 }}
                  />
                  <span className="font-mono text-[8px] text-[#000000]/50 uppercase mt-2">
                    HEAD OFFICE
                  </span>
                  <span className="font-serif text-xl md:text-2xl font-extrabold tracking-wide mt-2 mb-4">
                    🇸🇬 Singapore
                  </span>
                  <a 
                    href="tel:+6593515143" 
                    className="font-sans text-base md:text-lg font-black tracking-wider hover:text-black transition-colors mt-auto"
                    data-cursor-text="CALL"
                  >
                    📞 +65 9351 5143
                  </a>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
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
                    className="absolute top-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 0.9 }}
                  />
                  <span className="font-mono text-[8px] text-[#000000]/50 uppercase mt-2">
                    BRANCH
                  </span>
                  <span className="font-serif text-xl md:text-2xl font-extrabold tracking-wide mt-2 mb-4">
                    🇮🇳 Chennai
                  </span>
                  <a 
                    href="tel:+919003071700" 
                    className="font-sans text-base md:text-lg font-black tracking-wider hover:text-black transition-colors mt-auto"
                    data-cursor-text="CALL"
                  >
                    📞 +91 90030 71700
                  </a>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
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
                    className="absolute top-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 1.0 }}
                  />
                  <span className="font-mono text-[8px] text-[#000000]/50 uppercase mt-2">
                    BRANCH
                  </span>
                  <span className="font-serif text-xl md:text-2xl font-extrabold tracking-wide mt-2 mb-4">
                    🇮🇳 Karaikudi
                  </span>
                  <a 
                    href="tel:+918012248366" 
                    className="font-sans text-base md:text-lg font-black tracking-wider hover:text-black transition-colors mt-auto"
                    data-cursor-text="CALL"
                  >
                    📞 +91 80122 48366
                  </a>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#000000]/20 origin-left"
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
