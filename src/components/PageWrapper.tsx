'use client';

import { usePathname } from 'next/navigation';
import SmoothScroll from './SmoothScroll';

const PAGES_WITH_NATIVE_SCROLL = new Set<string>();

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const useNativeScroll = PAGES_WITH_NATIVE_SCROLL.has(pathname);

  if (useNativeScroll) {
    return (
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    );
  }

  return (
    <SmoothScroll>
      <main className="flex-1 flex flex-col">{children}</main>
    </SmoothScroll>
  );
}
