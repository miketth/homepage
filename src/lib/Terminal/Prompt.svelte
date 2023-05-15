<script>
  import { pwd } from "$lib/Terminal/FakeFiles.ts";

  let user = "guest"
  let host = "website"

  const dir = pwd
</script>

<div class="prompt">{user}@{host}:{dir}$</div>

<style>
  .prompt {
      margin-right: 1em;
      color: #A4CC35;
  }
</style>