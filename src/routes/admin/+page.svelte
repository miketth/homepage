<script lang="ts">
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";

  function rick() {
    goto("/cool_vid")
  }
</script>

<div transition:fade>
  <h1>Admin area</h1>
  <form method="post" on:submit|preventDefault={rick}>
    <label style="grid-column: 1 / span 1; grid-row: 1 / span 1" for="username">Username:</label>
    <input style="grid-column: 2 / span 1; grid-row: 1 / span 1" type="text" id="username" name="username">

    <label style="grid-column: 1 / span 1; grid-row: 2 / span 1" for="password">Password:</label>
    <input style="grid-column: 2 / span 1; grid-row: 2 / span 1" type="password" id="password" name="password">

    <input style="grid-column: 1 / span 2; grid-row: 3 / span 1" type="submit" value="Log in">
  </form>
</div>

<style>
  div {
      margin: 1em;
  }
  form {
      display: grid;
      grid-template-columns: 7em 20em;
      gap: 1em
  }
</style>