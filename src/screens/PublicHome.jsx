import { useState, useEffect } from 'react';
import tokens from '../design/tokens';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import CampaignCard from '../components/campaign/CampaignCard';
import PartnerStrip from '../components/brand/PartnerStrip';
import IntroSplash from '../components/cinematic/IntroSplash';
import VideoBackdrop from '../components/cinematic/VideoBackdrop';
import FloatingEmbers from '../components/cinematic/FloatingEmbers';
import FilmGrain from '../components/cinematic/FilmGrain';
import CursorGlow from '../components/cinematic/CursorGlow';
import AnimatedHeading from '../components/cinematic/AnimatedHeading';
import MagneticButton from '../components/cinematic/MagneticButton';
import FadeIn from '../components/cinematic/FadeIn';
import Reveal from '../components/cinematic/Reveal';

const { colors, font, radius } = tokens;

// Hero brand film + poster still. VideoBackdrop crossfades the clip into its
// own start for a seamless loop; the poster shows instantly while it buffers.
const HERO_VIDEO_SRC = 'https://res.cloudinary.com/dcjnzvmwc/video/upload/v1782565725/858109a7-79f6-4cf6-9a51-93d00db72b1d_j2jpwy.mp4';
const HERO_POSTER = 'https://res.cloudinary.com/dcjnzvmwc/image/upload/v1782565926/_Ultra-premium_dark_editorial_hero_background_202606271811_bpjhgv.jpg';

const CAMPAIGNS = [
  { title: 'Range Rover Sport', category: 'Vehicles', prize: '£92,000', timeLeft: '2d 14h', participants: '4,821', status: 'LIVE', gradient: 'linear-gradient(135deg,#1a2030,#0c1018)', glow: 'rgba(255,128,0,0.15)' },
  { title: '7 Nights, Maldives', category: 'Travel', prize: '£18,500', timeLeft: '9h 40m', participants: '2,104', status: 'CLOSING SOON', gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)', glow: 'rgba(240,180,60,0.15)' },
  { title: 'MacBook Pro M4', category: 'Tech', prize: '£3,499', timeLeft: '5d 2h', participants: '1,338', status: 'LIVE', gradient: 'linear-gradient(135deg,#141820,#0a0c10)', glow: 'rgba(71,199,252,0.15)' },
];

const STEPS = [
  { num: '01', icon: 'wallet', title: 'Get your Credits', body: 'Join free and receive 3 Campaign Credits — no card required. Top up anytime or subscribe for monthly Credits.' },
  { num: '02', icon: 'grid', title: 'Join campaigns', body: 'Browse live campaigns across travel, vehicles, tech and more. One Credit joins you to a campaign — add more to boost your participation.' },
  { num: '03', icon: 'star', title: 'Win extraordinary prizes', body: 'Winners are selected transparently at campaign close. Earn Momentum bonuses along the way — up to 90 bonus Credits per month.' },
];

const PLANS = [
  { name: 'Entry', price: '£14.99', credits: 40, features: ['40 monthly credits', 'Campaign access', 'Momentum tracking'], highlight: false },
  { name: 'Premium', price: '£19.99', credits: 120, features: ['120 monthly credits', 'Priority campaign access', 'Momentum bonuses', 'Exclusive member offers', 'Referral rewards'], highlight: true },
  { name: 'Elite', price: '£24.99', credits: 250, features: ['250 monthly credits', 'Early campaign access', 'Max Momentum tier', 'Partner offer upgrades', 'Dedicated support'], highlight: false },
];

const STATS = [
  { value: '50,000+', label: 'Active members' },
  { value: '1,200+', label: 'Live campaigns' },
  { value: '£20M+', label: 'Member value unlocked' },
  { value: '4.8/5', label: 'Member satisfaction' },
];

