import type { PageLoad } from "./$types";
import type { Ricks } from "$lib/Types";

export const load = (async ({ fetch }): Promise<Ricks> => {
  const response = await fetch("/api/ricks", { method: "POST" })
  const ricks = await response.json()

  return {
    ricks
  }
}) satisfies PageLoad
