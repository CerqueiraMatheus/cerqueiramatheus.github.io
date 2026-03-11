import { describe, it, expect } from 'vitest';
import { formatDate } from '../src/lib/date';

describe('formatDate', () => {
	it('converts 2023-01 to january 2023', () => {
		expect(formatDate('2023-01')).toBe('january 2023');
	});

	it('converts 2024-12 to december 2024', () => {
		expect(formatDate('2024-12')).toBe('december 2024');
	});

	it('handles all months', () => {
		const expected = [
			'january', 'february', 'march', 'april', 'may', 'june',
			'july', 'august', 'september', 'october', 'november', 'december'
		];
		for (let i = 0; i < 12; i++) {
			const month = String(i + 1).padStart(2, '0');
			expect(formatDate(`2023-${month}`)).toBe(`${expected[i]} 2023`);
		}
	});

	it('returns year only when no month', () => {
		expect(formatDate('2023')).toBe('2023');
	});

	it('handles single-digit months', () => {
		expect(formatDate('2023-3')).toBe('march 2023');
	});
});
