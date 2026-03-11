/**
 * Typed re-export of config.yml.
 * All site-wide settings live in /config.yml at the repo root.
 * This module provides TypeScript interfaces and a typed CONFIG constant.
 */
import yaml from 'js-yaml';

const raw = import.meta.glob('/config.yml', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const parsed = yaml.load(Object.values(raw)[0]) as SiteConfig;

export interface SocialLink {
	label: string;
	url: string;
}

export interface NavLink {
	label: string;
	url: string;
}

export interface Profile {
	name: string;
	role: string;
	avatar: string;
	email: string;
}

export interface SiteConfig {
	siteTitle: string;
	fontUrl: string;
	fontFamily: string;
	profile: Profile;
	social: SocialLink[];
	nav: NavLink[];
	adsenseClientId: string;
}

export const CONFIG: SiteConfig = parsed;

/** Frontmatter shape for posts in content/posts/{slug}/article.tex */
export interface ArticleMeta {
	slug: string;
	title: string;
	/** YYYY-MM format for sorting and display */
	date: string;
	description: string;
}

/** Frontmatter shape for presentations in content/presentations/{slug}/article.tex */
export interface PresentationMeta {
	slug: string;
	title: string;
	/** YYYY-MM format */
	date: string;
	description: string;
	/** URL to the PDF slides (embedded as iframe) */
	url: string;
}
