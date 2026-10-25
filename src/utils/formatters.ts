/**
 * Formats Philippine centavos into clean PHP currency string (e.g. ₱480.00)
 */
export function formatPHP(centavos: number): string {
  const pesos = centavos / 100;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pesos);
}

/**
 * Validates promo codes and returns discount percentage or special perk
 */
export function evaluatePromoCode(code: string, subtotalCentavos: number): {
  valid: boolean;
  discountCentavos: number;
  freeShipping: boolean;
  message: string;
} {
  const normalized = code.trim().toUpperCase();

  if (normalized === 'WELCOME10') {
    const discount = Math.round(subtotalCentavos * 0.10);
    return {
      valid: true,
      discountCentavos: discount,
      freeShipping: false,
      message: '10% New Reader Welcome discount applied!',
    };
  }

  if (normalized === 'BOOKNEST15') {
    const discount = Math.round(subtotalCentavos * 0.15);
    return {
      valid: true,
      discountCentavos: discount,
      freeShipping: false,
      message: '15% BookNest Member discount applied!',
    };
  }

  if (normalized === 'FREESHIP') {
    return {
      valid: true,
      discountCentavos: 0,
      freeShipping: true,
      message: 'Complimentary shipping applied!',
    };
  }

  if (normalized === 'LITERARY20') {
    const discount = Math.round(subtotalCentavos * 0.20);
    return {
      valid: true,
      discountCentavos: discount,
      freeShipping: false,
      message: '20% Literary Guild Collector discount applied!',
    };
  }

  return {
    valid: false,
    discountCentavos: 0,
    freeShipping: false,
    message: 'Invalid promo code. Try "BOOKNEST15" or "WELCOME10".',
  };
}

/**
 * Standard shipping cost in centavos
 * Free delivery for orders over ₱1,500.00 (150,000 centavos)
 */
export const STANDARD_SHIPPING_CENTAVOS = 9500; // ₱95.00
export const EXPRESS_SHIPPING_CENTAVOS = 16000; // ₱160.00
export const FREE_SHIPPING_THRESHOLD_CENTAVOS = 150000; // ₱1,500.00

export function calculateShipping(
  subtotalCentavos: number,
  method: 'standard' | 'express' = 'standard',
  promoFreeShipping = false
): number {
  if (subtotalCentavos === 0) return 0;
  if (promoFreeShipping) {
    return method === 'express' ? 6500 : 0;
  }
  if (subtotalCentavos >= FREE_SHIPPING_THRESHOLD_CENTAVOS) {
    return method === 'express' ? 6500 : 0;
  }
  return method === 'express' ? EXPRESS_SHIPPING_CENTAVOS : STANDARD_SHIPPING_CENTAVOS;
}

/**
 * Generates an authentic simulation order code
 */
export function generateReferenceCode(): string {
  const prefix = 'BN-PH';
  const year = '2026';
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${year}-${randomChars}`;
}
