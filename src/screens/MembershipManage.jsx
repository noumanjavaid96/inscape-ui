import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Stat from '../components/ui/Stat';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';

const { colors, font } = tokens;

export default function MembershipManage({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  const [state, setState] = useState('active'); // active | cancelling | cancelled
  const [confirmCancel, setConfirmCancel] = useState(false);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Manage membership" subtitle="Your plan, renewal and billing." backAction={() => onNavigate('profile')} />

        {state === 'cancelled' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(240,180,60,0.08)', border: `1px solid ${colors.warning}55`, borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
            <Icon name="clock" size={18} color={colors.warning} />
            <div style={{ font: `500 13px ${font.family}`, color: colors.text }}>
              Your membership is set to cancel on <strong>Jul 1, 2026</strong>. You keep all benefits until then.
            </div>
          </div>
        )}

        {/* Current plan */}
        <Card gradient padding="lg" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ font: `500 12px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: colors.textDim }}>Current plan</div>
              <div style={{ font: `700 28px ${font.family}`, color: colors.text, marginTop: 6 }}>Premium · $19.99/mo</div>
            </div>
            <Badge label={state === 'cancelled' ? 'Cancelling' : 'Active'} color={state === 'cancelled' ? 'yellow' : 'green'} dot />
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', paddingTop: 18, borderTop: `1px solid ${colors.borderFaint}` }}>
            <Stat label="Monthly Credits" value="120" />
            <Stat label="Next renewal" value={state === 'cancelled' ? 'Not scheduled' : 'Jul 1, 2026'} />
            <Stat label="Next Credits" value={state === 'cancelled' ? 'Paused' : '12 days'} />
          </div>
        </Card>

        {/* Actions */}
        <Card padding="lg" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
          {[
            { label: 'Change plan', sub: 'Upgrade or downgrade anytime', action: () => onNavigate('membership'), show: state !== 'cancelled' },
            { label: 'Update payment method', sub: 'Card ending 4242', action: () => onNavigate('membership'), show: true },
            { label: 'Billing history', sub: 'Invoices and receipts', action: () => onNavigate('wallet'), show: true },
          ].filter((r) => r.show).map((r, i, arr) => (
            <button key={r.label} onClick={r.action} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', background: 'none', border: 'none', borderBottom: i < arr.length - 1 ? `1px solid ${colors.borderFaint}` : 'none', padding: '16px 20px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ flex: 1 }}>
                <div style={{ font: `500 14px ${font.family}`, color: colors.text }}>{r.label}</div>
                <div style={{ font: `400 12px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{r.sub}</div>
              </div>
              <Icon name="chevronRight" size={14} color={colors.textGhost} />
            </button>
          ))}
        </Card>

        {/* Cancel */}
        {state !== 'cancelled' && (
          <Card padding="md">
            {!confirmCancel ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ font: `600 14px ${font.family}`, color: colors.text }}>Cancel membership</div>
                  <div style={{ font: `400 12px ${font.family}`, color: colors.textDim, marginTop: 2 }}>You keep your benefits until the end of the current period.</div>
                </div>
                <Button onClick={() => setConfirmCancel(true)} variant="danger" size="md">Cancel membership</Button>
              </div>
            ) : (
              <div>
                <div style={{ font: `600 14px ${font.family}`, color: colors.text, marginBottom: 6 }}>Cancel your Premium membership?</div>
                <div style={{ font: `400 13px/1.6 ${font.family}`, color: colors.textDim, marginBottom: 16 }}>
                  Your membership will stop renewing and end on Jul 1, 2026. You will keep your Credits and benefits until then.
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button onClick={() => { setState('cancelled'); setConfirmCancel(false); }} variant="danger" size="md">Confirm cancellation</Button>
                  <Button onClick={() => setConfirmCancel(false)} variant="secondary" size="md">Keep membership</Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {state === 'cancelled' && (
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ font: `500 13px ${font.family}`, color: colors.textMuted }}>Changed your mind? You can keep your membership.</div>
              <Button onClick={() => setState('active')} size="md">Resume membership</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
