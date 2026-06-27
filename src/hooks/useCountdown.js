import { useState, useEffect } from 'react';

/**
 * Live countdown to a target time. Accepts a Date, timestamp or ISO string and
 * ticks once per second. Returns { days, hours, minutes, seconds, done }.
 */
export function useCountdown(target) {
  const targetMs = target instanceof Date ? target.getTime() : new Date(target).getTime();

  const compute = () => {
    const diff = Math.max(0, targetMs - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      done: diff <= 0,
    };
  };

  const [time, setTime] = useState(compute);

  useEffect(() => {
    if (Number.isNaN(targetMs)) return;
    const id = setInterval(() => setTime(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetMs]);

  return time;
}
