import { effect, Injectable, signal } from '@angular/core';

export type ThemeName = 'dark' | 'light';

const STORAGE_KEY = 'techblog-theme';

/**
 * Theme preference, persisted to localStorage and reflected onto
 * `<html data-theme>` so the stylesheet can key off it.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  readonly current = signal<ThemeName>(readInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.current();
      document.documentElement.dataset['theme'] = theme;
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Private browsing modes can reject writes; the theme still applies.
      }
    });
  }

  toggle(): void {
    this.current.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}

function readInitialTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch {
    // Fall through to the media query.
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
