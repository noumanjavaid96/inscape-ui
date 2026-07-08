import { useState, useEffect } from 'react';
import tokens from '../design/tokens';
import Logo from '../components/ui/Logo';
import Icon from '../components/ui/Icon';
import IntroSplash from '../components/cinematic/IntroSplash';
import HeroVideo from '../components/cinematic/HeroVideo';
import FadeIn from '../components/cinematic/FadeIn';
import Reveal from '../components/cinematic/Reveal';
import MagneticButton from '../components/cinematic/MagneticButton';
import { useCountdown } from '../hooks/useCountdown';
import FeaturedCampaign from '../components/campaign/FeaturedCampaign';
import { CAMPAIGNS, PAST_WINNERS } from '../data/campaigns';
import { PARTNER_OFFERS } from '../data/offers';

const { colors, font, light } = tokens;

const PAD = 'clamp(20px, 5vw, 80px)';
const WINNERS = PAST_WINNERS.slice(0, 3);
const OFFERS = PARTNER_OFFERS.slice(0, 6);

// The hero rotates through the live campaigns as a "cover" — the background
// photo cross-fades while the campaign name, status, prize and countdown switch
// in sync. Featured set = currently live/closing campaigns, capped at five.
const HERO_CAMPAIGNS = CAMPAIGNS.filter((c) => c.status === 'LIVE' || c.status === 'CLOSING SOON').slice(0, 5);

// A larger crop of each campaign photo for the full-bleed hero (cards use w=1000).
const heroImg = (c) => (c.image ? c.image.replace('w=1000', 'w=2400').replace('q=70', 'q=80') : '');

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
  { name: 'Entry', price: '$14.99', annualPrice: '$149.99', credits: 40, annualCredits: 480, features: ['40 Credits every month', 'Full campaign access', 'Member-only promotions'], highlight: false },
  { name: 'Premium', price: '$19.99', annualPrice: '$199.99', credits: 120, annualCredits: 1440, features: ['120 Credits every month', 'Priority campaign access', 'Momentum bonuses', 'Full Offers Hub', 'Referral rewards'], highlight: true },
  { name: 'Elite', price: '$24.99', annualPrice: '$249.99', credits: 250, annualCredits: 3000, features: ['250 Credits every month', 'Early campaign access', 'Bonus allocation campaigns', 'Exclusive partner offers', 'Priority support'], highlight: false },
];

