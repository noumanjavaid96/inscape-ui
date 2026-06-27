import tokens from '../../design/tokens';
import Icon from '../ui/Icon';

const { colors, radius, font } = tokens;

/** Consistent page title block, with optional back button and right-side actions. */
export default function PageHeader({ title, subtitle, actions, backAction, style }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 28,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
        {backAction && (
          <button
            onClick={backAction}
            aria-label="Back"
            style={{
              width: 38,
              height: 38,
              borderRadius: radius.full,
              background: colors.bg4,
              border: `1px solid ${colors.borderStrong}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Icon name="arrowLeft" size={18} color={colors.text} />
          </button>
        )}
        <div style={{ minWidth: 0 }}>
          <h1 style={{ font: `700 32px ${font.family}`, lineHeight: 1, color: colors.text, margin: 0, letterSpacing: '-.02em' }}>
            {title}
          </h1>
          {subtitle && <p style={{ font: `400 14px ${font.family}`, color: colors.textDim, margin: '6px 0 0' }}>{subtitle}</p>}
        </div>
      </div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}
