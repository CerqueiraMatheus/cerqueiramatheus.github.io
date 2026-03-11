<script lang="ts">
	import { articles } from '$lib/content';
</script>

<svelte:head>
	<title>articles - mhcp.dev</title>
</svelte:head>

<h1 class="page-title">articles</h1>

<ul class="article-list">
	{#each articles as article}
		<li>
			<span class="article-date">{article.date}</span>
			<a href="/articles/{article.slug}">{article.title}</a>
		</li>
	{/each}
</ul>
