"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Simple elapsed-time counter that starts on mount and pauses when told to.
 * Returns the elapsed number of seconds since the timer started.
 */
export function usePracticeTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!active) return;
    startRef.current = Date.now() - seconds * 1000;
    const interval = window.setInterval(() => {
      const diff = Math.floor((Date.now() - startRef.current) / 1000);
      setSeconds(diff);
    }, 1000);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return seconds;
}
