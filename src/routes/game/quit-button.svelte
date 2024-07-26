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
	<div class="fixed inset-0 z-10 flex p-8">
		<button
			class="absolute inset-0 cursor-default bg-black/60"
			on:click={() => (quitModal = false)}
		/>
		<div class="card m-auto bg-base-100 p-8">
			<div class="mb-2 text-2xl font-bold">Are you sure?</div>
			<p>You will lose all of your progress!</p>
			<div class="mt-6 flex gap-2">
				<button class="btn btn-sm ml-auto" on:click={() => (quitModal = false)}>Cancel</button>
				<button
					class="btn btn-error btn-sm"
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
