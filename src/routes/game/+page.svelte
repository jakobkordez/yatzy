<script lang="ts">
	import QuitButton from './quit-button.svelte';
	import ScoreCard from './score-card.svelte';
	import Inputs from './inputs.svelte';
</script>

<div class="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center">
	<div class="flex min-w-64 max-w-md flex-1 flex-col gap-6">
		<QuitButton />

		<Inputs />
	</div>

	<div class="overflow-x-auto">
		<ScoreCard />
	</div>
</div>
