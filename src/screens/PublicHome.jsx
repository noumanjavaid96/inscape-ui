import { useState, useEffect } from 'react';
import tokens from '../design/tokens';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import CampaignCard from '../components/campaign/CampaignCard';

const { colors, font, radius } = tokens;

const CAMPAIGNS = [
  { title: 'Range Rover Sport', category: 'Vehicles', prize: '£92,000', timeLeft: '2d 14h', entries: '4,821', status: 'LIVE', gradient: 'linear-gradient(135deg,#1a2030,#0c1018)', glow: 'rgba(255,128,0,0.15)' },
  { title: '7 Nights, Maldives', category: 'Travel', prize: '£18,500', timeLeft: '9h 40m', entries: '2,104', status: 'CLOSING SOON', gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)', glow: 'rgba(240,180,60,0.15)' },
  { title: 'MacBook Pro M4', category: 'Tech', prize: '£3,499', timeLeft: '5d 2h', entries: '1,338', status: 'LIVE', gradient: 'linear-gradient(135deg,#141820,#0a0c10)', glow: 'rgba(71,199,252,0.15)' },
];

const STEPS = [
  { num: '01', icon: 'wallet', title: 'Get your credits', body: 'Join free and receive 3 campaign credits — no card required. Top up anytime or subscribe for monthly allocations.' },
  { num: '02', icon: 'grid', title: 'Allocate to campaigns', body: 'Browse live campaigns across travel, vehicles, tech and more. Each credit is one allocation. Stack credits to multiply your participation.' },
  { num: '03', icon: 'star', title: 'Win extraordinary prizes', body: 'Winners are drawn transparently at campaign close. Earn Momentum bonuses along the way — up to 90 bonus credits per month.' },
];

const PLANS = [
  { name: 'Entry', price: '£14.99', credits: 40, features: ['40 monthly credits', 'Campaign access', 'Momentum tracking'], highlight: false },
  { name: 'Premium', price: '£19.99', credits: 120, features: ['120 monthly credits', 'Priority campaign access', 'Momentum bonuses', 'Exclusive member offers', 'Referral rewards'], highlight: true },
  { name: 'Elite', price: '£24.99', credits: 250, features: ['250 monthly credits', 'Early campaign access', 'Max Momentum tier', 'Partner offer upgrades', 'Dedicated support'], highlight: false },
];

const STATS = [
  { value: '12,400+', label: 'Active members' },
  { value: '£2.1M', label: 'Prizes awarded' },
  { value: '340+', label: 'Campaigns run' },
  { value: '98%', label: 'Draw satisfaction' },
];

