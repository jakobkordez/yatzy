<script lang="ts">
	export let value: number;
	export let onClick: (() => void) | undefined;
	export let disabled: boolean = false;
	export let selected: boolean = false;
</script>

<button
	class="w-full h-full m-auto relative aspect-square border rounded-[15%] max-w-[60px] bg-gray-50"
	on:click={onClick}
	{disabled}
>
	<svg
		width="auto"
		height="auto"
		viewBox="0 0 64 64"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
	>
		{#if value % 2 === 1}
			<circle cx="32" cy="32" r="5" />
		{/if}

		{#if value > 1}
			<circle cx="48" cy="16" r="5" />
			<circle cx="16" cy="48" r="5" />
		{/if}

		{#if value > 3}
			<circle cx="16" cy="16" r="5" />
			<circle cx="48" cy="48" r="5" />
		{/if}

		{#if value === 6}
			<circle cx="32" cy="16" r="5" />
			<circle cx="32" cy="48" r="5" />
		{/if}
	</svg>

	{#if selected}
		<div class="absolute inset-0 border border-primary rounded-[15%]" />
	{/if}
</button>
