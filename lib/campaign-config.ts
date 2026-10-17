/**
 * Centralized configuration for BRC STAR Partner promotional campaigns.
 */

export interface PromotionalCampaign {
  id: string;
  name: string;
  badge: string;
  headline: string;
  subheadline: string;
  offerHighlight: string;
  packageId: string;
  packageName: string;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  formattedOriginalPrice: string;
  formattedDiscountedPrice: string;
  gstNote: string;
  razorpayPaymentUrl: string;
  countdownMinutes: number;
  popupDelayMs: number;
  frequencyDays: number;
  storageKeyTimer: string;
  storageKeyDismissed: string;
  excludedRoutes: string[];
}

export const NAVRATRI_CAMPAIGN: PromotionalCampaign = {
  id: 'navratri-special-2026',
  name: 'Navratri Special',
  badge: 'NAVRATRI SPECIAL • 50% OFF',
  headline: 'Celebrate Navratri with 50% OFF!',
  subheadline: 'Give your business a stronger digital presence with BRC STAR Partner.',
  offerHighlight: 'Save 50% on our Basic Website Package for a limited 5-minute session window.',
  packageId: 'plan-webdev-basic-in',
  packageName: 'Basic Website Package',
  originalPrice: 29999,
  discountPercentage: 50,
  discountedPrice: 14999,
  formattedOriginalPrice: '₹29,999',
  formattedDiscountedPrice: '₹14,999',
  gstNote: '+ 18% GST applicable. 100% full source code ownership & 30 days post-launch support included.',
  razorpayPaymentUrl: 'https://rzp.io/rzp/vY9Rta9N',
  countdownMinutes: 5,
  popupDelayMs: 3500, // Show after 3.5 seconds on eligible pages
  frequencyDays: 3, // Frequency cap: once every 3 days if dismissed
  storageKeyTimer: 'brc_navratri_timer_expiry',
  storageKeyDismissed: 'brc_navratri_promo_dismissed',
  excludedRoutes: [
    '/payment/success',
    '/payment/failed',
    '/checkout',
    '/dashboard',
    '/login',
  ],
};

/**
 * Validates that the Razorpay URL is secure and matches an official Razorpay payment page domain.
 */
export function isValidRazorpayUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    return (
      hostname === 'rzp.io' ||
      hostname.endsWith('.rzp.io') ||
      hostname === 'pages.razorpay.com' ||
      hostname.endsWith('.razorpay.com')
    );
  } catch {
    return false;
  }
}
