import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { ContentStore } from '../../core/content-store';
import { Article, categoryMeta, Category } from '../../core/models/article';
import { brandStyle } from '../../core/brand';
import { ArticleCard } from '../../shared/article-card/article-card';

@Component({
  selector: 'app-catalog',
  imports: [ArticleCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog {
  /** Bound from the route's `data.category` by `withComponentInputBinding`. */
  readonly category = input.required<Category>();

  private readonly store = inject(ContentStore);

  protected readonly meta = computed(() => categoryMeta(this.category()));
  protected readonly loading = computed(() => this.store.isLoading(this.category())());
  protected readonly failed = computed(() => this.store.error(this.category())() !== undefined);

  private readonly all = computed(() => this.store.articles(this.category())());

  /** Zero-padded article count shown alongside the section masthead. */
  protected readonly total = computed(() => String(this.all().length).padStart(2, '0'));

  protected readonly query = signal('');
  protected readonly brand = signal<string | null>(null);

  protected readonly brands = computed(() => {
    const counts = new Map<string, number>();
    for (const post of this.all()) {
      counts.set(post.brand, (counts.get(post.brand) ?? 0) + 1);
    }
    return [...counts]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count, style: brandStyle(name) }));
  });

  /**
   * Live filtering, replacing the old datalist + "GO" button that read the
   * input with `document.getElementById` and parsed an `id:name` string.
   */
  protected readonly results = computed(() => {
    const brand = this.brand();
    const needle = this.query().trim().toLowerCase();
    return this.all().filter((post) => {
      if (brand && post.brand !== brand) {
        return false;
      }
      return !needle || matches(post, needle);
    });
  });

  protected readonly isFiltered = computed(
    () => this.brand() !== null || this.query().trim() !== '',
  );

  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected selectBrand(name: string): void {
    this.brand.update((current) => (current === name ? null : name));
  }

  protected clearFilters(): void {
    this.brand.set(null);
    this.query.set('');
  }

  protected retry(): void {
    this.store.reload(this.category());
  }
}

function matches(post: Article, needle: string): boolean {
  return (
    post.productName.toLowerCase().includes(needle) ||
    post.shortName.toLowerCase().includes(needle) ||
    post.brand.toLowerCase().includes(needle) ||
    post.title.toLowerCase().includes(needle) ||
    post.summary.toLowerCase().includes(needle) ||
    post.tags.some((tag) => tag.includes(needle))
  );
}
