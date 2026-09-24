<script lang="ts">
let { color = "#FFD24A", onpress }: { color?: string; onpress?: () => void } = $props()
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<span onclick={() => onpress?.()} class="btn" style="background-color: {color}"></span>

<style>
.btn {
    height: 0.9em;
    width: 0.9em;
    margin-left: 0.15em;
    margin-right: 0.15em;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
}
</style>
