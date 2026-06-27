import tokens from '../../design/tokens';

const { colors, radius, font } = tokens;

/** Centred empty / placeholder state with icon, copy and an optional action. */
export default function EmptyState({ icon, title, body, action, style }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: radius.lg,
            background: colors.bg4,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          {icon}
        </div>
      )}
      {title && <h3 style={{ font: `600 18px ${font.family}`, color: colors.text, margin: '0 0 8px' }}>{title}</h3>}
      {body && <p style={{ font: `400 14px ${font.family}`, lineHeight: 1.6, color: colors.textDim, margin: '0 0 20px', maxWidth: 360 }}>{body}</p>}
      {action}
    </div>
  );
}
