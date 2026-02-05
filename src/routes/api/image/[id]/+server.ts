import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, platform }) => {
	const bucket = platform?.env.cuteboys;
	if (!bucket) return new Response('Missing R2 bucket binding', { status: 500 });

	const key = decodeURIComponent(params.id ?? '');

	const file = await bucket.get(key);

	if (file) {
		return new Response(file.body);
	} else {
		return new Response(`No images found for id ${key}`, { status: 404 });
	}
};
