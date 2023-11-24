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
			const todosFromLocalStorage: Todo[] = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
			const today = new Date().toLocaleDateString();
			if (today !== localStorage.getItem(DATE_KEY)) {
				const dailyTodoIds = DAILY_TODOS.map(({ id }) => id);
				const overflow = todosFromLocalStorage
					.filter((t) => !dailyTodoIds.includes(t.id))
					.filter((t) => !t.done);
				const todosForNewDay: Todo[] = [...DAILY_TODOS, ...overflow].map((t, id) => ({
					...t,
					id
				}));
				set(todosForNewDay);
				localStorage.setItem(DATE_KEY, today);
			} else {
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
