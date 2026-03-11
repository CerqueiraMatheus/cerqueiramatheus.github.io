/**
 * Typed re-export of config.json.
 * All site-wide settings live in /config.json at the repo root.
 * This module provides TypeScript interfaces and a typed CONFIG constant.
 */
import configJson from '../../config.json';

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

export const CONFIG: SiteConfig = configJson as SiteConfig;

/** Frontmatter shape for articles in content/articles/*.md */
export interface ArticleMeta {
	slug: string;
	title: string;
	/** YYYY-MM format for sorting and display */
	date: string;
	description: string;
}
