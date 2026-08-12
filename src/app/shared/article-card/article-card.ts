import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Article } from '../../core/models/article';
import { brandInitials, brandStyle } from '../../core/brand';

@Component({
  selector: 'app-article-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style]': 'accent()' },
})
export class ArticleCard {
  readonly article = input.required<Article>();
  /** Renders the vertical badge — useful in the mixed home feed. */
  readonly showCategory = input(false);
  /** Position in the listing, shown as a catalog-style part number. */
  readonly index = input<number | null>(null);

  protected readonly accent = computed(() => brandStyle(this.article().brand));
  protected readonly initials = computed(() => brandInitials(this.article().brand));
  protected readonly indexLabel = computed(() => String(this.index() ?? 0).padStart(3, '0'));
}
