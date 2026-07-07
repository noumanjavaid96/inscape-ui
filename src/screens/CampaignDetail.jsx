import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stat from '../components/ui/Stat';
import Icon from '../components/ui/Icon';
import StatusPill from '../components/campaign/StatusPill';
import Countdown from '../components/campaign/Countdown';
import CheckoutSheet from '../components/flow/CheckoutSheet';
import { findCampaign } from '../data/campaigns';

const { colors, font, radius } = tokens;

const ELIGIBILITY = ['US residents 18+', 'Minimum 1 Credit', 'No purchase necessary', 'Official Rules apply'];

// Quick top-up packs shown inline when a member wants (or needs) more Credits.
const TOPUP_PACKS = [
  { name: 'Silver', credits: 8, price: '$10' },
  { name: 'Gold', credits: 25, price: '$30', popular: true },
  { name: 'Platinum', credits: 100, price: '$100' },
];

const STARTING_BALANCE = 124;

/**
 * Join panel with an inline top-up. If the member is short on Credits (or just
 * wants more) they buy right here via the checkout sheet overlay — no page
 * change, the balance updates in place and they can join immediately.
 */
function JoinPanel({ c, drawDetails, style }) {
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [showTopUp, setShowTopUp] = useState(false);
  const [pack, setPack] = useState(null); // package being checked out
  const [joined, setJoined] = useState(false);

  const insufficient = balance < c.cost;

  const join = () => {
    if (insufficient) { setShowTopUp(true); return; }
    setBalance((b) => b - c.cost);
    setJoined(true);
  };

  return (
    <Card gradient padding="md" style={{ boxShadow: '0 20px 48px rgba(0,0,0,0.4)', ...style }}>
      <div style={{ font: `600 16px ${font.family}`, color: colors.text, marginBottom: 6 }}>Join this campaign</div>
      <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginBottom: 18 }}>
        {c.cost} Credit{c.cost > 1 ? 's' : ''} per participation in the draw
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ font: `600 11px ${font.family}`, color: colors.textFaint, letterSpacing: '.08em', marginBottom: 8 }}>CLOSES IN</div>
        <Countdown target={c.closesAt} size="md" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ font: `500 14px ${font.family}`, color: colors.textMuted }}>Your balance</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ font: `700 18px ${font.family}`, color: insufficient ? colors.warning : colors.text }}>{balance} Credits</span>
          <button
            onClick={() => setShowTopUp((s) => !s)}
            style={{ font: `600 12px ${font.family}`, color: colors.accent, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {showTopUp ? 'Hide' : 'Top up'}
          </button>
        </span>
      </div>

      {insufficient && !joined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(240,180,60,0.08)', border: `1px solid ${colors.warning}44`, borderRadius: radius.sm, padding: '8px 11px', marginBottom: 14 }}>
          <Icon name="bolt" size={14} color={colors.warning} />
          <span style={{ font: `500 12px/1.4 ${font.family}`, color: colors.textMuted }}>
            You need {c.cost - balance} more Credit{c.cost - balance > 1 ? 's' : ''} to join. Top up below.
          </span>
        </div>
      )}

      {(showTopUp || insufficient) && !joined && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ font: `600 11px ${font.family}`, color: colors.textFaint, letterSpacing: '.08em', marginBottom: 8 }}>ADD CREDITS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {TOPUP_PACKS.map((p) => (
              <button
                key={p.name}
                onClick={() => setPack(p)}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '12px 6px', borderRadius: radius.md, background: colors.bg3, border: `1px solid ${p.popular ? colors.accentBorder : colors.border}`, cursor: 'pointer' }}
              >
                {p.popular && <span style={{ position: 'absolute', top: -7, font: `700 8px ${font.family}`, letterSpacing: '.06em', color: '#1c1712', background: colors.accent, borderRadius: 999, padding: '2px 6px' }}>POPULAR</span>}
                <span style={{ font: `700 18px/1 ${font.display}`, color: colors.text }}>{p.credits}</span>
                <span style={{ font: `400 10px ${font.family}`, color: colors.textFaint }}>credits</span>
                <span style={{ font: `600 12px ${font.family}`, color: colors.accent, marginTop: 2 }}>{p.price}</span>
              </button>
            ))}
          </div>
          <div style={{ font: `400 11px ${font.family}`, color: colors.textGhost, textAlign: 'center', marginTop: 8 }}>Credits never expire · secured checkout</div>
        </div>
      )}

      {joined ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(91,208,138,0.10)', border: '1px solid rgba(91,208,138,0.3)', borderRadius: radius.md, padding: '13px 15px', marginBottom: 12 }}>
          <Icon name="check" size={18} color={colors.success} />
          <div style={{ font: `600 13px ${font.family}`, color: colors.text }}>You're in — good luck! <span style={{ color: colors.textDim, fontWeight: 400 }}>{c.cost} Credit{c.cost > 1 ? 's' : ''} allocated.</span></div>
        </div>
      ) : (
        <Button onClick={join} fullWidth size="lg" style={{ marginBottom: 12 }}>
          {insufficient ? 'Top up to join' : 'Join Campaign'}
        </Button>
      )}

      <p style={{ font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, textAlign: 'center', margin: 0 }}>
        By joining you agree to the Official Rules. US residents 18+ only.
      </p>

      <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${colors.borderFaint}` }}>
        <div style={{ font: `600 11px ${font.family}`, color: colors.textFaint, letterSpacing: '.08em', marginBottom: 10 }}>DRAW DETAILS</div>
        {drawDetails.map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ font: `400 12px ${font.family}`, color: colors.textFaint }}>{l}</span>
            <span style={{ font: `500 12px ${font.family}`, color: colors.textMuted }}>{v}</span>
          </div>
        ))}
      </div>

      {pack && (
        <CheckoutSheet
          title={`Add ${pack.credits} Credits`}
          subtitle={`${pack.name} pack · Credits post to your balance instantly`}
          lines={[['Package', pack.name], ['Credits', `+${pack.credits}`]]}
          total={pack.price}
          cta={`Pay ${pack.price}`}
          successTitle="Credits added"
          successBody={`${pack.credits} Credits are now in your balance. You can join right away.`}
          onSuccess={() => { setBalance((b) => b + pack.credits); setPack(null); }}
          onClose={() => setPack(null)}
        />
      )}
    </Card>
  );
}

export default function CampaignDetail({ onNavigate, params = {} }) {
  const { isMobile, isDesktop } = useBreakpoint();
  const c = findCampaign(params.campaignId);

  const drawDetails = [
    ['Draw date', c.drawDate],
    ['Draw method', 'Random · witnessed'],
    ['Winner notified', 'By email within 24h'],
  ];

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      {/* Hero */}
      <div style={{ height: isDesktop ? 420 : 300, background: c.gradient, position: 'relative', overflow: 'hidden' }}>
        {c.image && (
          <img src={c.image} alt={c.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 70% at 30% 35%, ${c.glow}, transparent)` }} />
        {/* fade into the page background — themed so light mode has no black band */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--bg) 0%, transparent 65%)' }} />
        <button
          onClick={() => onNavigate('campaigns')}
          aria-label="Back to campaigns"
          style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(5,5,5,0.55)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
        >
          <Icon name="arrowLeft" size={18} color="#ffffff" />
        </button>
        <div style={{ position: 'absolute', bottom: 28, left: 24 }}>
          <StatusPill status={c.status} size="lg" />
        </div>
        {isMobile && (
          <div style={{ position: 'absolute', bottom: 24, right: 20 }}>
            <Countdown target={c.closesAt} size="md" />
          </div>
        )}
      </div>

      {/* positioned + zIndex so the column pulled up over the hero paints above its fade */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isDesktop ? '0 48px 60px' : isMobile ? '0 20px 100px' : '0 32px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 380px' : '1fr', gap: 40, marginTop: isDesktop ? -40 : 0 }}>

          {/* Main */}
          <div>
            <div style={{ font: `500 12px ${font.family}`, color: colors.textDim, marginTop: isDesktop ? 0 : 24 }}>
              {c.category} · Prize value {c.prize}
            </div>
            <h1 style={{ font: `700 clamp(32px,4vw,48px)/1.05 ${font.display}`, color: colors.text, margin: '8px 0 20px', letterSpacing: '-.01em' }}>
              {c.title}
            </h1>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              {[
                { label: 'Prize value', value: c.prize, color: colors.text },
                { label: 'Cost to join', value: `${c.cost} cr`, color: colors.accent },
                { label: 'Draw', value: c.drawDate, color: colors.warning },
              ].map((s) => (
                <Card key={s.label} padding="sm" style={{ minWidth: 110 }}>
                  <Stat label={s.label} value={s.value} color={s.color} size="md" />
                </Card>
              ))}
            </div>

            <Card padding="md" style={{ marginBottom: 20 }}>
              <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: '0 0 12px' }}>About this campaign</h2>
              <p style={{ font: `400 14px/1.7 ${font.family}`, color: colors.textMuted, margin: 0 }}>{c.blurb}</p>
            </Card>

            <Card padding="md">
              <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: '0 0 14px' }}>Eligibility</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ELIGIBILITY.map((e) => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(91,208,138,0.06)', border: '1px solid rgba(91,208,138,0.2)', borderRadius: radius.sm, padding: '5px 10px' }}>
                    <Icon name="check" size={12} color={colors.success} />
                    <span style={{ font: `500 12px ${font.family}`, color: colors.success }}>{e}</span>
                  </div>
                ))}
              </div>
            </Card>

            {isMobile && (
              <JoinPanel c={c} drawDetails={drawDetails} style={{ marginTop: 24 }} />
            )}
          </div>

          {/* Sticky join panel */}
          {!isMobile && (
            <div style={{ position: isDesktop ? 'sticky' : 'static', top: 24, alignSelf: 'start' }}>
              <JoinPanel c={c} drawDetails={drawDetails} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
