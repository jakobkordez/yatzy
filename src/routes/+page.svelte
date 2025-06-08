<script lang="ts">
	import { getGameContext } from '$lib/game-state.svelte';
	import { YatzySumField } from '$lib/yatzy-field';
	import { faAdd, faChevronRight, faClose } from '@fortawesome/free-solid-svg-icons';
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

<div class="mx-auto flex max-w-xl flex-col gap-8 py-6">
	<div class="card flex flex-col gap-5 bg-white p-6">
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

	{#if gameState.history.length > 0}
		<div class="card flex flex-col gap-5 bg-white p-6">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-medium">Previous games</h1>
				<a class="btn btn-outline btn-sm" href="/history?i=0">Full history</a>
			</div>

			{#each gameState.history as game, gameI}
				{@const totalI = game.fields.findIndex((f) => f instanceof YatzySumField)}
				<div class="flex items-center gap-2 rounded-lg border p-2">
					{#each game.players as player, playerI}
						{#if playerI !== 0}
							<div class="h-8 w-px bg-gray-300"></div>
						{/if}
						<div class="flex-1 text-center">
							<div class="text-lg">{player}</div>
							<div>{game.scores[playerI][totalI] ?? 0}</div>
						</div>
					{/each}
					<a href="/history?i={gameI}" class="btn btn-circle btn-ghost">
						<Fa icon={faChevronRight} />
					</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
