import { useState } from 'react';
import AppLayout from './layouts/AppLayout';
import IntroSplash from './components/cinematic/IntroSplash';
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
import OfferDetail from './screens/OfferDetail';
import Referral from './screens/Referral';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';
import Winners from './screens/Winners';
import Insights from './screens/Insights';
import MembershipManage from './screens/MembershipManage';
import Support from './screens/Support';
import Merch from './screens/Merch';

const PUBLIC_SCREENS = new Set(['public-home', 'signup', 'login', 'welcome', 'onboarding', 'allocate', 'allocation-success', 'merch']);

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
  'offer-detail': OfferDetail,
  referral: Referral,
  profile: Profile,
  notifications: Notifications,
  winners: Winners,
  insights: Insights,
  'membership-manage': MembershipManage,
  support: Support,
  merch: Merch,
};

// Screens that, when they hand off to the dashboard, earn a brand reveal.
const AUTH_ENTRY = new Set(['login', 'signup', 'welcome', 'onboarding']);

export default function App() {
  const [screen, setScreen] = useState('public-home');
  const [params, setParams] = useState({});
  const [history, setHistory] = useState([]);
  const [splashId, setSplashId] = useState(0);
  const [userName, setUserName] = useState('');

  const navigate = (to, nextParams = {}) => {
    if (nextParams.name) setUserName(nextParams.name);
    if (to === 'dashboard' && AUTH_ENTRY.has(screen)) setSplashId(id => id + 1);
    setHistory(h => [...h, { screen, params }]);
    setScreen(to);
    setParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setScreen(prev.screen);
      setParams(prev.params || {});
      setHistory(h => h.slice(0, -1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const Screen = SCREENS[screen] || Dashboard;
  const screenProps = { onNavigate: navigate, onBack: goBack, params };

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
      {splashId > 0 && <IntroSplash key={splashId} hold={1900} lift={700} name={userName} />}
    </>
  );
}
