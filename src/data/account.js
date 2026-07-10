/**
 * Demo account state. In production this comes from real auth/billing; here it
 * is a single source of truth so every screen (Dashboard, Wallet, Campaign
 * Access) shows the same balance, tier and contextual copy.
 *
 * state is one of: 'free' | 'member' | 'past-due'. A 'free' user has no active
 * membership; 'member' and 'past-due' both carry a paid plan (past-due just
 * needs its payment fixed), so they see the "paid member" messaging.
 */
export const ACCOUNT = {
  state: 'member',
  name: 'Alex Mercer',
  tier: 'Premium',
  balance: 124,
  monthlyCredits: 120,
};

/** True when the account carries a paid membership (active or past-due). */
export const isMember = ACCOUNT.state !== 'free';

/**
 * Contextual copy for the Campaign Access / top-up flow. Free users are buying
 * credits to participate; paid members are topping up on top of their monthly
 * allocation. The packages and pricing are identical — only the framing changes.
 */
export const accessCopy = isMember
  ? {
      eyebrow: 'Add extra credits',
      subtitle: 'Add extra Campaign Credits to your balance and Boost your odds.',
      note: 'These packages are optional extra credits, separate from your monthly membership allocation.',
    }
  : {
      eyebrow: 'Get campaign credits',
      subtitle: 'Add Campaign Credits to your account and allocate them across eligible active Campaigns.',
      note: 'Credits are added to your account balance and can then be allocated across eligible active Campaigns.',
    };
