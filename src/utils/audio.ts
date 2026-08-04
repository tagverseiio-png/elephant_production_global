'use client';

import { Howl } from 'howler';

// Howl instances are created lazily (on first play call) so that
// no <audio> element is requested before a user gesture.
// Creating Howl at module-evaluation time triggers _obtainHtml5Audio
// before the browser allows audio, which exhausts the pool instantly.
let hoverSound: Howl | null = null;
let clickSound: Howl | null = null;
let transitionSound: Howl | null = null;

function getHoverSound(): Howl {
  if (!hoverSound) {
    hoverSound = new Howl({
      src: ['https://www.soundjay.com/buttons/button-37.mp3'],
      volume: 0.35,
      html5: true,
      preload: false, // don't grab an audio element until .play() is called
      pool: 1,
    });
  }
  return hoverSound;
}

function getClickSound(): Howl {
  if (!clickSound) {
    clickSound = new Howl({
      src: ['https://www.soundjay.com/buttons/button-16.mp3'],
      volume: 0.45,
      html5: true,
      preload: false,
      pool: 1,
    });
  }
  return clickSound;
}

function getTransitionSound(): Howl {
  if (!transitionSound) {
    transitionSound = new Howl({
      src: ['https://www.soundjay.com/buttons/button-10.mp3'],
      volume: 0.35,
      html5: true,
      preload: false,
      pool: 1,
    });
  }
  return transitionSound;
}

// Debounce guard: prevent hover sound firing more than once per 100ms
let lastHoverTime = 0;

export const playHover = () => {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  if (now - lastHoverTime < 100) return;
  lastHoverTime = now;

  try {
    const sound = getHoverSound();
    sound.stop();
    sound.play();
  } catch (e) {
    console.warn('Audio playback blocked:', e);
  }
};

export const playClick = () => {
  if (typeof window === 'undefined') return;
  try {
    const sound = getClickSound();
    sound.stop();
    sound.play();
  } catch (e) {
    console.warn('Audio playback blocked:', e);
  }
};

export const playTransition = () => {
  if (typeof window === 'undefined') return;
  try {
    const sound = getTransitionSound();
    sound.stop();
    sound.play();
  } catch (e) {
    console.warn('Audio playback blocked:', e);
  }
};

