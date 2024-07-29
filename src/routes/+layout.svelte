<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { gameState } from '$lib/game-state';
	import '../app.css';

	$: {
		const gs = $gameState;
		const path = $page.url.pathname;

		if (gs && !path.match(/^\/game\b/)) {
			goto('/game');
		} else if (gs === null && !path.match(/^\/new-game\b/)) {
			goto('/new-game');
		}
	}
</script>

<svelte:head>
	<title>Yatzy Scorecard</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-base-200">
	<div class="flex-1 p-6">
		<slot />
	</div>

	<footer class="bg-base-300 px-3 py-1.5">
		<div class="mx-auto flex max-w-screen-md justify-between gap-4">
			<div>
				Yatzy Scorecard by <a href="https://jkob.cc" class="link">jkob.cc</a>
			</div>
			<div class="text-right">
				Source code available on
				<a href="https://github.com/jakobkordez/yatzy" class="link">Github</a>
			</div>
		</div>
	</footer>
</div>
