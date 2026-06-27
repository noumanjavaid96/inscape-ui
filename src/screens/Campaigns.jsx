import { useState, useMemo } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import CampaignCard from '../components/campaign/CampaignCard';
import { CAMPAIGNS, CATEGORIES, PAST_WINNERS } from '../data/campaigns';

const { colors, font, radius } = tokens;

const STATUS_TABS = ['Live', 'Upcoming', 'Past Winners'];
const SORTS = [
  { id: 'ending', label: 'Ending soon' },
  { id: 'value', label: 'Prize value' },
  { id: 'cost', label: 'Lowest cost' },
];

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        font: `${active ? 600 : 500} 13px ${font.family}`,
        color: active ? colors.bg : colors.textMuted,
        background: active ? colors.accent : colors.bg4,
        border: `1px solid ${active ? 'transparent' : colors.border}`,
        borderRadius: 10,
        padding: '9px 16px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

export default function Campaigns({ onNavigate }) {
  const [category, setCategory] = useState('All');
  const [statusTab, setStatusTab] = useState('Live');
  const [sort, setSort] = useState('ending');
  const { isMobile, isDesktop } = useBreakpoint();

  const filtered = useMemo(() => {
    let list = CAMPAIGNS.filter((c) => (category === 'All' || c.category === category));
    if (statusTab === 'Live') list = list.filter((c) => c.status === 'LIVE' || c.status === 'CLOSING SOON');
    if (statusTab === 'Upcoming') list = list.filter((c) => c.status === 'UPCOMING');
    const by = {
      ending: (a, b) => new Date(a.closesAt) - new Date(b.closesAt),
      value: (a, b) => b.prizeValue - a.prizeValue,
      cost: (a, b) => a.cost - b.cost,
    }[sort];
    return [...list].sort(by);
  }, [category, statusTab, sort]);

  const winners = useMemo(
    () => PAST_WINNERS.filter((w) => category === 'All' || w.category === category),
    [category]
  );

  const showingWinners = statusTab === 'Past Winners';
  const count = showingWinners ? winners.length : filtered.length;

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader
          title="Campaigns"
          subtitle={`${count} ${showingWinners ? 'recent winners' : 'campaigns available'}`}
          actions={
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: colors.bg4, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="search" size={19} color={colors.text} />
            </div>
          }
        />

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {CATEGORIES.map((f) => (
            <Pill key={f} active={category === f} onClick={() => setCategory(f)}>{f}</Pill>
          ))}
        </div>

        {/* Status tabs + sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: 13, padding: 4 }}>
            {STATUS_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setStatusTab(t)}
                style={{
                  font: `${statusTab === t ? 600 : 500} 13px ${font.family}`,
                  color: statusTab === t ? colors.text : colors.textDim,
                  background: statusTab === t ? colors.line : 'transparent',
                  border: 'none', borderRadius: 10, padding: '9px 16px', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {!showingWinners && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ font: `400 12px ${font.family}`, color: colors.textFaint }}>Sort</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {SORTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    style={{
                      font: `${sort === s.id ? 600 : 500} 12px ${font.family}`,
                      color: sort === s.id ? colors.accent : colors.textDim,
                      background: 'none', border: `1px solid ${sort === s.id ? colors.accentBorder : colors.border}`,
                      borderRadius: 8, padding: '6px 11px', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Grid */}
        {showingWinners ? (
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)', gap: 20 }}>
            {winners.map((w) => (
              <div key={w.id} style={{ background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: radius.xl, overflow: 'hidden' }}>
                <div style={{ height: 120, background: w.gradient, position: 'relative', overflow: 'hidden' }}>
                  {w.image && <img src={w.image} alt={w.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(13,15,18,0.6),transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, background: 'rgba(91,208,138,0.12)', border: '1px solid rgba(91,208,138,0.3)', borderRadius: 8, padding: '4px 10px', font: `600 10px ${font.family}`, color: colors.success, letterSpacing: '.08em' }}>WINNER ANNOUNCED</div>
                </div>
                <div style={{ padding: '16px 18px 18px' }}>
                  <div style={{ font: `400 11px ${font.family}`, color: colors.textDim }}>{w.category} · {w.prize}</div>
                  <div style={{ font: `700 22px/1.1 ${font.display}`, color: colors.text, marginTop: 4 }}>{w.title}</div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.borderFaint}`, font: `500 13px ${font.family}`, color: colors.textMuted }}>
                    Won by <span style={{ color: colors.text }}>{w.winner}</span>, {w.location}
                    <div style={{ font: `400 11px ${font.family}`, color: colors.textFaint, marginTop: 2 }}>{w.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)', gap: 20 }}>
            {filtered.map((c) => (
              <CampaignCard key={c.id} campaign={c} size="md" onClick={() => onNavigate('campaign-detail', { campaignId: c.id })} />
            ))}
          </div>
        )}

        {count === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', font: `400 14px ${font.family}`, color: colors.textDim }}>
            No campaigns match these filters yet. Try another category.
          </div>
        )}
      </div>
    </div>
  );
}
