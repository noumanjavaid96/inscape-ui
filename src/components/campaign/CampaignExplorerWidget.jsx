import tokens from '../../design/tokens';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const { colors, font } = tokens;

const MILESTONES = [1, 3, 5];

/**
 * Campaign Explorer — a monthly engagement mechanic separate from Momentum.
 * Tracks the number of *unique* campaigns joined this month and unlocks bonus
 * Credits at 1 / 3 / 5 campaigns (+2 / +5 / +10, max 17). Resets monthly;
 * earned bonus Credits remain. Adding more credits to an already-joined
 * campaign does not advance it. Members only.
 */
export default function CampaignExplorerWidget({ joined = 0, target = 5, nextReward, style }) {
  const pct = Math.min(100, Math.round((joined / target) * 100));
  const nextMilestone = MILESTONES.find((m) => m > joined);
  const toGo = nextMilestone ? nextMilestone - joined : 0;

  return (
    <Card padding="md" style={style}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Campaign Explorer</h3>
        <span style={{ font: `700 15px ${font.family}`, color: colors.accent }}>{joined} / {target}</span>
      </div>

      <ProgressBar value={pct} color={colors.accent} height={8} style={{ marginBottom: 10 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ font: `400 12px ${font.family}`, color: colors.textDim }}>
          {nextMilestone
            ? <>Join {toGo} more · <span style={{ color: colors.text }}>{nextReward}</span></>
            : 'All milestones complete'}
        </span>
        <span style={{ font: `400 12px ${font.family}`, color: colors.textFaint }}>Resets monthly</span>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
        {MILESTONES.map((m) => {
          const reached = m <= joined;
          return (
            <div key={m} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: 3, borderRadius: 2, background: reached ? colors.accent : colors.line, marginBottom: 5 }} />
              <span style={{ font: `500 10px ${font.family}`, color: reached ? colors.accent : colors.textGhost }}>{m}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
