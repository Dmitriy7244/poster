import {
  Class,
  env,
  error,
  log,
} from "https://raw.githubusercontent.com/Dmitriy7244/deno-std/main/mod.ts"
import { getModelForClass } from "npm:@typegoose/typegoose"

async function getDocument<T extends Class>(
  model: ReturnType<typeof getModelForClass<T>>,
  id: string,
) {
  const d = await model.findById(id)
  if (!d) error("No document", { id })
  return d
}

async function saveDocument<T extends Class>(
  model: ReturnType<typeof getModelForClass<T>>,
  document: InstanceType<T>,
) {
  const r = await model.create(document)
  return String(r.id)
}

export { mongoose, prop } from "npm:@typegoose/typegoose"
export { type Dayjs, default as dayjs } from "npm:dayjs"
export {Userbot,createUserbotFromEnv} from "../userbot/mod.ts"
export {
  type Class,
  env,
  error,
  getDocument,
  getModelForClass,
  log,
  saveDocument,
}
