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
const WINNERS = PAST_WINNERS;
const OFFERS = PARTNER_OFFERS.slice(0, 6);

// The hero rotates through the live campaigns as a "cover" — the background
const CAROUSEL_BRANDS = [
  "945 Industries.png", "ASICS.png", "ASUS.jpg", "Adidas.png", "Belkin.png", "Beretta.png",
  "Black + Decker.png", "Bowers & Wilkins.png", "Braun.png", "Bulova.png", "Calvin Klein.png",
  "Can-Am.png", "Carhartt.png", "Champion.png", "Chase Tactical.png", "Cole Haan.png", "Coleman.png",
  "De'Longhi.png", "Denon.png", "Diesel.png", "Dyson.jpg", "ECCO.png", "French Connection.png",
  "GUESS.png", "HOKA.png", "HUGO BOSS.png", "Invictus Templar.png", "JBL.jpg", "JD Sports.jpg",
  "Kate Spade.png", "LG.png", "Lacoste.png", "Lavazza.png", "Lenovo.jpg", "Levi’s.png", "Logitech.png",
  "Manscaped.jpg", "Marc Jacobs.jpg", "Myprotein.png", "M·A·C.png", "NETGEAR.png", "Nautica.png",
  "New Era.png", "Nike.png", "Oakley.png", "Samsonite.png", "Samsung.jpg", "Sennheiser.png",
  "Sephora.png", "Speedo.png", "Steve Madden.png", "Superdry.png", "TUMI.png", "UGG.png",
  "Vans.png", "ghd.png"
];

const CAROUSEL_BRANDS_1 = CAROUSEL_BRANDS.slice(0, 28);
const CAROUSEL_BRANDS_2 = CAROUSEL_BRANDS.slice(28);

// Tile wall behind "One membership": PNG marks only (the JPG files carry solid
// grounds that would read as slabs on white tiles), dealt into three brick rows.
const TILE_BRANDS = CAROUSEL_BRANDS.filter((b) => b.endsWith('.png'));
const TILE_ROWS = [0, 1, 2].map((r) => TILE_BRANDS.filter((_, i) => i % 3 === r));

// The core message: one membership, three concrete benefits.
const BENEFITS = [
  { icon: 'star', title: 'Premium prize campaigns', body: 'Join live campaigns for luxury cars, travel, tech and tax-free cash — using Credits, from just one per campaign.' },
  { icon: 'gift', title: 'Exclusive partner offers', body: 'Unlock members-only pricing from leading brands across travel, tech, fashion and lifestyle — real savings every month.' },
  { icon: 'sparkle', title: 'Rewards that compound', body: 'Monthly Credits, Momentum bonuses, referral rewards and early access — member value that grows the longer you stay.' },
];

const STEPS = [
  { num: '01', icon: 'wallet', title: 'Join InScape', body: 'Create your account and choose how you want to experience InScape.' },
  { num: '02', icon: 'grid', title: 'Choose What Excites You', body: 'Join live Campaigns that interest you and discover Partner Offers from brands you love, alongside new ones worth discovering.' },
  { num: '03', icon: 'trophy', title: 'Unlock More as a Member', body: 'Receive recurring monthly Campaign Credits, unlock greater Partner Offer access, enhanced Dashboard features, rewards and more.' },
];

