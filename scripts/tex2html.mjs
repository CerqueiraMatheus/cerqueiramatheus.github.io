/**
 * Pre-build script: converts .tex content to .html via Pandoc.
 *
 * Post structure:
 *   content/posts/<slug>/
 *     article.tex   — LaTeX source (metadata in % comments at top)
 *     refs.bib      — BibTeX references (optional, used by Pandoc --bibliography)
 *     assets/       — Images and other files (copied to static/posts/<slug>/)
 *
 * Presentation structure:
 *   content/presentations/<slug>/
 *     article.tex   — LaTeX source (metadata includes % url: for PDF embed)
 *
 * Outputs:
 *   .generated/articles/<slug>.html   — Converted HTML body
 *   .generated/articles/manifest.json — Array of { slug, title, date, description }
 *
 * Usage: node scripts/tex2html.mjs
 * Requires: pandoc (pre-installed on GitHub Actions ubuntu-latest)
 */
import { readdir, readFile, writeFile, mkdir, cp, stat, unlink } from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { parseMeta } from './parse-meta.mjs';

const exec = promisify(execFile);
const ARTICLES_DIR = 'content/posts';
const OUTPUT_DIR = '.generated/articles';
const STATIC_ARTICLES = 'static/posts';

async function exists(path) {
	try { await stat(path); return true; } catch { return false; }
}

async function convertArticle(slug) {
	const dir = join(ARTICLES_DIR, slug);
	const texPath = join(dir, 'article.tex');
	const bibPath = join(dir, 'refs.bib');
	const assetsDir = join(dir, 'assets');

	const content = await readFile(texPath, 'utf-8');
	const meta = parseMeta(content);

	// Build pandoc args
	const args = [texPath, '-f', 'latex', '-t', 'html', '--mathml', '--no-highlight', '--shift-heading-level-by=1'];

	// Add bibliography if refs.bib exists and is non-empty
	if (await exists(bibPath)) {
		const bibContent = await readFile(bibPath, 'utf-8');
		if (bibContent.trim().length > 0) {
			args.push('--bibliography', bibPath, '--citeproc', '--csl', 'content/ieee.csl');
		}
	}

	const { stdout } = await exec('pandoc', args);

	// Copy assets to static/posts/<slug>/
	if (await exists(assetsDir)) {
		const destDir = join(STATIC_ARTICLES, slug);
		await mkdir(destDir, { recursive: true });
		await cp(assetsDir, destDir, { recursive: true });
	}

	return { slug, meta, html: stdout };
}

async function main() {
	await mkdir(OUTPUT_DIR, { recursive: true });

	// Convert posts
	const dirEntries = await readdir(ARTICLES_DIR, { withFileTypes: true });
	const slugs = dirEntries.filter((e) => e.isDirectory()).map((e) => e.name);
	const manifest = [];

	for (const slug of slugs) {
		const { meta, html } = await convertArticle(slug);
		manifest.push({ slug, ...meta });
		await writeFile(join(OUTPUT_DIR, `${slug}.html`), html);
	}

	manifest.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
	await writeFile(join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, '\t'));

	// Convert presentations (same structure as posts)
	const PRESENTATIONS_DIR = 'content/presentations';
	if (await exists(PRESENTATIONS_DIR)) {
		const presDirEntries = await readdir(PRESENTATIONS_DIR, { withFileTypes: true });
		const presSlugs = presDirEntries.filter((e) => e.isDirectory()).map((e) => e.name);
		const presManifest = [];

		for (const slug of presSlugs) {
			const dir = join(PRESENTATIONS_DIR, slug);
			const texPath = join(dir, 'article.tex');
			if (!(await exists(texPath))) continue;

			const content = await readFile(texPath, 'utf-8');
			const meta = parseMeta(content);

			// Convert tex body to HTML (may be empty/minimal)
			const { stdout } = await exec('pandoc', [
				texPath, '-f', 'latex', '-t', 'html', '--mathml', '--no-highlight', '--shift-heading-level-by=1'
			]);

			presManifest.push({ slug, ...meta });
			await writeFile(join(OUTPUT_DIR, `pres-${slug}.html`), stdout);
		}

		presManifest.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
		await writeFile(join(OUTPUT_DIR, 'presentations.json'), JSON.stringify(presManifest, null, '\t'));
		console.log(`converted ${presSlugs.length} presentations`);
	}

	// Generate site-wide publications page from content/refs.bib
	const siteRefsPath = 'content/refs.bib';
	if (await exists(siteRefsPath)) {
		// Write a temp markdown file with nocite to pull all entries
		const tmpPath = join(OUTPUT_DIR, '_pubs_input.md');
		await writeFile(tmpPath, '---\nnocite: "@*"\n---\n');
		const { stdout: pubsHtml } = await exec('pandoc', [
			tmpPath, '-f', 'markdown', '-t', 'html',
			'--bibliography', siteRefsPath,
			'--citeproc', '--csl', 'content/ieee.csl'
		]);
		await writeFile(join(OUTPUT_DIR, 'publications.html'), pubsHtml);
		await unlink(tmpPath);
		console.log('generated publications');
	}

	// Convert standalone pages (about, etc.)
	const PAGES_DIR = 'content/pages';
	if (await exists(PAGES_DIR)) {
		const pageFiles = (await readdir(PAGES_DIR)).filter((f) => f.endsWith('.tex'));
		for (const file of pageFiles) {
			const name = file.replace('.tex', '');
			const { stdout: pageHtml } = await exec('pandoc', [
				join(PAGES_DIR, file), '-f', 'latex', '-t', 'html', '--mathml'
			]);
			await writeFile(join(OUTPUT_DIR, `${name}.html`), pageHtml);
		}
		console.log(`converted ${pageFiles.length} pages`);
	}

	console.log(`converted ${slugs.length} posts`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
