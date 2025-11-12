<script lang="ts">
	import { addToast } from '$lib/Toaster.svelte';

	let files: FileList | null = null;

	async function uploadFiles() {
		if (!files || files.length === 0) {
			addToast({
				data: {
					title: 'No files selected',
					description: 'Please select at least one image.',
					color: 'red'
				}
			});
			return;
		}

		const formData = new FormData();
		for (const file of files) formData.append('files[]', file);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			addToast({
				data: {
					title: 'Upload successful',
					description: 'Your files have been uploaded!',
					color: 'green'
				}
			});
			files = null;
		} else {
			addToast({
				data: { title: 'Upload failed', description: 'Please try again later.', color: 'red' }
			});
		}
	}
</script>

<div
	class="mx-auto mt-10 flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-xl border border-border bg-muted p-6 shadow-md"
>
	<h2 class="text-2xl font-semibold">Upload Images</h2>

	<label
		class="hover:muted-darker cursor-pointer rounded-xl border border-border bg-muted-lighter px-4 py-2 transition"
	>
		Select Images
		<input
			id="avatar"
			name="avatar"
			type="file"
			accept="image/png, image/jpeg"
			bind:files
			multiple
			class="hidden"
		/>
	</label>

	{#if files}
		<div class="mt-2 w-full">
			<h3 class="mb-1 font-medium">Selected Files:</h3>
			<ul class="list-inside list-disc space-y-1 text-sm">
				{#each Array.from(files) as file}
					<li>{file.name} ({(file.size / 1024).toFixed(1)} KB)</li>
				{/each}
			</ul>
		</div>

		<button
			on:click={uploadFiles}
			class="mt-3 w-full justify-center rounded-xl bg-primary py-2 font-semibold transition hover:bg-primary/80"
		>
			Upload
		</button>
	{/if}
</div>
