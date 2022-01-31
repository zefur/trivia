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
	<div class="sticky top-0 w-screen flex   ">
		<p class="text-4xl w-full align-base m-3">Chingu trivia</p>
		<div class="w-full justify-end flex ">
			<p class=" p-5"><a href="/home">Home</a></p>
			<p class="p-5"><a href="/questions">Questions</a></p>
			{#if $user.username != 'Guest'}
				<p on:click={logout} class="p-5">Log out</p>
			{/if}
		</div>
	</div>
</main>
