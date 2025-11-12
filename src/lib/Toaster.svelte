<script lang="ts" module>
	export type ToastData = {
		title: string;
		description: string;
		color: string;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { X } from '@lucide/svelte';

	import { createToaster, melt } from '@melt-ui/svelte';
</script>

<div
	class="fixed top-0 right-0 z-50 m-4 flex flex-col items-end gap-2 md:top-auto md:bottom-0"
	use:portal
>
	{#each $toasts as { id, data } (id)}
		<div use:melt={$content(id)} class="rounded-lg bg-neutral-800 text-white shadow-md">
			<div
				class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
			>
				<div>
					<h3 use:melt={$title(id)} class="flex items-center gap-2 font-semibold">
						{data.title}
						<span class="size-1.5 rounded-full {data.color}"></span>
					</h3>
					<div use:melt={$description(id)}>
						{data.description}
					</div>
				</div>
				<button
					use:melt={$close(id)}
					class="text-magnum-500 hover:bg-magnum-900/50 absolute top-4 right-4 grid size-6 place-items-center
          rounded-full"
				>
					<X class="size-4" />
				</button>
			</div>
		</div>
	{/each}
</div>
