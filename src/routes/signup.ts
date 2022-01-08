import type { RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const post: RequestHandler<
	{},
	Partial<{ email: string; username: string; password: string; ['repeat-password']: string }>
> = async (req) => {
	if (typeof req.body == 'string' || Array.isArray(req.body))
		return { status: 400, body: { error: 'Incorrect input' } };

	const input = {
		email: ('get' in req.body ? req.body.get('email') : req.body.email)?.toLowerCase().trim(),
		username: 'get' in req.body ? req.body.get('username') : req.body.username,
		password: 'get' in req.body ? req.body.get('password') : req.body.password,
		'repeat-password':
			'get' in req.body ? req.body.get('repeat-password') : req.body['repeat-password']
	};
	if (input.password !== input['repeat-password'])
		return { status: 400, body: { error: 'Passwords do not match' } };
	const user = {
		id: uuidv4(),
		username: input.username,
		email: input.email,
		pwhash: await bcrypt.hash(input.password, 10)
	};
	return {
		status: 201,
		body: {
			user
		}
	};
};
