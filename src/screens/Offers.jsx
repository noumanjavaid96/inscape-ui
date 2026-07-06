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

// Free accounts get a taste of the Hub — the rest is grayed out to drive upgrades.
const FREE_TEASER_COUNT = 3;

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

        {/* Direct-partner offers are phase two — visible but clearly not yet live */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: 999, padding: '6px 14px', marginBottom: 18 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.info }} />
          <span style={{ font: `500 12px ${font.family}`, color: colors.textDim }}>
            Affiliate partner offers live now · <strong style={{ color: colors.text, fontWeight: 600 }}>Direct partner offers — Coming Soon</strong>
          </span>
        </div>

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
          /* Free account: a taste of the Hub — first offers open, the rest grayed
             out with brand names visible so the upgrade feels worth it. */
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="gift" size={15} color={colors.accent} />
              <span style={{ font: `500 13px ${font.family}`, color: colors.textDim }}>
                {FREE_TEASER_COUNT} offers free to try — <strong style={{ color: colors.text, fontWeight: 600 }}>500+ more</strong> with any paid membership.
              </span>
            </div>
            <PartnerOffers offers={filtered.slice(0, FREE_TEASER_COUNT)} columns={columns} style={{ marginBottom: 14 }}
              onSelect={(o) => onNavigate('offer-detail', { slug: o.slug })} />
            <div style={{ position: 'relative' }}>
              <div style={{ filter: 'grayscale(1)', opacity: 0.45, pointerEvents: 'none', userSelect: 'none' }} aria-hidden="true">
                <PartnerOffers offers={filtered.slice(FREE_TEASER_COUNT)} columns={columns} />
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 34, background: 'linear-gradient(180deg, transparent 0%, rgba(5,6,8,0.55) 45%)' }}>
                <div style={{ background: colors.bg2, border: `1px solid ${colors.accentBorder}`, borderRadius: radius.xl, padding: '26px 30px', textAlign: 'center', maxWidth: 420, boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}>
                  <h3 style={{ font: `700 20px ${font.family}`, color: colors.text, margin: '0 0 8px' }}>Unlock every member offer</h3>
                  <p style={{ font: `400 13.5px/1.6 ${font.family}`, color: colors.textDim, margin: '0 0 18px' }}>
                    Nike, Lacoste, LG and 500+ more — exclusive savings with any paid membership.
                  </p>
                  <Button onClick={() => onNavigate('membership')} size="md">Become a member</Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PartnerOffers offers={filtered} columns={columns} onSelect={(o) => onNavigate('offer-detail', { slug: o.slug })} />
        )}

        <p style={{ font: `400 12px/1.6 ${font.family}`, color: colors.textGhost, marginTop: 24 }}>
          Offers are provided by direct partners and approved affiliate networks, exclusive to current InScape members. InScape is not responsible for offer availability or terms.
        </p>
      </div>
    </div>
  );
}
