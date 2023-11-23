import { DAILY_TODOS, type Todo } from '$lib';
import { writable } from 'svelte/store';

const TODO_KEY = 'todos';
const DATE_KEY = 'date';

function isEmpty(arr: Todo[]) {
	return arr.length === 0;
}

function createTodoStore() {
	const todosFromLocalStorage = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
	const { subscribe, set, update } = writable<Todo[]>(todosFromLocalStorage);
	return {
		subscribe,
		set,
		update,
		init: () => {
			const today = new Date().toLocaleDateString();
			if (today !== localStorage.getItem(DATE_KEY)) {
				set(structuredClone(DAILY_TODOS));
				localStorage.setItem(DATE_KEY, today);
			} else {
				const todosFromLocalStorage = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
				const todos = isEmpty(todosFromLocalStorage)
					? structuredClone(DAILY_TODOS)
					: todosFromLocalStorage;
				set(todos);
			}
		}
	};
}

export const todoStore = createTodoStore();

todoStore.subscribe((todos) => {
	localStorage.setItem(TODO_KEY, JSON.stringify(todos));
});
