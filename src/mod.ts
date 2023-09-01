import { env } from "./deps.ts"
import Poster from "./poster.ts"

function createPosterFromEnv(
  keys: { mongoUrl?: string; srcChatId?: string } = {},
) {
  return Poster.create(
    env.str(keys.mongoUrl ?? "MONGO_URL"),
    env.int(keys.srcChatId ?? "SRC_CHAT_ID"),
  )
}

export { createPosterFromEnv, Poster }
