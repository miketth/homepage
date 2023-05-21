import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const GET = (async ({ platform }) => {
  let ricks = 0
  if (platform?.env?.HOMEPAGE) {
    ricks = await platform.env.HOMEPAGE.get("ricks", { type: "json" }) || 0
  }
  return json(ricks)
}) satisfies RequestHandler

export const POST = (async ({ platform }) => {
  let ricks = 0
  if (platform?.env?.HOMEPAGE) {
    ricks = await platform.env.HOMEPAGE.get("ricks", { type: "json" }) || 0
    ricks++
    await platform.env.HOMEPAGE.put("ricks", JSON.stringify(ricks))
  }

  return json(ricks)
}) satisfies RequestHandler