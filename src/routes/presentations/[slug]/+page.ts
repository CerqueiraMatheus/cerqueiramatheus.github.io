import { getPresentation, presentations } from '$lib/content/presentations';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const result = getPresentation(params.slug);
	if (!result) throw error(404, 'Presentation not found');
	return { meta: result.meta, html: result.html };
};

/** Enumerate all presentation slugs for static prerendering. */
export function entries() {
	return presentations.map((p) => ({ slug: p.slug }));
}
