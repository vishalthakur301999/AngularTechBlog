import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { CATEGORIES } from '../../core/models/article';
import { Theme } from '../../core/theme';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  private readonly router = inject(Router);
  protected readonly theme = inject(Theme);
  protected readonly categories = CATEGORIES;
  protected readonly menuOpen = signal(false);

  constructor() {
    // The old nav toggled classes via getElementById and reset itself on
    // `window.onresize`. Closing on navigation is the case that mattered;
    // the responsive behaviour is now pure CSS.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
