<script>
	import { user, question } from './stores';
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';

	const options = ['random', 'css', 'html', 'javascript', 'Full'];
	let choice;
	let ready;
	const getReady = () => {
		$user.questions = $question;
	};

	const start = () => {
		$user.questionList;
		if (choice == 'Full') {
			$user.questionList = $user.questions;
		} else if (choice == 'random') {
			$user.questionList = $user.questions.sort(() => 0.5 - Math.random()).splice(0, 10);
		} else {
			$user.questionList = $user.questions
				.filter((question) => question.topic == choice)
				.splice(0, 10);
		}
		goto('/');
	};
	const filterQuestions = (val) => {
		return $user.questions.filter((question) => question.topic == val);
	};
	const poolReset = () => {
		$user.questions = $question;
	};
</script>

<Header />
<main class="flex justify-center items-center h-screen w-screen ">
	{#if $user.questions}
		<div class="flex-col w-2/3 text-center ">
			<div class="my-3 ">
				<p class="text-4xl">Hi {$user.username} would you like to play</p>
			</div>
			<div class=" "><p class="text-2xl">Your current stats</p></div>
			<div class="">
				<p>Runs: {$user.runs}</p>
				<p>Questions Correct: {$user.percentage} %</p>
			</div>

			<div class=" " />
			<div class="block ">
				<p>Question Bank</p>
				<div class="grid grid-cols-3">
					<div>HTML</div>
					<div>CSS</div>
					<div>Javascript</div>
					<div>{filterQuestions('html').length}</div>
					<div>{filterQuestions('css').length}</div>
					<div>{filterQuestions('javascript').length}</div>
				</div>

				<div><button on:click={poolReset}>Reset questions</button></div>
			</div>
			<div class="p-5 ">
				<p class="p-2">Which mode would you like to play</p>
				<div>
					<select bind:value={choice} class="m-3">
						{#each options as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
					<button type="submit" on:click={start}>Start</button>
				</div>
			</div>
		</div>
	{:else}
		<div class=" flex  justify-center items-center w-screen h-screen bg-gray-200">
			<div class="m-auto flex-col text-center w-2/3">
				<div class="m-8">
					<p class="text-4xl">Hi welcome to the chingu quiz</p>
					<p class="text-2xl">please input your name to start</p>
				</div>
				<div class="block">
					<input class="bg-gray-100 p-2 rounded-lg mx-2" type="text" bind:value={$user.username} />
					<button
						class="p-2 border shadow bg-sky-600 mb-4 rounded-md"
						type="submit"
						on:click={getReady}>Save</button
					>
				</div>
			</div>
		</div>
	{/if}
</main>
