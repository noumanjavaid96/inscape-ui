import tokens from '../design/tokens';

const { colors } = tokens;

// Close times are expressed relative to load so the live countdowns always read
// sensibly in the demo. Replace with real ISO timestamps from the API later.
const inH = (h) => new Date(Date.now() + h * 3600000);

export const CATEGORIES = ['All', 'Vehicles', 'Travel', 'Tech', 'Cash', 'Lifestyle'];

export const CAMPAIGNS = [
  {
    id: 'range-rover-sport',
    title: 'Range Rover Sport',
    category: 'Vehicles',
    prize: '$92,000',
    prizeValue: 92000,
    cost: 1,
    participants: '4,821',
    status: 'LIVE',
    closesAt: inH(62),
    drawDate: 'Nov 15, 2026',
    gradient: 'linear-gradient(135deg,#1a2030,#0c1018)',
    glow: 'rgba(255,128,0,0.16)',
    blurb: 'Win a brand-new Range Rover Sport in Santorini Black, fully loaded, delivered anywhere in the mainland US.',
  },
  {
    id: 'maldives-escape',
    title: '7 Nights, Maldives',
    category: 'Travel',
    prize: '$18,500',
    prizeValue: 18500,
    cost: 2,
    participants: '2,104',
    status: 'CLOSING SOON',
    closesAt: inH(9.6),
    drawDate: 'Oct 2, 2026',
    gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)',
    glow: 'rgba(240,180,60,0.16)',
    blurb: 'Seven nights in an overwater villa with private pool, half-board and seaplane transfers for two.',
  },
  {
    id: 'macbook-pro-m4',
    title: 'MacBook Pro M4',
    category: 'Tech',
    prize: '$3,499',
    prizeValue: 3499,
    cost: 1,
    participants: '1,338',
    status: 'LIVE',
    closesAt: inH(122),
    drawDate: 'Oct 20, 2026',
    gradient: 'linear-gradient(135deg,#141820,#0a0c10)',
    glow: 'rgba(71,199,252,0.14)',
    blurb: '16-inch MacBook Pro with the M4 Max chip, 48GB memory and 1TB storage.',
  },
  {
    id: 'cash-25k',
    title: '$25,000 Tax-Free Cash',
    category: 'Cash',
    prize: '$25,000',
    prizeValue: 25000,
    cost: 2,
    participants: '6,540',
    status: 'LIVE',
    closesAt: inH(40),
    drawDate: 'Oct 10, 2026',
    gradient: 'linear-gradient(135deg,#19130a,#0c0a06)',
    glow: 'rgba(91,208,138,0.14)',
    blurb: 'Twenty-five thousand dollars paid directly to your account, completely tax-free.',
  },
  {
    id: 'omega-speedmaster',
    title: 'Omega Speedmaster',
    category: 'Lifestyle',
    prize: '$6,200',
    prizeValue: 6200,
    cost: 1,
    participants: '982',
    status: 'LIVE',
    closesAt: inH(170),
    drawDate: 'Oct 28, 2026',
    gradient: 'linear-gradient(135deg,#16161a,#0a0a0c)',
    glow: 'rgba(255,128,0,0.12)',
    blurb: 'The iconic Omega Speedmaster Professional Moonwatch, boxed with full papers.',
  },
  {
    id: 'swiss-alps-retreat',
    title: 'Swiss Alps Retreat',
    category: 'Travel',
    prize: '$12,000',
    prizeValue: 12000,
    cost: 1,
    participants: '—',
    status: 'UPCOMING',
    closesAt: inH(76),
    startsIn: 'Starts in 3d',
    drawDate: 'Nov 5, 2026',
    gradient: 'linear-gradient(135deg,#141c20,#0a0e10)',
    glow: 'rgba(71,199,252,0.12)',
    blurb: 'Five nights in a private chalet above Zermatt with daily lift passes and a guided descent.',
  },
];

export const PAST_WINNERS = [
  { id: 'tesla-model-3', title: 'Tesla Model 3', category: 'Vehicles', prize: '$42,000', winner: 'Sarah M.', location: 'London', date: 'May 15, 2026', gradient: 'linear-gradient(135deg,#1a2030,#0c1018)' },
  { id: 'nyc-weekend', title: 'NYC Weekend Break', category: 'Travel', prize: '$3,200', winner: 'James T.', location: 'Manchester', date: 'Apr 28, 2026', gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)' },
  { id: 'cash-10k', title: '$10,000 Cash', category: 'Cash', prize: '$10,000', winner: 'Priya K.', location: 'Birmingham', date: 'Apr 12, 2026', gradient: 'linear-gradient(135deg,#19130a,#0c0a06)' },
  { id: 'rolex-datejust', title: 'Rolex Datejust 41', category: 'Lifestyle', prize: '$9,800', winner: 'Daniel O.', location: 'Leeds', date: 'Mar 30, 2026', gradient: 'linear-gradient(135deg,#16161a,#0a0a0c)' },
  { id: 'iphone-bundle', title: 'iPhone Pro Bundle', category: 'Tech', prize: '$2,400', winner: 'Aisha R.', location: 'Glasgow', date: 'Mar 18, 2026', gradient: 'linear-gradient(135deg,#141820,#0a0c10)' },
  { id: 'dubai-getaway', title: '5 Nights, Dubai', category: 'Travel', prize: '$7,500', winner: 'Tom W.', location: 'Bristol', date: 'Mar 2, 2026', gradient: 'linear-gradient(135deg,#1a1e28,#0c0e18)' },
];

export const statusColor = (status) =>
  ({ LIVE: colors.accent, 'CLOSING SOON': colors.warning, UPCOMING: colors.info, CLOSED: colors.textDim }[status] || colors.accent);

export const findCampaign = (id) => CAMPAIGNS.find((c) => c.id === id) || CAMPAIGNS[0];
