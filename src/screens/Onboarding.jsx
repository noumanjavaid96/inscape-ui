import { useState } from 'react';
import StatusBar from '../components/StatusBar';

const slides = [
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#FF8000" strokeWidth="1.5"/>
        <path d="M12 7v5l3 2" stroke="#FF8000" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Campaign Credits',
    body: 'Every allocation costs credits. You start with 3 free. Membership or top-ups keep you going. Credits are yours — they never expire.',
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/>
        <rect x="13" y="4" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/>
        <rect x="4" y="13" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/>
        <rect x="13" y="13" width="7" height="7" rx="1.6" stroke="#FF8000" strokeWidth="1.6"/>
      </svg>
    ),
    title: 'Discover campaigns',
    body: 'Browse live campaigns in Travel, Vehicles, Tech & more. One credit = one allocation. Stack allocations to multiply your participation.',
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
        <path d="M13 3 4 14h6l-1 7 9-11h-6z" stroke="#47C7FC" strokeWidth="1.7" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Earn Momentum',
    body: 'Hit 25%, 50%, 75%, 100% allocation milestones each month and earn bonus credits automatically — up to 90 per month.',
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
        <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0" stroke="#47C7FC" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Refer & earn',
    body: 'Share your code. When a friend qualifies, you earn +40 Momentum plus configurable bonus credits. No cap on referrals.',
  },
];

export default function Onboarding({ onNavigate }) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === slides.length - 1;
  const s = slides[slide];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#050505' }}>
      <div style={{ position: 'absolute', top: 80, left: -60, right: -60, height: 340, background: `radial-gradient(50% 55% at 50% 40%, ${slide === 2 || slide === 3 ? 'rgba(71,199,252,0.1)' : 'rgba(255,128,0,0.12)'}, transparent 70%)`, zIndex: 0, transition: 'background 0.4s' }} />
      <StatusBar />

      {/* Skip */}
      <button onClick={() => onNavigate('campaigns')} style={{ position: 'absolute', top: 54, right: 18, zIndex: 30, background: 'none', border: 'none', font: '500 13px Inter', color: '#707070', cursor: 'pointer' }}>Skip</button>

      <div style={{ position: 'absolute', top: 46, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', flexDirection: 'column', padding: '0 28px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          {/* Icon */}
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: slide < 2 ? 'rgba(255,128,0,0.1)' : 'rgba(71,199,252,0.1)', border: `1px solid ${slide < 2 ? 'rgba(255,128,0,0.3)' : 'rgba(71,199,252,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, transition: 'all 0.3s' }}>
            {s.icon}
          </div>

          <div style={{ font: "600 28px/1.1 'Cormorant Garamond', serif", color: '#fff', marginBottom: 12 }}>{s.title}</div>
          <div style={{ font: '400 15px/1.65 Inter', color: '#A3A3A3', maxWidth: 280 }}>{s.body}</div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 6, height: 6, borderRadius: 3, background: i === slide ? '#FF8000' : '#22262c', transition: 'width 0.2s', cursor: 'pointer' }} />
          ))}
        </div>

        <div style={{ paddingBottom: 36 }}>
          <button onClick={() => isLast ? onNavigate('campaigns') : setSlide(s => s + 1)} style={{
            height: 54, borderRadius: 14, background: '#FF8000', width: '100%',
            border: 'none', cursor: 'pointer', font: '600 16px Inter', color: '#050505',
            boxShadow: '0 10px 26px rgba(255,128,0,0.3)',
          }}>
            {isLast ? 'Explore campaigns →' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
