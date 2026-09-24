<script lang="ts">
import type { Snippet } from "svelte"

let { script = false, children }: { script?: boolean; children: Snippet } = $props()
</script>

{#if script}
	{@render children()}
{:else}
	<noscript>
		{@render children()}
	</noscript>
{/if}
