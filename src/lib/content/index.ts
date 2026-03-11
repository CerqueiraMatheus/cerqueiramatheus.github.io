/**
 * Article content loader.
 * Discovers all markdown files in /content/articles/ at build time
 * via import.meta.glob and exposes them as typed ArticleMeta[].
 */
import type { ArticleMeta } from '$lib/config';
import type { Component } from 'svelte';

interface ArticleModule {
	default: Component;
	metadata: {
		title: string;
		date: string;
		description: string;
	};
}

const articleModules = import.meta.glob<ArticleModule>('/content/articles/*.md', { eager: true });

function buildArticles(): ArticleMeta[] {
	const articles: ArticleMeta[] = [];

	for (const [path, mod] of Object.entries(articleModules)) {
		const slug = path.replace('/content/articles/', '').replace('.md', '');
		articles.push({
			slug,
			title: mod.metadata.title,
			date: mod.metadata.date,
			description: mod.metadata.description
		});
	}

	// Newest first
	articles.sort((a, b) => b.date.localeCompare(a.date));
	return articles;
}

export const articles: ArticleMeta[] = buildArticles();

export function getArticle(slug: string): { meta: ArticleMeta; component: Component } | undefined {
	const path = `/content/articles/${slug}.md`;
	const mod = articleModules[path];
	if (!mod) return undefined;
	const meta = articles.find((a) => a.slug === slug);
	if (!meta) return undefined;
	return { meta, component: mod.default };
}
