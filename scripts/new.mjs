/**
 * Interactive CLI to scaffold a new post or presentation.
 *
 * Usage: node scripts/new.mjs
 *
 * Creates the folder structure with article.tex pre-filled with metadata.
 * For posts: also creates empty refs.bib and assets/.
 */
import { mkdir, writeFile } from 'fs/promises';
import { createInterface } from 'readline';
import { join } from 'path';

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
	return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
	const type = await ask('type (post/presentation): ');
	if (type !== 'post' && type !== 'presentation') {
		console.error('invalid type. use "post" or "presentation".');
		process.exit(1);
	}

	const slug = await ask('slug (kebab-case): ');
	if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
		console.error('invalid slug. use lowercase letters, numbers, and hyphens.');
		process.exit(1);
	}

	const title = await ask('title: ');
	const description = await ask('description: ');

	const now = new Date();
	const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

	const baseDir = type === 'post' ? 'content/posts' : 'content/presentations';
	const dir = join(baseDir, slug);

	await mkdir(dir, { recursive: true });

	let texContent = `% title: ${title}\n% date: ${date}\n% description: ${description}\n`;

	if (type === 'presentation') {
		const url = await ask('pdf url: ');
		texContent += `% url: ${url}\n`;
	}

	texContent += '\n';

	await writeFile(join(dir, 'article.tex'), texContent);

	if (type === 'post') {
		await writeFile(join(dir, 'refs.bib'), '');
		await mkdir(join(dir, 'assets'), { recursive: true });
	}

	console.log(`\ncreated ${dir}/`);
	rl.close();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
