<script lang="ts">
	import Toaster from '$lib/Toaster.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Toaster />

<svelte:head></svelte:head>

{@render children?.()}
