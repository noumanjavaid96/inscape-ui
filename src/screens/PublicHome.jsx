import { useState, useEffect } from 'react';
import tokens from '../design/tokens';
import Logo from '../components/ui/Logo';
import Icon from '../components/ui/Icon';
import IntroSplash from '../components/cinematic/IntroSplash';
import FadeIn from '../components/cinematic/FadeIn';
import Reveal from '../components/cinematic/Reveal';
import AnimatedHeading from '../components/cinematic/AnimatedHeading';
import MagneticButton from '../components/cinematic/MagneticButton';
import { useCountdown } from '../hooks/useCountdown';
import { CAMPAIGNS, PAST_WINNERS, CATEGORIES } from '../data/campaigns';
import { PARTNER_OFFERS } from '../data/offers';

const { colors, font, light } = tokens;

const PAD = 'clamp(20px, 5vw, 80px)';
const FEATURED = CAMPAIGNS[0];
const WINNERS = PAST_WINNERS.slice(0, 3);
const OFFERS = PARTNER_OFFERS.slice(0, 6);

// Ultra-premium dark editorial still — applied as a CSS background layer (not an
// <img>/<video>) and dissolved into the page so it reads as ambient depth rather
// than a discrete, framed image.
const HERO_IMAGE = 'https://res.cloudinary.com/dcjnzvmwc/image/upload/v1782565926/_Ultra-premium_dark_editorial_hero_background_202606271811_bpjhgv.jpg';

// The core message: one membership, three concrete benefits.
const BENEFITS = [
  { icon: 'star', title: 'Premium prize campaigns', body: 'Join live campaigns for luxury cars, travel, tech and tax-free cash — using Credits, from just one per campaign.' },
  { icon: 'gift', title: 'Exclusive partner offers', body: 'Unlock members-only pricing from leading brands across travel, tech, fashion and lifestyle — real savings every month.' },
  { icon: 'sparkle', title: 'Rewards that compound', body: 'Monthly Credits, Momentum bonuses, referral rewards and early access — member value that grows the longer you stay.' },
];

const STEPS = [
  { num: '01', icon: 'wallet', title: 'Get your Credits', body: 'Join free and receive three Campaign Credits — no card required. Top up anytime, or subscribe for monthly Credits.' },
  { num: '02', icon: 'grid', title: 'Join the campaigns you love', body: 'Browse live campaigns across travel, vehicles, tech and more. One Credit joins you — add more to grow your participation.' },
  { num: '03', icon: 'trophy', title: 'Win extraordinary prizes', body: 'Winners are drawn transparently at campaign close. Earn Momentum bonuses along the way — up to 90 Credits a month.' },
];

const PLANS = [
  { name: 'Entry', price: '$14.99', credits: 40, features: ['40 monthly Credits', 'Full campaign access', 'Momentum tracking'], highlight: false },
  { name: 'Premium', price: '$19.99', credits: 120, features: ['120 monthly Credits', 'Priority campaign access', 'Momentum bonuses', 'Exclusive member offers', 'Referral rewards'], highlight: true },
  { name: 'Elite', price: '$24.99', credits: 250, features: ['250 monthly Credits', 'Early campaign access', 'Maximum Momentum tier', 'Partner offer upgrades', 'Dedicated support'], highlight: false },
];

const STATS = [
  { value: '50,000+', label: 'Active members' },
  { value: '1,200+', label: 'Campaigns run' },
  { value: '$20M+', label: 'Member value unlocked' },
  { value: '4.8/5', label: 'Member satisfaction' },
];

const lightGlass = {
  background: light.glass,
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: `1px solid ${light.glassBorder}`,
  boxShadow: light.floatShadow,
};

/* ---------- small shared pieces ---------- */

