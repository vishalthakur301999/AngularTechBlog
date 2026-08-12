import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIES } from '../../core/models/article';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="shell missing">
      <p class="eyebrow">404</p>
      <h1>Nothing here.</h1>
      <p class="missing__lede">That address doesn't match anything we've published.</p>
      <nav class="missing__links" aria-label="Sections">
        <a routerLink="/">Home</a>
        @for (category of categories; track category.id) {
          <a [routerLink]="['/', category.id]">{{ category.label }}</a>
        }
      </nav>
    </section>
  `,
  styles: `
    .missing {
      padding-block: var(--space-2xl);
      display: flex;
      flex-direction: column;
      gap: var(--space-2xs);
      align-items: flex-start;
    }

    h1 {
      font-size: var(--step-4);
    }

    .missing__lede {
      color: var(--text-muted);
    }

    .missing__links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-m);
      margin-top: var(--space-m);
      font-family: var(--font-display);
      font-size: var(--step-1);
      color: var(--text-muted);
    }

    .missing__links a:hover {
      color: var(--text);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected readonly categories = CATEGORIES;
}
