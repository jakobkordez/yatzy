<script lang="ts">
	import { gameState, setFieldAndSave } from '$lib/game-state';
	import { YatzyBasicField } from '$lib/yatzy-field';
	import { inputStore, updateInputs } from './input-store';

	$: ({ players, fields, fieldNames, scores } = $gameState!);
	$: ({ dice, erase, player } = $inputStore);

	function setField(fieldI: number, score: number | null) {
		setFieldAndSave(player, fieldI, score);
		if (score !== null)
			updateInputs({
				player: (player + 1) % players.length,
				dice: new Array(5).fill(null),
				selectedDice: 0,
				erase: false
			});
		else
			updateInputs({
				erase: false
			});
	}

	$: nonNullDice = dice.filter((v) => v !== null) as number[];
</script>

<table class="table card w-auto select-none overflow-clip bg-white text-center md:mx-auto">
	<thead>
		<tr>
			<th></th>
			{#each players as p, i}
				<th class="h-1 w-20 border-l border-base-200 p-0 text-sm text-neutral">
					<button
						class={`h-full w-full px-4 py-2 ${player === i ? 'bg-primary/40' : 'hover:bg-primary/70'}`}
						on:click={() => updateInputs({ player: i })}
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
								on:click={() => setField(fieldI, null)}
							>
								{fieldVal ?? ''}
							</button>
						{:else}
							{@const score = field.getScore(nonNullDice)}
							<button
								class={`h-full w-full py-2 font-medium text-sky-500 hover:bg-sky-200 ${
									score ? 'bg-sky-50' : ''
								}`}
								on:click={() => setField(fieldI, score)}
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
