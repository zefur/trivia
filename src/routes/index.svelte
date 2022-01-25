<script context="module">
</script>

<script lang="ts">
	import Header from '$lib/header.svelte';
	import Card from '$lib/Card.svelte';
	import { question } from '../routes/questionstore';
	import { session } from '$app/stores';
	import type { User } from '$lib/db';
	let user: User | undefined;
	session.subscribe((current) => {
		user = current.user;
	});
	$: username = user ? user.username : 'Guest';
</script>

<!-- <Header /> -->
<h1>Welcome</h1>
{#if user}
	<p>You are logged in would you like to play {user.username}</p>
{:else}
	<p>Would you like to <a href="/login">Login</a>?</p>
{/if}

<Card questionList={$question} {user} />
