<script lang="typescript">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { Form } from './_form.svelte';
	let isSubmitting: boolean;
	session.subscribe(() => {});
	const onUpdate = (form) => {
		isSubmitting = form.isSubmitting;
		if (form.result?.user) {
			session.set({ user: { email: form.result.user.email } });
			alert('You are logged in!');
			goto('/');
		}
	};
</script>

<h1>Login</h1>
<Form action="/login" {onUpdate}>
	<fieldset>
		<label for="email">Email</label>
		<input type="email" placeholder="user@email.net" name="email" />
		<label for="password">Password</label>
		<input type="password" placeholder="Your password" name="password" />
		<input class="button-primary" type="submit" value="Login" />
	</fieldset>
</Form>
<p>Don't have an account? <a href="/signup">Signup</a></p>
