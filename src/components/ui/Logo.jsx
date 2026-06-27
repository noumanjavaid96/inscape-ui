import tokens from '../../design/tokens';

const { colors, radius, font } = tokens;

/** InScape wordmark + monogram badge. */
export default function Logo({ size = 'md', showText = true, style }) {
  const dims = { sm: 26, md: 32, lg: 40 }[size] || 32;
  const textSize = { sm: 18, md: 22, lg: 26 }[size] || 22;
  const monoSize = { sm: 11, md: 14, lg: 17 }[size] || 14;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <div
        style={{
          width: dims,
          height: dims,
          borderRadius: radius.md,
          background: `linear-gradient(135deg,${colors.accent},${colors.accentDark})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ font: `700 ${monoSize}px ${font.display}`, lineHeight: 1, color: colors.text }}>I</span>
      </div>
      {showText && <span style={{ font: `600 ${textSize}px ${font.display}`, lineHeight: 1, color: colors.text }}>InScape</span>}
    </div>
  );
}
