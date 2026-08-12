import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Unique per instance so two logos on one page can't clash over defs ids. */
let nextId = 0;

/**
 * The site mark: a chip package with a heart knocked out of the die.
 * Kept in sync with `public/icon.svg`, which is the same artwork shipped as
 * the favicon — edit both, then re-run the icon script.
 */
@Component({
  selector: 'app-logo',
  template: `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient [attr.id]="gradId" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#4de3ff" />
          <stop offset="1" stop-color="#a06bff" />
        </linearGradient>
        <mask [attr.id]="maskId">
          <rect width="32" height="32" fill="#fff" />
          <path [attr.d]="heart" fill="#000" />
        </mask>
      </defs>
      <g [attr.fill]="'url(#' + gradId + ')'" [attr.mask]="'url(#' + maskId + ')'">
        <rect x="6" y="6" width="20" height="20" rx="2" />
        <rect x="1.5" y="9.5" width="4.5" height="3" rx="1" />
        <rect x="1.5" y="14.5" width="4.5" height="3" rx="1" />
        <rect x="1.5" y="19.5" width="4.5" height="3" rx="1" />
        <rect x="26" y="9.5" width="4.5" height="3" rx="1" />
        <rect x="26" y="14.5" width="4.5" height="3" rx="1" />
        <rect x="26" y="19.5" width="4.5" height="3" rx="1" />
        <rect x="9.5" y="1.5" width="3" height="4.5" rx="1" />
        <rect x="14.5" y="1.5" width="3" height="4.5" rx="1" />
        <rect x="19.5" y="1.5" width="3" height="4.5" rx="1" />
        <rect x="9.5" y="26" width="3" height="4.5" rx="1" />
        <rect x="14.5" y="26" width="3" height="4.5" rx="1" />
        <rect x="19.5" y="26" width="3" height="4.5" rx="1" />
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: block;
      width: 1.5rem;
      aspect-ratio: 1;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  private readonly uid = nextId++;
  protected readonly gradId = `wls-grad-${this.uid}`;
  protected readonly maskId = `wls-mask-${this.uid}`;
  protected readonly heart =
    'M16 21.4C16 21.4 9.8 17.4 9.8 13.4C9.8 11.45 11.3 9.9 13.15 9.9C14.45 9.9 15.5 10.75 16 12.3' +
    'C16.5 10.75 17.55 9.9 18.85 9.9C20.7 9.9 22.2 11.45 22.2 13.4C22.2 17.4 16 21.4 16 21.4Z';
}
