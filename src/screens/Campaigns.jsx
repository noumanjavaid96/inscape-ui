import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';
import CampaignCard from '../components/campaign/CampaignCard';

const { colors, font } = tokens;

const ALL_CAMPAIGNS = [
  { id: 1, status: 'LIVE', statusColor: colors.accent, timeLeft: '2d 14h', category: 'Vehicles', prize: '£92,000', title: 'Range Rover Sport', participants: '4,821', gradient: 'linear-gradient(135deg,#1a2030,#0c1018)', glow: 'rgba(255,128,0,0.12)' },
  { id: 2, status: 'CLOSING SOON', statusColor: colors.warning, timeLeft: '9h 40m', category: 'Travel', prize: '£18,500', title: '7 Nights, Maldives', participants: '2,104', gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)', glow: 'rgba(240,180,60,0.12)' },
  { id: 3, status: 'LIVE', statusColor: colors.accent, timeLeft: '5d 2h', category: 'Tech', prize: '£3,499', title: 'MacBook Pro M4', participants: '1,338', gradient: 'linear-gradient(135deg,#141820,#0a0c10)', glow: 'rgba(71,199,252,0.1)' },
  { id: 4, status: 'UPCOMING', statusColor: colors.info, timeLeft: 'Starts in 3d', category: 'Travel', prize: '£12,000', title: 'Swiss Alps Retreat', participants: '—', gradient: 'linear-gradient(135deg,#141c20,#0a0e10)', glow: 'rgba(71,199,252,0.1)' },
];

const FILTERS = ['All', 'Travel', 'Vehicles', 'Tech', 'Cash'];
const STATUS_TABS = ['Live', 'Upcoming', 'Closed'];

export default function Campaigns({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  const [statusTab, setStatusTab] = useState('Live');
  const { isMobile, isDesktop } = useBreakpoint();
  const filtered = ALL_CAMPAIGNS.filter(c => filter === 'All' || c.category === filter);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader
          title="Campaigns"
          subtitle={`${filtered.length} campaigns available`}
          actions={
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: colors.bg4, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="search" size={19} color={colors.text} />
            </div>
          }
        />

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                font: `${filter === f ? 600 : 500} 13px ${font.family}`,
                color: filter === f ? colors.bg : colors.textMuted,
                background: filter === f ? colors.accent : colors.bg4,
                border: `1px solid ${filter === f ? 'transparent' : colors.border}`,
                borderRadius: 10,
                padding: '9px 16px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Status tabs */}
        <div style={{ display: 'flex', marginBottom: 28, background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: 13, padding: 4, maxWidth: 300 }}>
          {STATUS_TABS.map(t => (
            <button
              key={t}
              onClick={() => setStatusTab(t)}
              style={{
                flex: 1,
                font: `${statusTab === t ? 600 : 500} 13px ${font.family}`,
                color: statusTab === t ? colors.text : colors.textDim,
                background: statusTab === t ? '#22262c' : 'transparent',
                border: 'none',
                borderRadius: 10,
                padding: '9px 0',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3,1fr)' : isMobile ? '1fr' : 'repeat(2,1fr)', gap: 20 }}>
          {filtered.map(c => (
            <CampaignCard
              key={c.id}
              campaign={c}
              size="md"
              onClick={() => onNavigate('campaign-detail')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
