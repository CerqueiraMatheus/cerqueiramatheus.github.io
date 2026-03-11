<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { formatDate } from '$lib/date';

	let { data } = $props();
	const meta = $derived(data.meta);
	const html = $derived(data.html);
	let titleEl = $state<HTMLElement | null>(null);

	afterNavigate(() => {
		titleEl?.scrollIntoView({ behavior: 'instant' });
	});
</script>

<svelte:head>
	<title>{meta.title} - mhcp.dev</title>
</svelte:head>

<div class="article-header" bind:this={titleEl}>
	<h1>{meta.title}</h1>
	<span class="article-meta">{formatDate(meta.date)}</span>
</div>

<div class="prose">
	{@html html}
</div>
