import { getArticle, articles } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const result = getArticle(params.slug);
	if (!result) throw error(404, 'Article not found');
	return result;
};

/** Enumerate all article slugs for static prerendering. */
export function entries() {
	return articles.map((a) => ({ slug: a.slug }));
}
