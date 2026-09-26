'use client';

import { createContext, useContext } from 'react';
import type { Region } from '@/lib/region';

export const RegionContext = createContext<{
  region: Region;
  setRegion: (r: Region) => void;
}>({ region: 'SG', setRegion: () => {} });

export const useRegionContext = () => useContext(RegionContext);
