<script lang="ts">
  import TerminalHeader from "$lib/Terminal/TerminalHeader.svelte";
  import TerminalContent from "$lib/Terminal/TerminalContent.svelte";
  import { fade } from "svelte/transition";
</script>

<div class="terminal" transition:fade>
  <TerminalHeader/>
  <TerminalContent/>
</div>

<style>
  .terminal {
      flex-grow: 0;
      flex-shrink: 1;
      flex-basis: auto;
      display: flex;
      flex-flow: column;
      box-shadow: 0 0 7px 3px rgba(0,0,0,.6);
      background-color: #474247;
      border: #474247; /* TODO: change */
      width: auto;
      border-radius: 0.2em;
      overflow: hidden;
      margin: 1em;
      height: calc(100vh - 2em);
      font-size: 12pt;
      color: white;
  }
</style>