import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBar } from './layout/nav-bar/nav-bar';
import { SiteFooter } from './layout/site-footer/site-footer';
import { Theme } from './core/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Instantiated here so the persisted theme is applied on first paint.
  private readonly theme = inject(Theme);
}
