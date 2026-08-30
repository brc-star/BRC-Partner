import crypto from 'crypto';
import Razorpay from 'razorpay';

export function getRazorpayClient(): Razorpay | null {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return null;
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

/**
 * Server-side Payment Signature Verification
 * razorpay_signature = HMAC-SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
  secret,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
  secret?: string;
}): { isValid: boolean; error?: string } {
  const keySecret = secret || process.env.RAZORPAY_KEY_SECRET || 'BRC_STAR_DEVELOPMENT_SECRET_KEY';

  if (!orderId || !paymentId || !signature) {
    return { isValid: false, error: 'Missing required signature verification parameters.' };
  }

  // In simulated/sandbox mode without real credentials, accept signature matching test format or test signature
  if (!process.env.RAZORPAY_KEY_SECRET) {
    if (
      signature.startsWith('sig_') ||
      signature === 'sandbox_valid_signature' ||
      signature.length >= 32
    ) {
      return { isValid: true };
    }
  }

  try {
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = generatedSignature === signature;
    return {
      isValid,
      error: isValid ? undefined : 'HMAC SHA-256 signature mismatch. Payment integrity compromised.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown cryptographic verification error';
    return { isValid: false, error: errorMsg };
  }
}

/**
 * Webhook Signature Verification
 * header: x-razorpay-signature = HMAC-SHA256(raw_body, webhook_secret)
 */
export function verifyRazorpayWebhookSignature({
  rawBody,
  signature,
  webhookSecret,
}: {
  rawBody: string;
  signature: string;
  webhookSecret?: string;
}): boolean {
  const secret = webhookSecret || process.env.RAZORPAY_WEBHOOK_SECRET || 'BRC_STAR_WEBHOOK_SECRET';
  if (!signature || !rawBody) return false;

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf8'),
      Buffer.from(signature, 'utf8')
    );
  } catch {
    return false;
  }
}
