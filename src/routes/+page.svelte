<script lang="ts">
	import GameHistory from '$lib/components/game-history.svelte';
	import NewGame from '$lib/components/new-game.svelte';
</script>

<div class="mx-auto flex max-w-xl flex-col gap-8 py-6">
	<NewGame />

	<GameHistory />
</div>
