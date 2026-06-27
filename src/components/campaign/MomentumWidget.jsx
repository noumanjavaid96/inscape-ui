import tokens from '../../design/tokens';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const { colors, font } = tokens;

const MILESTONES = [25, 50, 75, 100];

/**
 * Monthly Momentum tracker. Shows progress towards the next reward and the
 * 25/50/75/100% milestone ladder.
 */
export default function MomentumWidget({ value = 0, nextReward, nextThreshold, resets, compact = false, style }) {
  return (
    <Card padding="md" style={style}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Monthly Momentum</h3>
        <span style={{ font: `700 15px ${font.family}`, color: colors.info }}>{value}%</span>
      </div>

      <ProgressBar value={value} color={colors.info} height={8} style={{ marginBottom: 10 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {nextReward && (
          <span style={{ font: `400 12px ${font.family}`, color: colors.textDim }}>
            Next: <span style={{ color: colors.text }}>{nextReward}</span>
            {nextThreshold ? ` at ${nextThreshold}%` : ''}
          </span>
        )}
        {resets && <span style={{ font: `400 12px ${font.family}`, color: colors.textFaint }}>Resets {resets}</span>}
      </div>

      {!compact && (
        <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
          {MILESTONES.map((m) => {
            const reached = m <= value;
            return (
              <div key={m} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 3, borderRadius: 2, background: reached ? colors.info : '#1a1e25', marginBottom: 5 }} />
                <span style={{ font: `500 10px ${font.family}`, color: reached ? colors.info : colors.textGhost }}>{m}%</span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
