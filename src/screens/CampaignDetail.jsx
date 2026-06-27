import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stat from '../components/ui/Stat';
import Icon from '../components/ui/Icon';
import StatusPill from '../components/campaign/StatusPill';

const { colors, font, radius } = tokens;

const ELIGIBILITY = ['UK residents 18+', 'One entry minimum', 'No purchase necessary', 'Official Rules apply'];
const DRAW_DETAILS = [['Draw date', 'Nov 15, 2026'], ['Draw method', 'Random · witnessed'], ['Winner notified', 'By email within 24h']];

export default function CampaignDetail({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      {/* Hero */}
      <div style={{ height: isDesktop ? 400 : 260, background: 'linear-gradient(160deg,#1a2030,#0c1018)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 60% at 30% 40%, rgba(255,128,0,0.12), transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,#050505 0%,transparent 60%)' }} />
        <button
          onClick={() => onNavigate('campaigns')}
          style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(5,5,5,0.6)', border: `1px solid ${colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
        >
          <Icon name="arrowLeft" size={18} color={colors.text} />
        </button>
        <div style={{ position: 'absolute', bottom: 28, left: 24 }}>
          <StatusPill status="LIVE" size="lg" />
        </div>
        <div style={{ position: 'absolute', bottom: 28, right: 24, font: `500 13px ${font.family}`, color: colors.textMuted, background: 'rgba(5,5,5,0.6)', borderRadius: 9, padding: '6px 12px', backdropFilter: 'blur(8px)' }}>
          2d 14h remaining
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isDesktop ? '0 48px 60px' : isMobile ? '0 20px 100px' : '0 32px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 380px' : '1fr', gap: 40, marginTop: isDesktop ? -40 : 0 }}>

          {/* Main content */}
          <div>
            <div style={{ font: `500 12px ${font.family}`, color: colors.textDim, marginTop: isDesktop ? 0 : 24 }}>
              Vehicles · Prize value £92,000
            </div>
            <h1 style={{ font: `700 clamp(32px,4vw,48px)/1.05 ${font.display}`, color: colors.text, margin: '8px 0 20px', letterSpacing: '-.01em' }}>
              Range Rover Sport
            </h1>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              {[
                { label: 'Prize value', value: '£92,000', color: colors.text },
                { label: 'Entries', value: '4,821', color: colors.text },
                { label: 'Cost per entry', value: '1 credit', color: colors.accent },
                { label: 'Closes', value: '2d 14h', color: colors.warning },
              ].map(s => (
                <Card key={s.label} padding="sm" style={{ minWidth: 100 }}>
                  <Stat label={s.label} value={s.value} color={s.color} size="md" />
                </Card>
              ))}
            </div>

            <Card padding="md" style={{ marginBottom: 20 }}>
              <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: '0 0 12px' }}>About this campaign</h2>
              <p style={{ font: `400 14px/1.7 ${font.family}`, color: colors.textMuted, margin: 0 }}>
                Win a brand-new Range Rover Sport in Santorini Black metallic, fully loaded with 22-inch alloys, panoramic roof, Meridian sound system, and a five-year extended warranty. Handover includes complimentary first service and delivery anywhere in mainland UK.
              </p>
            </Card>

            <Card padding="md">
              <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: '0 0 14px' }}>Eligibility</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ELIGIBILITY.map(e => (
                  <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(91,208,138,0.06)', border: '1px solid rgba(91,208,138,0.2)', borderRadius: radius.sm, padding: '5px 10px' }}>
                    <Icon name="check" size={12} color={colors.success} />
                    <span style={{ font: `500 12px ${font.family}`, color: colors.success }}>{e}</span>
                  </div>
                ))}
              </div>
            </Card>

            {isMobile && (
              <Button onClick={() => onNavigate('allocate')} fullWidth size="lg" style={{ marginTop: 24 }}>
                Allocate credits
              </Button>
            )}
          </div>

          {/* Sticky allocation panel */}
          {!isMobile && (
            <div style={{ position: isDesktop ? 'sticky' : 'static', top: 24, alignSelf: 'start' }}>
              <Card gradient padding="md" style={{ boxShadow: '0 20px 48px rgba(0,0,0,0.4)' }}>
                <div style={{ font: `600 16px ${font.family}`, color: colors.text, marginBottom: 6 }}>Allocate credits</div>
                <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginBottom: 22 }}>
                  Each credit = one allocation to this campaign
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ font: `500 14px ${font.family}`, color: colors.textMuted }}>Your balance</span>
                  <span style={{ font: `700 18px ${font.family}`, color: colors.text }}>124 cr</span>
                </div>
                <Button onClick={() => onNavigate('allocate')} fullWidth size="lg" style={{ marginBottom: 12 }}>
                  Allocate credits
                </Button>
                <p style={{ font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, textAlign: 'center', margin: 0 }}>
                  By allocating you agree to the Official Rules. UK residents 18+ only.
                </p>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${colors.borderFaint}` }}>
                  <div style={{ font: `600 11px ${font.family}`, color: colors.textFaint, letterSpacing: '.08em', marginBottom: 10 }}>DRAW DETAILS</div>
                  {DRAW_DETAILS.map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ font: `400 12px ${font.family}`, color: colors.textFaint }}>{l}</span>
                      <span style={{ font: `500 12px ${font.family}`, color: colors.textMuted }}>{v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
