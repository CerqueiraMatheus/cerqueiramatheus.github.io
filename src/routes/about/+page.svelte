<script lang="ts">
	let { data } = $props();
	const html = $derived(data.html);
</script>

<svelte:head>
	<title>about - mhcp.dev</title>
</svelte:head>

<h1 class="page-title">about</h1>
<div class="prose">
	{@html html}
</div>
