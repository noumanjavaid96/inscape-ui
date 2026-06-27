import { useState, useEffect } from 'react';
import tokens from '../../design/tokens';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const { colors, font, radius } = tokens;

const ref = () => 'INS-' + Math.random().toString(36).slice(2, 8).toUpperCase();

/**
 * Payment sheet covering the documented checkout states: review → processing
 * (idempotency-keyed) → success, with a declined/failed → retry branch. Purely
 * front-end simulation; swap the timeout for a real provider + webhook later.
 *
 * @param {[string,string][]} lines  summary rows
 * @param {string} total             headline amount
 * @param {string} cta               pay button label
 */
export default function CheckoutSheet({ title, subtitle, lines = [], total, cta, onSuccess, onClose, successTitle = 'Payment confirmed', successBody }) {
  const [stage, setStage] = useState('review'); // review | processing | success | failed
  const [decline, setDecline] = useState(false);
  const [key] = useState(ref);

  useEffect(() => {
    if (stage !== 'processing') return;
    const t = setTimeout(() => setStage(decline ? 'failed' : 'success'), 1700);
    return () => clearTimeout(t);
  }, [stage, decline]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={() => stage !== 'processing' && onClose?.()}
    >
      <div
        className="liquid-glass"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 440, borderRadius: radius.xl, padding: 28, boxShadow: tokens.shadow.float }}
      >
        {stage === 'review' && (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
              <h2 style={{ font: `700 20px ${font.family}`, color: colors.text, margin: 0 }}>{title}</h2>
              <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.textDim, fontSize: 20, lineHeight: 1 }}>×</button>
            </div>
            {subtitle && <p style={{ font: `400 13px ${font.family}`, color: colors.textDim, margin: '0 0 20px' }}>{subtitle}</p>}
            <div style={{ background: colors.bg3, borderRadius: radius.md, padding: '16px 18px', marginBottom: 18 }}>
              {lines.map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>{l}</span>
                  <span style={{ font: `600 13px ${font.family}`, color: colors.text }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${colors.borderFaint}` }}>
                <span style={{ font: `600 14px ${font.family}`, color: colors.text }}>Total due</span>
                <span style={{ font: `700 16px ${font.family}`, color: colors.accent }}>{total}</span>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, cursor: 'pointer' }}>
              <input type="checkbox" checked={decline} onChange={(e) => setDecline(e.target.checked)} style={{ accentColor: colors.accent }} />
              <span style={{ font: `400 12px ${font.family}`, color: colors.textFaint }}>Simulate a declined card (demo)</span>
            </label>
            <Button onClick={() => setStage('processing')} fullWidth size="lg">{cta || `Pay ${total}`}</Button>
            <p style={{ font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, textAlign: 'center', margin: '12px 0 0' }}>
              Secured checkout. Credits post only after your payment is confirmed.
            </p>
          </>
        )}

        {stage === 'processing' && (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', border: `3px solid ${colors.border}`, borderTopColor: colors.accent, margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' }} />
            <div style={{ font: `600 16px ${font.family}`, color: colors.text }}>Confirming your payment…</div>
            <div style={{ font: `400 12px monospace`, color: colors.textFaint, marginTop: 8 }}>Idempotency key {key}</div>
          </div>
        )}

        {stage === 'success' && (
          <div style={{ textAlign: 'center', padding: '12px 8px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(91,208,138,0.12)', border: '1px solid rgba(91,208,138,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Icon name="check" size={32} color={colors.success} />
            </div>
            <h2 style={{ font: `700 22px ${font.family}`, color: colors.text, margin: '0 0 8px' }}>{successTitle}</h2>
            <p style={{ font: `400 14px ${font.family}`, color: colors.textMuted, margin: '0 0 8px' }}>{successBody || 'Your payment was confirmed and your Credits have been posted.'}</p>
            <p style={{ font: `400 12px monospace`, color: colors.textFaint, margin: '0 0 22px' }}>Receipt {key}</p>
            <Button onClick={onSuccess} fullWidth size="lg">Continue</Button>
          </div>
        )}

        {stage === 'failed' && (
          <div style={{ textAlign: 'center', padding: '12px 8px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Icon name="bolt" size={30} color={colors.danger} />
            </div>
            <h2 style={{ font: `700 22px ${font.family}`, color: colors.text, margin: '0 0 8px' }}>Payment declined</h2>
            <p style={{ font: `400 14px ${font.family}`, color: colors.textMuted, margin: '0 0 6px' }}>Your card was declined and nothing was charged. No Credits or entitlement were changed.</p>
            <p style={{ font: `400 12px ${font.family}`, color: colors.textFaint, margin: '0 0 22px' }}>Try again or use a different payment method.</p>
            <Button onClick={() => { setDecline(false); setStage('review'); }} fullWidth size="lg">Try again</Button>
            <Button onClick={onClose} variant="ghost" fullWidth size="md" style={{ marginTop: 8 }}>Cancel</Button>
          </div>
        )}
      </div>
    </div>
  );
}
