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
	{#if value % 2 === 1}
		<div
			class="absolute left-1/2 top-1/2 h-1/6 w-1/6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500"
		/>
	{/if}
	{#if value > 1}
		<div class="absolute right-[15%] top-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
		<div class="absolute bottom-[15%] left-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
	{/if}
	{#if value > 3}
		<div class="absolute left-[15%] top-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
		<div class="absolute bottom-[15%] right-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
	{/if}
	{#if value === 6}
		<div
			class="absolute left-1/2 top-[15%] h-1/6 w-1/6 -translate-x-1/2 rounded-full bg-gray-500"
		/>
		<div
			class="absolute bottom-[15%] left-1/2 h-1/6 w-1/6 -translate-x-1/2 rounded-full bg-gray-500"
		/>
	{/if}

	{#if selected}
		<div class="absolute inset-0 border border-primary rounded-[15%]" />
	{/if}
</button>
