<script module lang="ts">
	export interface SelectProps {
		// either an object thats values are arrays or an array
		// object's keys will be used for grouping as the group name
		// arrays will not have grouping
		items: { [key: string]: any[] } | any[];
		placeholder: string;
		value: any;
	}
</script>

<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import ChevronDropdown from './chevron-dropdown.svelte';

	let { items = [], placeholder = '', value = $bindable(''), ...rest }: SelectProps = $props();

	const {
		elements: { trigger, menu, option, group, groupLabel },
		states: { selected, selectedLabel, open },
		helpers: { isSelected }
	} = createSelect<string>({
		defaultSelected: value,
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});

	selected.subscribe((v) => {
		value = v?.value;
	});
</script>

<div class="flex flex-col gap-1">
	<button
		class="bg-muted-darker flex h-10 min-w-[220px] items-center justify-between rounded-lg border border-muted-lighter px-3 py-2 text-muted-foreground shadow transition-opacity hover:opacity-90"
		use:melt={$trigger}
		aria-label="Food"
	>
		{$selectedLabel || placeholder}
		<ChevronDropdown value={$open} class="size-5" />
	</button>
	{#if $open}
		<div
			class="bg-muted-darker z-10 flex max-h-[300px] flex-col overflow-y-auto rounded-lg border border-muted-lighter p-1 shadow focus:ring-0!"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#if Array.isArray(items)}
				{#each items as item}
					<!-- hover:bg-magnum-100 focus:text-magnum-700 data-highlighted:bg-magnum-200 data-highlighted:text-magnum-900 -->
					<div
						class="flex cursor-pointer flex-row items-center rounded-lg py-1 pr-4 pl-8 text-muted-foreground data-highlighted:bg-primary/70"
						use:melt={$option({ value: item, label: item })}
					>
						<div class="mr-2 -ml-6 {$isSelected(item) ? 'block' : 'hidden'}">
							<Check class="size-4" />
						</div>

						{item}
					</div>
				{/each}
			{:else if typeof items === 'object'}
				{#each Object.entries(items) as [key, arr]}
					<div use:melt={$group(key)}>
						<div
							class="py-1 pr-4 pl-4 text-sm font-black text-muted-foreground capitalize"
							use:melt={$groupLabel(key)}
						>
							{key}
						</div>
						{#each arr as item}
							<div
								class="data-highlighted:bg-magnum-200 flex cursor-pointer flex-row items-center rounded-lg py-1 pr-4 pl-8 text-muted-foreground data-highlighted:bg-primary/70"
								use:melt={$option({ value: item, label: item })}
							>
								<div class="mr-2 -ml-6 {$isSelected(item) ? 'block' : 'hidden'}">
									<Check class="size-4" />
								</div>

								{item}
							</div>
						{/each}
					</div>
				{/each}{/if}
		</div>
	{/if}
</div>
