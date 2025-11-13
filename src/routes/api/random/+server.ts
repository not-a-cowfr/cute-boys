import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ platform }) => {
	const bucket = platform?.env.cuteboys;
	if (!bucket) return new Response('Missing R2 bucket binding', { status: 500 });

	const list = await bucket.list();

	if (list.objects.length === 0) {
		return new Response('No images found', { status: 404 });
	}

	const random = list.objects[Math.floor(Math.random() * list.objects.length)];
	const file = await bucket.get(random.key);

	return new Response(file?.body, {
		headers: {
			'Content-Type': file?.httpMetadata?.contentType ?? 'application/octet-stream',
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
			Pragma: 'no-cache',
			Expires: '0'
		}
	});
};
