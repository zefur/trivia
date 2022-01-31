import type { RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import type { DB } from '$lib/db';
import * as cookie from 'cookie';

export const post: RequestHandler<
	{ db: DB },
	Partial<{ email: string; password: string }>
> = async ({ request, locals }) => {
	const body = await request.json();

	if (typeof body == 'string' || Array.isArray(body))
		return {
			status: 400,
			body: {
				error: 'Incorrect input'
			}
		};

	const input = {
		email: ('get' in body ? body.get('email') : body.email)?.toLowerCase().trim(),
		password: 'get' in body ? body.formData.get('password') : body.password
	};
	const db = locals.db;

	const user = db.users.get(input.email);

	if (!user) return { status: 400, body: { error: 'Incorrect email or password' } };

	const isPasswordValid = await bcrypt.compare(input.password, user.pwhash);

	if (!isPasswordValid) return { status: 400, body: { error: 'Incorrect email or password' } };
	const token = { id: uuidv4(), email: user.email };
	db.tokens.set(token.id, token);

	return {
		status: 200,
		body: {
			user
		},
		headers: {
			'set-cookie': cookie.serialize('token', token.id, {
				maxAge: 60 * 60 * 24 * 1
			})
		}
	};
};
