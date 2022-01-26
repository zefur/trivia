import { writable } from 'svelte/store';
export const question = writable([]);
export const fetchquestions = async () => {
	const url = 'https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json';
	const res = await fetch(url);
	const data = await res.json();
	const loadedQuestions = data.map((item) => {
		return {
			question: item.question,
			id: item.id,
			topic: item.topic,
			choices: item.choices,
			answer: item.answer
		};
	});
	question.set(loadedQuestions);
};
fetchquestions();