function NavBar({ onNavigate, scrolled }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 64,
      background: scrolled ? 'rgba(5,5,5,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: `1px solid ${scrolled ? colors.borderFaint : 'transparent'}`,
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', padding: '0 clamp(20px, 5vw, 80px)',
    }}>
      <Logo size="md" showText />

      <div style={{ display: 'flex', gap: 30, marginLeft: 48, flex: 1 }} className="desktop-nav">
        {[
          { label: 'Explore', href: '#campaigns' },
          { label: 'Live Campaigns', href: '#campaigns' },
          { label: 'Membership', href: '#membership' },
          { label: 'For Partners', href: '#how-it-works' },
          { label: 'About Us', href: '#how-it-works' },
        ].map(l => (
          <a key={l.label} href={l.href} style={{ font: `500 14px ${font.family}`, color: colors.textMuted, textDecoration: 'none', transition: 'color 0.15s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.target.style.color = colors.text}
            onMouseLeave={e => e.target.style.color = colors.textMuted}
          >{l.label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
        <button onClick={() => onNavigate('login')} style={{ font: `500 14px ${font.family}`, color: colors.textMuted, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px' }}
          onMouseEnter={e => e.target.style.color = colors.text}
          onMouseLeave={e => e.target.style.color = colors.textMuted}
        >Sign in</button>
        <Button onClick={() => onNavigate('signup')} size="md">Join Now</Button>
      </div>
    </nav>
  );
}

function Eyebrow({ label, pulse = false }) {
  return (
    <div className="liquid-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: radius.full, padding: '7px 15px' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent, animation: pulse ? 'livePulse 2s ease-in-out infinite' : 'none' }} />
      <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.12em', color: colors.text }}>{label}</span>
    </div>
  );
}

export default function PublicHome({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [introDone, setIntroDone] = useState(false);

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
          .hero-title { font-size: clamp(38px, 11vw, 60px) !important; }
          .step-connector { display: none !important; }
          .hero-tag { justify-self: start !important; margin-top: 24px; }
        }
        @media (min-width: 769px) and (max-width: 1023px) {
          .hero-title { font-size: clamp(44px, 6.4vw, 62px) !important; }
          .campaigns-grid, .plans-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .step-connector { display: none !important; }
        }
        .hero-grid { display: grid; grid-template-columns: 1.2fr 1fr; align-items: end; gap: 40px; }
        .campaigns-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .hero-title { font-size: clamp(48px, 5vw, 72px); }
        .nav-underline { position: relative; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
      `}</style>

      <IntroSplash onDone={() => setIntroDone(true)} />
      <FilmGrain />
      <CursorGlow />

      <NavBar onNavigate={onNavigate} scrolled={scrolled} />

      {/* CINEMATIC HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <VideoBackdrop src={HERO_VIDEO_SRC} poster={HERO_POSTER} />
        <FloatingEmbers />

        <div
          className="section-inner"
          style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px clamp(20px, 5vw, 80px) 72px', position: 'relative', zIndex: 10 }}
        >
          <div className="hero-grid">
            {/* Left column */}
            <div>
              <FadeIn start={introDone} delay={200} duration={900}>
                <div style={{ marginBottom: 26 }}><Eyebrow label="SAME-DAY ACCESS · UK'S LEADING MEMBERSHIP PLATFORM" pulse /></div>
              </FadeIn>

              <AnimatedHeading
                className="hero-title"
                start={introDone}
                accentWord="You"
                accentColor={colors.accent}
                lines={['More Access.', 'More Experiences.', 'More You.']}
                style={{ fontFamily: font.family, fontWeight: 800, lineHeight: 0.98, letterSpacing: '-.03em', color: colors.text }}
              />

              <FadeIn start={introDone} delay={800} duration={1000}>
                <p style={{ font: `400 18px/1.65 ${font.family}`, color: colors.textMuted, marginTop: 24, maxWidth: 460 }}>
                  Unlock premium campaigns, exclusive partner offers and unforgettable experiences — all through one membership. Start with 3 free Credits.
                </p>
              </FadeIn>

              <FadeIn start={introDone} delay={1200} duration={1000}>
                <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
                  <MagneticButton
                    onClick={() => onNavigate('campaigns')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 56, padding: '0 30px', borderRadius: radius.md, background: colors.accent, border: 'none', color: colors.bg, font: `600 16px ${font.family}`, boxShadow: tokens.shadow.glow }}
                  >
                    Explore Live Campaigns
                    <Icon name="arrowRight" size={17} color={colors.bg} />
                  </MagneticButton>
                  <MagneticButton
                    onClick={() => onNavigate('signup')}
                    className="liquid-glass"
                    style={{ height: 56, padding: '0 30px', borderRadius: radius.md, color: colors.text, font: `600 16px ${font.family}` }}
                  >
                    Become a Member
                  </MagneticButton>
                </div>
              </FadeIn>

              <FadeIn start={introDone} delay={1500} duration={900}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28 }}>
                  <div style={{ display: 'flex' }}>
                    {[colors.accent, colors.warning, colors.info, colors.success, colors.accent].map((c, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: `2px solid ${colors.bg}`, marginLeft: i === 0 ? 0 : -8, opacity: 0.85 }} />
                    ))}
                  </div>
                  <span style={{ font: `400 13px ${font.family}`, color: colors.textDim }}>Trusted by <strong style={{ color: colors.textMuted }}>50,000+</strong> members across the UK</span>
                </div>
              </FadeIn>
            </div>

            {/* Right column — glass tag */}
            <FadeIn start={introDone} delay={1400} duration={1000} className="hero-tag" style={{ justifySelf: 'end' }}>
              <div className="liquid-glass" style={{ borderRadius: radius.lg, padding: '16px 22px' }}>
                <span style={{ font: `300 clamp(18px,2vw,24px) ${font.family}`, color: colors.text, letterSpacing: '.01em' }}>
                  Premium. Exclusive. <span style={{ fontFamily: font.display, fontStyle: 'italic', color: colors.accent }}>Yours.</span>
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Scroll cue */}
          <FadeIn start={introDone} delay={1700} duration={900} style={{ position: 'absolute', left: '50%', bottom: 22, transform: 'translateX(-50%)', pointerEvents: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ font: `500 10px ${font.family}`, letterSpacing: '.2em', color: colors.textDim }}>SCROLL</span>
              <div style={{ width: 1, height: 38, background: `linear-gradient(${colors.textDim}, transparent)`, position: 'relative' }}>
                <span style={{ position: 'absolute', top: 0, left: -1.5, width: 4, height: 4, borderRadius: '50%', background: colors.accent, animation: 'scrollDot 2.2s ease-in-out infinite' }} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PARTNER STRIP */}
      <section style={{ padding: '56px clamp(20px, 5vw, 80px) 56px', borderTop: `1px solid ${colors.borderFaint}` }}>
        <div className="section-inner">
          <Reveal><PartnerStrip /></Reveal>
        </div>
      </section>

      {/* LIVE CAMPAIGNS */}
      <section id="campaigns" style={{ padding: '80px clamp(20px, 5vw, 80px)', borderTop: `1px solid ${colors.borderFaint}` }}>
        <div className="section-inner">
          <Reveal>
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
          </Reveal>
          <div className="campaigns-grid">
            {CAMPAIGNS.map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <CampaignCard campaign={c} onClick={() => onNavigate('signup')} size="md" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '100px clamp(20px, 5vw, 80px)', background: 'radial-gradient(80% 60% at 50% 50%, rgba(255,128,0,0.04), transparent)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.accent, marginBottom: 14 }}>HOW IT WORKS</div>
              <h2 style={{ font: `600 42px/1.05 ${font.display}`, color: colors.text, margin: 0 }}>Three steps to extraordinary</h2>
            </div>
          </Reveal>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 120}>
                <div style={{ position: 'relative' }}>
                  {i < STEPS.length - 1 && (
                    <div className="step-connector" style={{ position: 'absolute', top: 34, left: 'calc(100% - 12px)', width: 'calc(100% - 24px)', height: 1, background: 'linear-gradient(90deg, rgba(255,128,0,0.4), rgba(255,128,0,0.1))', zIndex: 0 }} />
                  )}
                  <div className="liquid-glass" style={{ borderRadius: radius.xl, padding: '28px 26px', position: 'relative' }}>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '64px clamp(20px, 5vw, 80px)', borderTop: `1px solid ${colors.borderFaint}`, borderBottom: `1px solid ${colors.borderFaint}` }}>
        <div className="section-inner">
          <Reveal>
            <div className="stats-grid">
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div style={{ font: `700 40px/1 ${font.display}`, color: colors.text }}>{s.value}</div>
                  <div style={{ font: `400 13px ${font.family}`, color: colors.textDim, marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" style={{ padding: '100px clamp(20px, 5vw, 80px)' }}>
        <div className="section-inner">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: colors.accent, marginBottom: 14 }}>MEMBERSHIP</div>
              <h2 style={{ font: `600 42px/1.05 ${font.display}`, color: colors.text, margin: '0 0 14px' }}>Choose your tier</h2>
              <p style={{ font: `400 16px/1.6 ${font.family}`, color: colors.textDim, maxWidth: 440, margin: '0 auto' }}>Monthly credits, Momentum bonuses, and exclusive access — scaled to your ambition.</p>
            </div>
          </Reveal>
          <div className="plans-grid">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <div className="liquid-glass" style={{
                  background: p.highlight ? 'linear-gradient(160deg, rgba(26,18,6,0.7), rgba(10,10,12,0.6))' : undefined,
                  border: p.highlight ? `1px solid ${colors.accentBorder}` : undefined,
                  borderRadius: radius.xl, padding: '32px 28px', position: 'relative',
                  boxShadow: p.highlight ? '0 0 60px rgba(255,128,0,0.12)' : undefined,
                }}>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '80px clamp(20px, 5vw, 80px)', background: 'linear-gradient(180deg, rgba(255,128,0,0.05) 0%, transparent 100%)', borderTop: `1px solid ${colors.accentBorder}` }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <Reveal>
            <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}><Eyebrow label="NO CARD REQUIRED" /></div>
            <h2 style={{ font: `700 clamp(36px, 5vw, 58px)/1.05 ${font.display}`, color: colors.text, margin: '0 0 18px' }}>
              Start with 3 free Credits today
            </h2>
            <p style={{ font: `400 16px/1.6 ${font.family}`, color: colors.textDim, maxWidth: 420, margin: '0 auto 36px' }}>
              Join thousands of members already taking part in extraordinary campaigns. No commitment required.
            </p>
            <MagneticButton
              onClick={() => onNavigate('signup')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 58, padding: '0 44px', borderRadius: radius.lg, background: colors.accent, border: 'none', color: colors.bg, font: `600 17px ${font.family}`, boxShadow: tokens.shadow.glowStrong }}
            >
              Create free account
              <Icon name="arrowRight" size={18} color={colors.bg} />
            </MagneticButton>
          </Reveal>
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
            InScape is a skill-based membership platform. No purchase necessary. Open to UK residents 18+. See Official Rules for full eligibility and selection procedures.
          </div>
        </div>
      </footer>
    </div>
  );
}
