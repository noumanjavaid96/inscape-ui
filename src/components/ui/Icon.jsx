import tokens from '../../design/tokens';

const { colors } = tokens;

/**
 * Central SVG icon set. Every glyph in the app comes from here so we never
 * fall back to emoji or Unicode symbol shortcuts.
 *
 * Usage: <Icon name="arrowRight" size={16} color="#FF8000" />
 */
const PATHS = {
  arrowRight: (c) => <path d="M9 5l7 7-7 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  arrowLeft: (c) => <path d="M15 5l-7 7 7 7" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
  chevronRight: (c) => <path d="M9 5l7 7-7 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  check: (c) => <path d="M5 12l5 5L19 7" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  bell: (c) => (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke={c} strokeWidth="1.6" />
    </>
  ),
  search: (c) => (
    <>
      <circle cx="11" cy="11" r="6.5" stroke={c} strokeWidth="1.7" />
      <path d="M16 16l4 4" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  bolt: (c) => <path d="M13 3 4 14h6l-1 7 9-11h-6z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />,
  star: (c) => <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52 6.38 18.5l2.09-6.26L3 8.26h6.91L12 2Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />,
  clock: (c) => (
    <>
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  arrowDown: (c) => <path d="M12 5v14m0 0l6-6m-6 6l-6-6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  arrowUp: (c) => <path d="M12 19V5m0 0l6 6m-6-6l-6 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  wallet: (c) => (
    <>
      <rect x="2" y="6" width="20" height="14" rx="2.5" stroke={c} strokeWidth="1.6" />
      <path d="M2 10h20" stroke={c} strokeWidth="1.6" />
      <circle cx="16.5" cy="15" r="1.5" fill={c} />
    </>
  ),
  users: (c) => (
    <>
      <circle cx="9" cy="8" r="3.4" stroke={c} strokeWidth="1.6" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 5a3 3 0 0 1 0 6M18 20c0-2.4-1-4-2.5-4.6" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  gift: (c) => (
    <>
      <rect x="3" y="8" width="18" height="13" rx="1.5" stroke={c} strokeWidth="1.6" />
      <path d="M3 12h18M12 8v13" stroke={c} strokeWidth="1.6" />
      <path d="M12 8C12 5 10.5 4 9 4S6 5 6 6.5 8 8 12 8Zm0 0c0-3 1.5-4 3-4s3 1 3 2.5S16 8 12 8Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  grid: (c) => (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.6" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.6" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.6" />
    </>
  ),
  target: (c) => (
    <>
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke={c} strokeWidth="1.6" />
    </>
  ),
  inbox: (c) => (
    <>
      <path d="M3 12l3-7h12l3 7v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 12h5l1 2h6l1-2h5" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  sparkle: (c) => <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />,
  trophy: (c) => (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 6H4.5a2.5 2.5 0 0 0 2.5 2.5M17 6h2.5a2.5 2.5 0 0 1-2.5 2.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 14v3m-3 4h6m-5 0a3 3 0 0 1 4 0" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chart: (c) => (
    <>
      <path d="M4 20V10M9.5 20V5M15 20v-7M20.5 20V8" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
};

export default function Icon({ name, size = 20, color = colors.textFaint, style }) {
  const render = PATHS[name];
  if (!render) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} aria-hidden="true">
      {render(color)}
    </svg>
  );
}
