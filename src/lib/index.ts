// place files you want to import through the `$lib` alias in this folder.

export type Todo = {
	id: number;
	description: string;
	category: '☀️' | '🌙' | '🚀';
	done: boolean;
};

export const DAILY_TODOS: Todo[] = [
	// morning routines
	{ id: 0, description: '양치', category: '☀️', done: false },
	{ id: 1, description: '세수 + 스킨케어', category: '☀️', done: false },
	{ id: 2, description: '면도', category: '☀️', done: false },
	{ id: 3, description: '머리정리', category: '☀️', done: false },
	{ id: 4, description: '영양제 (유산균 + 탈모약)', category: '☀️', done: false },

	// general
	{ id: 5, description: '일본어 공부 10분', category: '🚀', done: false },

	// night routines
	{ id: 6, description: 'Tretinoin', category: '🌙', done: false },
	{ id: 7, description: 'Water Pik', category: '🌙', done: false }
];
