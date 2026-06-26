import { useState } from 'react';

const SLIDES = [
  { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#FF8000" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#FF8000" strokeWidth="1.6" strokeLinecap="round"/></svg>, title: 'Campaign Credits', body: 'Every allocation costs credits. You start with 3 free. Membership or top-ups keep you going. Credits are yours — they never expire.', accent: '#FF8000' },
  { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/></svg>, title: 'Discover Campaigns', body: 'Browse live campaigns in Travel, Vehicles, Tech & more. One credit = one allocation. Stack allocations to multiply your participation.', accent: '#FF8000' },
  { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none"><path d="M13 3 4 14h6l-1 7 9-11h-6z" stroke="#47C7FC" strokeWidth="1.7" strokeLinejoin="round"/></svg>, title: 'Earn Momentum', body: 'Hit 25%, 50%, 75%, 100% allocation milestones each month and earn bonus credits automatically — up to 90 per month.', accent: '#47C7FC' },
  { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none"><path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0" stroke="#47C7FC" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Refer & Earn', body: 'Share your code. When a friend qualifies, you earn +40 Momentum plus bonus credits. No cap on referrals.', accent: '#47C7FC' },
];

export default function Onboarding({ onNavigate }) {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 50% 40%, ${slide >= 2 ? 'rgba(71,199,252,0.08)' : 'rgba(255,128,0,0.08)'}, transparent)`, transition: 'background 0.4s', pointerEvents: 'none' }} />

      <button onClick={() => onNavigate('campaigns')} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', font: '500 14px Inter', color: '#707070', cursor: 'pointer' }}>Skip</button>

      <div style={{ width: '100%', maxWidth: 480, textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: slide >= 2 ? 'rgba(71,199,252,0.1)' : 'rgba(255,128,0,0.1)', border: `1px solid ${s.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', transition: 'all 0.3s' }}>
          {s.icon}
        </div>

        <h1 style={{ font: "600 36px/1.1 'Cormorant Garamond',serif", color: '#fff', margin: '0 0 14px' }}>{s.title}</h1>
        <p style={{ font: '400 16px/1.65 Inter', color: '#A3A3A3', margin: '0 0 40px', maxWidth: 360, display: 'inline-block' }}>{s.body}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 32 }}>
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 6, height: 6, borderRadius: 3, background: i === slide ? s.accent : '#22262c', transition: 'all 0.2s', cursor: 'pointer' }} />
          ))}
        </div>

        <button onClick={() => isLast ? onNavigate('campaigns') : setSlide(v => v + 1)} style={{ width: '100%', height: 54, borderRadius: 14, background: s.accent, border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505', boxShadow: `0 10px 26px ${s.accent}40`, transition: 'all 0.3s' }}>
          {isLast ? 'Explore campaigns →' : 'Next'}
        </button>
      </div>
    </div>
  );
}
