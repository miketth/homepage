import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const GET = (({ platform }) => {
  const ricks = platform?.env?.HOMEPAGE["ricks"] || 0
  return json(ricks)
}) satisfies RequestHandler

export const POST = (({ platform }) => {
  let ricks = 1
  if (platform?.env?.HOMEPAGE) {
    ricks = ++platform.env.HOMEPAGE["ricks"] || 1
  }

  return json(ricks)
}) satisfies RequestHandler