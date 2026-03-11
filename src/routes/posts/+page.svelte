<script lang="ts">
	import { posts } from '$lib/content';
	import { formatDate } from '$lib/date';

	const ITEMS_PER_PAGE = 20;

	let query = $state('');
	let selectedYear = $state('');
	let currentPage = $state(1);

	const years = $derived(
		[...new Set(posts.map((a) => a.date.substring(0, 4)))].sort().reverse()
	);

	const filtered = $derived(
		posts.filter((a) => {
			if (selectedYear && !a.date.startsWith(selectedYear)) return false;
			if (query.trim()) {
				const q = query.toLowerCase();
				return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
			}
			return true;
		})
	);

	const totalPages = $derived(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
	const page = $derived(Math.min(currentPage, totalPages));
	const paged = $derived(filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));

	function setYear(year: string): void {
		selectedYear = selectedYear === year ? '' : year;
		currentPage = 1;
	}
</script>

<svelte:head>
	<title>posts - mhcp.dev</title>
</svelte:head>

<h1 class="page-title">posts</h1>

<div class="article-filters">
	<input
		type="text"
		placeholder="search..."
		class="article-search"
		bind:value={query}
		oninput={() => currentPage = 1}
	/>
	{#if years.length > 1}
		<div class="article-years">
			{#each years as year}
				<button
					class="year-btn"
					class:active={selectedYear === year}
					onclick={() => setYear(year)}
				>{year}</button>
			{/each}
		</div>
	{/if}
</div>

{#if paged.length === 0}
	<p class="no-results">no posts found.</p>
{:else}
	<ul class="article-list">
		{#each paged as post}
			<li>
				<a href="/posts/{post.slug}">{post.title}</a>
				<span class="article-date">{formatDate(post.date)}</span>
			</li>
		{/each}
	</ul>
{/if}

{#if totalPages > 1}
	<div class="pagination">
		{#each Array.from({ length: totalPages }, (_, i) => i + 1) as p}
			<button
				class="page-btn"
				class:active={page === p}
				onclick={() => currentPage = p}
			>{p}</button>
		{/each}
	</div>
{/if}
