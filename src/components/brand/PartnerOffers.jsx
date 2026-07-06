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
        overflow: 'hidden',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        transform: hover ? 'translateY(-3px)' : 'none',
        cursor: clickable ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo hero — the brand IS the image; discount badge overlaid like a campaign card */}
      <div style={{ position: 'relative', height: 120, background: 'radial-gradient(90% 130% at 50% 0%, #1d2026, #101216)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img
          src={`/brand/partners/${o.slug}.png`}
          alt={o.brand}
          loading="lazy"
          style={{ maxWidth: '68%', maxHeight: 66, width: 'auto', height: 'auto', transform: hover ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.35s ease' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <span style={{ position: 'absolute', top: 10, right: 10, background: colors.accent, borderRadius: 999, padding: '5px 11px', font: `700 12px ${font.family}`, color: '#1c1003' }}>{o.offer}</span>
        <span style={{ position: 'absolute', top: 12, left: 12, font: `600 9.5px ${font.family}`, letterSpacing: '.08em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{o.category}</span>
      </div>
      <div style={{ padding: '14px 16px 14px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <span style={{ font: `600 15px ${font.family}`, color: colors.text }}>{o.brand}</span>
        <div style={{ font: `400 12px/1.5 ${font.family}`, color: colors.textDim, flex: 1 }}>{o.detail}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Badge label={o.type} color={o.type === 'Promo code' ? 'orange' : 'blue'} size="sm" />
          {clickable && <span style={{ font: `600 12px ${font.family}`, color: colors.accent }}>View offer</span>}
        </div>
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
