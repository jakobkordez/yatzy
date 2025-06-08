<script lang="ts">
	import Dice from '$lib/components/dice.svelte';
	import { getInputContext } from './input-state.svelte';

	const inputState = getInputContext();

	let dice = $derived(inputState.dice);
	let selectedDice = $derived(inputState.selectedDice);
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row flex-wrap items-center justify-center gap-2">
		{#each dice as v, i}
			<div class="h-12 w-12">
				<Dice
					value={v ?? 0}
					onClick={() => (inputState.selectedDice = i)}
					selected={selectedDice == i}
				/>
			</div>
		{/each}

		<button
			class="btn btn-outline btn-secondary btn-sm"
			onclick={() => {
				inputState.dice = dice.map(() => null);
				inputState.selectedDice = 0;
			}}
		>
			Clear
		</button>
	</div>

	<div class="flex flex-row flex-wrap justify-center gap-2">
		{#each { length: 6 }, i}
			<div class="h-12 w-12">
				<Dice
					value={i + 1}
					onClick={() => {
						const nv = [...dice];
						nv[selectedDice] = i + 1;

						let fi = nv.indexOf(null, selectedDice);
						if (fi === -1) fi = nv.indexOf(null);
						if (fi === -1) fi = (selectedDice + 1) % dice.length;
						inputState.dice = nv;
						inputState.selectedDice = fi;
					}}
				/>
			</div>
		{/each}
	</div>
</div>
