declare module 'virtual-scroll' {
  export interface VirtualScrollEvent {
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    originalEvent: Event;
  }

  export default class VirtualScroll {
    constructor(options?: {
      el?: HTMLElement | Window;
      mouseMultiplier?: number;
      touchMultiplier?: number;
      firefoxMultiplier?: number;
      keyStep?: number;
      preventTouch?: boolean;
      unpreventTouchClass?: string;
      useKeyboard?: boolean;
      useTouch?: boolean;
      passive?: boolean;
    });
    on(cb: (e: VirtualScrollEvent) => void, context?: unknown): void;
    off(cb: (e: VirtualScrollEvent) => void, context?: unknown): void;
    destroy(): void;
  }
}

