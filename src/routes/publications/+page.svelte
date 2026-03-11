<script lang="ts">
	let { data } = $props();
	const html = $derived(data.html);
</script>

<svelte:head>
	<title>publications - mhcp.dev</title>
</svelte:head>

<h1 class="page-title">publications</h1>
<div class="prose">
	{@html html}
</div>
