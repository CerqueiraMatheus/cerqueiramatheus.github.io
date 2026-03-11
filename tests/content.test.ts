import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { parseMeta } from '../scripts/parse-meta.mjs';

describe('content/posts', () => {
	const postsDir = 'content/posts';
	const slugs = readdirSync(postsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	it('has at least one post', () => {
		expect(slugs.length).toBeGreaterThan(0);
	});

	for (const slug of slugs) {
		describe(slug, () => {
			const texPath = join(postsDir, slug, 'article.tex');

			it('has article.tex', () => {
				expect(existsSync(texPath)).toBe(true);
			});

			it('has required metadata (title, date, description)', () => {
				const content = readFileSync(texPath, 'utf-8');
				const meta = parseMeta(content);
				expect(meta.title).toBeTruthy();
				expect(meta.date).toMatch(/^\d{4}-\d{2}$/);
				expect(meta.description).toBeTruthy();
			});
		});
	}
});

describe('content/presentations', () => {
	const presDir = 'content/presentations';
	if (!existsSync(presDir)) return;

	const slugs = readdirSync(presDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	it('has at least one presentation', () => {
		expect(slugs.length).toBeGreaterThan(0);
	});

	for (const slug of slugs) {
		describe(slug, () => {
			const texPath = join(presDir, slug, 'article.tex');

			it('has article.tex', () => {
				expect(existsSync(texPath)).toBe(true);
			});

			it('has required metadata (title, date, description, url)', () => {
				const content = readFileSync(texPath, 'utf-8');
				const meta = parseMeta(content);
				expect(meta.title).toBeTruthy();
				expect(meta.date).toMatch(/^\d{4}-\d{2}$/);
				expect(meta.description).toBeTruthy();
				expect(meta.url).toBeTruthy();
			});
		});
	}
});

describe('content/refs.bib', () => {
	it('exists and is non-empty', () => {
		const content = readFileSync('content/refs.bib', 'utf-8');
		expect(content.trim().length).toBeGreaterThan(0);
	});

	it('contains at least one BibTeX entry', () => {
		const content = readFileSync('content/refs.bib', 'utf-8');
		expect(content).toMatch(/@\w+\{/);
	});
});
