import { useState, useEffect } from 'react';

const KEY = 'inscape-theme';
const EVENT = 'inscape-theme-change';

/**
 * Member-app theme. Dark is the brand default; 'light' flips the CSS
 * variables (see index.css) via data-theme on <html>. Persisted locally.
 * Multiple hook instances stay in sync through a window event.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; }
    catch { return 'dark'; }
  });

  useEffect(() => {
    const onChange = (e) => setTheme(e.detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* private mode */ }
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  };

  return { theme, toggle };
}
