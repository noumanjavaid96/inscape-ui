export default function StatusBar() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 46,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '15px 24px 0', zIndex: 30,
    }}>
      <span style={{ font: '600 14px/1 Inter', color: '#fff' }}>9:41</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 11 }}>
          {[4, 6, 8, 11].map((h, i) => (
            <i key={i} style={{ width: 3, height: h, background: '#fff', borderRadius: 1, display: 'block' }} />
          ))}
        </span>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.4a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5Z" fill="#fff"/>
          <path d="M3.6 6.3a6.2 6.2 0 018.8 0M1.4 4.1a9.3 9.3 0 0113.2 0" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <span style={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <span style={{ width: 22, height: 11, border: '1px solid rgba(255,255,255,0.5)', borderRadius: 3, display: 'flex', alignItems: 'center', padding: 1.5 }}>
            <span style={{ width: 15, height: '100%', background: '#fff', borderRadius: 1, display: 'block' }} />
          </span>
          <span style={{ width: 1.5, height: 4, background: 'rgba(255,255,255,0.5)', borderRadius: '0 1px 1px 0', display: 'block' }} />
        </span>
      </span>
    </div>
  );
}
