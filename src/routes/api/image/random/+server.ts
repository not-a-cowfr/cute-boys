import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ platform, url }) => {
	const bucket = platform?.env.cuteboys;
	if (!bucket) return new Response('Missing R2 bucket binding', { status: 500 });

	const list = await bucket.list();

	if (list.objects.length === 0) return new Response('No images found', { status: 404 });

	const random = list.objects[Math.floor(Math.random() * list.objects.length)];

	return Response.redirect(`${url.origin}/api/image/${random.key}`, 302);
};
