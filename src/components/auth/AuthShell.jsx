import tokens from '../../design/tokens';
import Logo from '../ui/Logo';

const { colors, radius, shadow } = tokens;

/**
 * Centred auth layout: full-screen dark background, ambient glow, logo and a
 * max-width card wrapper. Shared by SignUp and Login.
 */
export default function AuthShell({ children, maxWidth = 440, glow = 'rgba(238,140,70,0.06)' }) {
  return (
    <div
      style={{
        background: colors.bg,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 40% at 50% 20%, ${glow}, transparent)`, pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <Logo size="md" />
        </div>
        <div
          style={{
            background: colors.bg2,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.xxl,
            padding: 36,
            boxShadow: shadow.float,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
