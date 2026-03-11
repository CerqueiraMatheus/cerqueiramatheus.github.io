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

## Adding content

1.  **Articles**: Add a `.md` file to `content/articles/` with frontmatter
    (`title`, `date`, `description`).
2.  **Pages**: Edit markdown files in `content/pages/`.
3.  **Site settings**: Edit `config.json` at the root.

## Deploy

Push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds
with SvelteKit and deploys to GitHub Pages.

## Documentation

-   [Copilot instructions](.github/copilot-instructions.md) — architecture and
    conventions.
