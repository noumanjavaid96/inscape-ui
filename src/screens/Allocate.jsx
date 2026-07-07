import { useState } from 'react';
import tokens from '../design/tokens';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { findCampaign } from '../data/campaigns';

const { colors, font, radius } = tokens;

export default function Allocate({ onNavigate, params = {} }) {
  const campaign = findCampaign(params.campaignId);
  const perJoin = campaign.cost || 1;
  const [qty, setQty] = useState(1);
  const balance = 124;
  const cost = qty * perJoin;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 40% at 50% 60%, rgba(245,133,46,0.06), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>

        <button onClick={() => onNavigate('campaign-detail', { campaignId: campaign.id })} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', font: `500 14px ${font.family}`, color: colors.textDim, marginBottom: 24 }}>
          <Icon name="arrowLeft" size={16} color={colors.textDim} />
          Back to campaign
        </button>

        <Card padding="lg" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
          <h1 style={{ font: `700 24px/1.1 ${font.family}`, color: colors.text, margin: '0 0 4px', letterSpacing: '-.01em' }}>Join campaign</h1>
          <p style={{ font: `400 14px ${font.family}`, color: colors.textDim, margin: '0 0 28px' }}>{campaign.title} · {perJoin} Credit{perJoin > 1 ? 's' : ''} per participation</p>

          <div style={{ background: colors.bg4, border: `1px solid ${colors.border}`, borderRadius: radius.lg, padding: 24, marginBottom: 20, textAlign: 'center' }}>
            <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginBottom: 14 }}>Number of participations</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ width: 52, height: 52, borderRadius: '50%', background: qty === 1 ? colors.bg3 : colors.bg5, border: `1px solid ${colors.border}`, font: `600 24px ${font.family}`, color: qty === 1 ? colors.textGhost : colors.text, cursor: qty === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              >
                −
              </button>
              <div style={{ font: `700 56px/1 ${font.family}`, color: colors.text, letterSpacing: '-.03em', minWidth: 70, textAlign: 'center' }}>{qty}</div>
              <button
                onClick={() => setQty(q => Math.min(balance, q + 1))}
                style={{ width: 52, height: 52, borderRadius: '50%', background: colors.bg5, border: `1px solid ${colors.border}`, font: `600 24px ${font.family}`, color: colors.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = colors.accent}
                onMouseLeave={e => e.currentTarget.style.background = colors.bg5}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[1, 5, 10, 'Max'].map(v => (
              <button
                key={v}
                onClick={() => setQty(v === 'Max' ? Math.min(50, balance) : Math.min(balance, qty + (typeof v === 'number' ? v : 0)))}
                style={{ flex: 1, height: 38, borderRadius: radius.sm, background: colors.bg4, border: `1px solid ${colors.border}`, font: `600 12px ${font.family}`, color: colors.textMuted, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = colors.accentBorder; e.currentTarget.style.color = colors.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.textMuted; }}
              >
                {v === 'Max' ? v : `+${v}`}
              </button>
            ))}
          </div>

          <div style={{ background: colors.bg3, borderRadius: radius.md, padding: '16px 18px', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>Credits spent</span>
              <span style={{ font: `600 13px ${font.family}`, color: colors.text }}>{cost} cr</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${colors.borderFaint}` }}>
              <span style={{ font: `500 13px ${font.family}`, color: colors.textDim }}>Remaining balance</span>
              <span style={{ font: `700 14px ${font.family}`, color: balance - cost < 10 ? colors.warning : colors.text }}>{balance - cost} cr</span>
            </div>
          </div>

          {cost > balance ? (
            <>
              <div style={{ background: 'rgba(240,180,60,0.08)', border: `1px solid ${colors.warning}55`, borderRadius: radius.md, padding: '12px 14px', marginBottom: 14, font: `500 12px/1.5 ${font.family}`, color: colors.text }}>
                You need {cost - balance} more Credit{cost - balance > 1 ? 's' : ''} to join with {qty} participation{qty > 1 ? 's' : ''}. Top up to continue — your campaign and amount are saved.
              </div>
              <Button onClick={() => onNavigate('boost', { campaignId: campaign.id })} fullWidth size="lg" style={{ marginBottom: 14 }}>
                Top up Credits
              </Button>
            </>
          ) : (
            <Button onClick={() => onNavigate('allocation-success', { campaignId: campaign.id })} fullWidth size="lg" style={{ marginBottom: 14 }}>
              Confirm · join with {cost} Credit{cost > 1 ? 's' : ''}
            </Button>
          )}

          <p style={{ font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, textAlign: 'center', margin: 0 }}>
            By confirming you agree to the Official Rules. No purchase necessary. US residents 18+.
          </p>
        </Card>
      </div>
    </div>
  );
}
