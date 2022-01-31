<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Card from '$lib/Card.svelte';
	import { user } from './stores.ts';
</script>

<Header />
<div class="flex justify-center items-center w-screen h-screen">
	<div class="m-auto">
		{#if $user.username == 'Guest'}
			<div>
				<p>Please click <a href="/home"> HERE </a> to sign up</p>
			</div>
		{:else if $user.questionList.length > 1}
			<Card />
		{/if}
	</div>
</div>
