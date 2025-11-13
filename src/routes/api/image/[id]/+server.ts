import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, platform }) => {
	const bucket = platform?.env.cuteboys;
	if (!bucket) return new Response('Missing R2 bucket binding', { status: 500 });

	const key = decodeURIComponent(params.id ?? '');

	const file = await bucket.get(key);

	if (file) {
		return new Response(file.body, {
			headers: {
				'Content-Type': file.httpMetadata?.contentType ?? 'application/octet-stream',
				'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
				Pragma: 'no-cache',
				Expires: '0'
			}
		});
	} else {
		return new Response(`No images found for id ${key}`, { status: 404 });
	}
};
