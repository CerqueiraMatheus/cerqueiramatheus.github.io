/**
 * Post content loader.
 * Reads pre-generated HTML and manifest from .generated/articles/
 * (produced by scripts/tex2html.mjs from .tex source files).
 */
import type { ArticleMeta } from '$lib/config';

const manifestModules = import.meta.glob('/.generated/articles/manifest.json', { eager: true, import: 'default' }) as Record<string, ArticleMeta[]>;
const htmlModules = import.meta.glob('/.generated/articles/*.html', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

export const posts: ArticleMeta[] = Object.values(manifestModules)[0] ?? [];

export function getPost(slug: string): { meta: ArticleMeta; html: string } | undefined {
	const meta = posts.find((a) => a.slug === slug);
	if (!meta) return undefined;
	const html = htmlModules[`/.generated/articles/${slug}.html`];
	if (!html) return undefined;
	return { meta, html };
}
