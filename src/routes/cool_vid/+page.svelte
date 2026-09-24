<script lang="ts">
import rickvid from "$lib/assets/rick.mp4"
import { fade } from "svelte/transition"
import ordinal from "ordinal"
import { resolve } from "$app/paths"
import type { Ricks } from "$lib/Types"

let { data }: { data: Ricks } = $props()
</script>

<div transition:fade>
    <h1>Thanks for being the {ordinal(data.ricks)} customer!</h1>
    <video autoplay controls>
        <source src={rickvid} type="video/mp4" />
    </video>
    <a href={resolve('/')}>Go home</a>
</div>

<style>
div {
    width: calc(100% - 2em);
    height: calc(100% - 2em);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin: 1em;
}
video {
    width: 100%;
    height: 80vh;
}
</style>
