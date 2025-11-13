<script lang="ts">
	import Toaster from '$lib/Toaster.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head></svelte:head>

{@render children?.()}

<Toaster />
