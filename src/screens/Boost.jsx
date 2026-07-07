import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import CheckoutSheet from '../components/flow/CheckoutSheet';

const { colors, font, radius } = tokens;

// Campaign Access packages — one-time credit top-ups (per confirmed structure).
const PACKAGES = [
  { name: 'Bronze', price: '$2', credits: 1, badge: null },
  { name: 'Silver', price: '$10', credits: 8, badge: null },
  { name: 'Gold', price: '$30', credits: 25, badge: 'Most popular' },
  { name: 'Platinum', price: '$100', credits: 100, badge: null },
  { name: 'Diamond', price: '$200', credits: 250, badge: null },
];

export default function Boost({ onNavigate, params = {} }) {
  const [selected, setSelected] = useState(2);
  const [checkout, setCheckout] = useState(false);
  const { isMobile, isDesktop } = useBreakpoint();
  const pkg = PACKAGES[selected];
  const fromCampaign = params.campaignId; // preserve originating campaign

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Campaign Access" subtitle="One-time credit packages — credits never expire." backAction={() => onNavigate('wallet')} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {PACKAGES.map((p, i) => {
            const active = selected === i;
            return (
              <div
                key={p.name}
                onClick={() => setSelected(i)}
                style={{
                  background: active ? colors.accentSoft : colors.bg3,
                  border: `1px solid ${active ? colors.accentBorder : colors.border}`,
                  borderRadius: radius.lg,
                  padding: '20px 18px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 0 28px rgba(238,140,70,0.12)' : 'none',
                }}
              >
                {p.badge && (
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)' }}>
                    <Badge label={p.badge} color="blue" size="sm" />
                  </div>
                )}
                {active && (
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 18, height: 18, borderRadius: '50%', background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="check" size={11} color={colors.bg} />
                  </div>
                )}
                <div style={{ font: `500 13px ${font.family}`, color: active ? colors.accent : colors.textDim, marginBottom: 8 }}>{p.name}</div>
                <div style={{ font: `700 28px/1 ${font.display}`, color: colors.text }}>{p.credits}</div>
                <div style={{ font: `400 11px ${font.family}`, color: colors.textDim, marginBottom: 10 }}>credits</div>
                <div style={{ font: `600 15px ${font.family}`, color: active ? colors.accent : colors.textMuted }}>{p.price}</div>
              </div>
            );
          })}
        </div>

        <Card padding="md" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>Adding</span>
            <span style={{ font: `600 13px ${font.family}`, color: colors.text }}>{pkg.credits} credits</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>New balance</span>
            <span style={{ font: `700 14px ${font.family}`, color: colors.success }}>{124 + pkg.credits} cr</span>
          </div>
        </Card>

        <Button onClick={() => setCheckout(true)} fullWidth size="lg">
          Continue · {pkg.price} for {pkg.credits} credits
        </Button>
      </div>

      {checkout && (
        <CheckoutSheet
          title="Campaign Access"
          subtitle={`${pkg.name} pack — one-time purchase`}
          lines={[['Credits', `${pkg.credits}`], ['Price', pkg.price], ['New balance', `${124 + pkg.credits} Credits`]]}
          total={pkg.price}
          successTitle="Credits added"
          successBody={`${pkg.credits} Credits have been posted to your wallet.`}
          onClose={() => setCheckout(false)}
          onSuccess={() => (fromCampaign ? onNavigate('campaign-detail', { campaignId: fromCampaign }) : onNavigate('wallet'))}
        />
      )}
    </div>
  );
}
