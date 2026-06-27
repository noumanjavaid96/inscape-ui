import tokens, { accentMap } from '../../design/tokens';

const { font } = tokens;

const SIZES = {
  sm: { padding: '3px 8px', fontSize: 10, dot: 5, gap: 4, radius: 7 },
  md: { padding: '5px 11px', fontSize: 12, dot: 6, gap: 5, radius: 20 },
};

/**
 * Pill badge. Optionally renders a (pulsing) status dot.
 *
 * @param {'orange'|'blue'|'green'|'yellow'|'gray'} color
 */
export default function Badge({ label, color = 'orange', dot = false, size = 'md', pulse = false, style }) {
  const accent = accentMap[color] || accentMap.orange;
  const sz = SIZES[size] || SIZES.md;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: sz.gap,
        background: `${accent}1f`,
        border: `1px solid ${accent}4d`,
        borderRadius: sz.radius,
        padding: sz.padding,
        font: `600 ${sz.fontSize}px ${font.family}`,
        color: accent,
        letterSpacing: '.07em',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: sz.dot,
            height: sz.dot,
            borderRadius: '50%',
            background: accent,
            animation: pulse ? 'livePulse 2s ease-in-out infinite' : 'none',
          }}
        />
      )}
      {label}
    </span>
  );
}
