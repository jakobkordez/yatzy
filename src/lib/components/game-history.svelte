<script lang="ts">
	import { getGameContext } from '$lib/game-state.svelte';
	import { YatzySumField } from '$lib/yatzy-field';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const gameState = getGameContext();
</script>

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
