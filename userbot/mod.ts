import { env } from "./deps.ts"
import Userbot from "./userbot.ts"

function createUserbotFromEnv(
  keys: { userbotUrl?: string; userbotToken?: string } = {},
) {
  return new Userbot(
    env.str(keys.userbotUrl ?? "USERBOT_URL"),
    env.str(keys.userbotToken ?? "USERBOT_TOKEN"),
  )
}

export { createUserbotFromEnv, Userbot }
