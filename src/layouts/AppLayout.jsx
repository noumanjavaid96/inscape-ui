import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function AppLayout({ screen, children, onNavigate }) {
  const { showSidebar, isMobile } = useBreakpoint();

  const SIDEBAR_SCREENS = ['dashboard', 'campaigns', 'my-campaigns', 'winners', 'insights', 'offers', 'wallet', 'profile', 'notifications', 'campaign-detail', 'allocate', 'allocation-success', 'boost', 'membership', 'referral'];
  const activeTab = SIDEBAR_SCREENS.includes(screen) ? screen : 'dashboard';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505' }}>
      {showSidebar && (
        <Sidebar active={activeTab} onNavigate={onNavigate} />
      )}

      <main style={{
        flex: 1,
        minWidth: 0,
        paddingBottom: isMobile ? 80 : 0,
        overflowY: 'auto',
      }}>
        {children}
      </main>

      {isMobile && (
        <BottomNav active={activeTab} onNavigate={onNavigate} />
      )}
    </div>
  );
}
