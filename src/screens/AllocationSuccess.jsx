import tokens from '../design/tokens';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const { colors, font } = tokens;

const DETAILS = [
  { label: 'Campaign', value: 'Range Rover Sport' },
  { label: 'Credits used', value: '1 credit' },
  { label: 'Reference', value: 'INS-ALLOC-7F3A9C', mono: true },
  { label: 'Draw date', value: 'Nov 15, 2026' },
];

export default function AllocationSuccess({ onNavigate }) {
  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 50% at 50% 40%, rgba(91,208,138,0.07), transparent)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 460, textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(91,208,138,0.1)', border: '1px solid rgba(91,208,138,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Icon name="check" size={38} color={colors.success} />
        </div>

        <h1 style={{ font: `700 36px/1.05 ${font.display}`, color: colors.text, margin: '0 0 10px' }}>You're in</h1>
        <p style={{ font: `400 15px ${font.family}`, color: colors.textMuted, margin: '0 0 32px' }}>Your credits are in. Good luck with the draw.</p>

        <Card padding="md" style={{ marginBottom: 20, textAlign: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DETAILS.map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>{r.label}</span>
                <span style={{ font: r.mono ? `600 12px monospace` : `500 13px ${font.family}`, color: r.mono ? colors.accent : colors.text }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, borderTop: `1px dashed ${colors.border}`, margin: '16px 0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="bolt" size={16} color={colors.info} />
            <span style={{ font: `500 13px ${font.family}`, color: colors.info }}>+10 Momentum earned</span>
          </div>
        </Card>

        <Button onClick={() => onNavigate('my-campaigns')} fullWidth size="lg" style={{ marginBottom: 10 }}>
          View my campaigns
        </Button>
        <Button onClick={() => onNavigate('campaigns')} variant="secondary" fullWidth>
          Browse more campaigns
        </Button>
      </div>
    </div>
  );
}
