# Etch

A concise tech blog about CPUs, GPUs and AI. Originally built on Angular 11 in 2021,
rebuilt on Angular 22.

The masthead is **Etch**; _"We Love Silicon."_ is the hero line, carried over from the
original site.

## Requirements

Node `^22.22.3 || ^24.15.0 || >=26.0.0` (see `.nvmrc`). Angular 22's CLI will refuse
to run on older releases.

```bash
nvm use
npm install
```

## Scripts

| Command          | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `npm start`      | Dev server on http://localhost:4200                 |
| `npm run build`  | Production build into `dist/etch`                   |
| `npm test`       | Unit tests (Vitest)                                 |
| `npm run lint`   | ESLint over TypeScript and templates                |
| `npm run format` | Prettier over `src`                                 |

## How it's put together

- **Standalone components throughout.** There are no `NgModule`s; `main.ts` calls
  `bootstrapApplication` and each component declares its own `imports`.
- **Zoneless.** Angular 22 does not ship `zone.js`, and state changes propagate
  through signals instead.
- **Signals for all state.** `ContentStore` exposes articles, counts and loading
  state as signals; the catalog's search and brand filters are `computed` over them.
- **`httpResource` for data.** Each vertical's JSON is fetched reactively, keeping
  the content out of the JS bundle and giving loading/error state for free.
- **Route-driven inputs.** `withComponentInputBinding()` binds `:slug` path params
  and route `data` straight to `input()` signals, so no component injects
  `ActivatedRoute`.
- **Lazy routes.** Every page is a `loadComponent`, generated from the `CATEGORIES`
  table in `core/models/article.ts`.
- **One list and one detail component** serve all three verticals. CPUs, GPUs and
  AI stories share the `Article` shape.

## Content

Articles live in `public/data/{cpus,gpus,ai}.json` and are served as static files —
adding a post means adding an object, no rebuild of component code required.

Every article uses the same schema (see the `Article` interface). Hardware posts
tend to carry `specs`, `pros`, `cons` and a `verdict`; AI posts use `specs` for key
facts and `verdict` for why the story mattered. `image` is optional — posts without
one render a generated card in the brand's accent colour.

## Adding a vertical

Add an entry to `CATEGORIES`, drop a JSON file in `public/data/`, and register it in
`ContentStore`. Routes, navigation and the footer all read from that table.
