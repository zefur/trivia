import { initDB } from '$lib/db';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'querystring';

console.log('start');
const setup = initDB().catch((err) => {
	console.log('init');
	console.error(err);
	process.exit(-1);
});

export const handle: Handle = async ({ request, resolve }) => {
	console.log('check first');
	const db = await setup;
	request.locals.db = db;
	const cookies = request.headers.cookie
		?.split(';')
		.map((v) => parse(v.trim()))
		.reduceRight((a, c) => {
			return Object.assign(a, c);
		});
	if (cookies?.token && typeof cookies.token === 'string') {
		const existingToken = db.tokens.get(cookies.token);
		if (existingToken) {
			request.locals.user = db.users.get(existingToken.email);
		}
	}

	const response = await resolve(request);
	return response;
};

export const getSession: GetSession = (request) => {
	return request.locals.user
		? {
				user: {
					email: request.locals.user.email,
					username: request.locals.user.username
				}
		  }
		: {};
};
