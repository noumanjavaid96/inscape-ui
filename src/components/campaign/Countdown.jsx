import tokens from '../../design/tokens';
import { useCountdown } from '../../hooks/useCountdown';

const { colors, font, radius } = tokens;

const pad = (n) => String(n).padStart(2, '0');

/**
 * Live D/H/M/S countdown to a campaign's close time.
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} glass  render each unit on a glass tile
 */
// Default colour is literal white (not the themed text token) — the countdown
// always sits on imagery / dark glass tiles in both themes.
export default function Countdown({ target, size = 'md', glass = true, color = '#ffffff' }) {
  const { days, hours, minutes, seconds, done } = useCountdown(target);
  const sizes = {
    sm: { num: 13, lab: 8, gap: 6, pad: '3px 6px' },
    md: { num: 16, lab: 9, gap: 8, pad: '5px 8px' },
    lg: { num: 22, lab: 10, gap: 10, pad: '8px 11px' },
  };
  const s = sizes[size] || sizes.md;

  if (done) {
    return <span style={{ font: `600 ${s.num}px ${font.family}`, color: colors.textDim }}>Closed</span>;
  }

  const units = [
    { v: days, l: 'DAYS' },
    { v: hours, l: 'HRS' },
    { v: minutes, l: 'MINS' },
    { v: seconds, l: 'SECS' },
  ];

  return (
    <div style={{ display: 'flex', gap: s.gap }}>
      {units.map((u) => (
        <div
          key={u.l}
          className={glass ? 'liquid-glass' : undefined}
          style={{
            textAlign: 'center',
            borderRadius: radius.sm,
            padding: glass ? s.pad : 0,
            minWidth: size === 'lg' ? 40 : 30,
          }}
        >
          <div style={{ font: `700 ${s.num}px ${font.family}`, color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pad(u.v)}</div>
          <div style={{ font: `600 ${s.lab}px ${font.family}`, color: colors.textDim, letterSpacing: '.1em', marginTop: 3 }}>{u.l}</div>
        </div>
      ))}
    </div>
  );
}
