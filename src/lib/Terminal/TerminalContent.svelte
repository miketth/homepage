<script>
// @ts-nocheck

import Prompt from "$lib/Terminal/Prompt.svelte";
import { interpret } from "$lib/Terminal/CommandInterpreter.ts";
import { onMount, tick } from "svelte";
import { sleep } from "$lib/Utils.ts";
import NoScript from "./NoScript.svelte";

let script = typeof window !== 'undefined'

let outputs = []

let defaultcmds = [
  "cat welcome.txt",
  "mdcat about/me.md",
  "ls -la"
]

let input;
let disabled = true;

let command = ""

async function keypress(ev) {
  if (ev.key === "Enter") {
    let out = interpret(command)
    outputs = [...outputs, { command, out }]
    command = ""

    await tick()
    input?.focus()
  }
}

if (script) {
  onMount(async () => {
    for (const cmd of defaultcmds) {
      for (const char of cmd) {
        command += char
        await sleep(50)
      }
      await keypress({key: "Enter"})
      await sleep(200)
    }
    disabled = false
    await tick()
    input?.focus()
  })
} else {
  outputs = defaultcmds.map(command => ({ command, out: interpret(command) }))
}



</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="inner" on:click={input.focus()}>
  <NoScript {script}>
    {#each [...outputs, {out: null, command: null}] as output, i}
      <div class="line">
        {#key i}
          <Prompt/>
        {/key}
        {#if output.command === null}
          <input bind:this={input} {disabled} bind:value={command} on:keypress={keypress} type="text" class="in" aria-label="Terminal prompt" autocomplete="off">
        {:else }
          <div class="cmd">{output.command}</div>
        {/if}
      </div>
      {#if output.command !== null}
        <pre>{@html output.out}</pre>
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
      padding: .5em;
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
      margin-top: .1em;
      margin-bottom: .15em;
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