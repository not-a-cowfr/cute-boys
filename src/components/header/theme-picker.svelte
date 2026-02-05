<script lang="ts">
	import { getThemeContext, themes } from '$lib/stores/themes.svelte';
	import { Paintbrush } from '@lucide/svelte';
	import ThemeOption from './theme-option.svelte';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';

	const currentTheme = getThemeContext();

	const {
		elements: { trigger, menu, item, separator, arrow },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open }
	} = createDropdownMenu({
		forceVisible: false,
		loop: true
	});
</script>

<button class="h-9 py-2" use:melt={$trigger}>
	<Paintbrush size={20} />
</button>

<div use:melt={$menu} class="rounded-md bg-muted px-2 pb-1">
	<div class="flex w-full flex-col items-start gap-2 p-2">
		<span class="py-1 text-lg font-semibold">Theme</span>
		<div class="grid w-full grid-cols-1 gap-1 md:grid-cols-2">
			{#each themes as theme (theme.class)}
				<ThemeOption {theme} />
			{/each}
		</div>
		<button
			onclick={() => currentTheme.useSystem()}
			class="mt-1 flex w-full cursor-pointer flex-row items-center justify-end"
		>
			<span class="text-muted-foreground underline">Use System Theme</span>
		</button>
	</div>
</div>
