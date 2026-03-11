/**
 * Presentation content loader.
 * Reads pre-generated HTML and manifest from .generated/articles/
 * (produced by scripts/tex2html.mjs from .tex source files).
 */
import type { PresentationMeta } from '$lib/config';

const manifestModules = import.meta.glob('/.generated/articles/presentations.json', { eager: true, import: 'default' }) as Record<string, PresentationMeta[]>;
const htmlModules = import.meta.glob('/.generated/articles/pres-*.html', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

export const presentations: PresentationMeta[] = Object.values(manifestModules)[0] ?? [];

export function getPresentation(slug: string): { meta: PresentationMeta; html: string } | undefined {
	const meta = presentations.find((p) => p.slug === slug);
	if (!meta) return undefined;
	const html = htmlModules[`/.generated/articles/pres-${slug}.html`] ?? '';
	return { meta, html };
}
