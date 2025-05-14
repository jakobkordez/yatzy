<script lang="ts">
	import { getGameContext } from '$lib/game-state.svelte';
	import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const gameState = getGameContext();

	let quitModal = $state(false);
</script>

<button onclick={() => (quitModal = true)} class="btn btn-error btn-sm mr-auto">
	<Fa icon={faRightFromBracket} />
	<span>Quit game</span>
</button>

{#if quitModal}
	<div class="fixed inset-0 z-10 flex p-8">
		<button
			class="absolute inset-0 cursor-default bg-black/60"
			onclick={() => (quitModal = false)}
			aria-label="Close"
		></button>
		<div class="card m-auto bg-base-100 p-8">
			<div class="mb-2 text-2xl font-bold">Are you sure?</div>
			<p>You will lose all of your progress!</p>
			<div class="mt-6 flex gap-2">
				<button class="btn btn-sm ml-auto" onclick={() => (quitModal = false)}>Cancel</button>
				<button
					class="btn btn-error btn-sm"
					onclick={() => {
						quitModal = false;
						gameState.exitGame();
					}}
				>
					Quit
				</button>
			</div>
		</div>
	</div>
{/if}
