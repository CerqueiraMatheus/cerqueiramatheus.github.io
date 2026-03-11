<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.component);
</script>

<svelte:head>
	<title>about - mhcp.dev</title>
</svelte:head>

<h1 class="page-title">about</h1>
<div class="prose">
	<Content />
</div>
