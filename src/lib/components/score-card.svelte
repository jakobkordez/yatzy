<script lang="ts">
	import { getGameContext } from '$lib/game-state.svelte';
	import { YatzyBasicField } from '$lib/yatzy-field';
	import type { YatzyGame } from '$lib/yatzy-game';
	import type { InputState } from '../../routes/game/input-state.svelte';

	const gameState = getGameContext();

	const { game, inputState }: { game: YatzyGame; inputState?: InputState } = $props();

	let players = $derived(game.players!);
	let fields = $derived(game.fields!);
	let fieldNames = $derived(game.fieldNames!);
	let scores = $derived(game.scores!);

	let dice = $derived(inputState?.dice);
	let erase = $derived(inputState?.erase);
	let player = $derived(inputState?.player);

	function setField(fieldI: number, score: number | null) {
		if (!inputState) return;
		gameState.setField(player!, fieldI, score);
		if (score !== null) {
			inputState.player = (player! + 1) % players.length;
			inputState.dice = new Array(5).fill(null);
			inputState.selectedDice = 0;
			inputState.erase = false;
		} else {
			inputState.erase = false;
		}
	}

	let nonNullDice = $derived(dice?.filter((v) => v !== null));
</script>

<table class="table card w-auto select-none overflow-clip bg-white text-center md:mx-auto">
	<thead>
		<tr>
			<th></th>
			{#each players as p, i}
				<th class="h-1 w-20 border-l border-base-200 p-0 text-sm text-neutral">
					<button
						class={`h-full w-full px-4 py-2 ${player === i ? 'bg-primary/40' : 'hover:bg-primary/70'}`}
						onclick={() => {
							if (inputState) inputState.player = i;
						}}
					>
						{p}
					</button>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each fields as field, fieldI}
			<tr class={`${field instanceof YatzyBasicField ? '' : 'bg-gray-100'}`}>
				<th class="px-5 py-2 text-left font-medium">
					{fieldNames[fieldI]}
				</th>

				{#each scores as playerScore, playerI}
					{@const fieldVal = playerScore[fieldI]}
					<td class="h-1 border-l border-base-200 p-0">
						{#if !(field instanceof YatzyBasicField) || playerI !== player || erase !== (fieldVal !== null)}
							<div class="h-full w-full content-center py-2">
								{fieldVal ?? ''}&ZeroWidthSpace;
							</div>
						{:else if erase}
							<button
								class="h-full w-full bg-pink-50 py-2 font-medium text-pink-500 hover:bg-pink-100"
								onclick={() => setField(fieldI, null)}
							>
								{fieldVal ?? ''}
							</button>
						{:else}
							{@const score = field.getScore(nonNullDice!)}
							<button
								class={`h-full w-full py-2 font-medium text-sky-500 hover:bg-sky-200 ${
									score ? 'bg-sky-50' : ''
								}`}
								onclick={() => setField(fieldI, score)}
							>
								{score || '_'}
							</button>
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
