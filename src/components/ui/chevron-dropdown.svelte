<script module lang="ts">
	export interface ChevronDropdownProps extends IconProps {
		value?: any;
		disabled?: boolean;
		faceClosed?: 'left' | 'right' | 'up';
		class?: string;
	}
</script>

<script lang="ts">
	import { ChevronDown, type IconProps } from '@lucide/svelte';
	import { twMerge } from 'tailwind-merge';

	let {
		value = $bindable(false),
		disabled = false,
		faceClosed = 'right',
		class: className = '',
		...rest
	}: ChevronDropdownProps = $props();

	let rotation = $derived(
		value
			? 'rotate-0'
			: faceClosed === 'left'
				? 'rotate-90'
				: faceClosed === 'right'
					? '-rotate-90'
					: 'rotate-180'
	);
</script>

<ChevronDown
	{...rest}
	class={twMerge(
		'transition-transform duration-300',
		disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
		rotation,
		className
	)}
	onclick={() => {
		if (!disabled) value = !value;
	}}
/>
