import { initDB } from '$lib/db';
import type { Handle } from '@sveltejs/kit';

const setup = initDB().catch((err) => {
	console.error(err);
	process.exit(-1);
});

export const handle: Handle = async ({ request, resolve }) => {
	const db = await setup;
	request.locals.db = db;
	const response = await resolve(request);
	return response;
};
