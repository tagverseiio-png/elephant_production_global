import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  isPlaying: boolean;
  className?: string;
}

export function SmartVideo({ src, isPlaying, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isPlaying && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [isPlaying, hasInteracted]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        // A slight delay to ensure src is applied before playing if it's the first time
        setTimeout(() => {
          videoRef.current?.play().catch(() => {});
        }, 50);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, hasInteracted]);

  return (
    <motion.video
      ref={videoRef}
      className={className}
      src={hasInteracted ? src : undefined}
      preload="none"
      loop
      muted
      playsInline
    />
  );
}
