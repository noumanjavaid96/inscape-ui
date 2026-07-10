import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import { findOffer } from '../data/offers';

const { colors, font, radius } = tokens;

/**
 * Decorative, deterministic QR-style matrix derived from the offer URL.
 * In production this is replaced by a real encoded QR; here it gives the
 * in-store redemption surface a credible visual for the demo.
 */
function QrPlaceholder({ seed, size = 148 }) {
  const n = 21; // QR v1 module count
  const cell = size / n;
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rnd = (x, y) => {
    let v = h ^ Math.imul(x + 1, 73856093) ^ Math.imul(y + 1, 19349663);
    v = Math.imul(v ^ (v >>> 13), 1274126177);
    return ((v >>> 0) % 100) / 100;
  };
  const isFinder = (x, y) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const finderCell = (x, y) => {
    const fx = x < 7 ? x : x - (n - 7);
    const fy = y < 7 ? y : y - (n - 7);
    const ring = fx === 0 || fx === 6 || fy === 0 || fy === 6;
    const core = fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4;
    return ring || core;
  };
  const rects = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const on = isFinder(x, y) ? finderCell(x, y) : rnd(x, y) > 0.52;
      if (on) rects.push(<rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="#0a0b0e" />);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }} role="img" aria-label="Redemption QR code">
      <rect width={size} height={size} fill="#ffffff" />
      {rects}
    </svg>
  );
}

export default function OfferDetail({ onNavigate, onBack, params = {} }) {
  const { isMobile, isDesktop } = useBreakpoint();
  const [copied, setCopied] = useState(false);
  const o = findOffer(params.slug);

  if (!o) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ font: `500 16px ${font.family}`, color: colors.textDim, marginBottom: 16 }}>This offer is no longer available.</p>
          <Button onClick={() => onNavigate('offers')} size="md">Back to Offers Hub</Button>
        </div>
      </div>
    );
  }

  const copyCode = () => {
    if (!o.code) return;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(o.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const pad = isDesktop ? '32px 48px 80px' : isMobile ? '20px 20px 100px' : '28px 32px 80px';

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: pad }}>

        <button
          onClick={() => (onBack ? onBack() : onNavigate('offers'))}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: colors.textDim, font: `500 13px ${font.family}`, padding: '4px 0', marginBottom: 22 }}
        >
          <Icon name="arrowLeft" size={16} color={colors.textDim} /> Offers Hub
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 360px' : '1fr', gap: 28, alignItems: 'start' }}>

          {/* Main */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Card padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                <div style={{ width: 64, height: 64, borderRadius: radius.lg, background: colors.bg5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 10 }}>
                  <img src={`/brand/partners/${o.slug}.png`} alt={o.brand} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ font: `600 12px ${font.family}`, color: colors.textFaint, marginBottom: 4 }}>{o.category}</div>
                  <h1 style={{ font: `700 26px ${font.family}`, color: colors.text, margin: 0 }}>{o.brand}</h1>
                </div>
                <Badge label={o.type} color={o.type === 'Promo code' ? 'orange' : 'blue'} size="sm" />
              </div>
              <div style={{ font: `700 34px ${font.family}`, color: colors.accent, marginBottom: 8 }}>{o.offer}</div>
              <p style={{ font: `400 15px/1.6 ${font.family}`, color: colors.textDim, margin: 0 }}>{o.detail}</p>
            </Card>

            <Card padding="lg">
              <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: '0 0 16px' }}>How to redeem</h2>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {o.steps.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, color: colors.accent, font: `700 12px ${font.family}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                    <span style={{ font: `400 14px/1.5 ${font.family}`, color: colors.textDim, paddingTop: 2 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card padding="lg">
              <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: '0 0 10px' }}>Terms</h2>
              <p style={{ font: `400 13px/1.6 ${font.family}`, color: colors.textFaint, margin: '0 0 8px' }}>{o.terms}</p>
              <p style={{ font: `400 13px/1.6 ${font.family}`, color: colors.textFaint, margin: 0 }}>Valid through {o.expires}. Exclusive to current InScape members.</p>
            </Card>
          </div>

          {/* Redemption rail */}
          <Card padding="lg" style={{ position: isDesktop ? 'sticky' : 'static', top: 24 }}>
            {o.code ? (
              <>
                <div style={{ font: `600 12px ${font.family}`, letterSpacing: '.08em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 10 }}>Your member code</div>
                <button
                  onClick={copyCode}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: colors.bg5, border: `1px dashed ${colors.borderStrong}`, borderRadius: radius.lg, padding: '14px 16px', cursor: 'pointer', marginBottom: 12 }}
                >
                  <span style={{ font: `700 18px ${font.family}`, letterSpacing: '.06em', color: colors.text }}>{o.code}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `600 12px ${font.family}`, color: copied ? colors.success : colors.accent }}>
                    <Icon name={copied ? 'check' : 'grid'} size={15} color={copied ? colors.success : colors.accent} />
                    {copied ? 'Copied' : 'Copy'}
                  </span>
                </button>
              </>
            ) : (
              <div style={{ font: `400 13px/1.5 ${font.family}`, color: colors.textDim, marginBottom: 14 }}>
                No code needed. Your discount applies automatically through the member link below.
              </div>
            )}

            <Button onClick={() => window.open(o.url, '_blank', 'noopener')} size="md" fullWidth>
              Shop this offer
            </Button>

            {o.inStore && o.code && (
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${colors.borderFaint}`, textAlign: 'center' }}>
                <div style={{ font: `600 12px ${font.family}`, letterSpacing: '.08em', textTransform: 'uppercase', color: colors.textDim, marginBottom: 12 }}>Redeem in-store</div>
                <div style={{ display: 'inline-block', padding: 10, background: '#ffffff', borderRadius: radius.lg }}>
                  <QrPlaceholder seed={`${o.slug}:${o.code}`} />
                </div>
                <p style={{ font: `400 12px/1.5 ${font.family}`, color: colors.textFaint, margin: '12px 0 0' }}>Show this QR at checkout in any participating store.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
