<script lang="ts">
  export let color = '#FFD24A'
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click class="btn" style="background-color: {color}"></span>

<style>
  .btn {
      height: .9em;
      width: .9em;
      margin-left: .15em;
      margin-right: .15em;
      border-radius: 50%;
      cursor: pointer;
      display: inline-block;
  }
</style>