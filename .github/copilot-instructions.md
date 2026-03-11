# Copilot Instructions — mhcp.dev

## Build and lint

```sh
npm run dev          # Dev server with HMR
npm run build        # Production build (static output to build/)
npm run check        # TypeScript + Svelte type-checking
./run.sh             # Install, build, and preview
```

## Architecture

SvelteKit static site (`@sveltejs/adapter-static`) deployed to GitHub Pages at `www.mhcp.dev`. Extreme minimalist design: Cascadia Mono font, two-color monochrome palette, no decorative elements.

**Configuration:**
- `config.json` (root) — All site strings, URLs, profile, social links, nav, font URL, AdSense client ID. Edit this file to change any site setting.
- `src/lib/config.ts` — Imports `config.json`, exports typed `CONFIG` object and `ArticleMeta` interface.

**Content (file-based):**
```
content/
  articles/
    being-a-scientist.md   # Frontmatter: title, date (YYYY-MM), description
  pages/
    about.md               # About page prose
    publications.md        # Numbered citation list
```

**Key modules:**
- `src/lib/content/index.ts` — Article loader via `import.meta.glob`. Exports `articles`, `getArticle()`.

**Route structure:**
- `/` — Landing page: avatar, name, role, social text links. Vertically centered.
- `/about` — About page (markdown)
- `/articles` — Article list: `date — title` rows
- `/articles/[slug]` — Article detail (markdown via mdsvex)
- `/publications` — Publications (markdown)

## Key conventions

- **Svelte 5 runes**: `$props()`, `$derived`, `$state`. No legacy syntax.
- **Extreme minimalism**: No borders, shadows, radius, gradients, icons, emoji, transitions. Links always underlined. Titles lowercased via CSS `text-transform`.
- **Cascadia Mono**: Single monospace font for everything. Loaded via `@font-face` in `app.css`, URL from `config.json`.
- **Two colors**: `#111` text, `#fafafa` background. No accent colors.
- **Adding an article**: Drop `.md` in `content/articles/` with frontmatter `title`, `date`, `description`. No code changes.
- **AdSense**: Library script in `app.html` `<head>` only (enables ad serving on subdomains).
- **Google TS style guide**: Interfaces over type aliases, `import type`, named exports, `const`/`let` only.
- **Deploy**: Push to `main` triggers `.github/workflows/deploy.yml`.
