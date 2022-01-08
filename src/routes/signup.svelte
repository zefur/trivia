<script lang="typescript">
	import { goto } from '$app/navigation';
	import Form from './_form.svelte';
	let isSubmitting: boolean;
	const onUpdate = (form) => {
		isSubmitting = form.isSubmitting;
		if (form.result?.user) {
			alert('You are signed up!');
			goto('/login');
		}
	};
</script>

<h1>Create an account</h1>

<Form action="/signup" {onUpdate}>
	<fieldset>
		<label for="email">Email</label>
		<input type="email" placeholder="user@email.net" name="email" required />
		<label for="username">Username</label>
		<input type="string" placeholder="Your username" name="username" required />
		<label for="password">Password</label>
		<input type="password" placeholder="Your password" name="password" required />
		<label for="password">Password, again</label>
		<input
			type="password"
			placeholder="Repeat the password, please"
			name="repeat-password"
			required
		/>
		<input class="button-primary" type="submit" value="Signup" />
	</fieldset>
</Form>
<p>Already have an account? <a href="/login">Login</a></p>
