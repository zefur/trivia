<script>
	export let questionList;
	export let question = questionList[0].question;
	export let topic = questionList[0].topic;
	export let answer = questionList[0].answer;
	export let choices = questionList[0]['choices'];
</script>

<main class=" space-y-8 text-center border h-80 w-1/2 place-content-center place m-auto">
	<div>
		<p>question 1/{questionList.length}</p>
		<p>{topic}</p>
	</div>
	<div>
		<h3 class="text-center text-xl">{question}</h3>
	</div>
	<div
		class="bg-sky-400 grid grid-cols-2 place-content-center place-items-center text-center w-2/3 h-1/2 gap-4 m-auto "
	>
		{#each Object.entries(choices) as [key, value]}
			<div class="shadow w-40 bg-slate-300 border hover:shadow-2xl h-10 ">
				{key} : {value}
			</div>
		{/each}
	</div>
	{questionList[0].question}
</main>
