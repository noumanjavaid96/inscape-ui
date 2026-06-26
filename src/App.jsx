import { useState } from 'react';
import PublicHome from './screens/PublicHome';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import Welcome from './screens/Welcome';
import Dashboard from './screens/Dashboard';
import Campaigns from './screens/Campaigns';
import MyCampaigns from './screens/MyCampaigns';
import CampaignDetail from './screens/CampaignDetail';
import Allocate from './screens/Allocate';
import AllocationSuccess from './screens/AllocationSuccess';
import Wallet from './screens/Wallet';
import Boost from './screens/Boost';
import Membership from './screens/Membership';
import Offers from './screens/Offers';
import Referral from './screens/Referral';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';

const SCREEN_MAP = {
  'public-home': PublicHome,
  signup: SignUp,
  login: Login,
  onboarding: Onboarding,
  welcome: Welcome,
  dashboard: Dashboard,
  campaigns: Campaigns,
  'my-campaigns': MyCampaigns,
  'campaign-detail': CampaignDetail,
  allocate: Allocate,
  'allocation-success': AllocationSuccess,
  wallet: Wallet,
  boost: Boost,
  membership: Membership,
  offers: Offers,
  referral: Referral,
  profile: Profile,
  notifications: Notifications,
};

const NAV_GROUPS = [
  { label: 'Discovery', screens: ['public-home', 'login', 'signup'] },
  { label: 'Onboard', screens: ['welcome', 'onboarding'] },
  { label: 'Core', screens: ['dashboard', 'campaigns', 'my-campaigns', 'campaign-detail'] },
  { label: 'Transact', screens: ['allocate', 'allocation-success', 'wallet', 'boost', 'membership'] },
  { label: 'Engage', screens: ['offers', 'referral', 'profile', 'notifications'] },
];

const FLOW_LINKS = {
  'public-home': 'signup',
  signup: 'welcome',
  login: 'dashboard',
  welcome: 'onboarding',
  onboarding: 'campaigns',
  campaigns: 'campaign-detail',
  'campaign-detail': 'allocate',
  allocate: 'allocation-success',
  'allocation-success': 'dashboard',
  dashboard: 'campaigns',
  wallet: 'boost',
  boost: 'membership',
  'my-campaigns': 'campaign-detail',
  offers: 'referral',
  referral: 'profile',
  profile: 'notifications',
  notifications: 'dashboard',
  membership: 'dashboard',
};

const SCREEN_LABELS = {
  'public-home': 'Public Home',
  signup: 'Sign Up',
  login: 'Login',
  onboarding: 'Onboarding',
  welcome: 'Welcome +3',
  dashboard: 'Dashboard',
  campaigns: 'Campaigns',
  'my-campaigns': 'My Campaigns',
  'campaign-detail': 'Campaign Detail',
  allocate: 'Allocate',
  'allocation-success': 'Success',
  wallet: 'Wallet',
  boost: 'Boost Credits',
  membership: 'Membership',
  offers: 'Partner Offers',
  referral: 'Referral',
  profile: 'Profile',
  notifications: 'Notifications',
};

export default function App() {
  const [screen, setScreen] = useState('public-home');
  const [history, setHistory] = useState([]);

  const navigate = (to) => {
    setHistory(h => [...h, screen]);
    setScreen(to);
  };

  const goBack = () => {
    if (history.length > 0) {
      setScreen(history[history.length - 1]);
      setHistory(h => h.slice(0, -1));
    }
  };

  const screenProps = {
    onNavigate: navigate,
    onContinue: () => navigate('onboarding'),
    onAllocate: () => navigate('allocate'),
    onConfirm: () => navigate('allocation-success'),
    onDismiss: () => navigate('campaign-detail'),
  };

  const Screen = SCREEN_MAP[screen] || Dashboard;
  const nextScreen = FLOW_LINKS[screen];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh', width: '100%', background: '#080a0c',
      padding: '20px 16px 32px', gap: 0,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&display=swap');
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.82); }
        }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
        button, input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: #4a4f57; }
        input { caret-color: #FF8000; }
      `}</style>

      {/* Header */}
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ font: "600 18px/1 'Cormorant Garamond', serif", color: '#fff' }}>InScape</span>
          <span style={{ font: '500 11px Inter', color: '#4a4f57' }}>· Consumer Blueprint Prototype</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            {history.length > 0 && (
              <button onClick={goBack} style={{ font: '500 11px Inter', padding: '4px 9px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: 'none', color: '#707070' }}>← Back</button>
            )}
            {nextScreen && (
              <button onClick={() => navigate(nextScreen)} style={{ font: '500 11px Inter', padding: '4px 9px', borderRadius: 6, border: '1px solid rgba(255,128,0,0.4)', cursor: 'pointer', background: 'rgba(255,128,0,0.08)', color: '#FF8000' }}>
                Next: {SCREEN_LABELS[nextScreen]} →
              </button>
            )}
          </div>
        </div>

        {/* Screen nav groups */}
        {NAV_GROUPS.map(g => (
          <div key={g.label} style={{ marginBottom: 6 }}>
            <span style={{ font: '600 9px Inter', letterSpacing: '.12em', textTransform: 'uppercase', color: '#3a3f47', marginRight: 6 }}>{g.label}</span>
            {g.screens.map(s => (
              <button key={s} onClick={() => { setHistory([]); setScreen(s); }} style={{
                font: '500 11px Inter', padding: '4px 9px', borderRadius: 6,
                border: 'none', cursor: 'pointer', marginRight: 4, marginBottom: 4,
                background: screen === s ? '#FF8000' : '#141720',
                color: screen === s ? '#050505' : '#6b7178',
              }}>{SCREEN_LABELS[s]}</button>
            ))}
          </div>
        ))}
      </div>

      {/* Phone shell */}
      <div style={{
        width: 360, height: 780,
        background: '#0a0a0a',
        borderRadius: 44, padding: 11,
        boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)',
        position: 'relative', flexShrink: 0,
      }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 28, background: '#0a0a0a', borderRadius: '0 0 18px 18px', zIndex: 100 }} />
        <div style={{ width: '100%', height: '100%', borderRadius: 34, overflow: 'hidden', position: 'relative' }}>
          <Screen {...screenProps} />
        </div>
      </div>

      {/* Screen indicator */}
      <div style={{ marginTop: 14, font: '500 11px Inter', color: '#3a3f47', letterSpacing: '.06em', textAlign: 'center' }}>
        {SCREEN_LABELS[screen]} · {Object.keys(SCREEN_MAP).indexOf(screen) + 1}/{Object.keys(SCREEN_MAP).length}
      </div>
    </div>
  );
}