const PLANS = [
  { name: 'Entry', price: '$14.99', annualPrice: '$149.99', credits: 40, annualCredits: 480, desc: 'Designed for regular engagement across live Campaigns and Partner Offers.', features: ['Explore the Partner Offers Hub (50% access)', 'Stay updated on new Campaigns and offers', '10% InScape merchandise discount (Coming Soon)'], highlight: false },
  { name: 'Premium', price: '$19.99', annualPrice: '$199.99', credits: 120, annualCredits: 1440, desc: 'More flexibility, more opportunities, more access.', features: ['Expanded selection in the Partner Offers Hub (75% access)', 'Higher-value Campaign opportunities', 'Priority Member support', '15% InScape merchandise discount (Coming Soon)'], highlight: true },
  { name: 'Elite', price: '$24.99', annualPrice: '$249.99', credits: 250, annualCredits: 3000, desc: 'Maximum access across the InScape ecosystem.', features: ['Complete access to all Partner Offers (100% access)', 'Access to exclusive Elite opportunities', 'Highest priority Member support', 'Early access to exclusive Campaigns', '20% InScape merchandise discount (Coming Soon)'], highlight: false },
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
          style={{ maxWidth: '95%', maxHeight: 118, width: 'auto', height: 'auto', mixBlendMode: 'screen', transform: hover ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.4s ease' }}
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
  { label: 'Merch', screen: 'merch' },
];

const EXPLORE_LINKS = [
  { label: 'About Us', href: '#how' },
  { label: 'Partnership', href: '#partner' },
  { label: 'FAQ', href: '#how' },
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
            <a key={l.label} href={l.href || '#'} onClick={(e) => { if (l.screen) { e.preventDefault(); onNavigate(l.screen); } }} style={{ font: `500 14px ${font.family}`, color: linkColor, textDecoration: 'none', transition: 'color 0.15s', whiteSpace: 'nowrap', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = linkHover}
              onMouseLeave={e => e.currentTarget.style.color = linkColor}
            >{l.label}</a>
          ))}
          <ExploreMenu linkColor={linkColor} linkHover={linkHover} />
        </div>

        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 20, marginLeft: 'auto' }}>
          <button
            onClick={() => onNavigate('login')}
            style={{ font: `500 14px ${font.family}`, color: linkColor, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: scrolled ? light.line : 'rgba(255,255,255,0.4)', transition: 'color 0.15s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.color = linkHover}
            onMouseLeave={e => e.currentTarget.style.color = linkColor}
          >Log in</button>
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
              <a key={l.label} href={l.href || '#'} onClick={(e) => { if (l.screen) { e.preventDefault(); close(); onNavigate(l.screen); } else { close(); } }}
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
        .lp-ecosystem-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 16px; margin-bottom: 24px; }
        .lp-ecosystem-benefits { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr; gap: 32px; padding: 40px; }
        .lp-eco-tile { width: 168px; height: 82px; border-radius: 16px; background: #fff; border: 1px solid rgba(20,17,12,0.06); box-shadow: 0 1px 3px rgba(20,17,12,0.04); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .lp-eco-widget { width: 240px; flex-shrink: 0; align-self: center; }
        @media (max-width: 1199px) and (min-width: 1024px) { .lp-eco-widget { display: none; } }
        .lp-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .lp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .lp-h1 { font-size: clamp(46px, 6vw, 86px); }
        @keyframes heroChevron { 0%,100% { transform: translateY(0); opacity: .75; } 50% { transform: translateY(7px); opacity: 1; } }
        @keyframes heroMeta { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
        .lp-marquee { overflow: hidden; width: 100%; -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent); }
        .lp-marquee-track { display: flex; width: max-content; animation: lpMarquee 125s linear infinite; }
        .lp-marquee-track-reverse { display: flex; width: max-content; animation: lpMarqueeReverse 125s linear infinite; }
        @keyframes lpMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes lpMarqueeReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) { .lp-marquee-track, .lp-marquee-track-reverse { animation: none; } }
        @media (max-width: 1023px) {
          .lp-cards, .lp-offers, .lp-bd, .lp-plans, .lp-sub { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-cards > * { grid-column: auto !important; }
          .lp-ecosystem-grid { grid-template-columns: 1fr !important; }
          .lp-ecosystem-benefits { grid-template-columns: repeat(2, 1fr) !important; gap: 28px !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: inline-flex !important; }
          .lp-hero, .lp-cards, .lp-offers, .lp-bd, .lp-plans, .lp-partner-band, .lp-sub { grid-template-columns: 1fr !important; }
          .lp-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .lp-h1 { font-size: clamp(40px, 12vw, 60px) !important; }
          .hero-visual { height: 380px !important; }
          .lp-eco-tile { width: 126px; height: 62px; border-radius: 12px; }
          .lp-ecosystem-benefits { padding: 28px 24px; }
        }
        @media (max-width: 640px) {
          .lp-eco-widget { display: none; }
          .lp-ecosystem-benefits { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <IntroSplash onDone={() => setIntroDone(true)} hold={1500} lift={700} />
      <NavBar onNavigate={onNavigate} scrolled={scrolled} />

      {/* HERO — cinematic brand film backdrop */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden',
        backgroundColor: '#0B0B0D',
      }}>
        {/* Brand film backdrop. No poster still: first paint holds on the neutral
            charcoal backdrop rather than any branded product image, so the hero
            never leans on a specific car/brand (per client design review). */}
        <HeroVideo
          src="https://res.cloudinary.com/dcjnzvmwc/video/upload/v1783500993/inscape-ui_abzqp4.mp4"
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
              One membership: luxury prize campaigns, members-only offers, and rewards that compound.
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
              Start free with <strong style={{ color: '#fff', fontWeight: 700 }}>3 Credits</strong>, no card required.
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
            <div style={{ font: `600 11px ${font.family}`, letterSpacing: '.16em', textTransform: 'uppercase', color: light.dim, marginBottom: 10 }}>In Partnership With</div>
            <h2 style={{ font: `400 clamp(24px, 2.8vw, 34px)/1.1 ${font.family}`, letterSpacing: '-0.02em', color: light.ink, margin: 0 }}>
              Exceptional benefits. <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>World-leading</span> brands.
            </h2>
          </div>
          {/* single slow strip, large logos — FoundersCard-style credibility shelf */}
          <div className="lp-marquee" style={{ marginBottom: 24 }}>
            <div className="lp-marquee-track">
              {/* content duplicated so the loop is seamless */}
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(56px, 7vw, 110px)', paddingRight: 'clamp(56px, 7vw, 110px)' }}>
                  {CAROUSEL_BRANDS_1.map(brandFile => (
                    <img key={brandFile} src={`/brand/carousel/${brandFile}`} alt={dup === 0 ? brandFile.split('.')[0] : ''}
                      style={{ width: 'clamp(132px, 16.5vw, 198px)', height: 'clamp(35px, 5.5vw, 60px)', mixBlendMode: 'multiply', filter: 'invert(1) grayscale(1)', opacity: 0.8, flexShrink: 0, objectFit: 'contain' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="lp-marquee">
            <div className="lp-marquee-track-reverse">
              {/* content duplicated so the loop is seamless */}
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(56px, 7vw, 110px)', paddingRight: 'clamp(56px, 7vw, 110px)' }}>
                  {CAROUSEL_BRANDS_2.map(brandFile => (
                    <img key={brandFile} src={`/brand/carousel/${brandFile}`} alt={dup === 0 ? brandFile.split('.')[0] : ''}
                      style={{ width: 'clamp(132px, 16.5vw, 198px)', height: 'clamp(35px, 5.5vw, 60px)', mixBlendMode: 'multiply', filter: 'invert(1) grayscale(1)', opacity: 0.8, flexShrink: 0, objectFit: 'contain' }}
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
                <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, margin: '12px 0 0', maxWidth: 520 }}>Browse this month's collection. See what could be yours. Every draw is independently witnessed and audited.</p>
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

      {/* LIGHT EDITORIAL BAND — the value proposition with logo background */}
      <section style={{ background: '#FAF8F4', padding: `clamp(60px, 7vw, 92px) ${PAD} clamp(48px, 6vw, 72px)`, position: 'relative', overflow: 'hidden' }}>
        {/* Logo tile wall: soft partner tiles behind the heading, brick-offset
            rows like the concept render */}
        <div aria-hidden="true" style={{ position: 'absolute', top: -12, left: 0, right: 0, height: 320, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          {TILE_ROWS.map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, flexShrink: 0, justifyContent: 'center', width: '100%', transform: `translateX(${i % 2 === 0 ? '-46px' : '46px'})` }}>
              {row.map((b) => (
                <div key={b} className="lp-eco-tile">
                  <img src={`/brand/carousel/${b}`} alt="" loading="lazy" style={{ maxWidth: '60%', maxHeight: '46%', objectFit: 'contain', mixBlendMode: 'multiply', filter: 'invert(1) grayscale(1)', opacity: 0.5 }} onError={(e) => { e.currentTarget.parentElement.style.visibility = 'hidden'; }} />
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Clear zone over the heading + bottom dissolve so the wall never fights the content */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(250,248,244,0) 0px, rgba(250,248,244,0) 170px, #FAF8F4 330px), radial-gradient(ellipse 640px 260px at 50% 150px, #FAF8F4 16%, rgba(250,248,244,0.8) 52%, rgba(250,248,244,0) 80%)' }} />

        <div className="lp-inner" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><Eyebrow label="WHY INSCAPE" dark={false} /></div>
              <h2 style={{ font: `400 clamp(34px, 4.4vw, 56px)/1.05 ${font.family}`, letterSpacing: '-0.03em', color: '#1A1612', margin: '0 0 14px' }}>
                One membership. <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 500, color: colors.accentDark }}>More to experience.</span>
              </h2>
              <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, maxWidth: 560, margin: '0 auto' }}>
                Premium campaigns, member pricing from leading brands and rewards that build the longer you stay. One membership opens all of it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="lp-ecosystem-grid" style={{ gap: 12 }}>
              {/* Card 1: Premium campaigns */}
              <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,14,0.95) 0%, rgba(10,11,14,0.3) 50%, rgba(10,11,14,0.8) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 1, padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid rgba(238,140,70,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: 'rgba(238,140,70,0.1)' }}>
                    <Icon name="star" size={18} color={colors.accent} />
                  </div>
                  <h3 style={{ font: `500 26px/1.15 ${font.family}`, color: '#fff', marginBottom: 10 }}>Premium<br />campaigns</h3>
                  <p style={{ font: `400 14px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.7)', maxWidth: 280, marginBottom: 12 }}>Join live campaigns for luxury cars, dream getaways, tech, cash and unforgettable experiences.</p>
                  <p style={{ font: `400 14px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.7)', maxWidth: 280 }}>New campaigns.<br />Every month.</p>
                  <div style={{ marginTop: 'auto' }}>
                    <a href="#campaigns" style={{ color: colors.accent, textDecoration: 'none', font: `500 15px ${font.family}`, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>Explore Campaigns <Icon name="arrowRight" size={16} color={colors.accent} /></a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12 }}>
                {/* Card 2: Exclusive experiences */}
                <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', minHeight: 220 }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1555529733-0e670560f4e1?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,11,14,0.96) 0%, rgba(10,11,14,0.45) 100%)' }} />
                  <div style={{ position: 'relative', zIndex: 1, padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid rgba(238,140,70,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: 'rgba(238,140,70,0.1)' }}>
                      <Icon name="gift" size={18} color={colors.accent} />
                    </div>
                    <h3 style={{ font: `500 22px/1.15 ${font.family}`, color: '#fff', marginBottom: 8 }}>Exclusive experiences<br />and partner offers</h3>
                    <p style={{ font: `400 13px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.7)', maxWidth: 300 }}>Access curated travel, hospitality, premium experiences and members-only pricing from leading brands across travel, tech, fashion, lifestyle and more.</p>
                    <div style={{ marginTop: 'auto' }}>
                      <a href="#offers" style={{ color: colors.accent, textDecoration: 'none', font: `500 15px ${font.family}`, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>Browse Offers <Icon name="arrowRight" size={16} color={colors.accent} /></a>
                    </div>
                  </div>
                </div>

                {/* Card 3: Rewards that grow */}
                <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', minHeight: 220 }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,11,14,0.96) 42%, rgba(10,11,14,0.5) 100%)' }} />
                  <div style={{ position: 'relative', zIndex: 1, padding: '24px', flex: 1, display: 'flex', gap: 18 }}>
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid rgba(238,140,70,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: 'rgba(238,140,70,0.1)' }}>
                      <Icon name="chart" size={18} color={colors.accent} />
                    </div>
                    <h3 style={{ font: `500 22px/1.15 ${font.family}`, color: '#fff', marginBottom: 8 }}>Rewards that grow<br />with you</h3>
                    <p style={{ font: `400 13px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.7)', maxWidth: 250 }}>Earn Monthly Credits, Momentum bonuses, referral rewards and early access. The more you engage, the more you unlock.</p>
                    <div style={{ marginTop: 'auto' }}>
                      <a href="#membership" style={{ color: colors.accent, textDecoration: 'none', font: `500 15px ${font.family}`, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>Become a Member <Icon name="arrowRight" size={16} color={colors.accent} /></a>
                    </div>
                  </div>
                    {/* This-month widget sits in flow, so it can never overlap the copy */}
                    <div className="lp-eco-widget" style={{ background: 'rgba(10,11,14,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '16px 20px' }}>
                    <div style={{ font: `500 11px ${font.family}`, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>This month</div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Icon name="wallet" size={15} color={colors.accent} />
                        <span style={{ font: `400 13px ${font.family}`, color: 'rgba(255,255,255,0.85)' }}>Monthly Credits</span>
                      </div>
                      <span style={{ font: `600 14px ${font.family}`, color: '#fff' }}>120</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Icon name="activity" size={15} color={colors.accent} />
                        <span style={{ font: `400 13px ${font.family}`, color: 'rgba(255,255,255,0.85)' }}>Momentum Progress</span>
                      </div>
                      <span style={{ font: `600 14px ${font.family}`, color: '#fff' }}>75%</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
                      <div style={{ width: '75%', height: '100%', background: colors.accent, borderRadius: 2 }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Icon name="users" size={15} color={colors.accent} />
                        <span style={{ font: `400 13px ${font.family}`, color: 'rgba(255,255,255,0.85)' }}>Referral Rewards</span>
                      </div>
                      <span style={{ font: `600 14px ${font.family}`, color: '#fff' }}>+20</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Icon name="gift" size={15} color={colors.accent} />
                        <span style={{ font: `400 13px ${font.family}`, color: 'rgba(255,255,255,0.85)' }}>Bonus Credits</span>
                      </div>
                      <span style={{ font: `600 14px ${font.family}`, color: '#fff' }}>+15</span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="lp-ecosystem-benefits" style={{ background: '#0d0e12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 20 }}>
                <div style={{ font: `600 10px ${font.family}`, letterSpacing: '.12em', color: colors.accent, textTransform: 'uppercase', marginBottom: 14 }}>MEMBERSHIP BENEFITS</div>
                <h3 style={{ font: `500 28px/1.15 ${font.family}`, color: '#fff', marginBottom: 14 }}>More value.<br />Every month.</h3>
                <p style={{ font: `400 14px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Built for members who want more access, more savings and more opportunities.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 40, height: 40, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Icon name="diamond" size={28} color={colors.accent} />
                </div>
                <h4 style={{ font: `500 15px ${font.family}`, color: '#fff', marginBottom: 10 }}>Curated Access</h4>
                <p style={{ font: `400 13px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Handpicked campaigns, offers and experiences you won't find anywhere else.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 40, height: 40, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Icon name="gift" size={28} color={colors.accent} />
                </div>
                <h4 style={{ font: `500 15px ${font.family}`, color: '#fff', marginBottom: 10 }}>Member Rewards</h4>
                <p style={{ font: `400 13px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Unlock recurring rewards, exclusive bonuses and early access.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 40, height: 40, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Icon name="star" size={28} color={colors.accent} />
                </div>
                <h4 style={{ font: `500 15px ${font.family}`, color: '#fff', marginBottom: 10 }}>Lifestyle Perks</h4>
                <p style={{ font: `400 13px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Enjoy tools, services and lifestyle benefits designed to elevate every part of your life.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 40, height: 40, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Icon name="lock" size={28} color={colors.accent} />
                </div>
                <h4 style={{ font: `500 15px ${font.family}`, color: '#fff', marginBottom: 10 }}>Total Flexibility</h4>
                <p style={{ font: `400 13px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Your membership. Your way. Pause, update or cancel anytime — no lock-ins.</p>
              </div>
            </div>
          </Reveal>
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
                <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, margin: '12px 0 0', maxWidth: 500 }}>Members unlock exclusive offers from leading brands. Real savings and more value.</p>
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
                <h2 style={{ font: `400 clamp(32px, 4vw, 48px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>It could be you <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>next.</span></h2>
              </div>
              <p style={{ font: `400 14px/1.6 ${font.family}`, color: light.dim, maxWidth: 320, margin: 0 }}>Every draw is independently witnessed and audited. Real people, real prizes.</p>
            </div>
          </Reveal>
          <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 24, scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory', margin: '0 -24px', padding: '0 24px 24px' }}>
            {WINNERS.map((w, i) => (
              <Reveal key={w.id} delay={i * 90} style={{ minWidth: 300, flexShrink: 0, scrollSnapAlign: 'start' }}>
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
              <h2 style={{ font: `400 clamp(34px, 4.4vw, 52px)/1.04 ${font.family}`, letterSpacing: '-0.03em', color: light.ink, margin: 0 }}>Your access. <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 600, color: colors.accent }}>More to discover.</span></h2>
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
              <p style={{ font: `400 16px/1.6 ${font.family}`, color: light.body, maxWidth: 460, margin: '0 auto' }}>Monthly Credits, Momentum bonuses and exclusive access, scaled to your ambition.</p>
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
                    {(p.price !== 'Free' && p.price !== '$0') && (
                      <span style={{ font: `400 14px ${font.family}`, color: light.dim }}>{annual ? '/yr' : '/mo'}</span>
                    )}
                  </div>
                  <div style={{ font: `500 13px ${font.family}`, color: colors.accent, marginBottom: 8 }}>{annual ? `${p.annualCredits.toLocaleString()} Campaign Credits per year` : `${p.credits} Campaign Credits per month`}</div>
                  <div style={{ font: `400 13px/1.5 ${font.family}`, color: light.body, marginBottom: 26, minHeight: 40 }}>{p.desc}</div>
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

          {/* Free account — a low-friction entry point instead of a separate plan card */}
          <Reveal delay={200}>
            <div className="lp-free-cta" style={{ marginTop: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flexWrap: 'wrap', background: light.soft, border: `1px solid ${light.line}`, borderRadius: 18, padding: '18px 26px' }}>
              <span style={{ font: `400 15px/1.5 ${font.family}`, color: light.body, textAlign: 'center' }}>
                Just exploring? Start free with <strong style={{ color: light.ink, fontWeight: 600 }}>3 Credits</strong> — no card required.
              </span>
              <GhostCTA onClick={() => onNavigate('signup')} size="md">Create free account <Icon name="arrowRight" size={15} color={light.ink} /></GhostCTA>
            </div>
          </Reveal>
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

      {/* APP DOWNLOAD SECTION */}
      <section style={{ padding: `clamp(64px, 8vw, 100px) ${PAD}`, background: '#12100e', textAlign: 'center' }}>
        <div className="lp-inner">
          <Reveal>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}><Eyebrow label="THE INSCAPE APP" dark /></div>
            <h2 style={{ font: `400 clamp(36px, 5vw, 56px)/1.05 ${font.family}`, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px' }}>
              Your membership, <span style={{ fontFamily: font.display, fontStyle: 'italic', fontWeight: 500, color: colors.accent }}>in your pocket.</span>
            </h2>
            <p style={{ font: `400 16px/1.6 ${font.family}`, color: 'rgba(255,255,255,0.7)', maxWidth: 540, margin: '0 auto 40px' }}>
              Browse partner offers, redeem with one tap, and enter live draws, all in one beautifully simple app.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#000', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '8px 20px', textDecoration: 'none', color: '#fff', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.4 9.1c-.06-2.52 2.08-3.77 2.18-3.83-1.18-1.73-3.01-1.97-3.67-2-1.57-.16-3.06.92-3.85.92-.8 0-2.02-.91-3.3-.89-1.66.02-3.19.97-4.05 2.45-1.74 3.02-.44 7.51 1.25 9.95.83 1.19 1.81 2.52 3.1 2.48 1.25-.06 1.74-.82 3.26-.82 1.51 0 1.97.82 3.28.8 1.34-.02 2.19-1.22 3.01-2.41.94-1.39 1.34-2.73 1.36-2.8-.03-.02-2.6-1-2.65-3.86zm-2.09-6.05c.68-.83 1.13-1.98 1-3.13-.98.05-2.19.66-2.9 1.48-.62.72-1.16 1.9-1 3.01 1.09.08 2.2-.53 2.9-1.36z" />
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, opacity: 0.8, lineHeight: 1, marginBottom: 2 }}>Download on the</div>
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1 }}>App Store</div>
                </div>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#000', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '8px 20px', textDecoration: 'none', color: '#fff', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.33 2.6c-.19.19-.33.48-.33.86v17.08c0 .38.14.67.33.86l.04.04 9.5-9.45v-.08L4.37 2.56l-.04.04zm10.5 10.45l2.25 2.25c.84.47 1.44.78 1.44.78l-3.69-3.03zm-3.69-3.03l3.69 3.03L18.52 8c0 0-.6-.31-1.44-.78l-2.25 2.25zM19.98 12c0-.28-.13-.56-.37-.71l-2.12-1.22-3.35 3.35 3.35 3.35 2.12-1.22c.24-.15.37-.43.37-.71z" />
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, opacity: 0.8, lineHeight: 1, marginBottom: 2 }}>GET IT ON</div>
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1 }}>Google Play</div>
                </div>
              </a>
            </div>
            <div style={{ font: `400 12px ${font.family}`, color: 'rgba(255,255,255,0.4)' }}>
              Free download · iPhone + Android · 4.9★ rated
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: light.page, borderTop: `1px solid ${light.line}`, padding: `44px ${PAD}` }}>
        <div className="lp-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <Logo size="sm" showText variant="charcoal" />
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {['Merch', 'Official Rules', 'Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" onClick={(e) => { e.preventDefault(); if (l === 'Merch') onNavigate('merch'); }}
                  style={{ font: `400 13px ${font.family}`, color: light.dim, textDecoration: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = light.ink}
                  onMouseLeave={e => e.currentTarget.style.color = light.dim}
                >{l}</a>
              ))}
            </div>
            <div style={{ font: `400 12px ${font.family}`, color: light.dim }}>© 2026 InScape. All rights reserved.</div>
          </div>

        </div>
      </footer>
    </div>
  );
}
