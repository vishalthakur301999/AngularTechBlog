import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ContentStore } from './content-store';
import { Article } from './models/article';

function article(partial: Partial<Article> & Pick<Article, 'slug' | 'category'>): Article {
  return {
    brand: 'Intel',
    productName: partial.slug,
    shortName: partial.slug,
    title: 'A title',
    summary: 'A summary',
    specs: [],
    body: [],
    author: 'Vishal Thakur',
    date: '2024-01-01',
    link: 'https://example.com',
    linkLabel: 'Product page',
    tags: [],
    ...partial,
  } as Article;
}

describe('ContentStore', () => {
  let store: ContentStore;
  let http: HttpTestingController;

  /**
   * Answers the three JSON requests the store fires. The leading tick lets
   * the resources schedule their requests — they are not sent synchronously
   * on injection.
   */
  async function flush(data: { cpu?: Article[]; gpu?: Article[]; ai?: Article[] } = {}) {
    TestBed.tick();
    http.expectOne('data/cpus.json').flush(data.cpu ?? []);
    http.expectOne('data/gpus.json').flush(data.gpu ?? []);
    http.expectOne('data/ai.json').flush(data.ai ?? []);
    await TestBed.inject(ApplicationRef).whenStable();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(ContentStore);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sorts each vertical newest first', async () => {
    await flush({
      cpu: [
        article({ slug: 'older', category: 'cpu', date: '2021-04-14' }),
        article({ slug: 'newer', category: 'cpu', date: '2025-03-11' }),
      ],
    });

    expect(
      store
        .articles('cpu')()
        .map((a) => a.slug),
    ).toEqual(['newer', 'older']);
  });

  it('counts each vertical independently', async () => {
    await flush({
      cpu: [article({ slug: 'a', category: 'cpu' })],
      ai: [article({ slug: 'b', category: 'ai' }), article({ slug: 'c', category: 'ai' })],
    });

    expect(store.counts()).toEqual({ cpu: 1, gpu: 0, ai: 2 });
  });

  it('interleaves verticals by date in the combined feed', async () => {
    await flush({
      cpu: [article({ slug: 'cpu-2024', category: 'cpu', date: '2024-06-01' })],
      gpu: [article({ slug: 'gpu-2025', category: 'gpu', date: '2025-01-30' })],
      ai: [article({ slug: 'ai-2022', category: 'ai', date: '2022-11-30' })],
    });

    expect(store.all().map((a) => a.slug)).toEqual(['gpu-2025', 'cpu-2024', 'ai-2022']);
    expect(
      store
        .latest(2)()
        .map((a) => a.slug),
    ).toEqual(['gpu-2025', 'cpu-2024']);
  });

  it('finds an article by slug within its vertical', async () => {
    await flush({ gpu: [article({ slug: 'nvidia-geforce-rtx-5090', category: 'gpu' })] });

    expect(store.find('gpu', signal('nvidia-geforce-rtx-5090'))()?.slug).toBe(
      'nvidia-geforce-rtx-5090',
    );
    expect(store.find('gpu', signal('nope'))()).toBeUndefined();
  });

  it('ranks related articles by shared tags, then by date', async () => {
    const current = article({ slug: 'current', category: 'cpu', tags: ['x3d', 'am5'] });
    await flush({
      cpu: [
        current,
        article({ slug: 'no-overlap', category: 'cpu', date: '2025-12-01', tags: ['intel'] }),
        article({ slug: 'one-tag', category: 'cpu', date: '2020-01-01', tags: ['am5'] }),
        article({ slug: 'two-tags', category: 'cpu', date: '2019-01-01', tags: ['x3d', 'am5'] }),
      ],
    });

    const related = store.related(signal<Article | undefined>(current), 3);
    expect(related().map((a) => a.slug)).toEqual(['two-tags', 'one-tag', 'no-overlap']);
  });

  it('excludes the current article from its own related list', async () => {
    const current = article({ slug: 'current', category: 'ai', tags: ['2025'] });
    await flush({ ai: [current] });

    expect(store.related(signal<Article | undefined>(current), 3)()).toEqual([]);
  });
});
