import { describe, it, expect } from 'vitest';
import { parseMeta } from '../scripts/parse-meta.mjs';

describe('parseMeta', () => {
	it('extracts title, date, and description', () => {
		const content = `% title: My Post
% date: 2023-06
% description: A test post.

Some body text here.`;
		expect(parseMeta(content)).toEqual({
			title: 'My Post',
			date: '2023-06',
			description: 'A test post.'
		});
	});

	it('extracts url field for presentations', () => {
		const content = `% title: My Slides
% date: 2024-01
% description: Talk about AI.
% url: https://example.com/slides.pdf

Body text.`;
		expect(parseMeta(content)).toEqual({
			title: 'My Slides',
			date: '2024-01',
			description: 'Talk about AI.',
			url: 'https://example.com/slides.pdf'
		});
	});

	it('trims whitespace from values', () => {
		const content = '% title:   Spaced Title   \n% date: 2023-01  \n\nBody.';
		const meta = parseMeta(content);
		expect(meta.title).toBe('Spaced Title');
		expect(meta.date).toBe('2023-01');
	});

	it('stops at first non-comment, non-empty line', () => {
		const content = `% title: First
Body starts here.
% date: 2023-01`;
		const meta = parseMeta(content);
		expect(meta.title).toBe('First');
		expect(meta.date).toBeUndefined();
	});

	it('skips blank lines between comments', () => {
		const content = `% title: Test

Body.`;
		expect(parseMeta(content)).toEqual({ title: 'Test' });
	});

	it('returns empty object for no metadata', () => {
		expect(parseMeta('Just body text.')).toEqual({});
	});

	it('returns empty object for empty string', () => {
		expect(parseMeta('')).toEqual({});
	});

	it('ignores unrecognized % fields', () => {
		const content = `% title: Valid
% author: Ignored
% date: 2023-01

Body.`;
		const meta = parseMeta(content);
		expect(meta.title).toBe('Valid');
		expect(meta.date).toBe('2023-01');
		expect(meta).not.toHaveProperty('author');
	});
});
