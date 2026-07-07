"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Simple elapsed-time counter that starts when the hook first mounts
 * with `active === true` and pauses if `active` becomes false.
 * Returns the elapsed number of seconds.
 */
export function usePracticeTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    // Initialize or resume the start reference.
    startRef.current = Date.now() - seconds * 1000;
    const interval = window.setInterval(() => {
      if (startRef.current === null) return;
      const diff = Math.floor((Date.now() - startRef.current) / 1000);
      setSeconds(diff);
    }, 1000);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return seconds;
}
