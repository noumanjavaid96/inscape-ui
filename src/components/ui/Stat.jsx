import tokens from '../../design/tokens';

const { colors, font } = tokens;

const SIZES = {
  sm: { value: 16, label: 11 },
  md: { value: 20, label: 11 },
  lg: { value: 28, label: 13 },
};

/** Compact stat block: value on top, muted label below. */
export default function Stat({ label, value, color = colors.text, size = 'md', align = 'left', style }) {
  const sz = SIZES[size] || SIZES.md;
  return (
    <div style={{ textAlign: align, ...style }}>
      <div style={{ font: `700 ${sz.value}px ${font.family}`, color, lineHeight: 1 }}>{value}</div>
      <div style={{ font: `400 ${sz.label}px ${font.family}`, color: colors.textDim, marginTop: 4 }}>{label}</div>
    </div>
  );
}
