import { brandHue, brandInitials, brandStyle } from './brand';

describe('brand helpers', () => {
  it('gives known brands their assigned hue', () => {
    expect(brandHue('Nvidia')).toBe(92);
    expect(brandHue('AMD')).toBe(358);
  });

  it('derives a stable hue for unknown brands', () => {
    const first = brandHue('Some New Lab');
    expect(first).toBe(brandHue('Some New Lab'));
    expect(first).toBeGreaterThanOrEqual(0);
    expect(first).toBeLessThan(360);
  });

  it('exposes the hue as a CSS custom property', () => {
    expect(brandStyle('Intel')).toEqual({ '--brand-hue': '205' });
  });

  it('builds initials from at most two words, splitting on slashes', () => {
    expect(brandInitials('Intel')).toBe('I');
    expect(brandInitials('Google DeepMind')).toBe('GD');
    expect(brandInitials('GitHub / OpenAI')).toBe('GO');
    expect(brandInitials('Meta / Mistral')).toBe('MM');
  });
});
