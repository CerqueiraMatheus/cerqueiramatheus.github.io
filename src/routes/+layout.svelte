<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { CONFIG } from '$lib/config';

	let { children } = $props();
	const currentPath = $derived($page.url.pathname);
	const isHome = $derived(currentPath === '/');
</script>

<svelte:head>
	<title>{CONFIG.siteTitle}</title>
</svelte:head>

<header>
	<div class="container header-inner">
		<span class="site-name"><a href="/">{CONFIG.siteTitle}</a></span>
		<nav>
			{#each CONFIG.nav as link}
				<a href={link.url} class:active={currentPath.startsWith(link.url)}>{link.label}</a>
			{/each}
		</nav>
	</div>
</header>

{#if isHome}
	<main class="home">
		{@render children()}
	</main>
{:else}
	<main class="container">
		{@render children()}
	</main>
{/if}

<footer>
	<div class="container">
		{CONFIG.profile.name} <span class="dot"> · </span> <a href="https://github.com/CerqueiraMatheus/cerqueiramatheus.github.io" target="_blank" rel="noopener">source</a>
	</div>
</footer>
