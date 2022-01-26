import { initDB } from '$lib/db';
import type { GetSession, Handle } from '@sveltejs/kit';

import { parse } from 'querystring';

console.log('start');
const setup = initDB().catch((err) => {
	console.log('init');
	console.error(err);
	process.exit(-1);
});

export const handle: Handle = async ({ event, resolve }) => {
	console.log('check first');
	console.log(event);
	const db = await setup;
	event.locals.db = db;
	const cookies = event.request.headers.cookie
		?.split(';')
		.map((v) => parse(v.trim()))
		.reduceRight((a, c) => {
			return Object.assign(a, c);
		});
	if (cookies?.token && typeof cookies.token === 'string') {
		const existingToken = db.tokens.get(cookies.token);
		if (existingToken) {
			event.locals.user = db.users.get(existingToken.email);
		}
	}

	const response = await resolve(event);
	return response;
};

export const getSession: GetSession = (event) => {
	return event.locals.user
		? {
				user: {
					email: event.locals.user.email,
					username: event.locals.user.username
				}
		  }
		: {};
};
