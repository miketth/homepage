<script lang="ts">
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";

    let container: HTMLDivElement;
    let huntee: HTMLDivElement;

    function rick() {
        goto("/cool_vid")
    }

    const trollCount = Math.random() * 20;
    let jumped = 0;

    function troll() {
        if (jumped > trollCount) return;

        let width = container.clientWidth;
        let height = container.clientHeight;

        let x = Math.random() * (width - 100);
        let y = Math.random() * (height - 100);

        huntee.style.marginLeft = `${x}px`;
        huntee.style.marginTop = `${y}px`;

        jumped++;
    }
</script>

<div bind:this={container} class="container" transition:fade>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div bind:this={huntee} on:mouseover={troll} class="huntee">
        <button on:click={rick}>Hunt me</button>
    </div>
</div>

<style>
    .container {
        margin: 1em;
        width: calc(100vw - 2em);
        height: calc(100vh - 2em);
    }
    .huntee {
        width: fit-content;
    }
    button {
        margin: 4em;
    }
</style>