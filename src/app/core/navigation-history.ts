import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

/**
 * Tracks whether the visitor has navigated within the app yet.
 *
 * A back control can only safely call `history.back()` if we put an entry on
 * the stack ourselves — otherwise it would throw the visitor out of the site
 * entirely, which is what deep links from search or a shared URL would hit.
 */
@Injectable({ providedIn: 'root' })
export class NavigationHistory {
  private readonly navigations = signal(0);

  /** True once at least one in-app navigation has happened. */
  readonly canGoBack = computed(() => this.navigations() > 1);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.navigations.update((n) => n + 1));
  }
}