function Eyebrow({ label, dark = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999,
      padding: '7px 14px',
      background: dark ? 'rgba(255,255,255,0.06)' : light.soft,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : light.line}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }} />
      <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.14em', color: dark ? 'rgba(255,255,255,0.78)' : light.body }}>{label}</span>
    </span>
  );
}

function PrimaryCTA({ children, onClick, size = 'lg', style }) {
  const h = size === 'lg' ? 56 : 48;
  return (
    <MagneticButton
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
        height: h, padding: '0 30px', borderRadius: 14,
        background: colors.accent, border: 'none', color: '#1c1003',
        font: `600 ${size === 'lg' ? 16 : 15}px ${font.family}`,
        boxShadow: '0 14px 30px rgba(255,128,0,0.30)',
        ...style,
      }}
    >
      {children}
    </MagneticButton>
  );
}

function GhostCTA({ children, onClick, size = 'lg', dark = false, style }) {
  const [hover, setHover] = useState(false);
  const h = size === 'lg' ? 56 : 48;
  const border = dark ? 'rgba(255,255,255,0.28)' : light.line;
  const color = dark ? '#ffffff' : light.ink;
  const hoverBg = dark ? 'rgba(255,255,255,0.10)' : light.soft;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        height: h, padding: '0 26px', borderRadius: 14,
        background: hover ? hoverBg : 'transparent',
        border: `1px solid ${border}`, color,
        font: `600 ${size === 'lg' ? 16 : 15}px ${font.family}`, cursor: 'pointer',
        transition: 'all 0.2s ease', ...style,
      }}
    >
      {children}
    </button>
  );
}

function closesLabel(t) {
  if (t.done) return 'Closing now';
  if (t.days > 0) return `${t.days}d ${t.hours}h left`;
  if (t.hours > 0) return `${t.hours}h ${t.minutes}m left`;
  return `${t.minutes}m ${t.seconds}s left`;
}

function MiniCountdown({ target }) {
  const t = useCountdown(target);
  const items = [['Days', t.days], ['Hrs', t.hours], ['Min', t.minutes]];
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {items.map(([l, v]) => (
        <div key={l} style={{ minWidth: 42, textAlign: 'center', background: light.soft, borderRadius: 10, padding: '7px 8px' }}>
          <div style={{ font: `700 18px/1 ${font.family}`, color: light.ink }}>{String(v).padStart(2, '0')}</div>
          <div style={{ font: `600 8.5px ${font.family}`, letterSpacing: '.12em', color: light.dim, marginTop: 4 }}>{l.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- campaign card (light, Airbnb-grade) ---------- */

function CampaignCardLight({ c, onClick }) {
  const [hover, setHover] = useState(false);
  const t = useCountdown(c.closesAt);
  const upcoming = c.status === 'UPCOMING';
  const statusTone = c.status === 'CLOSING SOON' ? colors.warning : upcoming ? colors.info : colors.accent;

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: light.panel, border: `1px solid ${light.line}`, borderRadius: 22,
        overflow: 'hidden', cursor: 'pointer',
        boxShadow: hover ? light.cardShadowHover : light.cardShadow,
        transform: hover ? 'translateY(-5px)' : 'none',
        transition: 'transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s ease',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '3 / 2', overflow: 'hidden', background: c.gradient }}>
        {c.image && (
          <img
            src={c.image} alt={c.title} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1)' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.92)', borderRadius: 999, padding: '5px 11px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusTone }} />
          <span style={{ font: `700 10px ${font.family}`, letterSpacing: '.08em', color: light.ink }}>{c.status}</span>
        </div>
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(20,17,12,0.78)', backdropFilter: 'blur(6px)', borderRadius: 999, padding: '5px 11px', font: `600 11px ${font.family}`, color: '#fff' }}>
          {c.cost} {c.cost === 1 ? 'Credit' : 'Credits'}
        </div>
      </div>

      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: light.dim }}>{c.category}</div>
        <h3 style={{ font: `600 24px/1.1 ${font.display}`, color: light.ink, margin: '4px 0 0' }}>{c.title}</h3>
        <div style={{ font: `400 13px ${font.family}`, color: light.body, marginTop: 5 }}>
          Worth <strong style={{ color: light.ink, fontWeight: 600 }}>{c.prize}</strong>
        </div>

        {upcoming ? (
          <div style={{ marginTop: 18, font: `500 12.5px ${font.family}`, color: colors.info }}>{c.startsIn || 'Opening soon'}</div>
        ) : (
          <div style={{ marginTop: 18 }}>
            <div style={{ height: 5, borderRadius: 3, background: light.soft, overflow: 'hidden' }}>
              <div style={{ width: `${c.sold}%`, height: '100%', background: colors.accent, borderRadius: 3 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, font: `500 11.5px ${font.family}` }}>
              <span style={{ color: light.ink }}>{c.sold}% allocated</span>
              <span style={{ color: light.dim }}>{c.participants} joined</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 16, borderTop: `1px solid ${light.lineSoft}` }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `500 12px ${font.family}`, color: light.dim }}>
            <Icon name="clock" size={14} color={light.dim} />
            {upcoming ? c.drawDate : closesLabel(t)}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `600 13px ${font.family}`, color: colors.accent }}>
            Join <Icon name="arrowRight" size={14} color={colors.accent} />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ---------- partner offer card (light, Rakuten clarity) ---------- */

