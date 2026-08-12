import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentStore } from '../../core/content-store';
import { CATEGORIES } from '../../core/models/article';
import { ArticleCard } from '../../shared/article-card/article-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ArticleCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly store = inject(ContentStore);

  protected readonly categories = CATEGORIES;
  protected readonly counts = this.store.counts;
  protected readonly loading = this.store.anyLoading;
  protected readonly latest = this.store.latest(6);
}
