<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ScoreCard from '$lib/components/score-card.svelte';
	import { getGameContext } from '$lib/game-state.svelte';
	import { faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const gameState = getGameContext();
	const history = $derived(gameState.history);

	const i = $derived(parseInt(page.url.searchParams.get('i') ?? ''));

	// svelte-ignore state_referenced_locally
	if ((!i && i !== 0) || i < 0 || i > history.length - 1) {
		goto('/');
	}

	const game = $derived(history[i]);
</script>

<div class="flex flex-col items-center gap-8">
	<div class="flex flex-col items-center gap-2">
		<a class="btn btn-outline btn-sm" href="/">
			<Fa icon={faChevronLeft} />
			<span>Home</span>
		</a>

		<div class="flex items-center gap-4">
			<button
				class="btn btn-circle btn-primary"
				onclick={() => goto(`?i=${i - 1}`, { replaceState: true })}
				disabled={i <= 0}
			>
				<Fa icon={faChevronLeft} />
			</button>
			<div class="text-xl">{i + 1} / {history.length}</div>
			<button
				class="btn btn-circle btn-primary"
				onclick={() => goto(`?i=${i + 1}`, { replaceState: true })}
				disabled={i >= history.length - 1}
			>
				<Fa icon={faChevronRight} />
			</button>
		</div>

		<button
			class="btn btn-secondary btn-sm"
			onclick={() => {
				if (history.length === 1) goto('/');
				else if (i >= history.length - 1) goto(`?i=${i - 1}`, { replaceState: true });
				gameState.removeFromHistory(i);
			}}
		>
			<Fa icon={faTrash} />
			<span>Delete</span>
		</button>
	</div>

	{#if game}
		<ScoreCard {game} />
	{/if}
</div>
