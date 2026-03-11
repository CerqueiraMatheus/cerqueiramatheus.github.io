import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

describe('config.yml', () => {
	const raw = readFileSync('config.yml', 'utf-8');
	const config = yaml.load(raw) as Record<string, unknown>;

	it('has siteTitle', () => {
		expect(config.siteTitle).toBeTruthy();
		expect(typeof config.siteTitle).toBe('string');
	});

	it('has fontUrl and fontFamily', () => {
		expect(config.fontUrl).toBeTruthy();
		expect(config.fontFamily).toBeTruthy();
	});

	it('has profile with required fields', () => {
		const profile = config.profile as Record<string, string>;
		expect(profile.name).toBeTruthy();
		expect(profile.role).toBeTruthy();
		expect(profile.avatar).toBeTruthy();
		expect(profile.email).toBeTruthy();
	});

	it('has social array with label and url', () => {
		const social = config.social as Array<Record<string, string>>;
		expect(Array.isArray(social)).toBe(true);
		expect(social.length).toBeGreaterThan(0);
		for (const link of social) {
			expect(link.label).toBeTruthy();
			expect(link.url).toBeTruthy();
		}
	});

	it('has nav array with label and url', () => {
		const nav = config.nav as Array<Record<string, string>>;
		expect(Array.isArray(nav)).toBe(true);
		expect(nav.length).toBeGreaterThan(0);
		for (const link of nav) {
			expect(link.label).toBeTruthy();
			expect(link.url).toBeTruthy();
		}
	});

	it('has adsenseClientId', () => {
		expect(config.adsenseClientId).toBeTruthy();
		expect(typeof config.adsenseClientId).toBe('string');
	});

	it('nav includes posts, presentations, publications, about', () => {
		const nav = config.nav as Array<Record<string, string>>;
		const labels = nav.map((n) => n.label);
		expect(labels).toContain('posts');
		expect(labels).toContain('presentations');
		expect(labels).toContain('publications');
		expect(labels).toContain('about');
	});
});
