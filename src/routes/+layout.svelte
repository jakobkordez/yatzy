<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { setGameContext } from '$lib/game-state.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';

	let { children }: { children?: Snippet } = $props();

	const gameState = setGameContext();

	$effect(() => {
		const path = page.url.pathname;
		const gs = gameState.gameInProgress;

		if (gs && !path.match(/^\/game\b/)) {
			goto('/game');
		} else if (gs === false && !path.match(/^\/new-game\b/)) {
			goto('/new-game');
		}
	});
</script>

<svelte:head>
	<title>Yatzy Scorecard</title>
	<meta name="description" content="Yatzy Scorecard" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-base-200">
	<div class="flex-1 p-6">
		{@render children?.()}
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
