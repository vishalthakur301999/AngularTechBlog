import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

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
  private readonly atTop = signal(true);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /**
   * The home page's hero runs the full height of the viewport, so the bar
   * sits directly on top of it with no background until you scroll away —
   * a solid black strip over the artwork reads as dated.
   */
  protected readonly overlay = computed(
    () => this.url() === '/' && this.atTop() && !this.menuOpen(),
  );

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

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.atTop.set(window.scrollY < 40);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
