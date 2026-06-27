import tokens from '../../design/tokens';
import Icon from './Icon';

const { colors, radius, font } = tokens;

/** Orange-accented checkbox with label and optional description. */
export default function Checkbox({ checked, onChange, label, description, style }) {
  return (
    <div
      onClick={() => onChange && onChange(!checked)}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', ...style }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: radius.sm,
          border: `1.5px solid ${checked ? colors.accent : 'rgba(255,255,255,0.15)'}`,
          background: checked ? colors.accent : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 1,
          transition: 'all 0.15s ease',
        }}
      >
        {checked && <Icon name="check" size={11} color={colors.bg} />}
      </div>
      <div>
        {label && <div style={{ font: `400 13px ${font.family}`, lineHeight: 1.55, color: colors.textMuted }}>{label}</div>}
        {description && <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{description}</div>}
      </div>
    </div>
  );
}
