<script lang="ts">
	import Dice from './dice.svelte';
	import { inputStore, updateInputs } from './input-store';

	$: ({ dice, selectedDice } = $inputStore);
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row flex-wrap items-center justify-center gap-2">
		{#each dice as v, i}
			<div class="h-12 w-12">
				<Dice
					value={v ?? 0}
					onClick={() => updateInputs({ selectedDice: i })}
					selected={selectedDice == i}
				/>
			</div>
		{/each}

		<button
			class="btn btn-outline btn-secondary btn-sm"
			on:click={() =>
				updateInputs({
					dice: new Array(dice.length).fill(null),
					selectedDice: 0
				})}
		>
			Clear
		</button>
	</div>

	<div class="flex flex-row flex-wrap justify-center gap-2">
		{#each new Array(6).fill(null) as _, i}
			<div class="h-12 w-12">
				<Dice
					value={i + 1}
					onClick={() => {
						const nv = [...dice];
						nv[selectedDice] = i + 1;

						let fi = nv.indexOf(null, selectedDice);
						if (fi === -1) fi = nv.indexOf(null);
						if (fi === -1) fi = (selectedDice + 1) % dice.length;
						updateInputs({ dice: nv, selectedDice: fi });
					}}
				/>
			</div>
		{/each}
	</div>
</div>
