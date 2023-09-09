import { Buttons } from "../db/mod.ts"
import { PostScheduleData } from "../src/base.ts"
import { dayjs, log } from "../src/deps.ts"
import { createPosterFromEnv } from "../src/mod.ts"

const poster = await createPosterFromEnv()
const channelIds = [-1001984549268, -1001585027208]
const messageId = 7801
const postGroupId = "64fbf041c87267d0bcf05b29"
const groupId = -1001315549534
const postText = "text1"
const postButtons: Buttons = [[{ text: "1", url: "https://t.me" }]]
const postButtons2: Buttons = [[{ text: "2", url: "https://t.me" }]]
const postButtons3: Buttons = [[{ text: "3", url: "https://t.me" }]]

const opts = { sanitizeOps: true, sanitizeResources: true }

Deno.test("schedule", opts, async () => {
  const date = dayjs().add(10, "minutes")
  const data = new PostScheduleData(channelIds, messageId, date)
  data.text = postText
  data.buttons = postButtons
  const groupId = await poster.schedulePost(data)
  data.repost = true
  data.buttons = postButtons2
  await poster.schedulePost(data, groupId)
  log("Posts scheduled", { groupId })
  const buttons = await poster.getPostButtons(postText)
  log("Post buttons", buttons)
})

Deno.test("reschedule", opts, async () => {
  const date = dayjs().add(100, "minutes")
  await poster.reschedulePostGroup(postGroupId, date)
  log("Post group rescheduled")
})

Deno.test("delete", opts, async () => {
  await poster.deletePostGroup(postGroupId)
  log("Post group deleted")
})

Deno.test("getPostMessageIds", opts, async () => {
  const ids = await poster.getPostMessageIds(groupId, messageId)
  log("Post messages found", { ids })
})

Deno.test("getPostMessageIds", opts, async () => {
  const ids = await poster.getPostMessageIds(groupId, messageId)
  log("Post messages found", { ids })
})

Deno.test("setPostButtons", opts, async () => {
  await poster.setPostButtons(postGroupId, postButtons3)
  log("Post buttons set")
})

Deno.test("getPostButtons", opts, async () => {
  const buttons = await poster.getPostButtons(postText)
  log("Post buttons", buttons)
})
