import type { PageLoad } from './$types';
import type { Component } from 'svelte';

const pages = import.meta.glob('/content/pages/publications.md', { eager: true }) as Record<string, { default: Component }>;

export const load: PageLoad = () => {
	const mod = Object.values(pages)[0];
	return { component: mod.default };
};
