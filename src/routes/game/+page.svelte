<script lang="ts">
	import { exitGame, gameState, setFieldAndSave } from '$lib/game-state';
	import MultiDiceSelector from './MultiDiceSelector.svelte';
	import { YatzyBasicField } from '$lib/yatzy-field';
	import Fa from 'svelte-fa';
	import { faEraser, faPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

	let player: number | undefined = 0;
	let dice: (number | null)[] = new Array(5).fill(null);
	let selectedDice: number = 0;
	let erase: boolean = false;

	function setField(fieldI: number, score: number | null) {
		setFieldAndSave(player!, fieldI, score);
		if (score !== null && player !== undefined) {
			player = (player + 1) % gs.players.length;
		}
		dice = new Array(5).fill(null);
		selectedDice = 0;
		erase = false;
	}

	$: gs = $gameState!;
	$: nonNullDice = dice.filter((v) => v !== null) as number[];
</script>

<div class="flex flex-col gap-10 md:flex-row md:items-start">
	<div class="flex flex-col gap-10 flex-1 max-w-md">
		<div class="mx-auto flex w-full flex-1 flex-col gap-6 card bg-white p-6 md:flex-col">
			<div class="flex flex-row gap-1">
				<button
					class={`btn btn-sm flex-1 ${erase ? '' : 'btn-primary'}`}
					on:click={() => (erase = false)}
				>
					<Fa icon={faPen} />
					Set field
				</button>
				<button
					class={`btn btn-secondary btn-sm flex-1 ${erase ? '' : 'btn-outline'}`}
					on:click={() => (erase = true)}
				>
					<Fa icon={faEraser} />
					<span>Erase field</span>
				</button>
			</div>

			<div class="flex flex-col gap-5">
				<div class="flex flex-col gap-1 text-center">
					<div class="text-sm">Select player</div>
					<div class="flex flex-row flex-wrap gap-2">
						{#each gs.players as v, i}
							<button
								class={`btn flex-1 ${i === player ? 'btn-primary' : ''}`}
								on:click={() => (player = i === player ? undefined : i)}
							>
								{v}
							</button>
						{/each}
					</div>
				</div>

				<div class="relative flex flex-col gap-1 text-center">
					<div class="text-sm">Select dice</div>
					<MultiDiceSelector bind:dice bind:selectedDice />

					<div class={`absolute -inset-2 bg-base-100/50 ${erase ? '' : 'hidden'}`} />
				</div>
			</div>
		</div>

		<button on:click={exitGame} class="btn btn-error btn-sm">
			<Fa icon={faRightFromBracket} />
			<span>Quit game</span>
		</button>
	</div>

	<table class="w-auto table select-none overflow-clip card bg-white text-center md:mx-auto">
		<thead>
			<tr>
				<th></th>
				{#each gs.players as p}
					<th class="w-16 border-l border-base-200 text-sm text-neutral py-2">
						{p}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each gs.fields as field, fieldI}
				<tr class={`${field instanceof YatzyBasicField ? '' : 'bg-gray-100'}`}>
					<th class="px-5 py-2 text-left font-medium">
						{gs.fieldNames[fieldI]}
					</th>

					{#each gs.scores as _, playerI}
						{@const fieldVal = gs.scores[playerI][fieldI]}
						<td class="border-l border-base-200 p-0">
							{#if !(field instanceof YatzyBasicField) || playerI !== player || erase !== (fieldVal !== null)}
								<div class="h-full w-full py-2">
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
</div>
