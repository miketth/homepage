import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const GET = (({ platform }) => {
  const ricks = platform?.env?.HOMEPAGE["ricks"] || 0
  return json(ricks)
}) satisfies RequestHandler

export const POST = (({ platform }) => {
  let ricks = 0
  if (platform?.env?.HOMEPAGE) {
    ricks = platform.env.HOMEPAGE["ricks"] || 0
    ricks++
    platform.env.HOMEPAGE["ricks"] = ricks
  }

  return json(ricks)
}) satisfies RequestHandler