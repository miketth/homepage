<script lang="ts">
import WindowButton from "$lib/Terminal/WindowButton.svelte"
import { goto } from "$app/navigation"
import { resolve } from "$app/paths"

function close() {
    goto(resolve("/cool_vid"))
}

function minimize() {
    alert("minimize")
}

function fullScreen() {
    document.documentElement.requestFullscreen()
}
</script>

<div class="head">
    <!-- TODO: Linux/Windows as well -->
    <div class="btns">
        <WindowButton color="#FF4050" onpress={close} />
        <WindowButton color="#FFD24A" onpress={minimize} />
        <WindowButton color="#A4CC35" onpress={fullScreen} />
    </div>
    <div>MikeTerminal</div>
    <div></div>
</div>

<style>
.head {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    margin: 0;
    padding: 0.1em 0.5em;
    background-color: #656066;
    border-radius: 0.2em 0.2em 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: sans-serif; /* TODO */
    height: 1.5em;
}
.btns {
    display: flex;
}
</style>
