import tokens from '../../design/tokens';
import { useTheme } from '../../hooks/useTheme';

const { colors } = tokens;

// The InScape mark: three tapered bars. Inlined so it can be recoloured via
// the `color` prop (the wordmark lockups are served as static SVG files).
const ICON_PATHS = [
  'M0 0C5.249 26.752-12.403 48.505-39.154 48.505H-217.792L-217.8 48.459C-223.05 21.708-205.398-.045-178.647-.045H-.009Z',
  'M0 0 .009 .045H-178.69C-205.465 .045-231.248-21.684-236.307-48.459L-236.316-48.505H-57.691C-30.915-48.505-5.059-26.775 0 0',
  'M0 0 .009 .045H-178.617C-205.392 .045-231.248-21.684-236.307-48.459L-236.316-48.505H-57.617C-30.842-48.505-5.059-26.775 0 0',
];
const ICON_TRANSFORMS = [
  'matrix(1,0,0,-1,247.8484,141.02519)',
  'matrix(1,0,0,-1,240.316,180.8916)',
  'matrix(1,0,0,-1,273.92433,4.044983)',
];

const ICON_H = { sm: 22, md: 28, lg: 36 };
const MARK_H = { sm: 20, md: 26, lg: 34 };

/**
 * InScape brand mark — three-bar icon, optional full wordmark lockup.
 * variant: 'light' (white wordmark), 'charcoal' (black wordmark), or 'auto'
 * (default — follows the app theme so the wordmark stays legible).
 */
export default function Logo({ size = 'md', showText = true, variant = 'auto', color, style }) {
  const { theme } = useTheme();
  if (showText) {
    const h = MARK_H[size] || MARK_H.md;
    const resolved = variant === 'auto' ? (theme === 'light' ? 'charcoal' : 'light') : variant;
    const src = resolved === 'charcoal'
      ? '/brand/inscape-wordmark-charcoal.svg'
      : '/brand/inscape-wordmark-light.svg';
    return <img src={src} alt="InScape" height={h} style={{ height: h, width: 'auto', display: 'block', ...style }} />;
  }

  const h = ICON_H[size] || ICON_H.md;
  return (
    <svg
      height={h}
      viewBox="-4 -4 287 242"
      fill={color || colors.accent}
      role="img"
      aria-label="InScape"
      style={{ height: h, width: 'auto', display: 'block', ...style }}
    >
      {ICON_PATHS.map((d, i) => (
        <path key={i} transform={ICON_TRANSFORMS[i]} d={d} />
      ))}
    </svg>
  );
}
