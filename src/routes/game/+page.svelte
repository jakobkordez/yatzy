<script lang="ts">
	import QuitButton from './quit-button.svelte';
	import ScoreCard from '$lib/components/score-card.svelte';
	import Inputs from './inputs.svelte';
	import { setInputContext } from './input-state.svelte';
	import { getGameContext } from '$lib/game-state.svelte';
	import { goto } from '$app/navigation';

	const inputState = setInputContext();
	const gameState = getGameContext();

	$effect(() => {
		if (!gameState.gameInProgress) goto('/');
	});
</script>

<div class="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center">
	<div class="flex min-w-64 max-w-md flex-1 flex-col gap-6">
		<QuitButton />

		<Inputs />
	</div>

	<div class="overflow-x-auto">
		{#if gameState.gameInProgress}
			<ScoreCard game={gameState.game!} {inputState} />
		{/if}
	</div>
</div>
