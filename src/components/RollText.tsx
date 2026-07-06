'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RollTextProps {
  children: string;
  delay?: number;
  className?: string;
  lineClassName?: string;
}

export default function RollText({ children, delay = 0, className = '', lineClassName = '' }: RollTextProps) {
  // Split text by newlines or manual break points
  const lines = children.split('\n');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: { y: '105%' },
    visible: {
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.77, 0, 0.175, 1] as const, // Elephant's custom ease out curve
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, idx) => (
        <span 
          key={idx} 
          className={`block overflow-hidden relative ${lineClassName}`}
          style={{ height: '1.2em' }}
        >
          <motion.span
            className="block origin-bottom"
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
