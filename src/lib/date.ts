const MONTHS = [
	'january', 'february', 'march', 'april', 'may', 'june',
	'july', 'august', 'september', 'october', 'november', 'december'
];

/** Converts "2023-01" to "january 2023" */
export function formatDate(date: string): string {
	const [year, month] = date.split('-');
	if (!month) return year;
	const idx = parseInt(month, 10) - 1;
	return `${MONTHS[idx]} ${year}`;
}
