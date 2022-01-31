<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { user } from './stores';
	import Form from './_form.svelte';
	let isSubmitting: boolean;
	session.subscribe(() => {});
	const onUpdate = (form) => {
		isSubmitting = form.isSubmitting;
		if (form.result?.user) {
			user.set({
				email: form.result.user.email,
				username: form.result.user.username,
				runs: form.result.user.runs
			});
			alert('You are logged in!');
			goto('/');
		}
	};
</script>

<h1>Login</h1>
<Form action="/login" {onUpdate}>
	<fieldset>
		<label for="email">Email</label>
		<input type="email" placeholder="user@email.net" name="email" required />
		<label for="password">Password</label>
		<input type="password" placeholder="Your password" name="password" required />
		<input class="bg-blue-500" type="submit" value="Login" disabled={isSubmitting} />
	</fieldset>
</Form>
<p>Don't have an account? <a href="/signup">Signup</a></p>
