'use client';

import { createContext, useContext } from 'react';
import { MotionValue } from 'framer-motion';

export const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function useScrollProgress() {
  return useContext(ScrollProgressContext);
}
