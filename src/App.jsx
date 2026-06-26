import { useState } from 'react';
import AppLayout from './layouts/AppLayout';
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

const PUBLIC_SCREENS = new Set(['public-home', 'signup', 'login', 'welcome', 'onboarding', 'allocate', 'allocation-success']);

const SCREENS = {
  'public-home': PublicHome,
  signup: SignUp,
  login: Login,
  welcome: Welcome,
  onboarding: Onboarding,
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

export default function App() {
  const [screen, setScreen] = useState('public-home');
  const [history, setHistory] = useState([]);

  const navigate = (to) => {
    setHistory(h => [...h, screen]);
    setScreen(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (history.length > 0) {
      setScreen(history[history.length - 1]);
      setHistory(h => h.slice(0, -1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const Screen = SCREENS[screen] || Dashboard;
  const screenProps = { onNavigate: navigate, onBack: goBack };

  const isPublic = PUBLIC_SCREENS.has(screen);

  return (
    <>
      {isPublic ? (
        <Screen {...screenProps} />
      ) : (
        <AppLayout screen={screen} onNavigate={navigate}>
          <Screen {...screenProps} />
        </AppLayout>
      )}
    </>
  );
}
