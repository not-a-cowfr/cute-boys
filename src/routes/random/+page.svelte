<script>
	import { page } from '$app/state';
	import Head from '$comp/head.svelte';
</script>

<Head
	title="Random Cute Boy"
	imageUrl="https://cuteboys.love/api/image/random"
	twitterCardType="summary_large_image"
/>

<div class="mx-auto mt-30 flex max-w-2xl flex-col gap-y-4">
	<img src="/api/image/random" alt="random cute boy" />
</div>
