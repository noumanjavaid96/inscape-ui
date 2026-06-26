import { useState } from 'react';
import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import Campaigns from './screens/Campaigns';
import CampaignDetail from './screens/CampaignDetail';
import Allocate from './screens/Allocate';
import AllocationSuccess from './screens/AllocationSuccess';
import Wallet from './screens/Wallet';
import Boost from './screens/Boost';
import Membership from './screens/Membership';
import Offers from './screens/Offers';
import Referral from './screens/Referral';

const SCREEN_MAP = {
  welcome: Welcome,
  dashboard: Dashboard,
  campaigns: Campaigns,
  'campaign-detail': CampaignDetail,
  allocate: Allocate,
  'allocation-success': AllocationSuccess,
  wallet: Wallet,
  boost: Boost,
  membership: Membership,
  offers: Offers,
  referral: Referral,
};

const NAV_LABELS = {
  welcome: 'Welcome',
  dashboard: 'Dashboard',
  campaigns: 'Campaigns',
  'campaign-detail': 'Detail',
  allocate: 'Allocate',
  'allocation-success': 'Success',
  wallet: 'Wallet',
  boost: 'Boost',
  membership: 'Membership',
  offers: 'Offers',
  referral: 'Referral',
};

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const navigate = (to) => setScreen(to);

  const screenProps = {
    onNavigate: navigate,
    onContinue: () => navigate('campaigns'),
    onAllocate: () => navigate('allocate'),
    onConfirm: () => navigate('allocation-success'),
    onDismiss: () => navigate('campaign-detail'),
  };

  const Screen = SCREEN_MAP[screen] || Dashboard;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', width: '100%', background: '#0a0a0a', padding: '24px 16px',
    }}>
      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.82); }
        }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: inherit; }
      `}</style>

      {/* Screen nav strip */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 500 }}>
        {Object.keys(SCREEN_MAP).map(s => (
          <button key={s} onClick={() => setScreen(s)} style={{
            font: '500 11px Inter', padding: '5px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
            background: screen === s ? '#FF8000' : '#1a1d21',
            color: screen === s ? '#050505' : '#A3A3A3',
          }}>{NAV_LABELS[s]}</button>
        ))}
      </div>

      {/* Phone shell */}
      <div style={{
        width: 360, height: 780,
        background: '#0a0a0a',
        borderRadius: 44, padding: 11,
        boxShadow: '0 34px 70px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.09)',
        position: 'relative', flexShrink: 0,
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 34, overflow: 'hidden', position: 'relative' }}>
          <Screen {...screenProps} />
        </div>
      </div>
    </div>
  );
}
