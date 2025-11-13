<script lang="ts">
	import Header from '$comp/header.svelte';
	import Toaster from '$comp/toaster.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head></svelte:head>

<Header
	menuItems={[
		{ name: 'Random', href: '/random' },
		{ name: 'Upload', href: '/upload' },
		{ name: 'Api Docs', href: '/docs' },
		{ name: 'GitHub', href: 'https://github.com/not-a-cowfr/cute-boys' }
	]}
/>

{@render children?.()}

<Toaster />
