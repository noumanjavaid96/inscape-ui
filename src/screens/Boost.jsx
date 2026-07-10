import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import CheckoutSheet from '../components/flow/CheckoutSheet';
import { ACCOUNT, accessCopy } from '../data/account';

const { colors, font, radius } = tokens;

// Campaign Access packages — one-time credit top-ups (per confirmed structure).
// perCredit is derived for display so the maths is always consistent.
const PACKAGES = [
  { name: 'Bronze', price: 2, credits: 1, badge: null },
  { name: 'Silver', price: 10, credits: 8, badge: null },
  { name: 'Gold', price: 30, credits: 25, badge: 'Most popular' },
  { name: 'Platinum', price: 100, credits: 100, badge: null },
  { name: 'Diamond', price: 200, credits: 250, badge: 'Best value' },
];

const BENEFITS = [
  { icon: 'bolt', title: 'Instant access', body: 'Credits added after successful payment' },
  { icon: 'target', title: 'Flexible participation', body: 'Allocate credits across eligible active campaigns' },
  { icon: 'trophy', title: 'Credits never expire', body: 'Use your available credits, anytime' },
  { icon: 'check', title: 'Secure payment', body: 'Protected payment processing' },
];

const money = (n) => `$${n.toLocaleString()}`;
const perCredit = (p) => `$${(p.price / p.credits).toFixed(2)} per credit`;

export default function Boost({ onNavigate, params = {} }) {
  const [selected, setSelected] = useState(2);
  const [checkout, setCheckout] = useState(false);
  const { isMobile, isDesktop } = useBreakpoint();
  const pkg = PACKAGES[selected];
  const fromCampaign = params.campaignId; // preserve originating campaign
  const newBalance = ACCOUNT.balance + pkg.credits;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Campaign Access" subtitle={accessCopy.subtitle} backAction={() => onNavigate('wallet')} />

        {/* Hero headline + benefit strip */}
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'minmax(0,0.9fr) minmax(0,1.1fr)' : '1fr', gap: 22, alignItems: 'center', marginBottom: 26 }}>
          <div>
            <h2 style={{ font: `800 clamp(28px,3.4vw,42px)/1.05 ${font.family}`, letterSpacing: '-0.02em', color: colors.text, margin: 0 }}>
              More Credits.<br />More Campaigns.<br /><span style={{ color: colors.accent }}>More opportunities.</span>
            </h2>
            <div style={{ height: 2, width: 64, background: colors.accent, marginTop: 18, borderRadius: 2 }} />
          </div>
          <Card padding="md">
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 16 }}>
              {BENEFITS.map((b) => (
                <div key={b.title} style={{ textAlign: 'center' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', border: `1.5px solid ${colors.accentBorder}`, background: colors.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                    <Icon name={b.icon} size={18} color={colors.accent} />
                  </div>
                  <div style={{ font: `700 11px ${font.family}`, letterSpacing: '.04em', textTransform: 'uppercase', color: colors.text, marginBottom: 5 }}>{b.title}</div>
                  <div style={{ font: `400 11.5px/1.4 ${font.family}`, color: colors.textDim }}>{b.body}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Package cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : isDesktop ? 'repeat(5,1fr)' : 'repeat(3,1fr)', gap: 14, marginBottom: 22 }}>
          {PACKAGES.map((p, i) => {
            const active = selected === i;
            const popular = p.badge === 'Most popular';
            return (
              <div
                key={p.name}
                onClick={() => setSelected(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(i); } }}
                style={{
                  background: active ? colors.accentSoft : colors.bg3,
                  border: `1.5px solid ${active ? colors.accent : colors.border}`,
                  borderRadius: radius.lg,
                  padding: '26px 16px 22px',
                  cursor: 'pointer',
                  position: 'relative',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 0 32px rgba(238,140,70,0.16)' : 'none',
                }}
              >
                {p.badge && (
                  <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: popular ? colors.accent : colors.info, borderRadius: 999, padding: '4px 12px', font: `700 9.5px ${font.family}`, letterSpacing: '.06em', textTransform: 'uppercase', color: '#0B0B0D', whiteSpace: 'nowrap' }}>{p.badge}</div>
                )}
                <div style={{ font: `700 12px ${font.family}`, letterSpacing: '.08em', textTransform: 'uppercase', color: active ? colors.accent : colors.textDim, marginBottom: 14 }}>{p.name}</div>
                <div style={{ font: `700 40px/1 ${font.display}`, color: colors.text }}>{p.credits}</div>
                <div style={{ font: `400 11px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.textDim, marginTop: 4, marginBottom: 16 }}>{p.credits === 1 ? 'Credit' : 'Credits'}</div>
                <div style={{ font: `700 22px ${font.family}`, color: active ? colors.accent : colors.text }}>{money(p.price)}</div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 4 }}>{perCredit(p)}</div>
              </div>
            );
          })}
        </div>

        {/* Selection summary bar */}
        <Card padding="md" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: isMobile ? '1 1 100%' : '1 1 auto' }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', border: `1.5px solid ${colors.accentBorder}`, background: colors.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="coins" size={20} color={colors.accent} />
              </div>
              <div>
                <div style={{ font: `700 10px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.accent, marginBottom: 3 }}>Your selection</div>
                <div style={{ font: `700 15px ${font.family}`, color: colors.text }}>{pkg.name} package</div>
                <div style={{ font: `400 12px ${font.family}`, color: colors.textDim }}>{pkg.credits} Credits</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div>
                <div style={{ font: `400 10px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 4 }}>Adding</div>
                <div style={{ font: `700 15px ${font.family}`, color: colors.text }}>{pkg.credits} credits</div>
              </div>
              <Icon name="arrowRight" size={16} color={colors.textFaint} />
              <div>
                <div style={{ font: `400 10px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 4 }}>New balance</div>
                <div style={{ font: `700 15px ${font.family}`, color: colors.success }}>{newBalance} cr</div>
              </div>
            </div>
            <Button onClick={() => setCheckout(true)} size="lg" style={{ flex: isMobile ? '1 1 100%' : '0 0 auto' }}>
              Continue to payment · {money(pkg.price)}
            </Button>
          </div>
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, font: `400 12px ${font.family}`, color: colors.textFaint }}>
          <Icon name="check" size={13} color={colors.textFaint} />
          Secure checkout. {accessCopy.note}
        </div>
      </div>

      {checkout && (
        <CheckoutSheet
          title="Campaign Access"
          subtitle={`${pkg.name} pack, one-time purchase`}
          lines={[['Credits', `${pkg.credits}`], ['Price', money(pkg.price)], ['New balance', `${newBalance} Credits`]]}
          total={money(pkg.price)}
          successTitle="Credits added"
          successBody={`${pkg.credits} Credits have been posted to your wallet.`}
          onClose={() => setCheckout(false)}
          onSuccess={() => (fromCampaign ? onNavigate('campaign-detail', { campaignId: fromCampaign }) : onNavigate('wallet'))}
        />
      )}
    </div>
  );
}
