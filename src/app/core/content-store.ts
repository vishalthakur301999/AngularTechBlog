import { computed, Injectable, Signal } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { Article, CATEGORIES, Category } from './models/article';

const SOURCES: Record<Category, string> = {
  cpu: 'data/cpus.json',
  gpu: 'data/gpus.json',
  ai: 'data/ai.json',
};

function byNewestFirst(a: Article, b: Article): number {
  return b.date.localeCompare(a.date);
}

/**
 * Loads and indexes every article.
 *
 * Each vertical is a separate `httpResource`, so the JSON stays out of the
 * JS bundle and the loading/error state arrives as signals rather than as
 * something each component has to wire up by hand.
 */
@Injectable({ providedIn: 'root' })
export class ContentStore {
  private readonly resources: Record<Category, HttpResourceRef<readonly Article[]>> = {
    cpu: httpResource<readonly Article[]>(() => SOURCES.cpu, { defaultValue: [] }),
    gpu: httpResource<readonly Article[]>(() => SOURCES.gpu, { defaultValue: [] }),
    ai: httpResource<readonly Article[]>(() => SOURCES.ai, { defaultValue: [] }),
  };

  /** Articles in one vertical, newest first. */
  articles(category: Category): Signal<readonly Article[]> {
    return computed(() => [...this.resources[category].value()].sort(byNewestFirst));
  }

  isLoading(category: Category): Signal<boolean> {
    return this.resources[category].isLoading;
  }

  error(category: Category): Signal<unknown> {
    return this.resources[category].error;
  }

  reload(category: Category): void {
    this.resources[category].reload();
  }

  /** Everything across all three verticals, newest first. */
  readonly all = computed(() =>
    CATEGORIES.flatMap((c) => this.resources[c.id].value()).sort(byNewestFirst),
  );

  readonly anyLoading = computed(() => CATEGORIES.some((c) => this.resources[c.id].isLoading()));

  readonly counts = computed<Record<Category, number>>(() => ({
    cpu: this.resources.cpu.value().length,
    gpu: this.resources.gpu.value().length,
    ai: this.resources.ai.value().length,
  }));

  /** The newest few posts, for the home page feed. */
  latest(limit: number): Signal<readonly Article[]> {
    return computed(() => this.all().slice(0, limit));
  }

  find(category: Category, slug: Signal<string>): Signal<Article | undefined> {
    return computed(() => this.resources[category].value().find((a) => a.slug === slug()));
  }

  /** Other posts in the same vertical, preferring ones that share a tag. */
  related(article: Signal<Article | undefined>, limit: number): Signal<readonly Article[]> {
    return computed(() => {
      const current = article();
      if (!current) {
        return [];
      }
      const tags = new Set(current.tags);
      return [...this.resources[current.category].value()]
        .filter((a) => a.slug !== current.slug)
        .map((a) => ({ a, shared: a.tags.filter((t) => tags.has(t)).length }))
        .sort((x, y) => y.shared - x.shared || byNewestFirst(x.a, y.a))
        .slice(0, limit)
        .map((x) => x.a);
    });
  }
}
