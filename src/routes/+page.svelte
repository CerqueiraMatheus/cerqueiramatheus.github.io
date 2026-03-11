<script lang="ts">
	import { CONFIG } from '$lib/config';
</script>

<div class="landing">
	<img src={CONFIG.profile.avatar} alt={CONFIG.profile.name} class="landing-avatar" />
	<h1 class="landing-name">{CONFIG.profile.name}</h1>
	<p class="landing-role">{CONFIG.profile.role}</p>
	<p class="landing-social">
		{#each CONFIG.social as link, i}
			{#if i > 0}<span class="dot"> · </span>{/if}<a href={link.url} target="_blank" rel="noopener">{link.label}</a>
		{/each}
	</p>
</div>
