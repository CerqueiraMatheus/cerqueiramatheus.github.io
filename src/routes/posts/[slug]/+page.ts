import { getPost, posts } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const result = getPost(params.slug);
	if (!result) throw error(404, 'Post not found');
	return { meta: result.meta, html: result.html };
};

/** Enumerate all post slugs for static prerendering. */
export function entries() {
	return posts.map((a) => ({ slug: a.slug }));
}
