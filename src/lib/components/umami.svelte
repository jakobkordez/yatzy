<script lang="ts">
	import { PUBLIC_ANALYTICS_URL, PUBLIC_ANALYTICS_ID } from '$env/static/public';
	import { afterNavigate } from '$app/navigation';

	export const ssr = false;
	export const prerender = false;
	export const csr = true;

	afterNavigate((e) => {
		if (window.umami && e.from?.route.id !== e.to?.route.id) {
			window.umami.track((p) => ({
				...p,
				url: e.to?.route.id
			}));
		}
	});
</script>

{#if PUBLIC_ANALYTICS_URL && PUBLIC_ANALYTICS_ID}
	<script
		defer
		data-auto-track="false"
		src={PUBLIC_ANALYTICS_URL}
		data-website-id={PUBLIC_ANALYTICS_ID}
	></script>
{/if}
