import tokens from '../../design/tokens';

const { colors, radius, font } = tokens;

const STATUS = {
  LIVE: { label: 'LIVE', color: colors.accent, pulse: true },
  CLOSING_SOON: { label: 'CLOSING SOON', color: colors.warning, pulse: true },
  UPCOMING: { label: 'UPCOMING', color: colors.info, pulse: false },
  CLOSED: { label: 'CLOSED', color: colors.textDim, pulse: false },
};

const SIZES = {
  sm: { padding: '3px 8px', fontSize: 9, dot: 5 },
  md: { padding: '4px 10px', fontSize: 10, dot: 5 },
  lg: { padding: '6px 12px', fontSize: 11, dot: 7 },
};

/** Normalise loose status strings ("CLOSING SOON") to a config key. */
function statusKey(status) {
  return String(status || '').toUpperCase().replace(/[\s-]+/g, '_');
}

/** Self-contained campaign status indicator with correct colour + animation. */
export default function StatusPill({ status = 'LIVE', size = 'md', style }) {
  const cfg = STATUS[statusKey(status)] || STATUS.LIVE;
  const sz = SIZES[size] || SIZES.md;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: colors.overlay,
        border: `1px solid ${cfg.color}66`,
        borderRadius: radius.sm,
        padding: sz.padding,
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      <span
        style={{
          width: sz.dot,
          height: sz.dot,
          borderRadius: '50%',
          background: cfg.color,
          animation: cfg.pulse ? 'livePulse 2s ease-in-out infinite' : 'none',
        }}
      />
      <span style={{ font: `600 ${sz.fontSize}px ${font.family}`, color: cfg.color, letterSpacing: '.08em' }}>
        {cfg.label}
      </span>
    </span>
  );
}
