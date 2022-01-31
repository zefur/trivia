import type { RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const post: RequestHandler<
	{},
	Partial<{ email: string; username: string; password: string; ['repeat-password']: string }>
> = async ({ request, locals, params }) => {
	const body = await request.json();
	if (typeof body == 'string' || Array.isArray(body))
		return { status: 400, body: { error: 'Incorrect input' } };

	const input = {
		email: ('get' in body ? body.get('email') : body.email)?.toLowerCase().trim(),
		username: 'get' in body ? body.get('username') : body.username,
		password: 'get' in body ? body.get('password') : body.password,
		'repeat-password': 'get' in body ? body.get('repeat-password') : body['repeat-password']
	};
	if (input.password !== input['repeat-password'])
		return { status: 400, body: { error: 'Passwords do not match' } };
	const db = locals.db;
	const user = {
		id: uuidv4(),
		username: input.username,
		email: input.email,
		pwhash: await bcrypt.hash(input.password, 10),
		runs: 0
	};
	db.users.set(user.email, user);
	return {
		status: 201,
		body: {
			user
		}
	};
};
