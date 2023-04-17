<script>
import Prompt from "$lib/Terminal/Prompt.svelte";
import { interpret } from "$lib/Terminal/CommandInterpreter.ts";
import { onMount, tick } from "svelte";
import { sleep } from "$lib/Utils.ts";

let outputs = []

let defaultcmds = [
  "cat welcome.txt",
  "cat welcome2.txt"
]

let input;
let disabled = true;

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
  input.focus()
})

let command = ""
async function keypress(ev) {
  if (ev.key === "Enter") {
    let out = interpret(command)
    outputs = [...outputs, { command, out }]
    command = ""

    await tick()
    input.focus()
  }
}

</script>

<div class="inner" on:click={input.focus()}>
  {#each [...outputs, {out: null, command: null}] as output, i}
    <div class="line">
      {#key i}
        <Prompt/>
      {/key}
      {#if output.command === null}
        <input bind:this={input} {disabled} bind:value={command} on:keypress={keypress} type="text" class="in">
      {:else }
        <div class="cmd">{output.command}</div>
      {/if}
    </div>
    {#if output.command !== null}
      <pre>{@html output.out}</pre>
    {/if}
  {/each}
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
      width: 100%;
      margin: 0;
      height: 1.1em;
      padding: 0;
      border: 0;
      background: #0000;
      font-family: monospace;
      color: white;
      font-size: 12pt;
  }
  .in:focus {
      outline: none;
  }

  pre {
      margin-top: .1em;
      margin-bottom: .15em;
  }
</style>