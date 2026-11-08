/**
 * Single source of truth for every private or deployment-specific value.
 *
 * Values wrapped in {{ }} are placeholders. A production build (`npm run build`)
 * fails while any placeholder remains; see `scripts/check-placeholders.ts`.
 * Use `npm run build:preview` to build a staging copy with placeholders.
 */
export const site = {
  url: 'https://martinavila.eu',
  legalName: 'Charly Martin-Avila',
  tradingName: 'Martin Avila Technologies',
  status: 'Sole trader',
  city: 'Dublin',
  country: 'Ireland',
  countryCode: 'IE',
  businessAddress: 'Ardcairn House, 18 Grangegorman Lower\nDublin 7, D07 KH34',
  vatNumber: 'IE0565922VB',
  hosting: {
    // LetsHost (letshost.ie), operated by this legal entity; registered office.
    name: 'Team Blue Internet Services IE Limited (LetsHost)',
    address: 'Deltona House, Six Cross Roads Business Park\nWaterford, X91 TX8Y, Ireland',
  },
  linkedin: 'https://linkedin.com/in/napoknot21',
  github: 'https://github.com/napoknot21',
  // No email address anywhere on the site: the contact form is the only channel,
  // and its receiving address lives in the Formspree dashboard.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '',
} as const;

export type Site = typeof site;
