import tokens from '../../design/tokens';

const { colors, font } = tokens;

/** Horizontal rule, optionally with centred label text. */
export default function Divider({ label, style }) {
  if (!label) {
    return <div style={{ height: 1, background: colors.borderFaint, ...style }} />;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <div style={{ flex: 1, height: 1, background: colors.borderFaint }} />
      <span style={{ font: `400 12px ${font.family}`, color: colors.textGhost, whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: colors.borderFaint }} />
    </div>
  );
}
