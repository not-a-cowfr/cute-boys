<script lang="ts">
	import Header from '$comp/header/header.svelte';
	import ThemeWatcher from '$comp/theme-watcher.svelte';
	import Toaster from '$comp/toaster.svelte';
	import { initThemeContext } from '$lib/stores/themes.svelte';
	import '../app.css';

	let { children } = $props();

	initThemeContext();
</script>

<svelte:head></svelte:head>

<Header
	menuItems={[
		{ name: 'Random', href: '/random' },
		{ name: 'Upload', href: '/upload' },
		{ name: 'Documentation', href: 'https://github.com/not-a-cowfr/cute-boys/tree/main/docs' },
		{ name: 'GitHub', href: 'https://github.com/not-a-cowfr/cute-boys' }
	]}
/>

<svelte:boundary>
	<main class="overflow-hidden">
		{@render children?.()}
	</main>
</svelte:boundary>

<Toaster />
<ThemeWatcher />
