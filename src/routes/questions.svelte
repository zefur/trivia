<script>
	import { question, user } from './stores';
</script>

<main>
	{#each $question as wenti}
		<div>
			{wenti.question}
		</div>
	{/each}
</main>
