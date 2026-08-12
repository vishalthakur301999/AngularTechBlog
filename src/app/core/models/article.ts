/** The three content verticals the blog publishes. */
export type Category = 'cpu' | 'gpu' | 'ai';

/** A single label/value row rendered in an article's spec strip. */
export interface Spec {
  readonly label: string;
  readonly value: string;
}

/**
 * One blog post. CPUs, GPUs and AI stories share this shape so a single
 * list component and a single detail component can render all three
 * verticals — the old app had a near-identical pair per vertical.
 */
export interface Article {
  readonly slug: string;
  readonly category: Category;
  /** Manufacturer for hardware, organisation or theme for AI stories. */
  readonly brand: string;
  readonly productName: string;
  /** Short label used on cards and in the search box. */
  readonly shortName: string;
  readonly title: string;
  readonly summary: string;
  readonly specs: readonly Spec[];
  /** Article body, one string per paragraph. */
  readonly body: readonly string[];
  readonly pros?: readonly string[];
  readonly cons?: readonly string[];
  readonly verdict?: string;
  readonly author: string;
  /** ISO 8601 date, so it sorts and formats without custom parsing. */
  readonly date: string;
  readonly link: string;
  readonly linkLabel: string;
  /** Optional hero image; cards fall back to a generated brand gradient. */
  readonly image?: string | null;
  readonly tags: readonly string[];
}

/** Metadata that drives the shell: nav, hero copy and route configuration. */
export interface CategoryMeta {
  readonly id: Category;
  readonly label: string;
  readonly tagline: string;
  readonly blurb: string;
  readonly image: string;
}

export const CATEGORIES: readonly CategoryMeta[] = [
  {
    id: 'cpu',
    label: 'CPUs',
    tagline: 'Cores, clocks and cache',
    blurb: 'From Rocket Lake to Zen 5 and Apple silicon — the chips that set the pace.',
    image: 'assets/img/indexcpu.png',
  },
  {
    id: 'gpu',
    label: 'GPUs',
    tagline: 'Rasters, rays and tensors',
    blurb: 'Ampere to Blackwell, RDNA to Battlemage — and what actually renders faster.',
    image: 'assets/img/indexgpu.png',
  },
  {
    id: 'ai',
    label: 'AI',
    tagline: 'Five years that rewrote computing',
    blurb: 'The models, the moments and the money — from AlphaFold to the agent era.',
    image: 'assets/img/cpuback.jpg',
  },
] as const;

export function categoryMeta(id: Category): CategoryMeta {
  const meta = CATEGORIES.find((c) => c.id === id);
  if (!meta) {
    throw new Error(`Unknown category: ${id}`);
  }
  return meta;
}
