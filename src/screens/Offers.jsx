import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';

const { colors, font, radius } = tokens;

const OFFERS = [
  { brand: 'Voyage Privé', category: 'Travel', title: 'Members-only luxury travel rates', body: 'Exclusive access to 5-star hotels and private villa packages at up to 70% off. Tracked link — no code needed.', code: null, badge: null, accent: colors.info },
  { brand: 'Helios Tech', category: 'Electronics', title: '20% off premium audio and displays', body: 'Members receive an exclusive 20% discount across the full Helios range. Use at checkout online or in store.', code: 'INSCAPE20', badge: 'MEMBER EXCLUSIVE', accent: colors.accent },
];

export default function Offers() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Partner Offers" subtitle="Exclusive offers for InScape members." />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {OFFERS.map(o => (
            <div
              key={o.brand}
              style={{ background: colors.bg2, border: `1px solid ${colors.border}`, borderRadius: radius.xl, overflow: 'hidden', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = colors.borderStrong}
              onMouseLeave={e => e.currentTarget.style.borderColor = colors.border}
            >
              <div style={{ height: 8, background: `linear-gradient(90deg,${o.accent}40,transparent)` }} />
              <div style={{ padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.08em', color: o.accent, textTransform: 'uppercase' }}>{o.category}</span>
                  {o.badge && <Badge label={o.badge} color="orange" size="sm" />}
                </div>
                <div style={{ font: `600 13px ${font.family}`, color: colors.textDim }}>{o.brand}</div>
                <h2 style={{ font: `600 18px/1.2 ${font.family}`, color: colors.text, margin: '4px 0 12px' }}>{o.title}</h2>
                <p style={{ font: `400 14px/1.65 ${font.family}`, color: colors.textMuted, margin: '0 0 18px' }}>{o.body}</p>
                {o.code ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, borderRadius: radius.sm, padding: '10px 16px' }}>
                      <span style={{ font: `600 16px ${font.family}`, color: colors.accent, letterSpacing: '.05em' }}>{o.code}</span>
                    </div>
                    <Button size="md">Copy code</Button>
                  </div>
                ) : (
                  <button style={{ height: 42, padding: '0 22px', borderRadius: radius.sm, background: 'rgba(71,199,252,0.1)', border: `1px solid ${colors.info}4d`, cursor: 'pointer', font: `600 13px ${font.family}`, color: colors.info, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Open offer
                    <Icon name="arrowRight" size={14} color={colors.info} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p style={{ font: `400 12px/1.6 ${font.family}`, color: colors.textGhost, marginTop: 24 }}>
          Partner offers are provided by third-party brands. InScape is not responsible for offer availability or terms. Offers are exclusive to current InScape members.
        </p>
      </div>
    </div>
  );
}
