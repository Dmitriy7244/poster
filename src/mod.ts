import { env } from "./deps.ts"
import Poster from "./poster.ts"

async function createPoster(mongoUrl: string, srcChatId: number) {
  const poster = new Poster(srcChatId)
  await poster.connect(mongoUrl)
  return poster
}

function createPosterFromEnv(
  keys: { mongoUrl?: string; srcChatId?: string } = {},
) {
  return createPoster(
    env.str(keys.mongoUrl ?? "MONGO_URL"),
    env.int(keys.srcChatId ?? "SRC_CHAT_ID"),
  )
}

export { createPoster, createPosterFromEnv, Poster }
