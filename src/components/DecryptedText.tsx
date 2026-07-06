'use client';

import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_@#%&*';

export default function DecryptedText({ text, speed = 30, delay = 0, className = '' }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const iterationRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset states on text changes
    iterationRef.current = 0;
    
    const initialText = text
      .split('')
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');

    setDisplayText(initialText);

    const startDecrypt = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      
      timerRef.current = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              // If character index is resolved, show original letter
              if (index < iterationRef.current) {
                return text[index];
              }
              // Otherwise, cycle through random ticking chars
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });

        // Resolve one character per tick
        iterationRef.current += 1 / 2; // slow down resolution step for ticking effect

        if (iterationRef.current >= text.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          setDisplayText(text);
        }
      }, speed);
    };

    const delayTimeout = setTimeout(startDecrypt, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed, delay]);

  return <span className={className}>{displayText}</span>;
}
