import type { PageLoad } from './$types';

const aboutHtml = import.meta.glob('/.generated/articles/about.html', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

export const load: PageLoad = () => {
	const html = Object.values(aboutHtml)[0] ?? '';
	return { html };
};
