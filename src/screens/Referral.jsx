import { useBreakpoint } from '../hooks/useBreakpoint';

const INVITES = [
  { name: 'Sam R.', status: 'Qualified', statusColor: '#5BD08A', reward: '+40 Momentum', date: 'May 20' },
  { name: 'Jordan P.', status: 'Pending', statusColor: '#F0B43C', reward: 'Awaiting first purchase', date: 'May 15' },
  { name: 'Emma T.', status: 'Invited', statusColor: '#707070', reward: '—', date: 'Jun 1' },
];

export default function Referral({ onNavigate }) {
  const { isMobile, isDesktop } = useBreakpoint();
  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>
        <h1 style={{ font: '700 32px/1 Inter', color: '#fff', margin: '0 0 6px', letterSpacing: '-.02em' }}>Referral Centre</h1>
        <p style={{ font: '400 14px Inter', color: '#707070', margin: '0 0 28px' }}>Share your code. Earn when friends qualify.</p>

        {/* Code card */}
        <div style={{ background: 'linear-gradient(135deg,#0d1422,#080c14)', border: '1px solid rgba(71,199,252,0.2)', borderRadius: 22, padding: '28px 28px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 80% 20%, rgba(71,199,252,0.08), transparent)', pointerEvents: 'none' }} />
          <div style={{ font: '500 13px Inter', color: '#707070', marginBottom: 6 }}>Your referral code</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ font: '700 36px/1 Inter', color: '#fff', letterSpacing: '.06em' }}>ALEX-7K2P</div>
            <button style={{ height: 40, padding: '0 18px', borderRadius: 10, background: 'rgba(71,199,252,0.1)', border: '1px solid rgba(71,199,252,0.3)', cursor: 'pointer', font: '600 13px Inter', color: '#47C7FC' }}>Copy code</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            <button style={{ flex: 1, minWidth: 140, height: 46, borderRadius: 12, background: '#47C7FC', border: 'none', cursor: 'pointer', font: '600 14px Inter', color: '#050505' }}>Share invite link</button>
            <button style={{ flex: 1, minWidth: 140, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', font: '600 14px Inter', color: '#fff' }}>Share via WhatsApp</button>
          </div>
        </div>

        {/* Reward info */}
        <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '20px 22px', marginBottom: 24 }}>
          <h2 style={{ font: '600 15px Inter', color: '#fff', margin: '0 0 14px' }}>How referral rewards work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 12 }}>
            {[['Invite', 'Share your code with friends', '#FF8000'], ['Qualify', 'They complete their first purchase', '#47C7FC'], ['Earn', '+40 Momentum + bonus credits', '#5BD08A']].map(([t, b, c]) => (
              <div key={t} style={{ background: '#15181d', borderRadius: 14, padding: '16px 16px' }}>
                <div style={{ font: '600 14px Inter', color: c, marginBottom: 6 }}>{t}</div>
                <div style={{ font: '400 12px/1.5 Inter', color: '#707070' }}>{b}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite tracker */}
        <div style={{ background: '#0a0c0f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ font: '600 15px Inter', color: '#fff', margin: 0 }}>Your invites</h2>
            <span style={{ font: '500 13px Inter', color: '#FF8000' }}>{INVITES.length} total</span>
          </div>
          {INVITES.map((inv, i) => (
            <div key={inv.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderBottom: i < INVITES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#15181d', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 14px Inter', color: '#707070', flexShrink: 0 }}>{inv.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '500 14px Inter', color: '#fff' }}>{inv.name}</div>
                <div style={{ font: '400 12px Inter', color: '#4a4f57', marginTop: 2 }}>{inv.reward}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ font: '600 12px Inter', color: inv.statusColor }}>{inv.status}</div>
                <div style={{ font: '400 11px Inter', color: '#3a3f47', marginTop: 1 }}>{inv.date}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ font: '400 11px/1.6 Inter', color: '#3a3f47', marginTop: 20 }}>
          Referral rewards are awarded when the referred member completes their first qualifying purchase. No cap on referrals.
        </p>
      </div>
    </div>
  );
}
