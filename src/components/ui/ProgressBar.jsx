import tokens from '../../design/tokens';

const { colors, font } = tokens;

/** Animated horizontal progress bar (0–100). */
export default function ProgressBar({
  value = 0,
  color = colors.info,
  height = 8,
  showLabel = false,
  label,
  style,
}) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div style={style}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ font: `500 13px ${font.family}`, color: colors.textMuted }}>{label}</span>
          <span style={{ font: `700 13px ${font.family}`, color }}>{pct}%</span>
        </div>
      )}
      <div style={{ height, borderRadius: height / 2, background: colors.line, overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            borderRadius: height / 2,
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}
