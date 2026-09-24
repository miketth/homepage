<script lang="ts">
let { children } = $props()
import "$lib/common.css"
import {onNavigate} from "$app/navigation";

onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
        document.startViewTransition(async () => {
            resolve()
            await navigation.complete
        })
    })
})

</script>

<svelte:head>
    <title>Mike's website</title>
    <meta name="description" content="Personal, interactive website of Miklós Tóth." />
</svelte:head>

{@render children()}
