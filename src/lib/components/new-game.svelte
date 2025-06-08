<script lang="ts">
	import { getGameContext } from '$lib/game-state.svelte';
	import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const gameState = getGameContext();

	let players = $state(['Jakob']);
	let addPlayerValue = $state('');

	function addPlayer(): void {
		if (!addPlayerValue) return;
		players = [...players, addPlayerValue];
		addPlayerValue = '';
	}
</script>

<div class="card flex flex-col gap-5 bg-white p-6">
	<h1 class="text-3xl font-medium">New game</h1>

	{#if players.length > 0}
		<div class="flex flex-col gap-2">
			<div class="text-center">Players</div>
			{#each players as player, i}
				<div class="input flex flex-row items-center gap-2 pl-6 pr-3">
					<span class="flex-1">{player}</span>
					<button
						onclick={() => {
							players = [...players.slice(0, i), ...players.slice(i + 1)];
						}}
						class="btn btn-circle btn-ghost btn-sm"
					>
						<Fa icon={faClose} />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex flex-col gap-2">
		<div class="text-center">Add player</div>
		<div class="flex gap-2">
			<input
				class="input input-bordered w-full flex-1"
				type="text"
				bind:value={addPlayerValue}
				onkeydown={(e) => {
					if (e.key == 'Enter') addPlayer();
				}}
			/>
			<button class="btn btn-circle" onclick={addPlayer}>
				<Fa icon={faAdd} />
			</button>
		</div>
	</div>

	{#if players.length > 0}
		<div class="flex flex-row justify-end gap-2">
			<button class="btn" onclick={() => (players = [])}>Clear all</button>
			<button class="btn btn-primary" onclick={() => gameState.createGame(players)}>Start</button>
		</div>
	{/if}
</div>
