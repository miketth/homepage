<script lang="ts">
import Prompt from "$lib/Terminal/Prompt.svelte"
import { interpret } from "$lib/Terminal/CommandInterpreter"
import { onMount, tick } from "svelte"
import { sleep } from "$lib/Utils"
import NoScript from "./NoScript.svelte"

let script = typeof window !== "undefined"

interface output {
    command: string
    out: string
}

let outputs = $state<output[]>([])

const defaultcmds = ["cat welcome.txt", "mdcat about/me.md", "ls -la"]

let input: HTMLInputElement | null = $state(null)
let disabled = $state(true)

let command = $state("")

async function keypress(ev: KeyboardEvent) {
    if (ev.key === "Enter") {
        await doInterpret()
    }
}

async function doInterpret() {
    const out = interpret(command)
    outputs.push({ command, out })
    command = ""

    await tick()
    input?.focus()
}

if (script) {
    onMount(async () => {
        for (const cmd of defaultcmds) {
            for (const char of cmd) {
                command += char
                await sleep(50)
            }
            await doInterpret()
            await sleep(200)
        }
        disabled = false
        await tick()
        input?.focus()
    })
} else {
    outputs = defaultcmds.map((command) => ({ command, out: interpret(command) }))
}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div role="main" class="inner" onclick={() => input?.focus()}>
    <NoScript {script}>
		{#each [...outputs, { out: null, command: null }] as _, i (i)}
			<div class="line">
				<Prompt />
				{#if _.command === null}
					<input
						bind:this={input}
						{disabled}
						bind:value={command}
						onkeydown={keypress}
						type="text"
						class="in"
						aria-label="Terminal prompt"
						autocomplete="off"
					/>
				{:else}
					<div class="cmd">{_.command}</div>
				{/if}
			</div>
			{#if _.command !== null}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<pre>{@html _.out}</pre>
			{/if}
		{/each}
	</NoScript>
</div>

<style>
.inner {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    height: 100%;
    overflow-y: scroll;
    font-family: monospace; /* TODO */
}
.line {
    flex-direction: row;
    align-items: start;
    display: flex;
    justify-items: baseline;
}

.in {
    margin: 0;
    height: 1.1em;
    padding: 0;
    border: 0;
    background: #0000;
    font-family: monospace;
    color: white;
    font-size: 12pt;
    flex-grow: 1;
}
.in:focus {
    outline: none;
}

pre {
    margin-top: 0.1em;
    margin-bottom: 0.15em;
}

div :global(p) {
    margin: 0;
    padding: 0;
}

div :global(ul) {
    margin: 0;
    margin-top: -2em;
    margin-bottom: -1em;
}

div :global(li) {
    margin: 0;
    margin-bottom: -1em;
    padding: 0;
}
</style>