function NavBar({ onNavigate, scrolled }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 64,
      background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: `1px solid ${scrolled ? colors.borderFaint : 'transparent'}`,
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', padding: '0 clamp(20px, 5vw, 80px)',
    }}>
      <Logo size="md" showText />

      <div style={{ display: 'flex', gap: 32, marginLeft: 48, flex: 1 }} className="desktop-nav">
        {['Campaigns', 'How it works', 'Membership'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} style={{ font: `500 14px ${font.family}`, color: colors.textMuted, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = colors.text}
            onMouseLeave={e => e.target.style.color = colors.textMuted}
          >{l}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
        <button onClick={() => onNavigate('login')} style={{ font: `500 14px ${font.family}`, color: colors.textMuted, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px' }}
          onMouseEnter={e => e.target.style.color = colors.text}
          onMouseLeave={e => e.target.style.color = colors.textMuted}
        >Sign in</button>
        <Button onClick={() => onNavigate('signup')} size="md">Join free</Button>
      </div>
    </nav>
  );
}

function Eyebrow({ label, pulse = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, borderRadius: radius.full, padding: '6px 14px' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent, animation: pulse ? 'livePulse 2s ease-in-out infinite' : 'none' }} />
      <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.12em', color: colors.accent }}>{label}</span>
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
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family, overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hero-grid, .campaigns-grid, .steps-grid, .plans-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-title { font-size: clamp(42px, 11vw, 80px) !important; }
          .step-connector { display: none !important; }
        }
        @media (min-width: 769px) and (max-width: 1023px) {
          .hero-title { font-size: clamp(52px, 7vw, 80px) !important; }
          .campaigns-grid, .plans-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .step-connector { display: none !important; }
        }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 60px; }
        .campaigns-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .hero-title { font-size: clamp(52px, 5vw, 88px); }
        .section-inner { max-width: 1200px; margin: 0 auto; }
      `}</style>

      <NavBar onNavigate={onNavigate} scrolled={scrolled} />

      {/* HERO */}
      <section style={{ padding: '140px clamp(20px, 5vw, 80px) 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 60% 40%, rgba(255,128,0,0.07) 0%, transparent 65%), radial-gradient(40% 50% at 20% 80%, rgba(71,199,252,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,128,0,0.3), transparent)' }} />

        <div className="section-inner">
          <div className="hero-grid">
            <div>
              <div style={{ marginBottom: 28 }}><Eyebrow label="3 CAMPAIGNS LIVE NOW" pulse /></div>

              <h1 className="hero-title" style={{ font: `700 80px/0.93 ${font.display}`, color: colors.text, letterSpacing: '-.02em', margin: 0 }}>
                Campaign<br />Credits,<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>beautifully</em><br />allocated.
              </h1>

              <p style={{ font: `400 17px/1.7 ${font.family}`, color: colors.textMuted, marginTop: 28, maxWidth: 420 }}>
                A premium platform for campaign credit allocation. Browse extraordinary prizes, stake your credits, and win — starting with 3 free.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
                <Button onClick={() => onNavigate('signup')} size="lg">
                  Join free · get 3 credits
                  <Icon name="arrowRight" size={17} color={colors.bg} />
                </Button>
                <Button onClick={() => onNavigate('campaigns')} variant="secondary" size="lg">Browse campaigns</Button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28 }}>
                <div style={{ display: 'flex' }}>
                  {[colors.accent, colors.warning, colors.info, colors.success, colors.accent].map((c, i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: `2px solid ${colors.bg}`, marginLeft: i === 0 ? 0 : -8, opacity: 0.85 }} />
                  ))}
                </div>
                <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>Joined by <strong style={{ color: colors.textMuted }}>12,400+</strong> members</span>
              </div>
            </div>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {CAMPAIGNS.slice(0, 2).map((c, i) => (
                <div key={c.title} style={{ transform: i === 0 ? 'rotate(-1deg)' : 'rotate(0.8deg)', transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = i === 0 ? 'rotate(-1deg)' : 'rotate(0.8deg)'}
                >
                  <CampaignCard campaign={c} onClick={() => onNavigate('signup')} size="md" />
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, background: 'radial-gradient(50% 50%, rgba(255,128,0,0.15), transparent)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE CAMPAIGNS */}
      <section id="campaigns" style={{ padding: '80px clamp(20px, 5vw, 80px)', borderTop: `1px solid ${colors.borderFaint}` }}>
        <div className="section-inner">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ marginBottom: 12 }}><Eyebrow label="LIVE NOW" pulse /></div>
              <h2 style={{ font: `600 38px/1 ${font.display}`, color: colors.text, margin: 0 }}>Campaigns running now</h2>
            </div>
            <Button onClick={() => onNavigate('campaigns')} variant="ghost" size="md" style={{ border: `1px solid ${colors.accentBorder}`, color: colors.accent }}>
              View all
              <Icon name="arrowRight" size={15} color={colors.accent} />
            </Button>
          </div>
          <div className="campaigns-grid">
            {CAMPAIGNS.map(c => <CampaignCard key={c.title} campaign={c} onClick={() => onNavigate('signup')} size="md" />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '100px clamp(20px, 5vw, 80px)', background: 'radial-gradient(80% 60% at 50% 50%, rgba(255,128,0,0.04), transparent)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.accent, marginBottom: 14 }}>HOW IT WORKS</div>
            <h2 style={{ font: `600 42px/1.05 ${font.display}`, color: colors.text, margin: 0 }}>Three steps to extraordinary</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ position: 'relative' }}>
                {i < STEPS.length - 1 && (
                  <div className="step-connector" style={{ position: 'absolute', top: 34, left: 'calc(100% - 12px)', width: 'calc(100% - 24px)', height: 1, background: 'linear-gradient(90deg, rgba(255,128,0,0.4), rgba(255,128,0,0.1))', zIndex: 0 }} />
                )}
                <div style={{ background: colors.bg3, border: `1px solid ${colors.border}`, borderRadius: radius.xl, padding: '28px 26px', position: 'relative', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = colors.accentBorder; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: radius.md, background: colors.accentSoft, border: `1px solid ${colors.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={s.icon} size={26} color={colors.accent} />
                    </div>
                    <span style={{ font: `700 32px/1 ${font.display}`, color: 'rgba(255,128,0,0.2)' }}>{s.num}</span>
                  </div>
                  <h3 style={{ font: `600 18px ${font.family}`, color: colors.text, margin: '0 0 10px' }}>{s.title}</h3>
                  <p style={{ font: `400 14px/1.65 ${font.family}`, color: colors.textDim, margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '64px clamp(20px, 5vw, 80px)', borderTop: `1px solid ${colors.borderFaint}`, borderBottom: `1px solid ${colors.borderFaint}` }}>
        <div className="section-inner">
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ font: `700 40px/1 ${font.display}`, color: colors.text }}>{s.value}</div>
                <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" style={{ padding: '100px clamp(20px, 5vw, 80px)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.accent, marginBottom: 14 }}>MEMBERSHIP</div>
            <h2 style={{ font: `600 42px/1.05 ${font.display}`, color: colors.text, margin: '0 0 14px' }}>Choose your tier</h2>
            <p style={{ font: `400 16px/1.6 ${font.family}`, color: colors.textDim, maxWidth: 440, margin: '0 auto' }}>Monthly credits, Momentum bonuses, and exclusive access — scaled to your ambition.</p>
          </div>
          <div className="plans-grid">
            {PLANS.map(p => (
              <div key={p.name} style={{
                background: p.highlight ? 'linear-gradient(160deg, #1a1206, #0f0c04)' : colors.bg3,
                border: `1px solid ${p.highlight ? colors.accentBorder : colors.border}`,
                borderRadius: radius.xl, padding: '32px 28px', position: 'relative',
                boxShadow: p.highlight ? '0 0 60px rgba(255,128,0,0.12)' : 'none',
                transition: 'transform 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {p.highlight && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: colors.accent, borderRadius: 20, padding: '4px 14px', font: `700 11px ${font.family}`, color: colors.bg, letterSpacing: '.08em', whiteSpace: 'nowrap' }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ font: `600 13px ${font.family}`, color: p.highlight ? colors.accent : colors.textDim, letterSpacing: '.08em', marginBottom: 8 }}>{p.name.toUpperCase()}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ font: `700 38px/1 ${font.display}`, color: colors.text }}>{p.price}</span>
                  <span style={{ font: `400 13px ${font.family}`, color: colors.textFaint }}>/mo</span>
                </div>
                <div style={{ font: `500 13px ${font.family}`, color: colors.accent, marginBottom: 24 }}>{p.credits} credits/month</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: p.highlight ? 'rgba(255,128,0,0.15)' : colors.surfaceHover, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon name="check" size={11} color={p.highlight ? colors.accent : colors.textFaint} />
                      </span>
                      <span style={{ font: `400 13px ${font.family}`, color: p.highlight ? colors.textMuted : colors.textDim }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => onNavigate('signup')} variant={p.highlight ? 'primary' : 'secondary'} fullWidth size="md">Get started</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '80px clamp(20px, 5vw, 80px)', background: 'linear-gradient(180deg, rgba(255,128,0,0.05) 0%, transparent 100%)', borderTop: `1px solid ${colors.accentBorder}` }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}><Eyebrow label="NO CARD REQUIRED" /></div>
          <h2 style={{ font: `700 clamp(36px, 5vw, 58px)/1.05 ${font.display}`, color: colors.text, margin: '0 0 18px' }}>
            Start with 3 free credits today
          </h2>
          <p style={{ font: `400 16px/1.6 ${font.family}`, color: colors.textDim, maxWidth: 420, margin: '0 auto 36px' }}>
            Join thousands of members already allocating credits to extraordinary campaigns. No commitment required.
          </p>
          <Button onClick={() => onNavigate('signup')} size="lg" style={{ height: 58, padding: '0 44px', fontSize: 17 }}>
            Create free account
            <Icon name="arrowRight" size={18} color={colors.bg} />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${colors.borderFaint}`, padding: '40px clamp(20px, 5vw, 80px)' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <Logo size="sm" showText />
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {['Official Rules', 'Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" style={{ font: `400 13px ${font.family}`, color: colors.textGhost, textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = colors.textDim}
                  onMouseLeave={e => e.target.style.color = colors.textGhost}
                >{l}</a>
              ))}
            </div>
            <div style={{ font: `400 12px ${font.family}`, color: colors.textGhost }}>© 2026 InScape. All rights reserved.</div>
          </div>
          <div style={{ marginTop: 20, font: `400 11px/1.6 ${font.family}`, color: colors.textGhost, maxWidth: 600 }}>
            InScape is a skill-based campaign allocation platform. No purchase necessary. Open to UK residents 18+. See Official Rules for full eligibility and draw procedures.
          </div>
        </div>
      </footer>
    </div>
  );
}
