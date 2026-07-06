'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { playTransition } from '@/utils/audio';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  useEffect(() => {
    playTransition();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] as const }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
