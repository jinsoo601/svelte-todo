<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import { todoStore } from '$lib/stores';
	import { onMount } from 'svelte';

	let newTodo = '';
	let isEditing = false;

	onMount(() => {
		todoStore.init();
	});

	const handleVisibilityChange: EventHandler<Event, Document> = () => {
		if (document.visibilityState === 'visible') {
			todoStore.init();
		}
	};

	const onClickNew = () => {
		isEditing = true;
	};

	const onSubmitNew = () => {
		todoStore.update((todos) => [
			...todos,
			{ id: todos.length, description: newTodo, category: '🚀', done: false }
		]);
		newTodo = '';
		isEditing = false;
	};

	const autofocus = (node: HTMLInputElement) => node.focus();
</script>

<svelte:document on:visibilitychange={handleVisibilityChange} />

<div class="container h-full flex flex-col gap-4 p-4 md:p-8 md:items-center">
	{#each $todoStore as todo}
		<label class="flex items-center gap-4 md:w-96">
			<input class="checkbox" type="checkbox" bind:checked={todo.done} />
			<p class="flex-grow flex justify-between">
				<span class:line-through={todo.done} class:opacity-50={todo.done}>{todo.description}</span>
				<i>{todo.category}</i>
			</p>
		</label>
	{/each}
	{#if isEditing}
		<form on:submit|preventDefault={onSubmitNew}>
			<input
				class="input"
				type="text"
				use:autofocus
				bind:value={newTodo}
				on:blur={() => (isEditing = false)}
			/>
		</form>
	{:else}
		<button type="button" class="btn btn-sm variant-ghost-surface" on:click={onClickNew}>
			+ New
		</button>
	{/if}
</div>

<style lang="postcss">
</style>
