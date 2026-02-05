import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, platform }) => {
	const bucket = platform?.env.cuteboys;
	if (!bucket) return new Response('Missing R2 bucket binding', { status: 500 });

	const formData = await request.formData();
	const files: File[] = [];
	for (const entry of formData.getAll('files[]')) {
		if (entry instanceof File) files.push(entry);
	}

	if (files.length === 0) return new Response('No files provided', { status: 400 });

	const uploaded = [];
	for (const file of files) {
		const name = await upload(bucket, file);
		uploaded.push(name);
	}

	return new Response(JSON.stringify({ success: true, uploaded }), { status: 200 });
};

async function upload(bucket: R2Bucket, file: File) {
	const name = `${crypto.randomUUID()}-${file.name}`;

	await bucket.put(name, await file.arrayBuffer(), {
		httpMetadata: { contentType: file.type }
	});

	return name;
}
