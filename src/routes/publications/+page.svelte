<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.component);
</script>

<svelte:head>
	<title>publications - mhcp.dev</title>
</svelte:head>

<h1 class="page-title">publications</h1>
<div class="prose">
	<Content />
</div>
