import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import PageHeader from '../components/layout/PageHeader';
import PartnerOffers from '../components/brand/PartnerOffers';
import { PARTNER_OFFERS } from '../data/offers';

const { colors, font } = tokens;

const CATEGORIES = ['All', ...Array.from(new Set(PARTNER_OFFERS.map((o) => o.category)))];

export default function Offers() {
  const [category, setCategory] = useState('All');
  const { isMobile, isDesktop } = useBreakpoint();
  const filtered = category === 'All' ? PARTNER_OFFERS : PARTNER_OFFERS.filter((o) => o.category === category);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Partner Offers" subtitle={`${filtered.length} exclusive member offers — real savings, every month.`} />

        {/* Category filter */}
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

        <PartnerOffers
          offers={filtered}
          columns={isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)'}
        />

        <p style={{ font: `400 12px/1.6 ${font.family}`, color: colors.textGhost, marginTop: 24 }}>
          Partner offers are provided by third-party brands and are exclusive to current InScape members. InScape is not responsible for offer availability or terms.
        </p>
      </div>
    </div>
  );
}
