<script context="module">
</script>

<script>
	import Card from '$lib/Card.svelte';
	import { question } from '../routes/questionstore';
	console.log(question);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Card questionList={$question} />
{question}
