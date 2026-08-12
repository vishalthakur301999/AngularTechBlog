import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIES } from '../../core/models/article';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Logo],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly categories = CATEGORIES;
  protected readonly year = new Date().getFullYear();
}
