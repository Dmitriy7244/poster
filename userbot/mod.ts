import { Env } from "./deps.ts"
import Userbot from "./userbot.ts"

function createUserbotFromEnv(path = ".env") {
  const env = new Env(path)
  return new Userbot(
    env.get("USERBOT_URL"),
    env.get("USERBOT_TOKEN"),
  )
}

export { createUserbotFromEnv, Userbot }
