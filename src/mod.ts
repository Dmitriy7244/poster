import { PostScheduleData } from "./base.ts"
import { createUserbotFromEnv, Env } from "./deps.ts"
import Poster from "./poster.ts"

function createPosterFromEnv(path = "poster.env") {
  const env = new Env(path)
  const userbot = createUserbotFromEnv(path)
  return Poster.create(
    env.get("MONGO_URL"),
    env.getInt("SRC_CHAT_ID"),
    userbot,
  )
}

export { createPosterFromEnv, Poster, PostScheduleData }
