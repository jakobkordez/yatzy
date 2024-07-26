<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { gameState } from '$lib/game-state';
	import '../app.css';

	const gs = $gameState;
	const path = $page.url.pathname;

	if (gs && !path.startsWith('/game/')) {
		goto('/game');
	} else if (!gs && !path.startsWith('/new-game/')) {
		goto('/new-game');
	}
</script>

<svelte:head>
	<title>Yatzy Scorecard</title>
</svelte:head>

<div class="bg-base-200 min-h-screen flex flex-col">
	<div class="flex-1 max-w-screen-lg mx-auto p-6">
		<slot />
	</div>

	<footer class="bg-base-300 p-1.5">
		<div class="max-w-screen-md mx-auto flex justify-between gap-4">
			<div>
				Yatzy Scorecard by <a href="https://jkob.cc" class="link">jkob.cc</a>
			</div>
			<div>
				Source code available on
				<a href="https://github.com/jakobkordez/yatzy" class="link">Github</a>
			</div>
		</div>
	</footer>
</div>
