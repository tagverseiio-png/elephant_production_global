'use client';

// Simple audio utility — intentionally does NOT use Howler.
//
// Howler's module initialiser creates a global AudioContext and pre-fills
// the HTML5 audio pool the moment `import { Howl } from 'howler'` is
// evaluated, which happens before any user gesture → browser blocks it and
// logs "HTML5 Audio pool exhausted" / "AudioContext not allowed to start".
//
// Using plain HTMLAudioElement instead: audio objects are created inside the
// play functions (always after a user gesture) and .play() errors are caught
// silently, so no warnings ever appear in the console.

function playSound(src: string, volume: number) {
  if (typeof window === 'undefined') return;
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {
      // Autoplay policy blocked — swallow silently, sound is decorative
    });
  } catch (_) {
    // Ignore any other errors (e.g. unsupported format)
  }
}

// Debounce: prevent hover sound firing more than once per 100 ms
let lastHoverTime = 0;

export const playHover = () => {
  const now = Date.now();
  if (now - lastHoverTime < 100) return;
  lastHoverTime = now;
  playSound('https://www.soundjay.com/buttons/button-37.mp3', 0.35);
};

export const playClick = () =>
  playSound('https://www.soundjay.com/buttons/button-16.mp3', 0.45);

export const playTransition = () =>
  playSound('https://www.soundjay.com/buttons/button-10.mp3', 0.35);
