import { Routes } from '@angular/router';

import { CATEGORIES } from './core/models/article';

/**
 * One catalog route and one detail route per vertical, generated from the
 * category table — adding a fourth vertical means adding one entry there.
 * Components are lazily loaded so the shell stays small.
 */
const categoryRoutes: Routes = CATEGORIES.flatMap((meta) => [
  {
    path: meta.id,
    loadComponent: () => import('./features/catalog/catalog').then((m) => m.Catalog),
    data: { category: meta.id },
    title: `${meta.label} — We Love Silicon`,
  },
  {
    path: `${meta.id}/:slug`,
    loadComponent: () =>
      import('./features/article-detail/article-detail').then((m) => m.ArticleDetail),
    data: { category: meta.id },
  },
]);

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'We Love Silicon — CPUs, GPUs and AI',
  },
  ...categoryRoutes,
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    title: 'Not found — We Love Silicon',
  },
];
