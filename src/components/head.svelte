<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title?: string;
		imageUrl?: string;
		description?: string;
		children?: import('svelte').Snippet;
		twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
	}

	let {
		title = 'Cute Boys',
		imageUrl = `${page.url.origin}/favicon.svg`,
		description,
		children,
		twitterCardType
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:url" content={page.url.origin + page.url.pathname} />

	<meta name="theme-color" content="#fc62bf" />
	<meta property="twitter:card" content={twitterCardType ?? 'summary'} />

	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta property="twitter:description" content={description} />
	{/if}

	{#if imageUrl}
		<meta property="twitter:image" content={imageUrl} />
		<meta property="og:image" content={imageUrl} />
	{/if}

	{@render children?.()}
</svelte:head>
