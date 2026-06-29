import { useState } from 'react';
import tokens from '../../design/tokens';
import Badge from '../ui/Badge';
import { PARTNER_OFFERS } from '../../data/offers';

const { colors, font, radius } = tokens;

function OfferCard({ o, onSelect }) {
  const [hover, setHover] = useState(false);
  const clickable = typeof onSelect === 'function';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={clickable ? () => onSelect(o) : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(o); } } : undefined}
      style={{
        background: colors.bg3,
        border: `1px solid ${hover ? colors.borderStrong : colors.border}`,
        borderRadius: radius.lg,
        padding: '18px 18px 16px',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        transform: hover ? 'translateY(-3px)' : 'none',
        cursor: clickable ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 150,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <img
          src={`/brand/partners/${o.slug}.png`}
          alt={o.brand}
          style={{ height: 22, width: 'auto', maxWidth: 110, objectFit: 'contain', opacity: 0.95 }}
        />
        <span style={{ font: `700 16px ${font.family}`, color: colors.accent, whiteSpace: 'nowrap' }}>{o.offer}</span>
      </div>
      <div style={{ font: `400 12px/1.5 ${font.family}`, color: colors.textDim, flex: 1 }}>{o.detail}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: `500 11px ${font.family}`, color: colors.textFaint }}>{o.category}</span>
        <Badge label={o.type} color={o.type === 'Promo code' ? 'orange' : 'blue'} size="sm" />
      </div>
    </div>
  );
}

/** Responsive grid of partner member-offers. */
export default function PartnerOffers({ offers = PARTNER_OFFERS, limit, columns = 'repeat(auto-fill, minmax(220px, 1fr))', style, onSelect }) {
  const list = limit ? offers.slice(0, limit) : offers;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: columns, gap: 14, ...style }}>
      {list.map((o) => (
        <OfferCard key={o.slug} o={o} onSelect={onSelect} />
      ))}
    </div>
  );
}
