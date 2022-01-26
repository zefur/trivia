<script>
	export let questionList;
	export let user;
	export let myQuestions;
	export let currentQuestion;
	export let topicl;
	export let message;
	export let visible = false;
	export let score = 0;

	const getQuestions = (questionList) => {
		console.log('meh');
		let currentlist;
		if (topicl) {
			currentlist = [...questionList].filter((question) => question.topic == topicl).splice(0, 10);
		} else {
			currentlist = [...questionList].sort(() => 0.5 - Math.random()).splice(0, 10);
		}
		console.log(currentlist);
		return currentlist;
	};
	myQuestions = getQuestions(questionList);
	currentQuestion = myQuestions[0];
	const checkAnswer = (value) => {
		if (value == currentQuestion.answer) {
			console.log('eh');
			message = 'Yes that is correct';
			visible = true;
			score += 1;
		} else {
			console.log('james');
			message = `Sorry that is incorrect the correct answer is ${currentQuestion.answer}`;
			visible = true;
		}
	};

	const nextQuestion = () => {
		let index = myQuestions.indexOf(currentQuestion);
		if (myQuestions[-1] != currentQuestion) {
			currentQuestion = myQuestions[index + 1];
		} else {
			message = `congratulations you finished here are your results you got ${score} out of ${myQuestions.length}`;
		}

		visible = false;
	};
</script>

<main class="flex flex-col space-y-8 text-center border min-h-max w-1/2  m-auto bg-gray-200">
	<div>
		<p>question {myQuestions.indexOf(currentQuestion) + 1}/{myQuestions.length}</p>
	</div>
	<div>
		{console.log(questionList)}
		<h3 class="text-center text-xl font-bold">{currentQuestion.question}</h3>
	</div>
	<div class="bg-sky-400 grid grid-cols-2  place-items-center text-center w-2/3  gap-4 m-auto ">
		{#each Object.entries(currentQuestion.choices) as [key, choice]}
			<button
				class="shadow  bg-slate-300 border hover:shadow-2xl w-2/3 min-h-min py-3"
				on:click={checkAnswer(key)}
				disabled={visible}
			>
				{key} : {choice}
			</button>
		{/each}
		<div class="flex">
			{#if visible}
				{message}
				<div on:click={nextQuestion}>Next question</div>{/if}
		</div>
	</div>

	<div>{score}</div>
</main>
