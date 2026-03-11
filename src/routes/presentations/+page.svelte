<script lang="ts">
	import { presentations } from '$lib/content/presentations';
	import { formatDate } from '$lib/date';

	const ITEMS_PER_PAGE = 20;

	let query = $state('');
	let selectedYear = $state('');
	let currentPage = $state(1);

	const years = $derived(
		[...new Set(presentations.map((p) => p.date.substring(0, 4)))].sort().reverse()
	);

	const filtered = $derived(
		presentations.filter((p) => {
			if (selectedYear && !p.date.startsWith(selectedYear)) return false;
			if (query.trim()) {
				const q = query.toLowerCase();
				return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
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
	<title>presentations - mhcp.dev</title>
</svelte:head>

<h1 class="page-title">presentations</h1>

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
	<p class="no-results">no presentations found.</p>
{:else}
	<ul class="article-list">
		{#each paged as pres}
			<li>
				<a href="/presentations/{pres.slug}">{pres.title}</a>
				<span class="article-date">{formatDate(pres.date)}</span>
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
