<script>
	import { user, question } from './stores';
	import { goto } from '$app/navigation';
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
</script>

<main class="flex justify-center items-center h-screen w-screen ">
	{#if $user.questions}
		<div class="flex-col w-2/3 text-center ">
			<div class=" ">
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
			</div>
			<div class="p-5 ">
				<p class="p-2">Which mode would you like to play</p>
				<select bind:value={choice}>
					{#each options as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
				<button type="submit" on:click={start}>Start</button>
			</div>
		</div>
	{:else}
		<div class=" flex m-auto justify-center items-center text-center  h-screen bg-gray-200">
			<div class="block">
				<p>Hi welcome welcome to the chingu quiz please input your name to start</p>
			</div>
			<div class="block">
				<input class="bg-gray-100 p-2 rounded-lg" type="text" bind:value={$user.username} />
				<button class="p-2 border shadow bg-sky-600 mb-4" type="submit" on:click={getReady}
					>save</button
				>
			</div>
		</div>
	{/if}
</main>
