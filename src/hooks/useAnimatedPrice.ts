import { useState, useEffect, useRef } from 'react';

/**
 * Hook to smoothly animate a numeric price with number counting.
 * Respects `prefers-reduced-motion` and avoids repeating on unneeded re-renders.
 */
export function useAnimatedPrice(targetValue: number | null, durationMs = 600) {
  const [displayedValue, setDisplayedValue] = useState<number | null>(() => targetValue);
  const prevValueRef = useRef<number | null>(targetValue);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // If target value is null, clear displayed value
    if (targetValue === null) {
      prevValueRef.current = null;
      animFrameRef.current = requestAnimationFrame(() => {
        setDisplayedValue(null);
      });
      return () => {
        if (animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startVal = prevValueRef.current ?? (targetValue * 0.7); // smooth ramp-up if initial

    // If reduced motion is requested or value didn't change, update immediately
    if (prefersReducedMotion || startVal === targetValue) {
      prevValueRef.current = targetValue;
      animFrameRef.current = requestAnimationFrame(() => {
        setDisplayedValue(targetValue);
      });
      return () => {
        if (animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current);
        }
      };
    }

    const startTime = performance.now();
    const change = targetValue - startVal;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out cubic: 1 - pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = startVal + change * easeProgress;

      setDisplayedValue(Number(currentVal.toFixed(2)));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayedValue(targetValue);
        prevValueRef.current = targetValue;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [targetValue, durationMs]);

  return displayedValue;
}
