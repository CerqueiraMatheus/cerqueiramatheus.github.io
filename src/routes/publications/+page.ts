import type { PageLoad } from './$types';

const pubsHtml = import.meta.glob('/.generated/articles/publications.html', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

export const load: PageLoad = () => {
	const html = Object.values(pubsHtml)[0] ?? '';
	return { html };
};