const STATS = [
  { value: '50,000+', label: 'Active members' },
  { value: '1,200+', label: 'Campaigns run' },
  { value: '$20M+', label: 'Member value unlocked' },
  { value: '4.8/5', label: 'Member satisfaction' },
];

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
        boxShadow: '0 14px 30px rgba(238,140,70,0.30)',
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
      <div style={{ position: 'relative', aspectRatio: '4 / 4.2', overflow: 'hidden', background: c.gradient }}>
        {c.image && (
          <img
            src={c.image} alt={c.title} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1)' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        {c.status !== 'LIVE' && (
          <div style={{ position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.92)', borderRadius: 999, padding: '5px 11px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusTone }} />
            <span style={{ font: `700 10px ${font.family}`, letterSpacing: '.08em', color: light.ink }}>{c.status}</span>
          </div>
        )}
      </div>

      <div style={{ padding: '18px 20px 18px' }}>
        <div style={{ font: `700 10px ${font.family}`, letterSpacing: '.12em', textTransform: 'uppercase', color: colors.accent }}>{c.category}</div>
        <h3 style={{ font: `600 17px/1.25 ${font.family}`, color: light.ink, margin: '5px 0 0' }}>{c.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `400 12px ${font.family}`, color: light.dim }}>
            <Icon name="clock" size={13} color={light.dim} />
            {upcoming ? (c.startsIn || 'Opening soon') : closesLabel(t)}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `600 12px ${font.family}`, color: colors.accent }}>
            Join for {c.cost} {c.cost === 1 ? 'Credit' : 'Credits'}
            <Icon name="arrowRight" size={13} color={colors.accent} />
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
        background: light.panel, border: `1px solid ${light.line}`, borderRadius: 20,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: hover ? light.cardShadowHover : light.cardShadow,
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform 0.3s cubic-bezier(.2,.7,.2,1), box-shadow 0.3s ease',
      }}
    >
      {/* Logo hero — the brand IS the image (affiliate APIs don't provide product shots) */}
      <div style={{ position: 'relative', height: 150, background: `radial-gradient(90% 120% at 50% 0%, #23262c, ${light.charcoal})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={`/brand/partners/${o.slug}.png`} alt={o.brand} loading="lazy"
          style={{ maxWidth: '72%', maxHeight: 84, width: 'auto', height: 'auto', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.4s ease' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <span style={{ position: 'absolute', top: 12, right: 12, background: colors.accent, borderRadius: 999, padding: '6px 13px', font: `700 13px ${font.family}`, color: '#1c1003' }}>{o.offer}</span>
        <span style={{ position: 'absolute', top: 12, left: 12, font: `600 10px ${font.family}`, letterSpacing: '.08em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>{o.category}</span>
      </div>
      <div style={{ padding: '18px 20px 18px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <span style={{ font: `600 16px ${font.family}`, color: light.ink }}>{o.brand}</span>
        <p style={{ font: `400 13px/1.55 ${font.family}`, color: light.body, margin: 0, flex: 1 }}>{o.detail}</p>
        <span style={{ alignSelf: 'flex-start', font: `500 11px ${font.family}`, color: light.dim, background: light.soft, borderRadius: 999, padding: '4px 10px' }}>{o.type}</span>
      </div>
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

const NAV_LINKS = [
  { label: 'Campaigns', href: '#campaigns' },
  { label: 'Membership', href: '#membership' },
  { label: 'Offers Hub', href: '#offers' },
];

const EXPLORE_LINKS = [
  { label: 'About Us', href: '#how' },
  { label: 'Partnership', href: '#partner' },
  { label: 'FAQ', href: '#how' },
  { label: 'Merch (Coming Soon)', href: '#', soon: true },
];

function ExploreMenu({ linkColor, linkHover }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `500 14px ${font.family}`, color: open ? linkHover : linkColor, background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.15s' }}>
        Explore
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        /* Transparent paddingTop bridges the button↔menu gap so the cursor
           never leaves the hover area on its way to the items. */
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 12, zIndex: 300 }}>
          <div style={{ minWidth: 210, background: '#fff', border: `1px solid ${light.line}`, borderRadius: 14, boxShadow: light.floatShadow, padding: 8 }}>
            {EXPLORE_LINKS.map(l => (
              <a key={l.label} href={l.soon ? undefined : l.href} onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '10px 12px', borderRadius: 10, font: `500 14px ${font.family}`, color: l.soon ? light.dim : light.ink, textDecoration: 'none', cursor: l.soon ? 'default' : 'pointer' }}
                onMouseEnter={e => { if (!l.soon) e.currentTarget.style.background = light.soft; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NavBar({ onNavigate, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const linkColor = scrolled ? light.body : 'rgba(255,255,255,0.82)';
  const linkHover = scrolled ? light.ink : '#ffffff';
  const close = () => setMenuOpen(false);

  return (
    <>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginLeft: 46, flex: 1 }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} style={{ font: `500 14px ${font.family}`, color: linkColor, textDecoration: 'none', transition: 'color 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.color = linkHover}
              onMouseLeave={e => e.currentTarget.style.color = linkColor}
            >{l.label}</a>
          ))}
          <ExploreMenu linkColor={linkColor} linkHover={linkHover} />
        </div>

        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <PrimaryCTA onClick={() => onNavigate('signup')} size="md" style={{ borderRadius: 999, padding: '0 22px' }}>Join now</PrimaryCTA>
        </div>

        <button
          className="mobile-nav-btn" aria-label="Open menu" onClick={() => setMenuOpen(true)}
          style={{ display: 'none', marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        >
          <Icon name="menu" size={26} color={scrolled ? light.ink : '#ffffff'} />
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(10,11,14,0.98)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', padding: `0 ${PAD} 36px`, animation: 'slideIn 0.25s ease both' }}>
          <div style={{ height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <Logo size="md" showText variant="light" />
            <button aria-label="Close menu" onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
              <Icon name="close" size={26} color="#ffffff" />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', marginTop: 18, flex: 1 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={close}
                style={{ font: `300 30px ${font.family}`, letterSpacing: '-0.01em', color: '#fff', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >{l.label}</a>
            ))}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, paddingTop: 20 }}>
              {EXPLORE_LINKS.map(l => (
                <a key={l.label} href={l.soon ? undefined : l.href} onClick={l.soon ? undefined : close}
                  style={{ font: `400 15px ${font.family}`, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
                >{l.label}</a>
              ))}
            </div>
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
            <button onClick={() => { close(); onNavigate('login'); }}
              style={{ height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', font: `600 16px ${font.family}`, cursor: 'pointer' }}
            >Sign in</button>
            <PrimaryCTA onClick={() => { close(); onNavigate('signup'); }} style={{ width: '100%' }}>Join now</PrimaryCTA>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- page ---------- */

export default function PublicHome({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div style={{ background: light.page, minHeight: '100vh', fontFamily: font.family, color: light.ink, overflowX: 'hidden' }}>
      <style>{`
        .lp-inner { max-width: 1200px; margin: 0 auto; width: 100%; }
        .lp-hero { display: grid; grid-template-columns: 1.04fr 0.96fr; gap: 56px; align-items: center; }
        .lp-cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; }
        .lp-cards > :nth-child(-n+2) { grid-column: span 3; }
        .lp-cards > :nth-child(n+3) { grid-column: span 2; }
        .lp-sub { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .lp-offers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .lp-bd { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .lp-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .lp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .lp-h1 { font-size: clamp(46px, 6vw, 86px); }
        @keyframes heroChevron { 0%,100% { transform: translateY(0); opacity: .75; } 50% { transform: translateY(7px); opacity: 1; } }
        @keyframes heroMeta { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
        .lp-marquee { overflow: hidden; width: 100%; -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent); }
        .lp-marquee-track { display: flex; width: max-content; animation: lpMarquee 55s linear infinite; }
        @keyframes lpMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .lp-marquee-track { animation: none; } }
        @media (max-width: 1023px) {
          .lp-cards, .lp-offers, .lp-bd, .lp-plans, .lp-sub { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-cards > * { grid-column: auto !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: inline-flex !important; }
          .lp-hero, .lp-cards, .lp-offers, .lp-bd, .lp-plans, .lp-partner-band, .lp-sub { grid-template-columns: 1fr !important; }
          .lp-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-h1 { font-size: clamp(40px, 12vw, 60px) !important; }
          .hero-visual { height: 380px !important; }
        }
      `}</style>

      <IntroSplash onDone={() => setIntroDone(true)} hold={1500} lift={700} />
      <NavBar onNavigate={onNavigate} scrolled={scrolled} />

      {/* HERO — cinematic brand film backdrop */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden',
        backgroundColor: '#0c0d10',
      }}>
        {/* Ping-pong brand film. Poster = featured campaign still so first paint is never empty. */}
        <HeroVideo
          src="https://res.cloudinary.com/dcjnzvmwc/video/upload/v1783424497/inscape_glztpd.mp4"
          poster={heroImg(HERO_CAMPAIGNS[0])}
        />
        {/* Legibility scrims + brand tint + a faint vignette — keeps white text crisp over any frame */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(6,6,8,0.45) 100%), linear-gradient(rgba(10,8,6,0.32), rgba(10,8,6,0.32)), linear-gradient(to top, rgba(6,8,12,0.9) 0%, rgba(6,8,12,0.55) 26%, rgba(6,8,12,0.16) 55%, rgba(6,8,12,0.04) 80%, rgba(6,8,12,0.24) 100%)',
        }} />
        <div className="lp-inner" style={{ position: 'relative', zIndex: 2, width: '100%', padding: `clamp(120px, 15vh, 170px) ${PAD} clamp(64px, 9vh, 96px)`, textAlign: 'center' }}>
          <FadeIn start={introDone} delay={150} duration={800}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', marginBottom: 26 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent, animation: 'livePulse 2s ease-in-out infinite' }} />
              <span style={{ font: `600 11px ${font.family}`, letterSpacing: '.18em', color: 'rgba(255,255,255,0.9)' }}>THE PREMIUM MEMBERSHIP FOR MORE</span>
            </div>
          </FadeIn>

          <FadeIn start={introDone} delay={300} duration={900}>
            <h1 className="lp-h1" style={{ fontFamily: font.family, fontWeight: 300, lineHeight: 0.98, letterSpacing: '-0.038em', color: '#fff', margin: '0 auto', maxWidth: 1000, textShadow: '0 2px 40px rgba(0,0,0,0.30)' }}>
              More access. More experiences. More <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>you.</span>
            </h1>
          </FadeIn>

          <FadeIn start={introDone} delay={650} duration={900}>
            <p style={{ font: `400 18px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.92)', margin: '26px auto 0', maxWidth: 540, textShadow: '0 1px 18px rgba(0,0,0,0.6)' }}>
              One membership — luxury prize campaigns, members-only offers, and rewards that compound.
            </p>
          </FadeIn>

          <FadeIn start={introDone} delay={850} duration={900}>
            <div style={{ display: 'flex', gap: 14, marginTop: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticButton
                onClick={() => onNavigate('signup')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 54, padding: '0 30px', borderRadius: 999, background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`, border: 'none', color: '#1c1003', font: `600 15px ${font.family}`, boxShadow: '0 16px 44px rgba(238,140,70,0.42)' }}
              >
                Become a member
                <Icon name="arrowRight" size={17} color="#1c1003" />
              </MagneticButton>
              <button
                onClick={() => onNavigate('campaigns')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, height: 54, padding: '0 26px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.28)', color: '#fff', font: `600 15px ${font.family}`, cursor: 'pointer', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
              >
                Explore campaigns
              </button>
            </div>
          </FadeIn>

          <FadeIn start={introDone} delay={1050} duration={900}>
            <p style={{ font: `500 13px ${font.family}`, color: 'rgba(255,255,255,0.72)', margin: '18px 0 0', textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
              Start free with <strong style={{ color: '#fff', fontWeight: 700 }}>3 Credits</strong> — no card required.
            </p>
          </FadeIn>

          <FadeIn start={introDone} delay={1250} duration={1000}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(40px, 6vh, 68px)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ animation: 'heroChevron 2.2s ease-in-out infinite' }}>
                <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PARTNER BRAND SHELVES — two rolling carousels in opposite directions */}
      <section style={{ padding: `clamp(32px, 4.5vw, 60px) 0 clamp(44px, 5vw, 64px)`, background: light.page, overflow: 'hidden' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 34, padding: `0 ${PAD}` }}>
            <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.16em', textTransform: 'uppercase', color: light.dim, marginBottom: 10 }}>In good company</div>
            <h2 style={{ font: `400 clamp(24px, 2.8vw, 34px)/1.1 ${font.family}`, letterSpacing: '-0.02em', color: light.ink, margin: 0 }}>
              Exceptional benefits. <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>World-leading</span> brands.
            </h2>
          </div>
          {/* single slow strip, large logos — FoundersCard-style credibility shelf */}
          <div className="lp-marquee">
            <div className="lp-marquee-track">
              {/* content duplicated so the loop is seamless */}
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(56px, 7vw, 110px)', paddingRight: 'clamp(56px, 7vw, 110px)' }}>
                  {PARTNER_OFFERS.map(p => (
                    <img key={p.slug} src={`/brand/partners/${p.slug}.png`} alt={dup === 0 ? p.brand : ''}
                      style={{ height: 76, width: 'auto', filter: 'brightness(0)', opacity: 0.8, flexShrink: 0 }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* LIVE CAMPAIGNS — Airbnb-style browse */}
      <section id="campaigns" style={{ padding: `clamp(56px, 7vw, 96px) ${PAD}`, background: light.canvas }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 26 }}>
              <div>
                <div style={{ marginBottom: 14 }}><Eyebrow label="LIVE NOW" /></div>
                <h2 style={{ font: `400 clamp(34px, 4vw, 50px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Campaigns open <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>now.</span></h2>
                <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, margin: '12px 0 0', maxWidth: 520 }}>Browse this month's collection. Join with Credits — every draw is independently witnessed and audited.</p>
              </div>
              <GhostCTA onClick={() => onNavigate('campaigns')} size="md">View all <Icon name="arrowRight" size={15} color={light.ink} /></GhostCTA>
            </div>
          </Reveal>

          {/* One featured cover on top, four cards beneath */}
          <Reveal>
            <div style={{ marginBottom: 22 }}>
              <FeaturedCampaign campaign={CAMPAIGNS[0]} onOpen={() => onNavigate('signup')} kicker="LIVE NOW" />
            </div>
          </Reveal>
          <div className="lp-sub">
            {CAMPAIGNS.slice(1, 5).map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <CampaignCardLight c={c} onClick={() => onNavigate('signup')} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DARK EDITORIAL BAND — the value proposition */}
      <section style={{ background: light.charcoal, padding: `clamp(72px, 9vw, 120px) ${PAD}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, background: 'radial-gradient(circle, rgba(238,140,70,0.05), transparent 70%)', pointerEvents: 'none' }} />
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
                  <div style={{ width: 54, height: 54, borderRadius: 15, background: 'rgba(238,140,70,0.12)', border: '1px solid rgba(238,140,70,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
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
                <div style={{ marginBottom: 14 }}><Eyebrow label="OFFERS HUB" /></div>
                <h2 style={{ font: `400 clamp(32px, 4vw, 48px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Membership that pays for <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>itself.</span></h2>
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
                <h2 style={{ font: `400 clamp(32px, 4vw, 48px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Members win <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>every week.</span></h2>
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
              <h2 style={{ font: `400 clamp(34px, 4.4vw, 52px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Three steps to <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>extraordinary</span></h2>
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
            <h2 style={{ font: `400 clamp(28px, 3.4vw, 42px)/1.08 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: '0 0 34px', textAlign: 'center' }}>
              A membership like <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>no other.</span>
            </h2>
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
              <h2 style={{ font: `400 clamp(34px, 4.4vw, 52px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: '0 0 14px' }}>Choose your <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>tier.</span></h2>
              <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, maxWidth: 460, margin: '0 auto' }}>Monthly Credits, Momentum bonuses and exclusive access — scaled to your ambition.</p>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: light.soft, border: `1px solid ${light.line}`, borderRadius: 999, padding: 4 }}>
                {['Monthly', 'Annual'].map((t, i) => {
                  const active = annual === (i === 1);
                  return (
                    <button key={t} onClick={() => setAnnual(i === 1)}
                      style={{ padding: '8px 20px', borderRadius: 999, font: `600 13px ${font.family}`, border: 'none', cursor: 'pointer', background: active ? light.ink : 'transparent', color: active ? '#fff' : light.body, transition: 'all 0.2s ease' }}>
                      {t}{i === 1 && <span style={{ font: `600 10px ${font.family}`, color: active ? '#9be3b4' : colors.accent, marginLeft: 6 }}>2 months free</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
          <div className="lp-plans">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 110} style={{ height: '100%' }}>
                <div style={{
                  background: p.highlight ? light.softer : light.panel,
                  border: `1px solid ${p.highlight ? light.accentBorder : light.line}`,
                  borderRadius: 22, padding: '34px 30px', position: 'relative', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: p.highlight ? '0 20px 50px rgba(238,140,70,0.12)' : 'none',
                }}>
                  {p.highlight && (
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: colors.accent, borderRadius: 999, padding: '5px 15px', font: `700 11px ${font.family}`, color: '#1c1003', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>MOST POPULAR</div>
                  )}
                  <div style={{ font: `600 13px ${font.family}`, color: p.highlight ? colors.accent : light.dim, letterSpacing: '.06em', marginBottom: 10 }}>{p.name.toUpperCase()}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}>
                    <span style={{ font: `400 42px/1 ${font.family}`, letterSpacing: '-0.02em', color: light.ink }}>{annual ? p.annualPrice : p.price}</span>
                    <span style={{ font: `400 14px ${font.family}`, color: light.dim }}>{annual ? '/yr' : '/mo'}</span>
                  </div>
                  <div style={{ font: `500 13px ${font.family}`, color: colors.accent, marginBottom: 26 }}>{annual ? `${p.annualCredits.toLocaleString()} Credits / year` : `${p.credits} Credits / month`}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30, flex: 1 }}>
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

      {/* BECOME A PARTNER — simple FoundersCard-style band */}
      <section id="partner" style={{ background: light.charcoal, padding: `clamp(64px, 8vw, 100px) ${PAD}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '78%', transform: 'translate(-50%,-50%)', width: 700, height: 420, background: 'radial-gradient(circle, rgba(238,140,70,0.07), transparent 70%)', pointerEvents: 'none' }} />
        <div className="lp-inner" style={{ position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: 48, alignItems: 'center' }} className="lp-partner-band">
              <div>
                <div style={{ marginBottom: 18 }}><Eyebrow label="FOR BRANDS" dark /></div>
                <h2 style={{ font: `400 clamp(30px, 3.8vw, 48px)/1.06 ${font.family}`, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px' }}>
                  Become an InScape <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>partner.</span>
                </h2>
                <p style={{ font: `400 16px/1.7 ${font.family}`, color: 'rgba(255,255,255,0.68)', margin: 0, maxWidth: 480 }}>
                  Put your brand in front of a premium, high-intent membership. Offers go live through our
                  partner network with tracked redemptions and transparent reporting.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['Reach 50,000+ engaged members', 'Tracked links, codes and in-store QR', 'Onboarding handled by our team'].map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(238,140,70,0.14)', border: '1px solid rgba(238,140,70,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="check" size={12} color={colors.accent} />
                    </span>
                    <span style={{ font: `500 14.5px ${font.family}`, color: 'rgba(255,255,255,0.85)' }}>{b}</span>
                  </div>
                ))}
                <div style={{ marginTop: 10 }}>
                  <GhostCTA dark onClick={() => onNavigate('signup')} size="md">
                    Apply to partner <Icon name="arrowRight" size={15} color="#fff" />
                  </GhostCTA>
                </div>
              </div>
            </div>
          </Reveal>
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
