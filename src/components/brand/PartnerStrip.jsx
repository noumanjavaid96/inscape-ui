import { useState } from 'react';
import tokens from '../../design/tokens';

const { colors, font } = tokens;

// Partner logos live in public/brand/partners as white-on-transparent PNGs.
const PARTNERS = [
  { name: 'Nike', slug: 'nike' },
  { name: 'Adidas', slug: 'adidas' },
  { name: 'Lacoste', slug: 'lacoste' },
  { name: 'GUESS', slug: 'guess' },
  { name: 'Calvin Klein', slug: 'calvin-klein' },
  { name: "Levi's", slug: 'levis' },
  { name: 'Champion', slug: 'champion' },
  { name: 'Carhartt', slug: 'carhartt' },
  { name: 'Lavazza', slug: 'lavazza' },
  { name: 'Bowers & Wilkins', slug: 'bowers-wilkins' },
  { name: 'LG', slug: 'lg' },
];

function PartnerLogo({ partner, height }) {
  const [hover, setHover] = useState(false);
  return (
    <img
      src={`/brand/partners/${partner.slug}.png`}
      alt={partner.name}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height,
        width: 'auto',
        opacity: hover ? 1 : 0.5,
        filter: hover ? 'none' : 'grayscale(1)',
        transition: 'opacity 0.2s ease, filter 0.2s ease',
        flexShrink: 0,
      }}
    />
  );
}

/** Trust strip of partner brand logos for dark surfaces. */
export default function PartnerStrip({ title = 'Partnering with leading brands', logoHeight = 26, partners = PARTNERS, style }) {
  return (
    <div style={{ textAlign: 'center', ...style }}>
      {title && (
        <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.16em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 24 }}>
          {title}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(24px, 5vw, 56px)',
          flexWrap: 'wrap',
          rowGap: 24,
        }}
      >
        {partners.map(p => (
          <PartnerLogo key={p.slug} partner={p} height={logoHeight} />
        ))}
      </div>
    </div>
  );
}
