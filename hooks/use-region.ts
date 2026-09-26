'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  detectRegionFromTimezone,
  fetchRegionFromIP,
  getStoredRegion,
  storeRegion,
  type Region,
} from '@/lib/region';

export function useRegion() {
  const [region, setRegionState] = useState<Region>('SG');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Manual override wins (lets SG/IN/MY testing + user choice persist)
    const stored = getStoredRegion();
    if (stored) {
      setRegionState(stored);
      setLoaded(true);
      return;
    }
    // 2. Instant timezone guess — no network, works offline
    const tz = detectRegionFromTimezone();
    if (tz) {
      setRegionState(tz);
      setLoaded(true);
      return;
    }
    // 3. IP fallback (async, guarded)
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    fetchRegionFromIP(ctrl.signal)
      .then((r) => {
        if (r) setRegionState(r);
      })
      .finally(() => {
        clearTimeout(t);
        setLoaded(true);
      });
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, []);

  const setRegion = useCallback((r: Region) => {
    setRegionState(r);
    storeRegion(r);
    setLoaded(true);
  }, []);

  return { region, setRegion, loaded };
}
