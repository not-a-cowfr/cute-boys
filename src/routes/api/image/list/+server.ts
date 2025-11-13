import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ platform }) => {
	const bucket = platform?.env.cuteboys;
	if (!bucket) return new Response('Missing R2 bucket binding', { status: 500 });

	const list = await bucket.list();

	return new Response(JSON.stringify(list.objects.map((i) => i.key)), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
