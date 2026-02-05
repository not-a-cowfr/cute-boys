<svelte:head>
	<script>
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			document.documentElement.className = savedTheme.trim();
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.className = prefersDark ? 'dark' : 'light';
		}
	</script>
</svelte:head>