function OfferCardLight({ o }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: light.panel, border: `1px solid ${light.line}`, borderRadius: 18,
        padding: '22px 22px 20px', display: 'flex', flexDirection: 'column', gap: 14,
        boxShadow: hover ? light.cardShadow : 'none',
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: light.charcoal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={`/brand/partners/${o.slug}.png`} alt={o.brand} style={{ maxWidth: 32, maxHeight: 20, width: 'auto', height: 'auto' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
        <span style={{ font: `600 10px ${font.family}`, letterSpacing: '.08em', color: light.dim, textTransform: 'uppercase' }}>{o.category}</span>
      </div>
      <div>
        <div style={{ font: `600 15px ${font.family}`, color: light.ink }}>{o.brand}</div>
        <div style={{ font: `700 22px ${font.family}`, color: colors.accent, marginTop: 2 }}>{o.offer}</div>
      </div>
      <p style={{ font: `400 13px/1.55 ${font.family}`, color: light.body, margin: 0, flex: 1 }}>{o.detail}</p>
      <span style={{ alignSelf: 'flex-start', font: `500 11px ${font.family}`, color: light.dim, background: light.soft, borderRadius: 999, padding: '4px 10px' }}>{o.type}</span>
    </div>
  );
}

/* ---------- winner card (light, proof) ---------- */

function WinnerCardLight({ w, idx }) {
  return (
    <div style={{ background: light.panel, border: `1px solid ${light.line}`, borderRadius: 20, overflow: 'hidden', boxShadow: light.cardShadow }}>
      <div style={{ position: 'relative', height: 168, background: w.gradient, overflow: 'hidden' }}>
        {w.image && <img src={w.image} alt={w.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
        <span style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', borderRadius: 999, padding: '5px 11px', font: `700 10px ${font.family}`, letterSpacing: '.08em', color: '#1f8a4c' }}>
          <Icon name="trophy" size={12} color="#1f8a4c" /> WINNER
        </span>
      </div>
      <div style={{ padding: '16px 20px 18px' }}>
        <div style={{ font: `400 11px ${font.family}`, color: light.dim }}>{w.category} · {w.prize}</div>
        <div style={{ font: `600 21px/1.1 ${font.display}`, color: light.ink, marginTop: 3 }}>{w.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${light.lineSoft}` }}>
          <img
            src={`https://i.pravatar.cc/56?img=${idx * 13 + 9}`} alt=""
            style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', background: light.soft }}
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          />
          <span style={{ font: `500 13px ${font.family}`, color: light.body }}>
            Won by <span style={{ color: light.ink }}>{w.winner}</span> · {w.location}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- nav ---------- */

function NavBar({ onNavigate, scrolled }) {
  const linkColor = scrolled ? light.body : 'rgba(255,255,255,0.82)';
  const linkHover = scrolled ? light.ink : '#ffffff';
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: 66,
      background: scrolled ? 'rgba(255,255,255,0.86)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: `1px solid ${scrolled ? light.line : 'transparent'}`,
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', padding: `0 ${PAD}`,
    }}>
      <Logo size="md" showText variant={scrolled ? 'charcoal' : 'light'} />

      <div style={{ display: 'flex', gap: 30, marginLeft: 46, flex: 1 }} className="desktop-nav">
        {[
          { label: 'Live Campaigns', href: '#campaigns' },
          { label: 'Membership', href: '#membership' },
          { label: 'Partner Offers', href: '#offers' },
          { label: 'Winners', href: '#winners' },
          { label: 'How It Works', href: '#how' },
        ].map(l => (
          <a key={l.label} href={l.href} style={{ font: `500 14px ${font.family}`, color: linkColor, textDecoration: 'none', transition: 'color 0.15s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.color = linkHover}
            onMouseLeave={e => e.currentTarget.style.color = linkColor}
          >{l.label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        <button onClick={() => onNavigate('login')} style={{ font: `500 14px ${font.family}`, color: linkColor, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px' }}
          onMouseEnter={e => e.currentTarget.style.color = linkHover}
          onMouseLeave={e => e.currentTarget.style.color = linkColor}
        >Sign in</button>
        <PrimaryCTA onClick={() => onNavigate('signup')} size="md" style={{ borderRadius: 999, padding: '0 22px' }}>Join now</PrimaryCTA>
      </div>
    </nav>
  );
}

/* ---------- page ---------- */

export default function PublicHome({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const shown = cat === 'All' ? CAMPAIGNS : CAMPAIGNS.filter(c => c.category === cat);

  return (
    <div style={{ background: light.page, minHeight: '100vh', fontFamily: font.family, color: light.ink, overflowX: 'hidden' }}>
      <style>{`
        .lp-inner { max-width: 1200px; margin: 0 auto; width: 100%; }
        .lp-hero { display: grid; grid-template-columns: 1.04fr 0.96fr; gap: 56px; align-items: center; }
        .lp-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .lp-offers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .lp-bd { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .lp-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .lp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .lp-h1 { font-size: clamp(46px, 6vw, 86px); }
        @media (max-width: 1023px) {
          .lp-cards, .lp-offers, .lp-bd, .lp-plans { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .lp-hero, .lp-cards, .lp-offers, .lp-bd, .lp-plans { grid-template-columns: 1fr !important; }
          .lp-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-h1 { font-size: clamp(40px, 12vw, 60px) !important; }
          .hero-visual { height: 380px !important; }
        }
      `}</style>

      <IntroSplash onDone={() => setIntroDone(true)} hold={1500} lift={700} />
      <NavBar onNavigate={onNavigate} scrolled={scrolled} />

      {/* HERO — light editorial */}
      <section style={{
        position: 'relative', minHeight: '94vh', display: 'flex', alignItems: 'center',
        padding: `120px ${PAD} 150px`, overflow: 'hidden',
        backgroundColor: '#0a0a0c',
        backgroundImage: `linear-gradient(103deg, rgba(8,8,11,0.92) 0%, rgba(8,8,11,0.64) 46%, rgba(8,8,11,0.44) 78%, rgba(8,8,11,0.42) 100%), linear-gradient(180deg, rgba(8,8,11,0.26) 0%, rgba(8,8,11,0.08) 38%, rgba(8,8,11,0.70) 90%, rgba(8,8,11,0.90) 100%), url(${HERO_IMAGE})`,
        backgroundSize: 'cover, cover, cover',
        backgroundPosition: 'center, center, center 28%',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* tight dissolve into the white section below — kept short so it reads as a clean edge, not a grey wash */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 130, zIndex: 1, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 72%, #FFFFFF 100%)', pointerEvents: 'none' }} />
        <div className="lp-inner lp-hero" style={{ position: 'relative', zIndex: 2 }}>
          {/* left */}
          <div>
            <FadeIn start={introDone} delay={150} duration={800}>
              <Eyebrow label="USA'S PREMIER MEMBERSHIP PLATFORM" dark />
            </FadeIn>

            <AnimatedHeading
              className="lp-h1"
              start={introDone}
              accentWord="you"
              accentColor={colors.accent}
              lines={['More access.', 'More experiences.', 'More you.']}
              style={{ fontFamily: font.family, fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.035em', color: '#fff', margin: '22px 0 0' }}
            />

            <FadeIn start={introDone} delay={850} duration={900}>
              <p style={{ font: `400 18px/1.65 ${font.family}`, color: 'rgba(255,255,255,0.74)', margin: '22px 0 0', maxWidth: 480 }}>
                One membership unlocks luxury prize campaigns, members-only offers from leading brands, and rewards that compound every month — from <strong style={{ color: '#fff', fontWeight: 600 }}>$14.99/mo</strong>, or start free with 3 Credits.
              </p>
            </FadeIn>

            <FadeIn start={introDone} delay={1050} duration={900}>
              <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
                <PrimaryCTA onClick={() => onNavigate('signup')}>
                  Become a member <Icon name="arrowRight" size={17} color="#1c1003" />
                </PrimaryCTA>
                <GhostCTA dark onClick={() => onNavigate('campaigns')}>Browse live campaigns</GhostCTA>
              </div>
            </FadeIn>

            <FadeIn start={introDone} delay={1300} duration={900}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 30 }}>
                <div style={{ display: 'flex' }}>
                  {[12, 32, 45, 5, 23].map((n, i) => (
                    <img key={n} src={`https://i.pravatar.cc/64?img=${n}`} alt=""
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.25)', marginLeft: i === 0 ? 0 : -11, background: 'rgba(255,255,255,0.1)' }}
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                  ))}
                </div>
                <span style={{ font: `400 13px ${font.family}`, color: 'rgba(255,255,255,0.66)' }}>Joined by <strong style={{ color: '#fff', fontWeight: 600 }}>50,000+</strong> members across the US</span>
              </div>
            </FadeIn>
          </div>

          {/* right — hero photograph + floating live card */}
          <FadeIn start={introDone} delay={700} duration={1000}>
            <div style={{ position: 'relative' }}>
              <div className="hero-visual" style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', height: 'clamp(460px, 62vh, 600px)', background: FEATURED.gradient, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }}>
                {FEATURED.image && <img src={FEATURED.image} alt={FEATURED.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,10,0.10), transparent 34%, rgba(8,8,10,0.42))' }} />
                <span style={{ position: 'absolute', top: 18, right: 18, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.94)', borderRadius: 999, padding: '6px 13px', font: `700 11px ${font.family}`, letterSpacing: '.06em', color: light.ink }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: colors.accent, animation: 'livePulse 2s ease-in-out infinite' }} /> LIVE
                </span>
              </div>

              <div style={{ position: 'absolute', left: 'clamp(-8px, 2vw, 22px)', right: 'clamp(-8px, 2vw, 22px)', bottom: -26, borderRadius: 20, padding: '18px 20px', ...lightGlass }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ font: `600 10px ${font.family}`, letterSpacing: '.1em', textTransform: 'uppercase', color: light.dim }}>{FEATURED.category} · Live campaign</div>
                    <div style={{ font: `600 20px/1.1 ${font.display}`, color: light.ink, marginTop: 2 }}>{FEATURED.title}</div>
                  </div>
                  <MiniCountdown target={FEATURED.closesAt} />
                </div>
                <div style={{ height: 5, borderRadius: 3, background: light.soft, overflow: 'hidden' }}>
                  <div style={{ width: `${FEATURED.sold}%`, height: '100%', background: colors.accent, borderRadius: 3 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 11 }}>
                  <span style={{ font: `500 12px ${font.family}`, color: light.body }}>{FEATURED.sold}% allocated · from {FEATURED.cost} Credit</span>
                  <button onClick={() => onNavigate('signup')} style={{ font: `600 13px ${font.family}`, color: colors.accent, background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Join <Icon name="arrowRight" size={13} color={colors.accent} />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PARTNER LOGO STRIP */}
      <section style={{ padding: `clamp(56px, 7vw, 76px) ${PAD} clamp(40px, 5vw, 56px)`, background: light.page }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.16em', textTransform: 'uppercase', color: light.dim, textAlign: 'center', marginBottom: 30 }}>In good company — offers from leading brands</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(28px, 5vw, 60px)', flexWrap: 'wrap', rowGap: 26 }}>
              {PARTNER_OFFERS.map(p => (
                <img key={p.slug} src={`/brand/partners/${p.slug}.png`} alt={p.brand}
                  style={{ height: 44, width: 'auto', filter: 'brightness(0)', opacity: 0.72, transition: 'opacity 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0.72}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIVE CAMPAIGNS — Airbnb-style browse */}
      <section id="campaigns" style={{ padding: `clamp(56px, 7vw, 96px) ${PAD}`, background: light.canvas }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 26 }}>
              <div>
                <div style={{ marginBottom: 14 }}><Eyebrow label="LIVE NOW" /></div>
                <h2 style={{ font: `400 clamp(34px, 4vw, 50px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Campaigns open now</h2>
                <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, margin: '12px 0 0', maxWidth: 520 }}>Browse this month's collection. Join with Credits — every draw is independently witnessed and audited.</p>
              </div>
              <GhostCTA onClick={() => onNavigate('campaigns')} size="md">View all <Icon name="arrowRight" size={15} color={light.ink} /></GhostCTA>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 30 }}>
              {CATEGORIES.map(category => {
                const active = cat === category;
                return (
                  <button key={category} onClick={() => setCat(category)}
                    style={{
                      font: `500 13px ${font.family}`, padding: '9px 18px', borderRadius: 999, cursor: 'pointer',
                      background: active ? light.ink : light.panel,
                      color: active ? '#fff' : light.body,
                      border: `1px solid ${active ? light.ink : light.line}`,
                      transition: 'all 0.2s ease',
                    }}
                  >{category}</button>
                );
              })}
            </div>
          </Reveal>

          <div className="lp-cards">
            {shown.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <CampaignCardLight c={c} onClick={() => onNavigate('signup')} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK EDITORIAL BAND — the value proposition */}
      <section style={{ background: light.charcoal, padding: `clamp(72px, 9vw, 120px) ${PAD}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'radial-gradient(circle, rgba(255,128,0,0.05), transparent 70%)', pointerEvents: 'none' }} />
        <div className="lp-inner" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><Eyebrow label="WHY INSCAPE" dark /></div>
              <h2 style={{ font: `400 clamp(34px, 4.4vw, 56px)/1.05 ${font.family}`, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px' }}>
                One membership. <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 500, color: colors.accent }}>Three ways to win.</span>
              </h2>
              <p style={{ font: `400 16px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.62)', maxWidth: 500, margin: '0 auto' }}>
                More than prize draws — a membership that keeps giving back, every month you stay.
              </p>
            </div>
          </Reveal>
          <div className="lp-bd">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 110}>
                <div style={{ background: light.charcoalSoft, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 22, padding: '32px 30px', height: '100%' }}>
                  <div style={{ width: 54, height: 54, borderRadius: 15, background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                    <Icon name={b.icon} size={26} color={colors.accent} />
                  </div>
                  <h3 style={{ font: `500 21px ${font.family}`, color: '#fff', margin: '0 0 10px' }}>{b.title}</h3>
                  <p style={{ font: `400 14px/1.7 ${font.family}`, color: 'rgba(255,255,255,0.58)', margin: 0 }}>{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER OFFERS */}
      <section id="offers" style={{ padding: `clamp(64px, 8vw, 110px) ${PAD}`, background: light.page }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 36 }}>
              <div>
                <div style={{ marginBottom: 14 }}><Eyebrow label="PARTNER OFFERS" /></div>
                <h2 style={{ font: `400 clamp(32px, 4vw, 48px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Membership that pays for itself</h2>
                <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, margin: '12px 0 0', maxWidth: 500 }}>Members unlock exclusive pricing from leading brands — real savings, every month, on top of the campaigns.</p>
              </div>
              <GhostCTA onClick={() => onNavigate('signup')} size="md">All offers <Icon name="arrowRight" size={15} color={light.ink} /></GhostCTA>
            </div>
          </Reveal>
          <div className="lp-offers">
            {OFFERS.map((o, i) => (
              <Reveal key={o.slug} delay={i * 80}>
                <OfferCardLight o={o} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WINNERS */}
      <section id="winners" style={{ padding: `clamp(64px, 8vw, 110px) ${PAD}`, background: light.canvas }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 36 }}>
              <div>
                <div style={{ marginBottom: 14 }}><Eyebrow label="REAL WINNERS" /></div>
                <h2 style={{ font: `400 clamp(32px, 4vw, 48px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Members win every week</h2>
              </div>
              <p style={{ font: `400 14px/1.6 ${font.family}`, color: light.dim, maxWidth: 320, margin: 0 }}>Every draw is independently witnessed and audited. Real people, real prizes.</p>
            </div>
          </Reveal>
          <div className="lp-cards">
            {WINNERS.map((w, i) => (
              <Reveal key={w.id} delay={i * 90}>
                <WinnerCardLight w={w} idx={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: `clamp(64px, 8vw, 110px) ${PAD}`, background: light.page }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}><Eyebrow label="HOW IT WORKS" /></div>
              <h2 style={{ font: `400 clamp(34px, 4.4vw, 52px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Three steps to extraordinary</h2>
            </div>
          </Reveal>
          <div className="lp-bd">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 110}>
                <div style={{ background: light.panel, border: `1px solid ${light.line}`, borderRadius: 22, padding: '30px 28px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: light.accentSoft, border: `1px solid ${light.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={s.icon} size={25} color={colors.accent} />
                    </div>
                    <span style={{ font: `600 30px/1 ${font.display}`, color: light.faint }}>{s.num}</span>
                  </div>
                  <h3 style={{ font: `600 19px ${font.family}`, color: light.ink, margin: '0 0 10px' }}>{s.title}</h3>
                  <p style={{ font: `400 14px/1.7 ${font.family}`, color: light.body, margin: 0 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: `clamp(48px, 6vw, 72px) ${PAD}`, background: light.canvas, borderTop: `1px solid ${light.line}`, borderBottom: `1px solid ${light.line}` }}>
        <div className="lp-inner">
          <Reveal>
            <div className="lp-stats">
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '18px 12px' }}>
                  <div style={{ font: `400 clamp(34px, 4vw, 46px)/1 ${font.family}`, letterSpacing: '-0.02em', color: light.ink }}>{s.value}</div>
                  <div style={{ font: `400 13px ${font.family}`, color: light.dim, marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" style={{ padding: `clamp(64px, 8vw, 110px) ${PAD}`, background: light.page }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}><Eyebrow label="MEMBERSHIP" /></div>
              <h2 style={{ font: `400 clamp(34px, 4.4vw, 52px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: '0 0 14px' }}>Choose your tier</h2>
              <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, maxWidth: 460, margin: '0 auto' }}>Monthly Credits, Momentum bonuses and exclusive access — scaled to your ambition.</p>
            </div>
          </Reveal>
          <div className="lp-plans">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 110}>
                <div style={{
                  background: p.highlight ? light.softer : light.panel,
                  border: `1px solid ${p.highlight ? light.accentBorder : light.line}`,
                  borderRadius: 22, padding: '34px 30px', position: 'relative', height: '100%',
                  boxShadow: p.highlight ? '0 20px 50px rgba(255,128,0,0.12)' : 'none',
                }}>
                  {p.highlight && (
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: colors.accent, borderRadius: 999, padding: '5px 15px', font: `700 11px ${font.family}`, color: '#1c1003', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>MOST POPULAR</div>
                  )}
                  <div style={{ font: `600 13px ${font.family}`, color: p.highlight ? colors.accent : light.dim, letterSpacing: '.06em', marginBottom: 10 }}>{p.name.toUpperCase()}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}>
                    <span style={{ font: `400 42px/1 ${font.family}`, letterSpacing: '-0.02em', color: light.ink }}>{p.price}</span>
                    <span style={{ font: `400 14px ${font.family}`, color: light.dim }}>/mo</span>
                  </div>
                  <div style={{ font: `500 13px ${font.family}`, color: colors.accent, marginBottom: 26 }}>{p.credits} Credits / month</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 19, height: 19, borderRadius: '50%', background: p.highlight ? light.accentSoft : light.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon name="check" size={11} color={p.highlight ? colors.accent : light.dim} />
                        </span>
                        <span style={{ font: `400 13.5px ${font.family}`, color: light.body }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  {p.highlight
                    ? <PrimaryCTA onClick={() => onNavigate('signup')} size="md" style={{ width: '100%' }}>Get started</PrimaryCTA>
                    : <GhostCTA onClick={() => onNavigate('signup')} size="md" style={{ width: '100%' }}>Get started</GhostCTA>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: `clamp(72px, 9vw, 120px) ${PAD}`, background: light.canvas, textAlign: 'center' }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}><Eyebrow label="NO CARD REQUIRED" /></div>
            <h2 style={{ font: `400 clamp(36px, 5vw, 62px)/1.05 ${font.family}`, letterSpacing: '-0.035em', color: light.ink, margin: '0 0 18px' }}>
              Start with <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 500, color: colors.accent }}>3 free Credits</span> today
            </h2>
            <p style={{ font: `400 17px/1.6 ${font.family}`, color: light.body, maxWidth: 440, margin: '0 auto 36px' }}>
              Join thousands of members already taking part in extraordinary campaigns. No commitment required.
            </p>
            <PrimaryCTA onClick={() => onNavigate('signup')} style={{ height: 58, padding: '0 42px', fontSize: 17 }}>
              Create free account <Icon name="arrowRight" size={18} color="#1c1003" />
            </PrimaryCTA>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: light.page, borderTop: `1px solid ${light.line}`, padding: `44px ${PAD}` }}>
        <div className="lp-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <Logo size="sm" showText variant="charcoal" />
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {['Official Rules', 'Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" style={{ font: `400 13px ${font.family}`, color: light.dim, textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = light.ink}
                  onMouseLeave={e => e.currentTarget.style.color = light.dim}
                >{l}</a>
              ))}
            </div>
            <div style={{ font: `400 12px ${font.family}`, color: light.dim }}>© 2026 InScape. All rights reserved.</div>
          </div>
          <div style={{ marginTop: 20, font: `400 11px/1.6 ${font.family}`, color: light.faint, maxWidth: 620 }}>
            InScape is a skill-based membership platform. No purchase necessary. Open to US residents 18+. See Official Rules for full eligibility and selection procedures.
          </div>
        </div>
      </footer>
    </div>
  );
}
