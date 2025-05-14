<script lang="ts">
	import { getGameContext } from '$lib/game-state.svelte';
	import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const gameState = getGameContext();

	interface Props {
		players?: string[];
		addPlayerValue?: string;
	}

	let { players = $bindable(['Jakob']), addPlayerValue = $bindable('') }: Props = $props();

	function addPlayer(): void {
		if (!addPlayerValue) return;
		players = [...players, addPlayerValue];
		addPlayerValue = '';
	}
</script>

<div class="card mx-auto flex max-w-xl flex-col gap-5 bg-white p-6">
	<h1 class="text-3xl font-medium">New game</h1>

	<div class="flex flex-col gap-1">
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
			<button class="btn" onclick={addPlayer}>
				<Fa icon={faAdd} />
			</button>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<div class="text-center">Players</div>
		<div class="flex flex-col gap-2">
			{#each players as player, i}
				<div class="input flex flex-row items-center gap-2 pl-6 pr-3">
					<!-- <span>#</span> -->
					<span class="flex-1">{player}</span>
					<button
						onclick={() => {
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
			<button class="btn" onclick={() => (players = [])}>Clear</button>
			<button class="btn btn-primary" onclick={() => gameState.createGame(players)}>Start</button>
		</div>
	{/if}
</div>
