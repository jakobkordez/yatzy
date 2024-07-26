<script lang="ts">
	import { faEraser, faPen } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { inputStore, updateInputs } from './input-store';
	import MultiDiceSelector from './multi-dice-selector.svelte';
	import { gameState } from '$lib/game-state';

	$: ({ erase, player } = $inputStore);
	$: ({ players } = $gameState!);
</script>

<div class="card mx-auto flex w-full flex-1 flex-col gap-6 bg-white p-6 md:flex-col">
	<div class="flex flex-wrap gap-1">
		<button
			class={`btn btn-sm min-w-fit flex-1 ${erase ? '' : 'btn-primary'}`}
			on:click={() => updateInputs({ erase: false })}
		>
			<Fa icon={faPen} />
			Set field
		</button>
		<button
			class={`btn btn-secondary btn-sm min-w-fit flex-1 ${erase ? '' : 'btn-outline'}`}
			on:click={() => updateInputs({ erase: true })}
		>
			<Fa icon={faEraser} />
			<span>Erase field</span>
		</button>
	</div>

	<div class="flex flex-col gap-5">
		<div class="flex flex-col gap-1 text-center">
			<div class="text-sm">Select player</div>
			<div class="flex flex-wrap gap-2">
				{#each players as v, i}
					<button
						class={`btn flex-1 ${i === player ? 'btn-primary' : ''}`}
						on:click={() => updateInputs({ player: i })}
					>
						{v}
					</button>
				{/each}
			</div>
		</div>

		<div class="relative flex flex-col gap-1 text-center">
			<div class="text-sm">Select dice</div>
			<MultiDiceSelector />

			<div class={`absolute -inset-2 rounded-lg bg-base-100/50 ${erase ? '' : 'hidden'}`} />
		</div>
	</div>
</div>
