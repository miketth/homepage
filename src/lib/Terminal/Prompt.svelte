<script lang="ts">
import { pwd } from "$lib/Terminal/FakeFiles"

import { host, user } from "$lib/Terminal/CommonData"

const dir = pwd
</script>

<div class="prompt">{user}@{host}:{dir}$</div>

<style>
.prompt {
    margin-right: 1em;
    color: #a4cc35;
}
</style>
