<script lang="ts">
	import { createGame } from '$lib/game-state';
	import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let players: string[] = ['Jakob', 'Ana'];
	export let addPlayerValue: string = '';

	function addPlayer(): void {
		if (!addPlayerValue) return;
		players = [...players, addPlayerValue];
		addPlayerValue = '';
	}
</script>

<div class="flex flex-col gap-5 card max-w-xl bg-white mx-auto p-6">
	<h1 class="text-3xl font-medium">New game</h1>

	<div class="flex flex-col gap-1">
		<div class="text-center">Add player</div>
		<div class="flex gap-2">
			<input
				class="flex-1 input input-bordered w-full"
				type="text"
				bind:value={addPlayerValue}
				on:keydown={(e) => {
					if (e.key == 'Enter') addPlayer();
				}}
			/>
			<button class="btn" on:click={addPlayer}>
				<Fa icon={faAdd} />
			</button>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<div class="text-center">Players</div>
		<div class="flex flex-col gap-2">
			{#each players as player, i}
				<div class="flex flex-row items-center gap-2 input pl-6 pr-3">
					<!-- <span>#</span> -->
					<span class="flex-1">{player}</span>
					<button
						on:click={() => {
							const nPlayers = [...players];
							nPlayers.splice(i, 1);
							players = nPlayers;
						}}
						class="btn btn-circle btn-ghost btn-sm"
					>
						<Fa icon={faClose} />
					</button>
				</div>
			{/each}
		</div>
	</div>

	{#if players.length > 0}
		<div class="flex flex-row justify-end gap-2">
			<button class="btn" on:click={() => (players = [])}>Clear</button>
			<button class="btn btn-primary" on:click={() => createGame(players)}>Start</button>
		</div>
	{/if}
</div>
