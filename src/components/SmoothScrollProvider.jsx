import React, { useEffect } from 'react';
import Lenis from 'lenis';

// Global smooth scroll singleton
let lenisInstance = null;

export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance;
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenisInstance;
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      // Don't destroy on unmount — keep it global
    };
  }, []);

  return children;
}
