<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Card from '$lib/Card.svelte';
	import { question } from '../routes/questionstore';
	import { session } from '$app/stores';
	import type { User } from '$lib/db';
	import { onMount } from 'svelte';
	let user: User | undefined;
	session.subscribe((current) => {
		user = current.user;
	});
	$: username = user ? user.username : 'Guest';
	let currentQuestion;
	onMount(() => {
		currentQuestion = question[0];
	});
</script>

<Header />
<h1>Welcome</h1>
{#if user}
	<p>You are logged in would you like to play {user.username}</p>
{:else}
	<p>Would you like to <a href="/login">Login</a>?</p>
{/if}
<!-- <Card questionList={$question} {user} /> -->

{$question[0].question}
