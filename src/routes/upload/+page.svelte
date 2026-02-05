<script lang="ts">
	import { addErrorToast, addSuccessToast } from '$comp/toaster.svelte';
	import { Button } from '$comp/ui/button';
	import { formatBytes } from '$lib/format';

	let files: File[] = $state([]);

	function s(list: any[]) {
		return list.length > 1 ? 's' : '';
	}

	async function uploadFiles() {
		const formData = new FormData();

		for (const f of files) formData.append('files[]', f);

		const resp = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		if (!resp.ok) return addErrorToast('Upload failed', await resp.text());

		const data: { uploaded: string[] } = await resp.json();

		addSuccessToast(
			'Upload successful',
			`${data.uploaded.length} file${s(data.uploaded)} uploaded`
		);

		files = [];
	}
</script>

<div class="mx-auto mt-30 flex max-w-2xl flex-col gap-y-4">
	<h1 class="text-center text-3xl font-bold">Upload Images</h1>
	<label class="font-medium">
		<p class="mb-2 font-black">Files</p>
		<label
			class="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-muted-lighter bg-muted-darker py-2 hover:bg-muted-darker/40"
		>
			Select Files
			<input
				class="hidden"
				type="file"
				accept="image/png, image/gif, image/jpeg"
				onchange={(e) => {
					const selected = Array.from(e.currentTarget.files ?? []);
					files.push(...selected);
				}}
				multiple
			/>
		</label>
	</label>

	{#if files.length > 0}
		<ul class="list-inside list-disc text-sm">
			{#each files.entries() as [i, f]}
				<li>
					{f.name} ({formatBytes(f.size)})
					<button onclick={() => files.splice(i, 1)} class="ml-1 text-destructive">remove</button>
				</li>
			{/each}
		</ul>
	{/if}

	<Button onclick={uploadFiles} class="w-full py-6">Upload Image{s(files)}</Button>
</div>
