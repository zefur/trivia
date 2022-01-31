import type { User } from '$lib/db';
import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const dbUser = JSON.parse(browser && localStorage.getItem('user')) || {
	email: 'hello@me.co.uk',
	username: 'Guest',
	runs: 0,
	percentage: 0,
	questionList: []
};
export const user = writable(dbUser);
user.subscribe((val) => browser && (localStorage.user = JSON.stringify(val)));

export const question = writable([]);
export const fetchquestions = async () => {
	try {
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
	} catch (err) {
		return 'Error: ' + err;
	}
};

fetchquestions();
