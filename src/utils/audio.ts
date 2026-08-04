'use client';

import { Howl } from 'howler';

// Initialize Howl instances on the client side
let hoverSound: Howl | null = null;
let clickSound: Howl | null = null;
let transitionSound: Howl | null = null;

if (typeof window !== 'undefined') {
  hoverSound = new Howl({
    src: ['https://www.soundjay.com/buttons/button-37.mp3'],
    volume: 0.35,
    html5: true, // load audio via HTML5 tags to avoid CORS block
    pool: 1,     // cap to 1 HTML5 audio element — prevents pool exhaustion
  });

  clickSound = new Howl({
    src: ['https://www.soundjay.com/buttons/button-16.mp3'],
    volume: 0.45,
    html5: true,
    pool: 1,
  });

  transitionSound = new Howl({
    src: ['https://www.soundjay.com/buttons/button-10.mp3'],
    volume: 0.35,
    html5: true,
    pool: 1,
  });
}

// Debounce guard: prevent hover sound firing more than once per 100ms
// (rapid mouse movement over the enter button floods the pool otherwise)
let lastHoverTime = 0;

export const playHover = () => {
  const now = Date.now();
  if (now - lastHoverTime < 100) return;
  lastHoverTime = now;

  try {
    if (hoverSound) {
      if (hoverSound.state() === 'unloaded') hoverSound.load();
      hoverSound.stop();
      hoverSound.play();
    }
  } catch (e) {
    console.warn('Audio playback blocked:', e);
  }
};

export const playClick = () => {
  try {
    if (clickSound) {
      if (clickSound.state() === 'unloaded') clickSound.load();
      clickSound.stop();
      clickSound.play();
    }
  } catch (e) {
    console.warn('Audio playback blocked:', e);
  }
};

export const playTransition = () => {
  try {
    if (transitionSound) {
      if (transitionSound.state() === 'unloaded') transitionSound.load();
      transitionSound.stop();
      transitionSound.play();
    }
  } catch (e) {
    console.warn('Audio playback blocked:', e);
  }
};
