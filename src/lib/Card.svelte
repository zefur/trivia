<script>
	import { goto } from '$app/navigation';

	export let myQuestions;
	export let currentQuestion;

	export let message;
	export let message2;
	export let visible = false;
	export let score = 0;

	import { user, question } from '../routes/stores';

	myQuestions = $user.questionList;
	currentQuestion = myQuestions[0];

	const checkAnswer = (value) => {
		if (value == currentQuestion.answer) {
			message = 'Yes that is correct';
			visible = true;
			score += 1;
		} else {
			message = `Sorry that is incorrect the correct answer is ${currentQuestion.answer}`;
			visible = true;
		}
		if (checkQuestion) {
			$user.runs += 1;
			$user.percentage =
				($user.percentage * ($user.runs - 1) + (score / myQuestions.length) * 100) / $user.runs;
			message2 = `congratulations you finished here are your results you got ${score} out of ${myQuestions.length}`;
			visible = true;
		}
	};

	$: checkQuestion = myQuestions.at(-1).question == currentQuestion.question;
	const nextQuestion = () => {
		const index = myQuestions.indexOf(currentQuestion);
		currentQuestion = myQuestions[index + 1];
		visible = false;
	};

	const getQuestions = () => {
		$user.questionsList = $user.questions.sort(() => 0.5 - Math.random()).splice(0, 10);
		currentQuestion = myQuestions[0];
		visible = false;
	};
	export const poolReset = () => {
		$user.questions = $question;
		goto('/home');
	};
</script>

<main class="flex flex-col space-y-8 text-center border-4 min-h-max w-2/3 m-auto ">
	<div class="mt-5">
		<p class="p-2">Question {myQuestions.indexOf(currentQuestion) + 1}/{myQuestions.length}</p>
		<p>{currentQuestion.topic}</p>
	</div>
	<div>
		<h3 class="text-center text-xl font-bold">{currentQuestion.question}</h3>
	</div>
	<div class=" grid grid-cols-2  place-items-center text-center w-full  gap-4 m-auto">
		{#each Object.entries(currentQuestion.choices) as [key, choice]}
			<button
				class="shadow min-w-min  border hover:shadow-2xl w-2/3 min-h-min py-3 break-normal"
				on:click={() => checkAnswer(key)}
				disabled={visible}
			>
				{key} : {choice}
			</button>
		{/each}
		<div class="block col-span-2 ">
			{#if visible}
				<div class="w-full m-2 text-center min-w-min">
					<p class="font-semibold break-normal">{message}</p>
					{#if message2}
						<p class="font-semibold break-normal">{message2}</p>
					{/if}
				</div>
				{#if checkQuestion}
					<button class="p-2 border shadow bg-sky-600 mb-4"><a href="/home">Home</a></button><button
						class="p-2 border shadow bg-sky-600 mb-4"
						on:click={getQuestions}>Play again</button
					><button class="p-2 border shadow bg-sky-600 mb-4" on:click={poolReset}
						>Reset Questions</button
					>
					<p>You have {$user.questions.length} questions left in the question pool</p>
				{:else}
					<button class="p-2 border shadow bg-sky-600 mb-4" on:click={nextQuestion}
						>Next question</button
					>
				{/if}
			{/if}
		</div>
	</div>
</main>
