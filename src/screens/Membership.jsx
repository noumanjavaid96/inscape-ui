import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import CheckoutSheet from '../components/flow/CheckoutSheet';

const { colors, font, radius } = tokens;

const PLANS = [
  { name: 'Entry', price: { monthly: '$14.99', annual: '$149.99' }, credits: 40, annualCredits: 480, features: ['40 Credits every month', 'Full campaign access', 'Member-only promotions', 'Early campaign alerts'], highlight: false },
  { name: 'Premium', price: { monthly: '$19.99', annual: '$199.99' }, credits: 120, annualCredits: 1440, features: ['120 Credits every month', 'Priority campaign access', 'Momentum bonuses', 'Full Offers Hub', 'Referral rewards'], highlight: true },
  { name: 'Elite', price: { monthly: '$24.99', annual: '$249.99' }, credits: 250, annualCredits: 3000, features: ['250 Credits every month', 'Early campaign access', 'Bonus allocation campaigns', 'Exclusive partner offers', 'Priority support'], highlight: false },
];

export default function Membership({ onNavigate }) {
  const [annual, setAnnual] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ font: `700 32px/1 ${font.family}`, color: colors.text, margin: '0 0 10px', letterSpacing: '-.02em' }}>Membership</h1>
          <p style={{ font: `400 15px ${font.family}`, color: colors.textDim, margin: '0 0 24px' }}>Monthly credits, Momentum bonuses and exclusive access.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: 4 }}>
            {['Monthly', 'Annual'].map((t, i) => {
              const active = annual === (i === 1);
              return (
                <button key={t} onClick={() => setAnnual(i === 1)} style={{ padding: '8px 20px', borderRadius: radius.sm, font: `600 13px ${font.family}`, border: 'none', cursor: 'pointer', background: active ? colors.line : 'transparent', color: active ? colors.text : colors.textDim, transition: 'all 0.15s' }}>
                  {t}{i === 1 && <span style={{ font: `600 10px ${font.family}`, color: colors.success, marginLeft: 5 }}>2 months free</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)', gap: 20 }}>
          {PLANS.map(p => (
            <div
              key={p.name}
              style={{ background: p.highlight ? colors.accentSoft : colors.bg2, border: `1px solid ${p.highlight ? colors.accentBorder : colors.border}`, borderRadius: radius.xl, padding: '28px 26px', position: 'relative', boxShadow: p.highlight ? '0 0 60px rgba(238,140,70,0.1)' : 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              {p.highlight && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: colors.accent, borderRadius: 20, padding: '4px 14px', font: `700 11px ${font.family}`, color: colors.bg, whiteSpace: 'nowrap', letterSpacing: '.05em' }}>MOST POPULAR</div>
              )}
              <div style={{ font: `600 12px ${font.family}`, color: p.highlight ? colors.accent : colors.textDim, letterSpacing: '.08em', marginBottom: 8 }}>{p.name.toUpperCase()}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ font: `700 36px/1 ${font.display}`, color: colors.text }}>{annual ? p.price.annual : p.price.monthly}</span>
                <span style={{ font: `400 12px ${font.family}`, color: colors.textFaint }}>{annual ? '/yr' : '/mo'}</span>
              </div>
              <div style={{ font: `500 13px ${font.family}`, color: colors.accent, marginBottom: 22 }}>{annual ? `${p.annualCredits.toLocaleString()} Credits/year` : `${p.credits} Credits/month`}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: p.highlight ? 'rgba(238,140,70,0.12)' : colors.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="check" size={11} color={p.highlight ? colors.accent : colors.textFaint} />
                    </span>
                    <span style={{ font: `400 13px ${font.family}`, color: p.highlight ? colors.textMuted : colors.textDim }}>{f}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => setCheckoutPlan(p)} variant={p.highlight ? 'primary' : 'secondary'} fullWidth size="md">
                Choose {p.name}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {checkoutPlan && (
        <CheckoutSheet
          title={`${checkoutPlan.name} membership`}
          subtitle={annual ? 'Billed annually' : 'Billed monthly'}
          lines={[
            ['Plan', checkoutPlan.name],
            ['Billing', annual ? 'Annual (2 months free)' : 'Monthly'],
            [annual ? 'Credits / year' : 'Credits / month', annual ? checkoutPlan.annualCredits.toLocaleString() : `${checkoutPlan.credits}`],
          ]}
          total={annual ? checkoutPlan.price.annual : checkoutPlan.price.monthly}
          cta="Subscribe"
          successTitle="Membership active"
          successBody={`Welcome to ${checkoutPlan.name}. Your ${checkoutPlan.credits} monthly Credits have been posted.`}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={() => onNavigate('dashboard')}
        />
      )}
    </div>
  );
}
