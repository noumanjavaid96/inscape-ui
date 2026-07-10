import { useState } from 'react';
import tokens from '../design/tokens';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Icon from '../components/ui/Icon';
import PageHeader from '../components/layout/PageHeader';

const { colors, font, radius } = tokens;

const TOPICS = [
  { icon: 'wallet', label: 'Payments & Credits', sub: 'Top-ups, membership, refunds' },
  { icon: 'target', label: 'A campaign I joined', sub: 'Participation, status, draws' },
  { icon: 'trophy', label: 'Winning & claims', sub: 'Verification and prize fulfilment' },
  { icon: 'users', label: 'Account & access', sub: 'Sign-in, security, your data' },
];

const RECENT = [
  { ref: 'INS-PAY-7F3A9C', title: 'Top-up, Gold pack', detail: 'Resolved · Credits posted', color: colors.success },
  { ref: 'INS-ALLOC-2B91D', title: 'Joined Range Rover Sport', detail: 'Confirmed · receipt available', color: colors.textMuted },
];

export default function Support({ onNavigate }) {
  const [reference, setReference] = useState('');
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: font.family }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isDesktop ? '40px 48px' : isMobile ? '24px 20px 100px' : '32px 32px' }}>

        <PageHeader title="Help & support" subtitle="We can look up any payment, Credit or campaign by its reference." backAction={() => onNavigate('profile')} />

        {/* Reference lookup */}
        <Card padding="lg" style={{ marginBottom: 20 }}>
          <h2 style={{ font: `600 16px ${font.family}`, color: colors.text, margin: '0 0 6px' }}>Look up a reference</h2>
          <p style={{ font: `400 13px ${font.family}`, color: colors.textDim, margin: '0 0 16px' }}>Find the reference on any wallet, payment or campaign receipt (e.g. INS-PAY-7F3A9C).</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <Input label="Reference ID" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="INS-…" style={{ flex: 1, minWidth: 200, marginBottom: 0 }} />
            <Button size="lg">Look up</Button>
          </div>
        </Card>

        {/* Topics */}
        <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: '8px 0 14px' }}>What do you need help with?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 14, marginBottom: 24 }}>
          {TOPICS.map((t) => (
            <Card key={t.label} padding="md" hover onClick={() => {}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: radius.md, background: colors.bg5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={t.icon} size={20} color={colors.accent} />
                </div>
                <div>
                  <div style={{ font: `600 14px ${font.family}`, color: colors.text }}>{t.label}</div>
                  <div style={{ font: `400 12px ${font.family}`, color: colors.textDim, marginTop: 2 }}>{t.sub}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent activity references */}
        <Card padding="lg" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '16px 22px', borderBottom: `1px solid ${colors.borderFaint}` }}>
            <h3 style={{ font: `600 15px ${font.family}`, color: colors.text, margin: 0 }}>Your recent references</h3>
          </div>
          {RECENT.map((r, i) => (
            <div key={r.ref} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderBottom: i < RECENT.length - 1 ? `1px solid ${colors.borderFaint}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ font: `500 14px ${font.family}`, color: colors.text }}>{r.title}</div>
                <div style={{ font: `400 12px monospace`, color: colors.textFaint, marginTop: 2 }}>{r.ref}</div>
              </div>
              <span style={{ font: `500 12px ${font.family}`, color: r.color }}>{r.detail}</span>
            </div>
          ))}
        </Card>

        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ font: `600 14px ${font.family}`, color: colors.text }}>Still need a hand?</div>
              <div style={{ font: `400 12px ${font.family}`, color: colors.textDim, marginTop: 2 }}>Our team replies within 24 hours, with your full history to hand.</div>
            </div>
            <Button size="md">Contact support</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
