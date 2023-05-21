import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch("/api/ricks", { method: "POST" })
  const ricks = await response.json()

  return {
    ricks
  }
}) satisfies PageLoad
