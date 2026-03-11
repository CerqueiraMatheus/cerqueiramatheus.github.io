# mhcp.dev

Personal website for Matheus Cerqueira, served at
[www.mhcp.dev](https://www.mhcp.dev).

**Status:** active.

## How to use

```sh
npm install
npm run dev
```

Or build and preview:

```sh
./run.sh
```

Requires [Pandoc](https://pandoc.org/) installed locally.

## Adding content

```sh
npm run new
```

Or manually:

1.  **Posts**: Create `content/posts/<slug>/` with `article.tex` and
    optionally `refs.bib` and `assets/`.
2.  **Presentations**: Create `content/presentations/<slug>/` with
    `article.tex` including a `% url:` field for the PDF embed.
3.  **Pages**: Edit `.tex` files in `content/pages/`.
4.  **Publications**: Edit `content/refs.bib`.
5.  **Site settings**: Edit `config.yml`.

## Testing

```sh
npm test
npm run test:coverage
```

## Deploy

Push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds
with Pandoc + SvelteKit and deploys to GitHub Pages.

## Documentation

-   [Copilot instructions](.github/copilot-instructions.md) — architecture and
    conventions.
