<script>
	import { goto } from '$app/navigation';
	import { user } from '../routes/stores';

	const logout = () => {
		$user = {
			email: 'hello@me.co.uk',
			username: 'Guest',
			runs: 0,
			percentage: 0,
			questionList: []
		};
		goto('/home');
	};
</script>

<main>
	<div class="sticky top-0 w-full flex bg-sky-400 h-20 ">
		<p class="text-4xl">Chingu trivia</p>
		<a class="align-bottom justify-self-end p-5" href="/home">Home</a>
		<a href="/questions" class="p-5">Questions</a>
		<p on:click={logout} class="p-5">Log out</p>
	</div>
</main>
