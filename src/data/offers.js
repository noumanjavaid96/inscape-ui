// Partner offers / member discounts. Categories follow the client's
// affiliate taxonomy (Concept_Feedback.xlsx) so API mapping is 1:1. Logos live in public/brand/partners as
// white-on-transparent PNGs (slug = filename). Wire to a real partner feed later.
//
// Redemption model:
//   type 'Promo code'  → member copies `code`, redeems on the partner site (`url`).
//   type 'Tracked link'→ member taps through `url`; discount auto-applies, no code.
// `steps` drives the "How to redeem" list; `terms` the fine print; `expires` the
// validity line. A QR is generated client-side from `url` for in-store partners.
export const PARTNER_OFFERS = [
  { slug: 'nike', brand: 'Nike', category: 'Sport & Fitness', offer: '25% off', detail: 'Members-only discount across the full Nike range.', type: 'Promo code', accent: '#FF8000',
    code: 'INSCAPE25', url: 'https://www.nike.com', expires: 'Dec 31, 2026', inStore: true,
    steps: ['Copy your member code below.', 'Shop the full Nike range online or in-store.', 'Paste the code at checkout, or scan the QR in-store.'],
    terms: 'Valid on full-price items only. One use per member. Cannot be combined with other promotions.' },
  { slug: 'adidas', brand: 'Adidas', category: 'Sport & Fitness', offer: '20% off', detail: 'Exclusive member pricing on footwear and apparel.', type: 'Tracked link', accent: '#47C7FC',
    url: 'https://www.adidas.com', expires: 'Dec 31, 2026',
    steps: ['Tap “Shop this offer” below.', 'Your member discount is applied automatically.', 'Complete your purchase — no code needed.'],
    terms: 'Discount applied via tracked member link. Excludes select collaborations and launch products.' },
  { slug: 'lacoste', brand: 'Lacoste', category: 'Apparel & Fashion', offer: '30% off', detail: 'Members-only savings on the iconic polo collection.', type: 'Promo code', accent: '#FF8000',
    code: 'INSCAPELAC30', url: 'https://www.lacoste.com', expires: 'Nov 30, 2026',
    steps: ['Copy your member code below.', 'Shop the new-season collection online.', 'Enter the code at checkout.'],
    terms: 'Valid on full-price items. One use per member. Excludes gift cards.' },
  { slug: 'guess', brand: 'GUESS', category: 'Apparel & Fashion', offer: '25% off', detail: 'Sitewide member discount on the new season.', type: 'Promo code', accent: '#FF8000',
    code: 'INSCAPEGUESS', url: 'https://www.guess.com', expires: 'Dec 31, 2026',
    steps: ['Copy your member code below.', 'Add new-season pieces to your bag.', 'Apply the code at checkout.'],
    terms: 'Sitewide on full-price items. One use per member.' },
  { slug: 'calvin-klein', brand: 'Calvin Klein', category: 'Apparel & Fashion', offer: '20% off', detail: 'Exclusive rate for InScape members.', type: 'Tracked link', accent: '#47C7FC',
    url: 'https://www.calvinklein.us', expires: 'Dec 31, 2026',
    steps: ['Tap “Shop this offer” below.', 'Your member rate is applied automatically.', 'Check out — no code required.'],
    terms: 'Discount applied via tracked member link. Excludes underwear multipacks.' },
  { slug: 'levis', brand: "Levi's", category: 'Apparel & Fashion', offer: 'Members rate', detail: 'Special pricing on denim and outerwear.', type: 'Tracked link', accent: '#47C7FC',
    url: 'https://www.levi.com', expires: 'Dec 31, 2026',
    steps: ['Tap “Shop this offer” below.', 'Member pricing is applied automatically.', 'Complete your purchase.'],
    terms: 'Discount applied via tracked member link. Select styles only.' },
  { slug: 'champion', brand: 'Champion', category: 'Sport & Fitness', offer: '30% off', detail: 'Members-only discount across collections.', type: 'Promo code', accent: '#FF8000',
    code: 'INSCAPECHAMP', url: 'https://www.champion.com', expires: 'Oct 31, 2026',
    steps: ['Copy your member code below.', 'Shop the collection online.', 'Enter the code at checkout.'],
    terms: 'Valid on full-price items. One use per member.' },
  { slug: 'carhartt', brand: 'Carhartt', category: 'Apparel & Fashion', offer: '15% off', detail: 'Exclusive member savings on workwear.', type: 'Tracked link', accent: '#47C7FC',
    url: 'https://www.carhartt.com', expires: 'Dec 31, 2026',
    steps: ['Tap “Shop this offer” below.', 'Your member saving is applied automatically.', 'Complete your purchase.'],
    terms: 'Discount applied via tracked member link. Excludes clearance.' },
  { slug: 'lavazza', brand: 'Lavazza', category: 'Food & Beverage', offer: '20% off', detail: 'Members-only pricing on premium coffee.', type: 'Promo code', accent: '#FF8000',
    code: 'INSCAPECOFFEE', url: 'https://www.lavazza.com', expires: 'Dec 31, 2026',
    steps: ['Copy your member code below.', 'Fill your basket with premium coffee.', 'Apply the code at checkout.'],
    terms: 'Valid on full-price items. One use per member.' },
  { slug: 'bowers-wilkins', brand: 'Bowers & Wilkins', category: 'Electronics & Appliances', offer: 'Exclusive pricing', detail: 'Member rates on premium audio.', type: 'Tracked link', accent: '#47C7FC',
    url: 'https://www.bowerswilkins.com', expires: 'Dec 31, 2026',
    steps: ['Tap “Shop this offer” below.', 'Member rates are applied automatically.', 'Complete your purchase.'],
    terms: 'Discount applied via tracked member link. Select products only.' },
  { slug: 'lg', brand: 'LG', category: 'Electronics & Appliances', offer: 'Members-only pricing', detail: 'Exclusive electronics offers for members.', type: 'Tracked link', accent: '#47C7FC',
    url: 'https://www.lg.com', expires: 'Dec 31, 2026',
    steps: ['Tap “Shop this offer” below.', 'Member pricing is applied automatically.', 'Complete your purchase.'],
    terms: 'Discount applied via tracked member link. Select products only.' },
];

/** Look up a single offer by its slug (used by the offer-detail screen). */
export function findOffer(slug) {
  return PARTNER_OFFERS.find((o) => o.slug === slug) || null;
}
