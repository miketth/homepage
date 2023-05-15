<script>
  import rickvid from "$lib/assets/rick.mp4";
  import { fade } from "svelte/transition";

  let n = 1
</script>

<div transition:fade>
  <h1>Thanks for being the {n}th customer!</h1>
  <video autoplay controls>
    <source src="{rickvid}" type="video/mp4">
  </video>
  <a href="/">Go home</a>
</div>

<style>
  div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1em;
  }
  video {
      width: 100%;
      height: 80vh;
  }
</style>