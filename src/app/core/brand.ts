/**
 * Brand accents. Articles without a photograph fall back to a generated
 * gradient card, and these hues are what keep those cards recognisable.
 */
const BRAND_HUES: Record<string, number> = {
  Intel: 205,
  AMD: 358,
  Apple: 200,
  Qualcomm: 230,
  Nvidia: 92,
  OpenAI: 165,
  Anthropic: 20,
  DeepMind: 215,
  DeepSeek: 232,
  Science: 45,
  Policy: 280,
  Infrastructure: 190,
};

/** Stable fallback hue for brands not in the table (e.g. combined bylines). */
function hashHue(brand: string): number {
  let hash = 0;
  for (const char of brand) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }
  return hash;
}

export function brandHue(brand: string): number {
  return BRAND_HUES[brand] ?? hashHue(brand);
}

/** CSS custom property payload consumed by `[style]` bindings on cards. */
export function brandStyle(brand: string): Record<string, string> {
  return { '--brand-hue': String(brandHue(brand)) };
}

/** Two- or three-letter monogram used in generated cards. */
export function brandInitials(brand: string): string {
  return brand
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}
