import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import PageHeader from '../components/layout/PageHeader';
import PartnerOffers from '../components/brand/PartnerOffers';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { PARTNER_OFFERS } from '../data/offers';

const { colors, font, radius } = tokens;

const CATEGORIES = ['All', ...Array.from(new Set(PARTNER_OFFERS.map((o) => o.category)))];

export default function Offers({ onNavigate }) {
  const [category, setCategory] = useState('All');
  // Demo affordance: preview the Hub as a paying member or as a gated free user.
  const [viewer, setViewer] = useState('member');
  const { isMobile, isDesktop } = useBreakpoint();
  const filtered = category === 'All' ? PARTNER_OFFERS : PARTNER_OFFERS.filter((o) => o.category === category);
  const columns = isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)';
  const free = viewer === 'free';

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader
          title="Offers Hub"
          subtitle="Members-only savings from leading brands — direct & affiliate partners."
          actions={
            <div style={{ display: 'flex', background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: 10, padding: 3 }}>
              {[['member', 'Member view'], ['free', 'Free view']].map(([v, label]) => (
                <button key={v} onClick={() => setViewer(v)}
                  style={{ font: `600 11px ${font.family}`, padding: '6px 11px', borderRadius: 8, border: 'none', cursor: 'pointer', background: viewer === v ? colors.line : 'transparent', color: viewer === v ? colors.text : colors.textDim }}>
                  {label}
                </button>
              ))}
            </div>
          }
        />

        {/* Category / brand filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                font: `${category === c ? 600 : 500} 13px ${font.family}`,
                color: category === c ? colors.bg : colors.textMuted,
                background: category === c ? colors.accent : colors.bg4,
                border: `1px solid ${category === c ? 'transparent' : colors.border}`,
                borderRadius: 10, padding: '9px 16px', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {free ? (
          /* Free account: brands/categories visible, offers gated — drives the upgrade. */
          <div style={{ position: 'relative' }}>
            <div style={{ filter: 'blur(7px)', pointerEvents: 'none', userSelect: 'none' }} aria-hidden="true">
              <PartnerOffers offers={filtered} columns={columns} />
            </div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 40 }}>
              <div style={{ background: colors.bg2, border: `1px solid ${colors.accentBorder}`, borderRadius: radius.xl, padding: '30px 34px', textAlign: 'center', maxWidth: 440, boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Icon name="gift" size={24} color={colors.accent} />
                </div>
                <h3 style={{ font: `700 22px ${font.family}`, color: colors.text, margin: '0 0 8px' }}>500+ Exclusive Member Offers</h3>
                <p style={{ font: `400 14px/1.6 ${font.family}`, color: colors.textDim, margin: '0 0 20px' }}>
                  Unlock savings from leading brands. Available with any paid membership.
                </p>
                <Button onClick={() => onNavigate('membership')} size="md">Become a member</Button>
              </div>
            </div>
          </div>
        ) : (
          <PartnerOffers offers={filtered} columns={columns} />
        )}

        <p style={{ font: `400 12px/1.6 ${font.family}`, color: colors.textGhost, marginTop: 24 }}>
          Offers are provided by direct partners and approved affiliate networks, exclusive to current InScape members. InScape is not responsible for offer availability or terms.
        </p>
      </div>
    </div>
  );
}
