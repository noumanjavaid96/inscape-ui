import { useState, useEffect } from 'react';

const CAMPAIGNS = [
  {
    title: 'Range Rover Sport',
    category: 'Vehicles',
    prize: '£92,000',
    closes: '2d 14h',
    entries: '4,821',
    credits: 1,
    status: 'LIVE',
    gradient: 'linear-gradient(135deg, #1a2030 0%, #0c1018 100%)',
    accent: '#FF8000',
    glow: 'rgba(255,128,0,0.15)',
  },
  {
    title: '7 Nights, Maldives',
    category: 'Travel',
    prize: '£18,500',
    closes: '9h 40m',
    entries: '2,104',
    credits: 1,
    status: 'CLOSING SOON',
    gradient: 'linear-gradient(135deg, #1a1e28 0%, #0c0e18 100%)',
    accent: '#F0B43C',
    glow: 'rgba(240,180,60,0.15)',
  },
  {
    title: 'MacBook Pro M4',
    category: 'Tech',
    prize: '£3,499',
    closes: '5d 2h',
    entries: '1,338',
    credits: 1,
    status: 'LIVE',
    gradient: 'linear-gradient(135deg, #141820 0%, #0a0c10 100%)',
    accent: '#47C7FC',
    glow: 'rgba(71,199,252,0.15)',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Get your credits',
    body: 'Join free and receive 3 campaign credits — no card required. Top up anytime or subscribe for monthly allocations.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#FF8000" strokeWidth="1.5"/>
        <path d="M9 12l2 2 4-4" stroke="#FF8000" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Allocate to campaigns',
    body: 'Browse live campaigns across travel, vehicles, tech and more. Each credit = one allocation. Stack credits to multiply your participation.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#FF8000" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#FF8000" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#FF8000" strokeWidth="1.5"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="#FF8000" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Win extraordinary prizes',
    body: 'Winners are drawn transparently at campaign close. Earn Momentum bonuses along the way — up to 90 bonus credits per month.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52 6.38 18.5l2.09-6.26L3 8.26h6.91L12 2Z" stroke="#FF8000" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const PLANS = [
  {
    name: 'Entry',
    price: '£14.99',
    credits: 40,
    features: ['40 monthly credits', 'Campaign access', 'Momentum tracking'],
    highlight: false,
  },
  {
    name: 'Premium',
    price: '£19.99',
    credits: 120,
    features: ['120 monthly credits', 'Priority campaign access', 'Momentum bonuses', 'Exclusive member offers', 'Referral rewards'],
    highlight: true,
  },
  {
    name: 'Elite',
    price: '£24.99',
    credits: 250,
    features: ['250 monthly credits', 'Early campaign access', 'Max Momentum tier', 'Partner offer upgrades', 'Dedicated support'],
    highlight: false,
  },
];

const STATS = [
  { value: '12,400+', label: 'Active members' },
  { value: '£2.1M', label: 'Prizes awarded' },
  { value: '340+', label: 'Campaigns run' },
  { value: '98%', label: 'Draw satisfaction' },
];

function NavBar({ onNavigate, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 64,
      background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center',
      padding: '0 clamp(20px, 5vw, 80px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#FF8000,#cc6600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ font: "700 13px/1 'Cormorant Garamond',serif", color: '#fff' }}>I</span>
        </div>
        <span style={{ font: "600 22px/1 'Cormorant Garamond',serif", color: '#fff' }}>InScape</span>
      </div>

      {/* Desktop nav links */}
      <div style={{ display: 'flex', gap: 32, marginLeft: 48, flex: 1 }} className="desktop-nav">
        {['Campaigns', 'How it works', 'Membership'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} style={{ font: '500 14px Inter', color: '#A3A3A3', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#A3A3A3'}
          >{l}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
        <button onClick={() => onNavigate('login')} style={{ font: '500 14px Inter', color: '#A3A3A3', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px' }}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = '#A3A3A3'}
        >Sign in</button>
        <button onClick={() => onNavigate('signup')} style={{
          font: '600 14px Inter', color: '#050505',
          background: '#FF8000', border: 'none', cursor: 'pointer',
          padding: '10px 20px', borderRadius: 10,
          boxShadow: '0 4px 16px rgba(255,128,0,0.35)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(255,128,0,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,128,0,0.35)'; }}
        >Join free →</button>
      </div>
    </nav>
  );
}

function CampaignCard({ c, index }) {
  return (
    <div style={{
      background: c.gradient,
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      overflow: 'hidden',
      position: 'relative',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 48px ${c.glow}`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Image placeholder */}
      <div style={{ height: 160, background: `radial-gradient(80% 80% at 30% 30%, ${c.glow.replace('0.15', '0.3')}, transparent)`, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(5,5,5,0.7)', border: `1px solid ${c.accent}50`, borderRadius: 8, padding: '4px 10px' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.accent, animation: c.status === 'LIVE' ? 'livePulse 2s ease-in-out infinite' : 'none' }} />
          <span style={{ font: '600 10px Inter', color: c.accent, letterSpacing: '.08em' }}>{c.status}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 12, font: '500 11px Inter', color: '#A3A3A3', background: 'rgba(5,5,5,0.6)', borderRadius: 7, padding: '3px 8px' }}>
          {c.closes} left
        </div>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ font: '500 11px Inter', color: '#707070', letterSpacing: '.04em' }}>{c.category} · {c.prize}</div>
        <div style={{ font: "700 22px/1.1 'Cormorant Garamond',serif", color: '#fff', marginTop: 4 }}>{c.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ font: '500 12px Inter', color: '#707070' }}>{c.entries} entries</div>
          <div style={{ font: '600 12px Inter', color: c.accent }}>{c.credits} cr/entry</div>
        </div>
      </div>
    </div>
  );
}

export default function PublicHome({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hero-grid { grid-template-columns: 1fr !important; } .campaigns-grid { grid-template-columns: 1fr !important; } .steps-grid { grid-template-columns: 1fr !important; } .plans-grid { grid-template-columns: 1fr !important; } .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } .hero-title { font-size: clamp(42px, 10vw, 80px) !important; } }
        @media (min-width: 769px) and (max-width: 1023px) { .hero-title { font-size: clamp(52px, 7vw, 80px) !important; } .campaigns-grid { grid-template-columns: repeat(2, 1fr) !important; } .plans-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 60px; }
        .campaigns-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .hero-title { font-size: clamp(52px, 5vw, 88px); }
        section { padding: 100px clamp(20px, 5vw, 80px); }
        .section-inner { max-width: 1200px; margin: 0 auto; }
      `}</style>

      <NavBar onNavigate={onNavigate} scrolled={scrolled} />

      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 100, padding: '140px clamp(20px, 5vw, 80px) 100px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient backdrop */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 60% 40%, rgba(255,128,0,0.07) 0%, transparent 65%), radial-gradient(40% 50% at 20% 80%, rgba(71,199,252,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,128,0,0.3), transparent)' }} />

        <div className="section-inner">
          <div className="hero-grid">
            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,128,0,0.1)', border: '1px solid rgba(255,128,0,0.35)', borderRadius: 20, padding: '6px 14px', marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF8000', animation: 'livePulse 2s ease-in-out infinite' }} />
                <span style={{ font: '600 12px Inter', letterSpacing: '.1em', color: '#FF8000' }}>3 CAMPAIGNS LIVE NOW</span>
              </div>

              <h1 className="hero-title" style={{ font: "700 80px/0.93 'Cormorant Garamond',serif", color: '#fff', letterSpacing: '-.02em', margin: 0 }}>
                Campaign<br />Credits,<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>beautifully</em><br />allocated.
              </h1>

              <p style={{ font: '400 17px/1.7 Inter', color: '#A3A3A3', marginTop: 28, maxWidth: 420 }}>
                A premium platform for campaign credit allocation. Browse extraordinary prizes, stake your credits, and win — starting with 3 free.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('signup')} style={{
                  height: 54, padding: '0 32px', borderRadius: 14,
                  background: '#FF8000', border: 'none', cursor: 'pointer',
                  font: '600 16px Inter', color: '#050505',
                  boxShadow: '0 10px 32px rgba(255,128,0,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(255,128,0,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(255,128,0,0.35)'; }}
                >Join free · get 3 credits</button>
                <button onClick={() => onNavigate('campaigns')} style={{
                  height: 54, padding: '0 28px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer', font: '600 16px Inter', color: '#fff',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >Browse campaigns</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28 }}>
                <div style={{ display: 'flex' }}>
                  {['#FF8000', '#F0B43C', '#47C7FC', '#5BD08A', '#FF8000'].map((c, i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid #050505', marginLeft: i === 0 ? 0 : -8, opacity: 0.85 }} />
                  ))}
                </div>
                <span style={{ font: '400 13px Inter', color: '#707070' }}>Joined by <strong style={{ color: '#A3A3A3' }}>12,400+</strong> members</span>
              </div>
            </div>

            {/* Right: campaign cards floating */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {CAMPAIGNS.slice(0, 2).map((c, i) => (
                <div key={c.title} style={{
                  transform: i === 0 ? 'rotate(-1deg)' : 'rotate(0.8deg)',
                  transition: 'transform 0.3s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = i === 0 ? 'rotate(-1deg)' : 'rotate(0.8deg)'}
                >
                  <CampaignCard c={c} index={i} />
                </div>
              ))}
              {/* Glow behind cards */}
              <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, background: 'radial-gradient(50% 50%, rgba(255,128,0,0.15), transparent)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE CAMPAIGNS ── */}
      <section id="campaigns" style={{ padding: '80px clamp(20px, 5vw, 80px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF8000', animation: 'livePulse 2s ease-in-out infinite' }} />
                <span style={{ font: '600 11px Inter', letterSpacing: '.14em', color: '#FF8000' }}>LIVE NOW</span>
              </div>
              <h2 style={{ font: "600 38px/1 'Cormorant Garamond',serif", color: '#fff', margin: 0 }}>Campaigns running now</h2>
            </div>
            <button onClick={() => onNavigate('campaigns')} style={{ font: '500 14px Inter', color: '#FF8000', background: 'none', border: '1px solid rgba(255,128,0,0.3)', borderRadius: 10, padding: '10px 18px', cursor: 'pointer' }}>
              View all →
            </button>
          </div>
          <div className="campaigns-grid">
            {CAMPAIGNS.map((c, i) => <CampaignCard key={c.title} c={c} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px clamp(20px, 5vw, 80px)', background: 'radial-gradient(80% 60% at 50% 50%, rgba(255,128,0,0.04), transparent)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ font: '600 11px Inter', letterSpacing: '.14em', color: '#FF8000', marginBottom: 14 }}>HOW IT WORKS</div>
            <h2 style={{ font: "600 42px/1.05 'Cormorant Garamond',serif", color: '#fff', margin: 0 }}>Three steps to extraordinary</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ position: 'relative' }}>
                {/* Connector line on desktop */}
                {i < STEPS.length - 1 && (
                  <div style={{ position: 'absolute', top: 34, left: 'calc(100% - 12px)', width: 'calc(100% - 24px)', height: 1, background: 'linear-gradient(90deg, rgba(255,128,0,0.4), rgba(255,128,0,0.1))', zIndex: 0 }} className="step-connector" />
                )}
                <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 26px', position: 'relative', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,128,0,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,128,0,0.08)', border: '1px solid rgba(255,128,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {s.icon}
                    </div>
                    <span style={{ font: "700 32px/1 'Cormorant Garamond',serif", color: 'rgba(255,128,0,0.2)' }}>{s.num}</span>
                  </div>
                  <h3 style={{ font: '600 18px Inter', color: '#fff', margin: '0 0 10px' }}>{s.title}</h3>
                  <p style={{ font: '400 14px/1.65 Inter', color: '#707070', margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ padding: '64px clamp(20px, 5vw, 80px)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-inner">
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ font: "700 40px/1 'Cormorant Garamond',serif", color: '#fff' }}>{s.value}</div>
                <div style={{ font: '400 13px Inter', color: '#707070', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ── */}
      <section id="membership" style={{ padding: '100px clamp(20px, 5vw, 80px)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ font: '600 11px Inter', letterSpacing: '.14em', color: '#FF8000', marginBottom: 14 }}>MEMBERSHIP</div>
            <h2 style={{ font: "600 42px/1.05 'Cormorant Garamond',serif", color: '#fff', margin: '0 0 14px' }}>Choose your tier</h2>
            <p style={{ font: '400 16px/1.6 Inter', color: '#707070', maxWidth: 440, margin: '0 auto' }}>Monthly credits, Momentum bonuses, and exclusive access — scaled to your ambition.</p>
          </div>
          <div className="plans-grid">
            {PLANS.map(p => (
              <div key={p.name} style={{
                background: p.highlight ? 'linear-gradient(160deg, #1a1206, #0f0c04)' : '#0d0f12',
                border: p.highlight ? '1px solid rgba(255,128,0,0.4)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 22, padding: '32px 28px', position: 'relative',
                boxShadow: p.highlight ? '0 0 60px rgba(255,128,0,0.12)' : 'none',
                transition: 'transform 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {p.highlight && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#FF8000', borderRadius: 20, padding: '4px 14px', font: '700 11px Inter', color: '#050505', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ font: '600 13px Inter', color: p.highlight ? '#FF8000' : '#707070', letterSpacing: '.08em', marginBottom: 8 }}>{p.name.toUpperCase()}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ font: "700 38px/1 'Cormorant Garamond',serif", color: '#fff' }}>{p.price}</span>
                  <span style={{ font: '400 13px Inter', color: '#4a4f57' }}>/mo</span>
                </div>
                <div style={{ font: '500 13px Inter', color: '#FF8000', marginBottom: 24 }}>{p.credits} credits/month</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill={p.highlight ? 'rgba(255,128,0,0.15)' : 'rgba(255,255,255,0.05)'}/><path d="M8 12l3 3 5-5" stroke={p.highlight ? '#FF8000' : '#4a4f57'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ font: '400 13px Inter', color: p.highlight ? '#A3A3A3' : '#707070' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('signup')} style={{
                  width: '100%', height: 48, borderRadius: 13,
                  background: p.highlight ? '#FF8000' : 'rgba(255,255,255,0.06)',
                  border: p.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer', font: '600 14px Inter',
                  color: p.highlight ? '#050505' : '#fff',
                  boxShadow: p.highlight ? '0 8px 24px rgba(255,128,0,0.3)' : 'none',
                }}>Get started →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '80px clamp(20px, 5vw, 80px)', background: 'linear-gradient(180deg, rgba(255,128,0,0.05) 0%, transparent 100%)', borderTop: '1px solid rgba(255,128,0,0.12)' }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,128,0,0.1)', border: '1px solid rgba(255,128,0,0.3)', borderRadius: 20, padding: '6px 14px', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF8000' }} />
            <span style={{ font: '600 11px Inter', letterSpacing: '.1em', color: '#FF8000' }}>NO CARD REQUIRED</span>
          </div>
          <h2 style={{ font: "700 clamp(36px, 5vw, 58px)/1.05 'Cormorant Garamond',serif", color: '#fff', margin: '0 0 18px' }}>
            Start with 3 free credits today
          </h2>
          <p style={{ font: '400 16px/1.6 Inter', color: '#707070', maxWidth: 420, margin: '0 auto 36px' }}>
            Join thousands of members already allocating credits to extraordinary campaigns. No commitment required.
          </p>
          <button onClick={() => onNavigate('signup')} style={{
            height: 58, padding: '0 44px', borderRadius: 16,
            background: '#FF8000', border: 'none', cursor: 'pointer',
            font: '600 17px Inter', color: '#050505',
            boxShadow: '0 12px 36px rgba(255,128,0,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 44px rgba(255,128,0,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(255,128,0,0.4)'; }}
          >
            Create free account →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px clamp(20px, 5vw, 80px)' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#FF8000,#cc6600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ font: "700 11px/1 'Cormorant Garamond',serif", color: '#fff' }}>I</span>
              </div>
              <span style={{ font: "600 18px/1 'Cormorant Garamond',serif", color: '#fff' }}>InScape</span>
            </div>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {['Official Rules', 'Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" style={{ font: '400 13px Inter', color: '#4a4f57', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = '#707070'}
                  onMouseLeave={e => e.target.style.color = '#4a4f57'}
                >{l}</a>
              ))}
            </div>
            <div style={{ font: '400 12px Inter', color: '#2e3340' }}>© 2026 InScape. All rights reserved.</div>
          </div>
          <div style={{ marginTop: 20, font: '400 11px/1.6 Inter', color: '#2e3340', maxWidth: 600 }}>
            InScape is a skill-based campaign allocation platform. No purchase necessary. Open to UK residents 18+. See Official Rules for full eligibility and draw procedures.
          </div>
        </div>
      </footer>
    </div>
  );
}
