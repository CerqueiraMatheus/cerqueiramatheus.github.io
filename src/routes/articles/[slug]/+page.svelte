<script lang="ts">
	let { data } = $props();
	const meta = $derived(data.meta);
	const Content = $derived(data.component);
</script>

<svelte:head>
	<title>{meta.title} - mhcp.dev</title>
</svelte:head>

<a href="/articles" class="back-link">back to articles</a>

<div class="article-header">
	<h1>{meta.title}</h1>
	<span class="article-meta">{meta.date}</span>
</div>

<div class="prose">
	<Content />
</div>
