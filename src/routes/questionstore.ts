import { writable } from 'svelte/store';
export const question = writable([]);
export const fetchquestions = async () => {
	const url = 'https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json';
	const res = await fetch(url);
	const data = await res.json();

	return data;
};
const questionList = await fetchquestions();

question.set(questionList);
