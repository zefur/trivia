<script>
	import { question, user } from './stores';
	import Header from '$lib/Header.svelte';
</script>

<Header />
<main>
	<div class="w-full text-center m-10"><p class="text-4xl text-bold">Full Question Bank</p></div>
	<div class="grid grid-cols-4 gap-3 place-content-center ">
		{#each $question as wenti}
			<div class=" flex flex-col break-normal bg-slate-100 text-center h-48   ">
				<div class=" w-full h-full">
					<p class="text-2xl p-3">{wenti.topic}</p>
					<p>{wenti.question}</p>
				</div>
			</div>
		{/each}
	</div>
</main>
