/**
 * Parses metadata from % comments at the top of a .tex file.
 * Recognized fields: title, date, description, url.
 *
 * @param content - Raw .tex file content
 * @returns Object with extracted metadata fields
 */
export function parseMeta(content) {
	const meta = {};
	for (const line of content.split('\n')) {
		const match = line.match(/^%\s*(title|date|description|url):\s*(.+)$/);
		if (match) {
			meta[match[1]] = match[2].trim();
		}
		if (!line.startsWith('%') && line.trim() !== '') break;
	}
	return meta;
}
