<script lang="ts">
    export let script = false;
</script>

{#if script}
    <slot/>
{:else}
    <noscript>
        <slot/>
    </noscript>
{/if}
