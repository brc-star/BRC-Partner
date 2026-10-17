/**
 * WhatsApp integration helper for BRC STAR Partner
 * Destination phone number: +919913159932 (Verified in lib/site-config.ts)
 */

export interface WhatsAppPrefillParams {
  businessName?: string;
  industry?: string;
  requirement?: string;
  budget?: string;
  preferredTime?: string;
  customMessage?: string;
}

export const WHATSAPP_PHONE_NUMBER = '919913159932';

export function getWhatsAppUrl(params?: WhatsAppPrefillParams): string {
  if (params?.customMessage) {
    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(params.customMessage)}`;
  }

  const industry = params?.industry || 'General Business';
  const requirement = params?.requirement || 'Website / Custom Software / AI Automation';
  const businessName = params?.businessName || '';
  const budget = params?.budget || '';
  const preferredTime = params?.preferredTime || '';

  const message = [
    'Hello BRC STAR Partner! I am interested in your digital solutions.',
    '',
    `Business name: ${businessName}`,
    `Industry: ${industry}`,
    `Requirement: ${requirement}`,
    `Budget: ${budget}`,
    `Preferred contact time: ${preferredTime}`,
    '',
    'Please share the suitable package, inclusions and next steps.',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
