<script lang="ts">
	import Dice from './dice.svelte';

	export let dice = new Array(5).fill(null);
	export let selectedDice = 0;
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row flex-wrap items-center justify-center gap-2">
		{#each dice as v, i}
			<div class="h-12 w-12">
				<Dice value={v ?? 0} onClick={() => (selectedDice = i)} selected={selectedDice == i} />
			</div>
		{/each}

		<button
			class="btn btn-secondary btn-sm btn-outline"
			on:click={() => {
				dice = new Array(dice.length).fill(null);
				selectedDice = 0;
			}}
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
						dice = nv;

						let fi = nv.indexOf(null, selectedDice);
						if (fi === -1) fi = nv.indexOf(null);
						if (fi === -1) fi = (selectedDice + 1) % dice.length;
						selectedDice = fi;
					}}
				/>
			</div>
		{/each}
	</div>
</div>
