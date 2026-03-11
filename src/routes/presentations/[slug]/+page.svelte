<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { formatDate } from '$lib/date';

	let { data } = $props();
	const meta = $derived(data.meta);
	const html = $derived(data.html);
	let titleEl = $state<HTMLElement | null>(null);
	let iframeEl = $state<HTMLIFrameElement | null>(null);

	afterNavigate(() => {
		titleEl?.scrollIntoView({ behavior: 'instant' });
	});

	function toggleFullscreen(): void {
		if (!iframeEl) return;
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			iframeEl.requestFullscreen();
		}
	}
</script>

<svelte:head>
	<title>{meta.title} - mhcp.dev</title>
</svelte:head>

<div class="article-header" bind:this={titleEl}>
	<h1>{meta.title}</h1>
	<span class="article-meta">{formatDate(meta.date)}</span>
</div>

{#if html.trim()}
	<div class="prose">
		{@html html}
	</div>
{/if}

<div class="pdf-container">
	<iframe src={meta.url} title="Slides: {meta.title}" allowfullscreen bind:this={iframeEl}></iframe>
</div>
<button class="fullscreen-btn" onclick={toggleFullscreen}>fullscreen</button>
