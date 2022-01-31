import { initDB } from '$lib/db';
import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

import { parse } from 'querystring';

const setup = initDB().catch((err) => {
	console.error(err);
	process.exit(-1);
});

export const handle: Handle = async ({ event, resolve }) => {
	const db = await setup;
	event.locals.db = db;

	const cookies = cookie.parse(event.request.headers.cookie || '');

	if (cookies?.token && typeof cookies.token === 'string') {
		const existingToken = db.tokens.get(cookies.token);
		s;
		event.request.headers;
		if (existingToken) {
			event.locals.user = db.users.get(existingToken.email);
		}
	}
	//
	cookies;
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
