<!--
Modified version of https://github.com/Tonantzintla/MC-ID/tree/main/website/src/lib/components/ui/button
made to be slightly simpler
all credit to https://github.com/darthgigi (great web dev btw)
-->

<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	const baseClass =
		"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";

	const buttonVariants = {
		default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/80',
		destructive:
			'bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 text-white',
		outline:
			'bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border',
		secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
		ghost: 'hover:bg-accent hover:text-accent-foreground',
		link: 'text-primary underline-offset-4 hover:underline'
	};

	const buttonSizes = {
		default: 'h-9 px-4 py-2 has-[>svg]:px-3',
		sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
		lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
		icon: 'size-9',
		'icon-sm': 'size-8',
		'icon-lg': 'size-10'
	};

	export type ButtonVariant = keyof typeof buttonVariants;
	export type ButtonSize = keyof typeof buttonSizes;

	export type ButtonProps = HTMLButtonAttributes &
		HTMLAnchorAttributes & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		data-slot="button"
		class={cn(buttonVariants[variant], buttonSizes[size], baseClass, className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		data-slot="button"
		class={cn(buttonVariants[variant], buttonSizes[size], baseClass, className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
