<script lang="ts">
	import { exitGame } from '$lib/game-state';
	import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let quitModal = false;
</script>

<button on:click={() => (quitModal = true)} class="btn btn-error btn-sm mr-auto">
	<Fa icon={faRightFromBracket} />
	<span>Quit game</span>
</button>

{#if quitModal}
	<div class="fixed inset-0 z-10 p-8 flex">
		<button
			class="bg-black/60 absolute inset-0 cursor-default"
			on:click={() => (quitModal = false)}
		/>
		<div class="card bg-base-100 p-8 m-auto">
			<div class="text-2xl font-bold mb-2">Are you sure?</div>
			<p>You will lose all of your progress!</p>
			<div class="flex gap-2 mt-4">
				<button class="btn btn-sm ml-auto" on:click={() => (quitModal = false)}>Cancel</button>
				<button
					class="btn btn-sm btn-error"
					on:click={() => {
						quitModal = false;
						exitGame();
					}}
				>
					Quit
				</button>
			</div>
		</div>
	</div>
{/if}
